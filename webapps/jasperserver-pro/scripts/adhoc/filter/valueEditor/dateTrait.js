define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var jrsConfigs = require("runtime_dependencies/js-sdk/src/jrs.configs");

var _ = require('underscore');

var calendar2 = require('../../../calendar2/calendar2');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var REMOVE_SPACES_REGEX = /([\s]+$|^[\s]+)/g;
var TRIM_PLUS_OR_MINUS_REGEX = /[\s]*(\+|\-)[\s]*/g;
module.exports = {
  init: function init(options) {
    this._calendars = [];
    this.pickerType = options.pickerType;
  },
  render: function render() {
    this._destroyCalendars();

    this.$el.html(this.template(this.i18nModel(this.serializeModel())));

    this._setupCalendar(this.$(this.inputSelector), this.pickerType);

    this.trigger('rendered', this);
    return this;
  },
  // Remove all spaces and convert the date value to upper case
  valueConverter: function valueConverter(value) {
    var normalizedValue = (value || '').toUpperCase().replace(REMOVE_SPACES_REGEX, '');
    normalizedValue = normalizedValue.replace(TRIM_PLUS_OR_MINUS_REGEX, '$1');
    return this._basicValueConverter(normalizedValue);
  },
  removeView: function removeView() {
    this._destroyCalendars();

    this._calendars = null;
  },
  _setupCalendar: function _setupCalendar($inputs, calendarType) {
    var self = this;
    $inputs.each(function () {
      var $input = $(this);

      self._calendars.push(calendar2.instance({
        inputField: $input,
        calendarType: calendarType,
        jqueryPickerOptions: jrsConfigs.calendar.timepicker
      }));
    });
  },
  _destroyCalendars: function _destroyCalendars() {
    _.invoke(this._calendars, 'destroy');

    this._calendars = [];
  }
};

});