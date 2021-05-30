define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

var template = require("text!../template/repositoryResourceChooserDialogTemplate.htm");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(options) {
    var store = options.store;
    return {
      components: {
        repositoryResourceChooser: options.RepositoryResourceChooser
      },
      mixins: options.mixins,
      template: template,
      computed: _.extend({
        isConfirmationActive: function isConfirmationActive() {
          return !this.isRepositoryChooserSelectionEmptyInCurrentMode && !this.isSelectionShouldBeIgnored && !this.isAnyInvalidRepositoryChooserResourcesInCurrentMode;
        }
      }, i18nComputed),
      data: function data() {
        return store.attributes;
      }
    };
  }
};

});