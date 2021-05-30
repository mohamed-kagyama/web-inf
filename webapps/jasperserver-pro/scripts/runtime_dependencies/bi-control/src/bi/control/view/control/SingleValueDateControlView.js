define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseInputControlView = require('../BaseInputControlView');

var $ = require('jquery');

var _ = require('underscore');

var DateAndTimePicker = require("runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker");

var singleValueDateTemplate = require("text!../../template/singleValueDateTemplate.htm");

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
  template: singleValueDateTemplate,
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
        minDate = null,
        maxDate = null;

    if (dataType) {
      if (dataType.minValue) {
        minDate = dateUtil.iso8601DateToMoment(dataType.minValue);

        if (dataType.strictMin) {
          minDate.add(1, 'd');
        }

        minDate = dateUtil.momentToLocalizedDate(minDate);
      }

      if (dataType.maxValue) {
        maxDate = dateUtil.iso8601DateToMoment(dataType.maxValue);

        if (dataType.strictMax) {
          maxDate.subtract(1, 'd');
        }

        maxDate = dateUtil.momentToLocalizedDate(maxDate);
      }
    }

    this.picker = new DateAndTimePicker({
      el: input,
      currentText: dateTimeSettings.datepicker.currentText,
      dateFormat: dateTimeSettings.datepicker.dateFormat,
      disabled: input[0].disabled,
      onSelect: _.bind(this.updateState, this),
      minDate: minDate,
      maxDate: maxDate
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
    var value = dateUtil.isoDateToLocalizedDate(controlData);
    this.$el.find('input').val(value);
  },
  updateState: function updateState(inputValue) {
    this.model.changeState(dateUtil.localizedDateToIsoDate(inputValue));
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