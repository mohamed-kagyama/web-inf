define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var _AddSeriesColorButton = require('./AddSeriesColorButton');

var AddSeriesColorButtonComponent = _AddSeriesColorButton.AddSeriesColorButton;

var _baseTrashBinButton = require('./base/TrashBinButton');

var TrashBinButtonComponent = _baseTrashBinButton.TrashBinButton;

var _baseColorControl = require('./base/ColorControl');

var ColorControlComponent = _baseColorControl.ColorControl;

var _baseColorSetControl = require('./base/ColorSetControl');

var ColorSetControlComponent = _baseColorSetControl.ColorSetControl;

var Spacer = require('./base/Spacer');

var getColorLabel = require('../util/getColorLabel');

var i18n = require("bundle!adhoc_messages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
var colorKey = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_COLOR';

var createSeriesColorSet = function createSeriesColorSet(AddSeriesColorButton, TrashBinButton, ColorControl, ColorSetControl) {
  return function SeriesColorSet(props) {
    return React.createElement(ColorSetControl, null, props.colors.map(function (color, index) {
      return React.createElement(React.Fragment, {
        key: index.toString()
      }, React.createElement(ColorControl, {
        isControl: false,
        isInlineControl: false,
        label: "".concat(i18n[colorKey], " ").concat(index + 1),
        color: color,
        colorLabel: getColorLabel(color),
        showTransparentPreset: false,
        onColorChange: function onColorChange(c) {
          props.onSeriesColorChange(c, index);
        }
      }, React.createElement("div", {
        className: "jr-mControl-actions jr"
      }, React.createElement(TrashBinButton, {
        onClick: function onClick() {
          props.onSeriesColorDelete(index);
        }
      }))), React.createElement(Spacer, null));
    }), React.createElement("div", {
      className: "jr-mControl-add jr"
    }, React.createElement("div", {
      className: "jr-mControl-add-color jr"
    }, React.createElement(AddSeriesColorButton, {
      onClick: function onClick() {
        props.onSeriesColorAdd();
      }
    }))));
  };
};

var SeriesColorSet = createSeriesColorSet(AddSeriesColorButtonComponent, TrashBinButtonComponent, ColorControlComponent, ColorSetControlComponent);
exports.createSeriesColorSet = createSeriesColorSet;
exports.SeriesColorSet = SeriesColorSet;

});