define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var _runtime_dependenciesJsSdkSrcCommonComponentColorPickerReactColorSelector = require("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/ColorSelector");

var ColorSelectorComponent = _runtime_dependenciesJsSdkSrcCommonComponentColorPickerReactColorSelector.ColorSelector;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var createColorControl = function createColorControl(ColorSelector) {
  return function ColorControl(props) {
    var control = '';
    var inline = '';
    var showTransparentPreset = typeof props.showTransparentPreset === 'undefined' ? true : props.showTransparentPreset;

    if (typeof props.isControl === 'undefined' || props.isControl) {
      control = 'control';
    }

    if (typeof props.isInlineControl === 'undefined' || props.isInlineControl) {
      inline = 'jr-mControlInline';
    }

    return React.createElement("div", {
      className: "".concat(control, " jr-mControl jr-mControlColor ").concat(inline, " jr")
    }, React.createElement("label", {
      className: "jr-mControl-label jr"
    }, props.label), React.createElement(ColorSelector, {
      label: props.colorLabel ? props.colorLabel : props.color,
      color: props.color,
      showTransparentPreset: showTransparentPreset,
      onColorChange: props.onColorChange
    }), props.children);
  };
};

var ColorControl = createColorControl(ColorSelectorComponent);
exports.createColorControl = createColorControl;
exports.ColorControl = ColorControl;

});