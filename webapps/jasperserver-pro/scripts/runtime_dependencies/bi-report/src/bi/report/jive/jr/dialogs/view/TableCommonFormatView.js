define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Epoxy = require('backbone.epoxy');

var getResetColorBinding = require('./bindigs/resetColorBinding');

var getColorPickerBinding = require('./bindigs/colorPickerBinding');

var datePickerBindingHandler = require('./dateTimePickerEpoxyBindingHandler');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Epoxy.View.extend({
  constructor: function constructor(options) {
    this.i18n = options.i18n;
    Epoxy.View.prototype.constructor.call(this, options);
  },
  bindingHandlers: {
    radioDiv: {
      init: function init($element, value, bindings, context) {
        var modelBinding = $element.data('model-attr');
        this.$el = $element;

        var callback = function callback(evt) {
          bindings[modelBinding]($element.data('value'));
        };

        this.callback = _.bind(callback, this);
        this.$el.on('click', this.callback);
      },
      set: function set($element, value) {
        var radioDivs = $element.siblings('div[data-bind*=\'radioDiv\']');

        if ($element.data('value') === value) {
          $element.addClass('selected');
          radioDivs.removeClass('selected');
        }
      },
      clean: function clean() {
        this.$el.off('click', this.callback);
      }
    },
    checkboxDiv: {
      init: function init($element, value, bindings, context) {
        var modelBinding = $element.data('model-attr');
        this.$el = $element;
        this.isTrippleState = !!this.$el.data('tripplestate');

        var callback = function callback(evt) {
          bindings[modelBinding](this._get($element));
        };

        this.callback = _.bind(callback, this);
        this.$el.on('click', this.callback);
      },
      set: function set($element, value) {
        if (value === true) {
          $element.removeClass('unchanged').addClass('selected');
        } else if (value === false) {
          $element.removeClass('unchanged').removeClass('selected');
        } else {
          $element.removeClass('selected').addClass('unchanged');
        }
      },
      _get: function _get($element) {
        if (this.isTrippleState) {
          if ($element.is('.unchanged')) {
            return true;
          } else if ($element.is('.selected')) {
            return false;
          } else {
            return null;
          }
        } else {
          return !$element.is('.selected');
        }
      },
      clean: function clean() {
        this.$el.off('click', this.callback);
      }
    },
    resetColor: getResetColorBinding(),
    colorpicker: getColorPickerBinding(),
    dateTimePicker: datePickerBindingHandler
  }
});

});