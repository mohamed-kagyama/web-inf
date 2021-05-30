define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var ActionButton = require("../../../../common/component/actionButton/ActionButton");

var warningDialogWithCategoriesVueConfigFactory = require("./warningDialogWithCategoriesVueConfigFactory");

var genericNotificationDialogVueConfigFactory = require("../../genericNotificationDialog/factory/genericNotificationDialogVueConfigFactory");

var GenericNotificationAllCategoryDetails = require("../../genericNotificationDialog/GenericNotificationAllCategoryDetails");

var GenericNotificationCategory = require("../../genericNotificationDialog/GenericNotificationCategory");

var addAutomationDataNameAttributeMixinFactory = require("../../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var store = options.store,
        eventBus = options.eventBus,
        dataAttribute = options.dataAttribute;
    var GenericNotificationDialog = Vue.extend(genericNotificationDialogVueConfigFactory.create({
      actionButton: ActionButton
    }));
    var addResourcesWarningDialogConfig = warningDialogWithCategoriesVueConfigFactory.create({
      genericNotificationDialog: GenericNotificationDialog,
      category: GenericNotificationCategory,
      categoryDetails: GenericNotificationAllCategoryDetails,
      store: store,
      eventBus: eventBus
    });
    var addResourcesWarningDialogConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
      config: addResourcesWarningDialogConfig,
      dataNames: dataAttribute
    });
    var AddResourcesWarningDialogView = Vue.extend(addResourcesWarningDialogConfigWithDataNameAttribute);
    var addResourcesWarningDialogView = new AddResourcesWarningDialogView({});
    return new Dialog({
      el: addResourcesWarningDialogView.$mount().$el
    });
  }
};

});