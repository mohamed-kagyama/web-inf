define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Vue = require('vue');

var eventBusFactory = require("../../../../util/eventBusFactory");

var canvasViewDesignersEnum = require("../../../model/enum/canvasViewDesignersEnum");

var SecurityDesignerResourcePropertiesToStoreConverter = require("../../../component/designer/securityDesigner/converter/SecurityDesignerResourcePropertiesToStoreConverter");

var SecurityDesignerStore = require("../../../component/designer/securityDesigner/store/SecurityDesignerStore");

var SecurityDesignerController = require("../../../component/designer/securityDesigner/controller/SecurityDesignerController");

var securityDesignerVueConfigFactory = require("../../../component/designer/securityDesigner/component/main/securityDesignerVueConfigFactory");

var editorVueConfigFactory = require("../../../component/designer/securityDesigner/component/editor/editorVueConfigFactory");

var addAutomationDataNameAttributeMixinFactory = require("../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../common/enum/automationDataNameAttributesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createSecurityDesignerModels(context, options) {
  var securityDesignerViewModelOptions = {
    ownDesigner: canvasViewDesignersEnum.SECURITY_DESIGNER
  };
  context.register('securityDesignerStore', new SecurityDesignerStore(_.extend(securityDesignerViewModelOptions, {})));
}

function createSecurityDesignerVueComponents(context, options) {
  var securityDesignerEditorVueConfig = editorVueConfigFactory.create({
    message: "Here is the message",
    context: context,
    securityDesignerEventBus: context.get('securityDesignerEventBus')
  });
  var securityDesignerEditorVueConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: securityDesignerEditorVueConfig,
    dataNames: automationDataNameAttributesEnum.securityDesigner.editor
  });
  var Editor = Vue.extend(securityDesignerEditorVueConfigWithDataNameAttribute);
  context.register('securityDesignerVueConfig', securityDesignerVueConfigFactory.create({
    data: context.get('securityDesignerStore').attributes,
    editor: Editor,
    securityDesignerEventBus: context.get('securityDesignerEventBus')
  }));
}

function createSecurityDesignerViews(context, options) {}

function createSecurityDesignerControllers(context) {
  context.register('securityDesignerController', new SecurityDesignerController({
    storeChangeEventBus: context.get('storeChangeEventBus'),
    securityDesignerStore: context.get('securityDesignerStore'),
    securityDesignerResourcePropertiesToStoreConverter: new SecurityDesignerResourcePropertiesToStoreConverter()
  }));
}

module.exports = function (context, options) {
  context.register('securityDesignerEventBus', eventBusFactory.create());
  createSecurityDesignerModels(context, options);
  createSecurityDesignerVueComponents(context, options);
  createSecurityDesignerViews(context, options);
  createSecurityDesignerControllers(context, options);
};

});