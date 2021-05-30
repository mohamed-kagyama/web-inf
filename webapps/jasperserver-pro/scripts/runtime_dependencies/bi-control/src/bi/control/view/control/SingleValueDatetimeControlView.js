define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseInputControlView = require('../BaseInputControlView');

var $ = require('jquery');

var _ = require('underscore');

var DateAndTimePicker = require("runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker");

var singleValueDatetimeTemplate = require("text!../../template/singleValueDatetimeTemplate.htm");

var dateTimeSettings = require("settings!dateTimeSettings");

var dateUtil = require("runtime_dependencies/js-sdk/src/common/util/parse/date");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getNormalizedDatetimeValue(rawValue) {
  var normalizedValue = rawValue.toUpperCase().replace(/([\s]+$|^[\s]+)/g, '');
  return normalizedValue.replace(/[\s]*(\+|\-)[\s]*/g, '$1');
}

module.exports = BaseInputControlView.extend({
  template: singleValueDatetimeTemplate,
  initialize: function initialize() {
    this.renderStructure();
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
        minDate = dataType && dateUtil.iso8601TimestampToDateObject(dataType.minValue) || null,
        maxDate = dataType && dateUtil.iso8601TimestampToDateObject(dataType.maxValue) || null;

    if (dataType && dataType.strictMin && minDate) {
      minDate.setSeconds(minDate.getSeconds() + 1);
    }

    if (dataType && dataType.strictMax && maxDate) {
      maxDate.setSeconds(maxDate.getSeconds() - 1);
    }

    this.picker = new DateAndTimePicker({
      el: input,
      currentText: dateTimeSettings.timepicker.currentText,
      dateFormat: dateTimeSettings.datepicker.dateFormat,
      timeFormat: dateTimeSettings.timepicker.timeFormat,
      disabled: input[0].disabled,
      onSelect: _.bind(this.updateState, this),
      minDateTime: minDate,
      maxDateTime: maxDate,
      showOn: 'button'
    });
    this.$el.find('.ui-datepicker-trigger').hide();
    input.change(_.bind(function (evt) {
      //prevent triggering of global control change event
      evt.stopPropagation();
      var $target = $(evt.target); //remove all spaces an  d convert to upper case
      //remove all spaces an  d convert to upper case

      var value = getNormalizedDatetimeValue($target.val());
      $target.val(value);
      this.updateState(value);
    }, this));
    input.click(_.bind(function (evt) {
      evt.stopPropagation();
      this.picker.hide();
    }, this));
    input.select(_.bind(function (evt) {
      if (evt.target.selectionEnd !== evt.target.selectionStart) {
        evt.stopPropagation();
        this.picker.hide();
      }
    }, this));
    this.$el.find('.jr-mInput-datetrigger').on('click', function () {
      self.picker.show();
      self.$el.find('input')[0].setSelectionRange(0, 0);
    });
  },
  updateValue: function updateValue(controlData) {
    var value = dateUtil.isoTimestampToLocalizedTimestamp(controlData);
    this.$el.find('input').val(value);
  },
  updateState: function updateState(inputValue) {
    this.model.changeState(dateUtil.localizedTimestampToIsoTimestamp(inputValue));
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