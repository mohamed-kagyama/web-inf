define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseInputControlView = require('../BaseInputControlView');

var $ = require('jquery');

var _ = require('underscore');

var DateAndTimePicker = require("runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker");

var singleValueTimeTemplate = require("text!../../template/singleValueTimeTemplate.htm");

var dateTimeSettings = require("settings!dateTimeSettings");

var dateUtil = require("runtime_dependencies/js-sdk/src/common/util/parse/date");

var timeUtil = require("runtime_dependencies/js-sdk/src/common/util/parse/time");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getNormalizedDatetimeValue(rawValue) {
  var normalizedValue = rawValue.toUpperCase().replace(/([\s]+$|^[\s]+)/g, '');
  return normalizedValue.replace(/[\s]*(\+|\-)[\s]*/g, '$1');
}

module.exports = BaseInputControlView.extend({
  template: singleValueTimeTemplate,
  initialize: function initialize(args) {
    this.renderStructure(args);
    this.renderState();

    if (this.model.get('visible')) {
      this.setupCalendar();
      this.bindCustomEventListeners();
    }

    this.model.get('readOnly') && this.disable();
    this.updateWarningMessage();
  },
  setupCalendar: function setupCalendar() {
    var self = this,
        input = this.$el.find('input'),
        dataType = this.model.get('dataType'),
        minTime,
        minDateTime = null,
        maxTime,
        maxDateTime = null;

    if (dataType && dataType.minValue) {
      minDateTime = new Date();
      minTime = timeUtil.iso8601TimeToTimeObject(dataType.minValue);
      minDateTime.setHours(minTime.hours);
      minDateTime.setMinutes(minTime.minutes);
      minDateTime.setSeconds(minTime.seconds + (dataType.strictMin ? 1 : 0));
    }

    if (dataType && dataType.maxValue) {
      maxDateTime = new Date();
      maxTime = timeUtil.iso8601TimeToTimeObject(dataType.maxValue);
      maxDateTime.setHours(maxTime.hours);
      maxDateTime.setMinutes(maxTime.minutes);
      maxDateTime.setSeconds(maxTime.seconds - (dataType.strictMax ? 1 : 0));
    }

    this.picker = new DateAndTimePicker({
      el: input,
      currentText: dateTimeSettings.timepicker.currentText,
      timeFormat: dateTimeSettings.timepicker.timeFormat,
      disabled: input[0].disabled,
      onClose: _.bind(this.updateState, this),
      minDateTime: minDateTime,
      maxDateTime: maxDateTime
    });
    input.change(_.bind(function (evt) {
      //prevent triggering of global control change event
      evt.stopPropagation();
      var $target = $(evt.target); //remove all spaces and convert to upper case
      //remove all spaces and convert to upper case

      var value = getNormalizedDatetimeValue($target.val());
      $target.val(value);
      this.updateState(value);
    }, this));
    this.$el.find('.jr-mInput-datetrigger').on('click', function () {
      self.picker.show();
    });
  },
  updateValue: function updateValue(controlData) {
    var value = dateUtil.isoTimeToLocalizedTime(controlData);
    this.$el.find('input').val(value);
  },
  updateState: function updateState(inputValue) {
    this.model.changeState(dateUtil.localizedTimeToIsoTime(inputValue));
  },
  bindCustomEventListeners: function bindCustomEventListeners() {
    this.listenTo(this.model.state, 'change:value', function (model, value) {
      this.updateValue(value);
    }, this);
    this.listenTo(this.model.state, 'reset change', this.updateWarningMessage, this);
  },
  remove: function remove() {
    this.picker.remove();
    BaseInputControlView.prototype.remove.call(this);
  }
});

});