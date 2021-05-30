define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var errorDialogWithCategoriesVueConfigFactory = require("../../component/dialog/errorDialogWithCategories/factory/errorDialogWithCategoriesVueConfigFactory");

var ErrorDialogWithCategoriesStore = require("../../component/dialog/errorDialogWithCategories/store/ErrorDialogWithCategoriesStore");

var genericNotificationDialogVueConfigFactory = require("../../component/dialog/genericNotificationDialog/factory/genericNotificationDialogVueConfigFactory");

var GenericNotificationAllCategoryDetails = require("../../component/dialog/genericNotificationDialog/GenericNotificationAllCategoryDetails");

var GenericNotificationCategory = require("../../component/dialog/genericNotificationDialog/GenericNotificationCategory");

var addAutomationDataNameAttributeMixinFactory = require("../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../common/enum/automationDataNameAttributesEnum");

var dataSourceChooserDialogOptions = require("../../component/validation/option/dataSourceChooserDialogOptions");

var domainChooserDialogOptions = require("../../component/validation/option/domainChooserDialogOptions");

var ActionButton = require("../../common/component/actionButton/ActionButton");

var updateSavedSchemaWarningDialogStateFactory = require("../../component/validation/errorHandling/dialog/factory/updateSavedSchemaWarningDialogStateFactory");

var WarningDialogWithCategoriesStore = require("../../component/dialog/warningDialogWithCategories/store/WarningDialogWithCategoriesStore");

var warningDialogWithCategoriesFactory = require("../../component/dialog/warningDialogWithCategories/factory/warningDialogWithCategoriesFactory");

var SaveDialog = require("../../component/dialog/save/view/SaveDialogView");

var SaveDialogModel = require("../../component/dialog/save/model/SaveDialogModel");

var ValidationErrorDialogWrapper = require("../../component/validation/errorHandling/dialog/ValidationErrorDialogWrapper");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createSaveDialog(context, options) {
  var saveDialogModel = new SaveDialogModel({}, {
    clientDomainValidationService: context.get('clientDomainValidationService')
  });
  var saveDialog = new SaveDialog({
    currentDomainUri: options.domainUri,
    parentFolderUri: options.parentFolderUri,
    treeBufferSize: options.repositoryResourceChooser.repositoryTree.limit,
    skipDataBaseMetadataCheck: options.save.skipDataBaseMetadataCheck,
    model: saveDialogModel,
    dataNameAttrs: automationDataNameAttributesEnum.validation.saveDialog,
    request: context.get('requestWithLoader')
  });
  context.register('saveDialog', saveDialog);
  context.register('saveDialogModel', saveDialogModel);
}

function createValidationErrorDialog(context, options) {
  context.register('validationErrorDialogStore', new ErrorDialogWithCategoriesStore());
  var GenericNotificationDialog = Vue.extend(genericNotificationDialogVueConfigFactory.create({
    actionButton: ActionButton
  }));
  var validationErrorDialogConfig = errorDialogWithCategoriesVueConfigFactory.create({
    genericNotificationDialog: GenericNotificationDialog,
    category: GenericNotificationCategory,
    categoryDetails: GenericNotificationAllCategoryDetails,
    store: context.get('validationErrorDialogStore'),
    eventBus: context.get('validationEventBus')
  });
  var validationErrorDialogConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: validationErrorDialogConfig,
    dataNames: automationDataNameAttributesEnum.validation.errorDialog
  });
  var ValidationErrorDialogVue = Vue.extend(validationErrorDialogConfigWithDataNameAttribute);
  var validationErrorDialog = new ValidationErrorDialogVue();
  context.register("validationErrorDialog", new ValidationErrorDialogWrapper({
    validationErrorDialog: validationErrorDialog
  }));
}

function createRepositoryChooserDialog(context, options) {
  var repositoryChooserDialogFactory = context.get('repositoryChooserDialogFactory');
  var vueRepositoryChooserDialogFactory = context.get('vueRepositoryChooserDialogFactory');
  context.register('domainChooserDialog', repositoryChooserDialogFactory.create(domainChooserDialogOptions));
  context.register('dataSourceChooserDialog', vueRepositoryChooserDialogFactory.create(dataSourceChooserDialogOptions));
}

function createValidationWarningDialog(context, options) {
  context.register('validationWarningDialogStore', new WarningDialogWithCategoriesStore(updateSavedSchemaWarningDialogStateFactory.create()));
  context.register('validationWarningDialog', warningDialogWithCategoriesFactory.create({
    store: context.get('validationWarningDialogStore'),
    eventBus: context.get('validationEventBus'),
    dataAttribute: automationDataNameAttributesEnum.validation.warningDialog
  }));
}

module.exports = createValidationDialogs;

function createValidationDialogs(context, options) {
  createSaveDialog(context, options);
  createValidationErrorDialog(context, options);
  createRepositoryChooserDialog(context, options);
  createValidationWarningDialog(context, options);
}

});