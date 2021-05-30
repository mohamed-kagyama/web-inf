define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var BackboneValidation = require("runtime_dependencies/js-sdk/src/common/extension/backboneValidationExtension");

var i18n = require("bundle!adhoc_messages");

var gaugeValidators = require('../view/appearanceTab/util/validators');

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

var FormattingDialogModel = Backbone.Model.extend({
  validation: {
    xAxisStep: {
      xRegExpPattern: /^[0-9]+$/,
      min: 1,
      msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
    },
    yAxisStep: {
      xRegExpPattern: /^[0-9]+$/,
      min: 1,
      msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
    },
    xAxisRotation: {
      xRegExpPattern: /^[-0-9]+$/,
      range: [-90, 90],
      msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
    },
    yAxisRotation: {
      xRegExpPattern: /^[-0-9]+$/,
      range: [-90, 90],
      msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
    },
    legend: {
      oneOf: ['bottom', 'left', 'right', 'top', 'none'],
      msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
    }
    /*labelOffset: {
         pattern: 'number',
         min: 0,
         msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
         },
        thousandSeparator: {
            oneOf: [',', '.', 'None'],
            msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
        },
        decimalPoint: {
            oneOf: [',', '.', 'None'],
            msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
        },
        rotation: {
            pattern: 'number',
            range: [-90, 90],
            msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
        },
        alignment: {
            oneOf: ['bottom', 'left', 'right', 'top'],
            msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
        },
        donnutInnerSize: {
            pattern: 'number',
            range: [0, 100],
            msg: i18n.ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_ERROR_ENTER_CORRECT_VALUE
        }
    */

  },
  formattingOptions: ['xAxisStep', 'yAxisStep', 'xAxisRotation', 'yAxisRotation', 'legend', 'legendBorder', 'showDataPoints', 'showScatterLine', 'showSingleMeasuresLabels', 'showMeasureOnValueAxis', 'autoScaleFonts', 'gaugesLayout', 'gaugesMinValue', 'gaugesMaxValue', 'gaugesDecimalPlaces', 'gaugesSuffixLabel', 'gaugeStopColor1Value', 'gaugeStopColor2Value', 'gaugeStopColor3Value', 'gaugeStopColor4Value', 'gaugeStopColor1Color', 'gaugeStopColor2Color', 'gaugeStopColor3Color', 'gaugeStopColor4Color' //"showXAxisLabels",
  //"showYAxisLabels",
  //"labelOffset",
  //"rotateAllLevels",
  //"thousandSeparator",
  //"decimalPoint",
  //"invertedAxis",
  //"showLabels",
  //"rotation",
  //"alignment",
  //"donnutInnerSize",
  ],
  defaults: {
    gaugeStopColor1Value: 0.2,
    gaugeStopColor2Value: 0.5,
    gaugeStopColor3Value: 0.7,
    gaugeStopColor4Value: 1,
    gaugeStopColor1Color: '#33a4ff',
    gaugeStopColor2Color: '#33a4ff',
    gaugeStopColor3Color: '#33a4ff',
    gaugeStopColor4Color: '#33a4ff'
  },
  initialize: function initialize(attributes, options) {
    this.callUpdateState = options.updateState;
    this.on('invalid', function (model, error) {//console.log(error);
    });
    this.on('change', function (model, error) {
      this.modelChanged = true;
    });
  },
  // redefine this method
  set: function set(key, val, options) {
    var attrs = {};

    if (_typeof(key) === 'object') {
      attrs = key;
      options = val;
    } else {
      attrs[key] = val;
    }

    attrs = this._convertAttrsToInternalStructure(attrs);
    return Backbone.Model.prototype.set.call(this, attrs, options);
  },
  _convertAttrsToInternalStructure: function _convertAttrsToInternalStructure(attrs) {
    var i, keyFrom, keyTo;
    attrs = _.clone(attrs);

    for (i = 1; i <= 4; i++) {
      keyFrom = "color".concat(i, "Stop");
      keyTo = "gaugeStopColor".concat(i, "Value");

      if (attrs[keyFrom]) {
        attrs[keyTo] = attrs[keyFrom];
        delete attrs[keyFrom];
      }
    }

    if (!_.isUndefined(attrs.gaugeStopColors)) {
      if (_.isArray(attrs.gaugeStopColors)) {
        for (i = 0; i < attrs.gaugeStopColors.length; i++) {
          attrs["gaugeStopColor".concat(i + 1, "Color")] = attrs.gaugeStopColors[i];
        }
      }

      delete attrs.gaugeStopColors;
    } // we should have at least 4 color keys


    for (i = 1; i <= 4; i++) {
      if (_.isUndefined(attrs["gaugeStopColor".concat(i, "Color")])) {
        attrs["gaugeStopColor".concat(i, "Color")] = this.defaults["gaugeStopColor".concat(i, "Color")];
      }
    }

    return attrs;
  },
  _convertAttrsFromInternalStructure: function _convertAttrsFromInternalStructure(attrs) {
    var i, keyFrom, keyTo;
    attrs = _.clone(attrs);
    attrs.gaugeStopColors = [];

    for (i = 1; i <= 4; i++) {
      attrs.gaugeStopColors.push(attrs["gaugeStopColor".concat(i, "Color")]);
      delete attrs["gaugeStopColor".concat(i, "Color")];
      keyFrom = "gaugeStopColor".concat(i, "Value");
      keyTo = "color".concat(i, "Stop");
      attrs[keyTo] = attrs[keyFrom];
      delete attrs[keyFrom];
    }

    return attrs;
  },
  parse: function parse(options) {
    var res = {};

    _.each(this.formattingOptions, function (name) {
      res[name] = options[name];
    });

    return res;
  },
  applyModel: function applyModel() {
    if (this.modelChanged) {
      this.callUpdateState(this._convertAttrsFromInternalStructure(this.attributes));
      this._savedAttributes = this.attributes;
      this.modelChanged = false;
    }
  },
  rollbackChangesAfterApply: function rollbackChangesAfterApply(stateToApply) {
    if (this._savedAttributes) {
      this.set(stateToApply || this._savedAttributes, {
        silent: true
      });
      this.applyModel();
    }
  }
}); // Add validation to model (https://github.com/thedersen/backbone.validation#validation-mix-in)

_.extend(FormattingDialogModel.prototype, BackboneValidation.mixin);

_.extend(FormattingDialogModel.prototype, {
  isValid: function isValid() {
    var gaugesValidationErrors = gaugeValidators.validateGaugesProps(this.attributes);

    if (gaugesValidationErrors.size > 0) {
      return false;
    }

    return BackboneValidation.mixin.isValid.apply(this, arguments);
  }
});

module.exports = FormattingDialogModel;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});