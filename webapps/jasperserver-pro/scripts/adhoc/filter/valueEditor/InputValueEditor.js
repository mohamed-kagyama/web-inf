define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var AbstractValueEditor = require('./AbstractValueEditor');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CORRUPTED_SUFFIX = '_corrupted';
module.exports = AbstractValueEditor.extend({
  inputSelector: 'input[type=\'text\']',
  events: function events() {
    var eventsObj = {};
    eventsObj['change ' + this.inputSelector] = 'onChange';
    return eventsObj;
  },
  registerEvents: function registerEvents() {
    this.listenTo(this.model, 'change:' + this.modelVariableName, this.render);
  },
  onChange: function onChange() {
    var $inputElement = $(this.$(this.inputSelector)[0]);
    var convertedValue = this.convert($inputElement.val());
    this.setValue(convertedValue);
  },
  serializeModel: function serializeModel() {
    var viewModel = this.model.toJSON();
    viewModel.value = this._replaceValue(viewModel.value);
    return viewModel;
  },
  _replaceValue: function _replaceValue(value) {
    if (value === jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_VALUE) {
      value = '';
    }

    if (_.isString(value) && (value.toLowerCase() === jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_VALUE.toLowerCase() + CORRUPTED_SUFFIX || value.toLowerCase() === jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_LABEL.toLowerCase() + CORRUPTED_SUFFIX)) {
      value = value.split(CORRUPTED_SUFFIX)[0];
    }

    return value;
  },
  // we do not allow users to input ~NULL~ and [NULL] constants manually, so we intentionally corrupt value
  _basicValueConverter: function _basicValueConverter(value) {
    // we do not allow users to input ~NULL~ and [NULL] constants manually, so we intentionally corrupt value
    if (value.toLowerCase() === jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_VALUE.toLowerCase() || value.toLowerCase() === jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_LABEL.toLowerCase()) {
      value = value + CORRUPTED_SUFFIX;
    }

    if (value === '') {
      value = jrsConfigs.inputControlsConstants.NULL_SUBSTITUTION_VALUE;
    }

    return value;
  }
});

});