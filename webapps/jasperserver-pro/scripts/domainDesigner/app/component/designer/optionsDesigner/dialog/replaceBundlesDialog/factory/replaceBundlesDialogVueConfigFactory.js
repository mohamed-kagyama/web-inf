define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/replaceBundlesDialogVueTemplate.htm");

var i18nComputed = require("../../../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var store = options.store,
        optionsDesignerEventBus = options.optionsDesignerEventBus;
    return {
      template: template,
      computed: _.extend({}, i18nComputed),
      data: function data() {
        return store;
      },
      methods: {
        onReplaceBundlesButtonClick: function onReplaceBundlesButtonClick() {
          optionsDesignerEventBus.trigger('replaceBundlesDialog:replaceBundles', _.cloneDeep(this.bundles));
        },
        onSelectNewFilesButtonClick: function onSelectNewFilesButtonClick() {
          optionsDesignerEventBus.trigger('replaceBundlesDialog:selectNewFiles');
        },
        onCancelButtonClick: function onCancelButtonClick() {
          optionsDesignerEventBus.trigger('replaceBundlesDialog:cancel');
        }
      }
    };
  }
};

});