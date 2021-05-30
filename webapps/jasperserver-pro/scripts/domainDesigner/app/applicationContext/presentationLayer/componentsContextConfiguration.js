define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var i18n = require("bundle!DomainDesignerBundle");

var eventBusFactory = require("../../../util/eventBusFactory");

var ConfirmationDialogView = require("../../component/dialog/confirmation/view/ConfirmationDialogView");

var Notification = require("runtime_dependencies/js-sdk/src/common/component/notification/Notification");

var addAutomationDataNameAttributeMixinFactory = require("../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../common/enum/automationDataNameAttributesEnum");

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var LoaderDialogController = require("../../common/component/loader/LoaderDialogController");

var loaderDialogVueConfigFactory = require("../../common/component/loader/loaderDialogVueConfigFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDialogs(context, options) {
  context.register('clearAllDataConfirmationDialog', new ConfirmationDialogView({
    text: i18n['domain.designer.sidebar.confirmationDialog.text'],
    title: i18n['domain.designer.sidebar.confirmationDialog.title'],
    dataNameAttrs: automationDataNameAttributesEnum.common.clearAllDataConfirmationDialog
  }));
  context.register('removeTableConfirmationDialog', new ConfirmationDialogView({
    title: i18n['domain.designer.joinsDesigner.removeTableConfirmationDialog.title'],
    text: i18n['domain.designer.joinsDesigner.removeTableConfirmationDialog.text'],
    dataNameAttrs: automationDataNameAttributesEnum.common.removeTableConfirmationDialog
  }));
  context.register('loaderEventBus', eventBusFactory.create());
  context.register('loaderWithCancelEventBus', eventBusFactory.create());
  context.register('derivedTableLoaderDialogEventBus', eventBusFactory.create());
  context.register('selectDataSourceLoaderDialogEventBus', eventBusFactory.create());
  var loaderDialogWithCancelConfig = loaderDialogVueConfigFactory.create({
    hasCancel: true,
    Dialog: Dialog,
    loaderEventBus: context.get('loaderWithCancelEventBus'),
    zIndex: options.loader.dialog.zIndex
  });
  var loaderDialogWithoutCancelConfig = loaderDialogVueConfigFactory.create({
    Dialog: Dialog,
    zIndex: options.loader.dialog.zIndex
  });
  var loaderDialogWithCancelConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: loaderDialogWithCancelConfig,
    dataNames: automationDataNameAttributesEnum.common.loaderDialogWithCancel
  });
  var loaderDialogWithoutCancelConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: loaderDialogWithoutCancelConfig,
    dataNames: automationDataNameAttributesEnum.common.loaderDialog
  });
  var LoaderDialogWithCancel = Vue.extend(loaderDialogWithCancelConfigWithDataNameAttribute);
  var LoaderDialog = Vue.extend(loaderDialogWithoutCancelConfigWithDataNameAttribute);
  context.register('loaderDialog', new LoaderDialog());
  context.register('loaderDialogController', new LoaderDialogController({
    loader: context.get('loaderDialog'),
    loaderEventBus: context.get('loaderEventBus')
  }));
  context.register('loaderDialogWithCancel', new LoaderDialogWithCancel());
  context.register('loaderDialogWithCancelController', new LoaderDialogController({
    loader: context.get('loaderDialogWithCancel'),
    loaderEventBus: context.get('loaderWithCancelEventBus')
  }));
  context.register('notification', new Notification());
}

function createComponents(context, options) {
  createDialogs(context, options);
}

module.exports = function (context, options) {
  createComponents(context, options);
};

});