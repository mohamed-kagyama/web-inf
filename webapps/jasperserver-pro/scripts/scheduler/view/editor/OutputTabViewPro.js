define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!all");

var config = require("runtime_dependencies/js-sdk/src/jrs.configs");

var referenceSizeTemplate = require("text!../../template/editor/dashboardSizeTemplate.htm");

var OutputTabView = require("runtime_dependencies/jrs-ui/src/scheduler/view/editor/OutputTabView");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function disableReferenceSizeInputsForFixeSizeDashboard(value) {
  if (this.model.fixedSize) {
    this.$('[name=outputSizeWidth]').prop('disabled', true);
    this.$('[name=outputSizeHeight]').prop('disabled', true);
  }

  return value;
}

function toInteger(val) {
  return +val;
}

module.exports = OutputTabView.extend({
  binding: OutputTabView.prototype.binding.concat([{
    attr: 'source/referenceWidth',
    control: 'outputSizeWidth',
    getter: toInteger,
    setter: disableReferenceSizeInputsForFixeSizeDashboard
  }, {
    attr: 'source/referenceHeight',
    control: 'outputSizeHeight',
    getter: toInteger,
    setter: disableReferenceSizeInputsForFixeSizeDashboard
  }]),
  initialize: function initialize(options) {
    this.options = options || {};

    if (this.options.isDashboard) {
      this.availableFormats = config.availableDashboardJobOutputFormats || [];
    }

    return OutputTabView.prototype.initialize.apply(this, arguments);
  },
  render: function render() {
    this._renderTemplate();

    if (this.options.isDashboard) {
      this.$('#outputFormat').addClass('dashboard').after(_.template(referenceSizeTemplate, {
        i18n: i18n
      }));
    }

    this._initializeBinding();
  }
});

});