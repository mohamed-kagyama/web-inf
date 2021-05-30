define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var aspectjs = require("../../../util/aspect/aspectjs");

var eventBusFactory = require("../../../util/eventBusFactory");

var DraftStateAdvice = require("../../util/draftState/aspect/DraftStateAdvice");

var DraftStateGetActionNameAsFirstParameterAdviceAdapter = require("../../util/draftState/adapter/DraftStateGetActionNameAsFirstParameterAdviceAdapter");

var applicationDispatcherDraftStateBlackListEnum = require("../../util/draftState/enum/applicationDispatcherDraftStateBlackListEnum");

var menuEventBusDraftStateWhiteListEnum = require("../../util/draftState/enum/menuEventBusDraftStateWhiteListEnum");

var joinsDesignerEventBusDraftStateWhiteListEnum = require("../../util/draftState/enum/joinsDesignerEventBusDraftStateWhiteListEnum");

var sidebarEventBusDraftStateWhiteListEnum = require("../../util/draftState/enum/sidebarEventBusDraftStateWhiteListEnum");

var applicationCrossComponentEventBusDraftStateWhiteListEnum = require("../../util/draftState/enum/applicationCrossComponentEventBusDraftStateWhiteListEnum");

var DraftStateController = require("../../component/dialog/draftState/controller/DraftStateController");

var ConfirmationDialogView = require("../../component/dialog/confirmation/view/ConfirmationDialogView");

var automationDataNameAttributesEnum = require("../../common/enum/automationDataNameAttributesEnum");

var i18n = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function interceptDispatcherActions(context) {
  var interceptDispatcherEventExecutorAdviceAdapter = new DraftStateGetActionNameAsFirstParameterAdviceAdapter({
    blackList: applicationDispatcherDraftStateBlackListEnum,
    draftStateAdvice: context.get('draftStateAdvice')
  });
  var asyncApplicationDispatcher = context.get('asyncApplicationDispatcher');
  var syncApplicationDispatcher = context.get('syncApplicationDispatcher');
  var aopConfig = {
    '*': {
      modifyOriginal: true
    },
    'execute': {
      around: [interceptDispatcherEventExecutorAdviceAdapter.intercept]
    }
  };

  _.each([asyncApplicationDispatcher, syncApplicationDispatcher], function (applicationDispatcher) {
    aspectjs(applicationDispatcher, aopConfig);
  });
}

function interceptMenuEventBus(context) {
  interceptEventBus({
    context: context,
    whiteList: menuEventBusDraftStateWhiteListEnum,
    eventBus: context.get('menuEventBus')
  });
}

function interceptJoinsDesignerEventBus(context) {
  interceptEventBus({
    context: context,
    whiteList: joinsDesignerEventBusDraftStateWhiteListEnum,
    eventBus: context.get('joinsDesignerEventBus')
  });
}

function interceptCrossComponentEventBus(context) {
  interceptEventBus({
    context: context,
    whiteList: applicationCrossComponentEventBusDraftStateWhiteListEnum,
    eventBus: context.get('applicationCrossComponentEventBus')
  });
}

function interceptSidebarEventBus(context) {
  interceptEventBus({
    context: context,
    whiteList: sidebarEventBusDraftStateWhiteListEnum,
    eventBus: context.get('sidebarEventBus')
  });
}

function interceptEventBus(options) {
  var context = options.context,
      blackList = options.blackList,
      whiteList = options.whiteList,
      eventBus = options.eventBus;
  var interceptMenuEventBusTriggerActionAdviceAdapter = new DraftStateGetActionNameAsFirstParameterAdviceAdapter({
    whiteList: whiteList,
    blackList: blackList,
    draftStateAdvice: context.get('draftStateAdvice')
  });
  aspectjs(eventBus, {
    '*': {
      modifyOriginal: true
    },
    'trigger': {
      around: [interceptMenuEventBusTriggerActionAdviceAdapter.intercept]
    }
  });
}

function createDraftStateContextConfiguration(context, options) {
  context.register('draftStateEventBus', eventBusFactory.create());
  var draftStateAdvice = new DraftStateAdvice({
    applicationDispatcherEventBus: context.get('applicationDispatcherEventBus'),
    viewStateModelService: context.get('viewStateModelQueryService'),
    draftStateEventBus: context.get('draftStateEventBus')
  });
  context.register('draftStateAdvice', draftStateAdvice);
  interceptDispatcherActions(context);
  interceptMenuEventBus(context);
  interceptJoinsDesignerEventBus(context);
  interceptCrossComponentEventBus(context);
  interceptSidebarEventBus(context);
  context.register('draftStateController', new DraftStateController({
    draftStateEventBus: context.get('draftStateEventBus'),
    confirmationDialog: new ConfirmationDialogView({
      yesLabel: i18n['button.yes'],
      noLabel: i18n['button.no'],
      dataNameAttrs: automationDataNameAttributesEnum.common.draftStateConfirmationDialog
    })
  }));
}

module.exports = createDraftStateContextConfiguration;

});