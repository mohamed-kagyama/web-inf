define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var RenameDialog = require('../RenameDialog');

var renameDialogVueConfigFactory = require('./renameDialogVueConfigFactory');

var addAutomationDataNameAttributeMixinFactory = require("../../../../common/factory/addAutomationDataNameAttributeMixinFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var store = options.store,
        dataNameAttrs = options.dataNameAttrs;
    var renameDialogVueConfig = addAutomationDataNameAttributeMixinFactory.create({
      config: renameDialogVueConfigFactory.create({
        store: store,
        components: options.components
      }),
      dataNames: dataNameAttrs
    });
    var RenameDialogVue = Vue.extend(renameDialogVueConfig),
        renameDialogVue = new RenameDialogVue();
    var renameDialogWrapper = new RenameDialog({
      renameDialog: renameDialogVue
    });
    return renameDialogVue;
  }
};

});