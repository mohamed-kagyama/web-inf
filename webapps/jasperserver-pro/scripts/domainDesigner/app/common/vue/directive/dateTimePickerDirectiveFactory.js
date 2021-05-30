define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var DateAndTimePicker = require("runtime_dependencies/js-sdk/src/components/dateAndTime/DateAndTimePicker");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DirectiveController = function DirectiveController(options) {
  this.initialize(options);
};

_.extend(DirectiveController.prototype, {
  initialize: function initialize(options) {
    var el = options.el,
        bindingValue = options.bindingValue,
        constr = options.constr;

    _.bindAll(this, '_createAndShowDateTimePicker', '_onDateTimePickerClose');

    this.DateAndTimePickerConstructor = constr || DateAndTimePicker;
    var $el = bindingValue.$ ? bindingValue.$(el) : $(el);
    this.datePickerInput = $el;
    this.datePickerTrigger = null;

    if (bindingValue.el) {
      this.datePickerInput = $el.find(bindingValue.el);

      if (!this.datePickerInput.length) {
        throw new Error('Element for date picker is not found.');
      }
    }

    if (bindingValue.trigger) {
      this.datePickerTrigger = $el.find(bindingValue.trigger);

      if (!this.datePickerTrigger.length) {
        throw new Error('Trigger for date picker is not found.');
      }
    }

    this.dateAndTimePickerOptions = _.extend({}, bindingValue, {
      el: this.datePickerInput,
      onClose: _.partial(this._onDateTimePickerClose, bindingValue.onClose)
    });

    if (!this.datePickerTrigger) {
      this._createDateAndTimePicker();
    }

    this._initEvents();
  },
  remove: function remove() {
    this._setInputDisableState(false);

    this.datePickerTrigger && this.datePickerTrigger.off('click', this._createAndShowDateTimePicker);
    this.dateTimePicker && this.dateTimePicker.remove();
  },
  _initEvents: function _initEvents() {
    if (this.datePickerTrigger) {
      this.datePickerTrigger.on('click', this._createAndShowDateTimePicker);
    }
  },
  _createDateAndTimePicker: function _createDateAndTimePicker() {
    this.dateTimePicker = new this.DateAndTimePickerConstructor(this.dateAndTimePickerOptions);
  },
  _createAndShowDateTimePicker: function _createAndShowDateTimePicker() {
    this._createDateAndTimePicker();

    this.dateTimePicker.show();

    this._setInputDisableState(true);
  },
  _onDateTimePickerClose: function _onDateTimePickerClose(onClose) {
    var args = Array.prototype.slice.call(arguments, 1);

    this._setInputDisableState(false);

    onClose && onClose.apply(null, args);
  },
  _setInputDisableState: function _setInputDisableState(isDisabled) {
    this.datePickerInput.prop('disabled', isDisabled);
  }
});

module.exports = {
  create: function create(options) {
    return {
      bind: function bind(el, binding) {
        el._dateTimePickerController = new DirectiveController({
          el: el,
          bindingValue: binding.value,
          constr: options.DateAndTimePicker
        });
      },
      unbind: function unbind(el) {
        el._dateTimePickerController.remove();

        delete el._dateTimePickerController;
      }
    };
  }
};

});