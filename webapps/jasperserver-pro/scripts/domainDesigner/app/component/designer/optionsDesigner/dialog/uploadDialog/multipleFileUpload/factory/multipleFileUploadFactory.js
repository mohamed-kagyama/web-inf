define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var multipleFileUploadVueConfigFactory = require("./multipleFileUploadVueConfigFactory");

var multipleFileUploadActionsFactory = require("../actions/multipleFileUploadActionsFactory");

var multipleFileUploadStateMutationsFactory = require("../mutations/multipleFileUploadStateMutationsFactory");

var multipleFileUploadBehaviourMixinFactory = require("../mixin/behaviour/multipleFileUploadBehaviourMixinFactory");

var addAutomationDataNameAttributeMixinFactory = require("../../../../../../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../../../../../../common/enum/automationDataNameAttributesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var store = options.store,
        fileLoader = options.fileLoader;
    var multipleFileUploadActions = multipleFileUploadActionsFactory.create({
      fileLoader: fileLoader
    });
    var multipleFileUploadStateMutations = multipleFileUploadStateMutationsFactory.create({
      store: store
    });
    var multipleFileUploadBehaviourMixin = multipleFileUploadBehaviourMixinFactory.create({
      multipleFileUploadActions: multipleFileUploadActions,
      multipleFileUploadStateMutations: multipleFileUploadStateMutations
    });
    var optionsDesignerMultipleFileUploadConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
      config: multipleFileUploadVueConfigFactory.create(),
      dataNames: automationDataNameAttributesEnum.optionsDesigner.multipleFileUpload
    });
    return {
      component: Vue.extend(optionsDesignerMultipleFileUploadConfigWithDataNameAttribute),
      actions: multipleFileUploadActions,
      mutations: multipleFileUploadStateMutations,
      behaviour: multipleFileUploadBehaviourMixin
    };
  }
};

});