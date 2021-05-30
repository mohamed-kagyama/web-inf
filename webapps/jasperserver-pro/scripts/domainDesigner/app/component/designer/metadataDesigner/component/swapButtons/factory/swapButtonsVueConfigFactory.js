define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/swapButtonsVueTemplate.htm");

var i18nComputed = require("../../../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      data: function data() {
        return options.data;
      },
      computed: i18nComputed,
      methods: {
        onMoveToResultButtonClick: _.throttle(function () {
          options.metadataDesignerEventBus.trigger('moveToResult');
        }, options.throttleTime),
        onMoveToSourceButtonClick: _.throttle(function () {
          options.metadataDesignerEventBus.trigger('moveToSource');
        }, options.throttleTime)
      }
    };
  }
};

});