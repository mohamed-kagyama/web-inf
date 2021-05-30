define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var singleFileUploadActionsFactory = require("../actions/singleFileUploadActionsFactory");

var singleFileUploadMutationsFactory = require("../mutations/singleFileUploadMutationsFactory");

var singleFileUploadVueConfigFactory = require("./singleFileUploadVueConfigFactory");

var singleFileUploadBehaviourMixinFactory = require("../mixin/behaviour/singleFileUploadBehaviourMixinFactory");

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
    var singleFileUploadActions = singleFileUploadActionsFactory.create({
      fileLoader: fileLoader
    });
    var singleFileUploadStateMutations = singleFileUploadMutationsFactory.create({
      store: store
    });
    var singleFileUploadBehaviourMixin = singleFileUploadBehaviourMixinFactory.create({
      singleFileUploadActions: singleFileUploadActions,
      singleFileUploadStateMutations: singleFileUploadStateMutations
    });
    var optionsDesignerSingleFileUploadConfig = singleFileUploadVueConfigFactory.create();
    var optionsDesignerSingleFileUploadConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
      config: optionsDesignerSingleFileUploadConfig,
      dataNames: automationDataNameAttributesEnum.optionsDesigner.singleFileUpload
    });
    return {
      component: Vue.extend(optionsDesignerSingleFileUploadConfigWithDataNameAttribute),
      actions: singleFileUploadActions,
      mutations: singleFileUploadStateMutations,
      behaviour: singleFileUploadBehaviourMixin
    };
  }
};

});