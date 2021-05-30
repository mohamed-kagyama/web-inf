define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../common/vue/computed/i18nComputed");

var template = require("text!./template/bundlesLIstTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['bundles'],
      components: {
        bundleItem: options.bundleItem
      },
      computed: _.extend({}, i18nComputed),
      methods: {
        onAddLocaleBundle: function onAddLocaleBundle() {
          options.optionsDesignerEventBus.trigger('show:bundlesUploadDialog');
        },
        onDownloadBundleTemplate: function onDownloadBundleTemplate() {
          options.optionsDesignerEventBus.trigger('show:downloadBundleTemplateDialog');
        }
      }
    };
  }
};

});