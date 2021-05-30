define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../../common/vue/computed/i18nComputed");

var downloadBundleTemplateDialogTemplate = require("text!../template/downloadBundleTemplateDialogTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      computed: _.extend({}, i18nComputed),
      template: downloadBundleTemplateDialogTemplate,
      methods: {
        onOk: function onOk() {
          options.optionsDesignerEventBus.trigger('downloadBundleTemplate', {
            autoGenerateLabelKeyIfMissing: this.autoGenerateLabelKeyIfMissing,
            autoGenerateDescriptionKeyIfMissing: this.autoGenerateDescriptionKeyIfMissing
          });
        },
        onCancel: function onCancel() {
          options.optionsDesignerEventBus.trigger('hide:downloadBundleTemplateDialog');
        }
      }
    };
  }
};

});