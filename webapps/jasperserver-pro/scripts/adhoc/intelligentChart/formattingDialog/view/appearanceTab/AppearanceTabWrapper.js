define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var ReactDOM = require('react-dom');

var defaultPalette = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter/palette/defaultPalette");

var Colors = require("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/enum/colors");

var colorConvertUtil = require("runtime_dependencies/js-sdk/src/common/component/colorPicker/util/colorConvertUtil");

var _AppearanceTab = require('./AppearanceTab');

var AppearanceTab = _AppearanceTab.AppearanceTab;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var convertPlotBackgroundColorToRGBAIfTransparent = function convertPlotBackgroundColorToRGBAIfTransparent(color) {
  if (color === Colors.TRANSPARENT) {
    return 'rgba(0,0,0,0)';
  }

  return color;
};

var convertPlotBackgroundColorToTransparentIfRGBA = function convertPlotBackgroundColorToTransparentIfRGBA(color) {
  if (colorConvertUtil.isRgbTransparent(color)) {
    return Colors.TRANSPARENT;
  }

  return color;
};

var AppearanceTabWrapper =
/*#__PURE__*/
function () {
  function AppearanceTabWrapper(element, options) {
    _classCallCheck(this, AppearanceTabWrapper);

    _defineProperty(this, "element", void 0);

    _defineProperty(this, "state", void 0);

    _defineProperty(this, "AppearanceTab", void 0);

    this.element = element;
    this.state = {
      seriesColors: [].concat(options.seriesColors),
      showDataPoints: options.showDataPoints,
      showScatterLine: options.showScatterLine,
      chartBackgroundColor: options.chartBackgroundColor,
      onChartBackgroundColorChange: this.onChartBackgroundColorChange.bind(this),
      plotBackgroundColor: convertPlotBackgroundColorToTransparentIfRGBA(options.plotBackgroundColor),
      onPlotBackgroundColorChange: this.onPlotBackgroundColorChange.bind(this),
      onSeriesColorAdd: this.onSeriesColorAdd.bind(this),
      onSeriesColorDelete: this.onSeriesColorDelete.bind(this),
      onSeriesColorChange: this.onSeriesColorChange.bind(this),
      onShowScatterLineChange: this.onShowScatterLineChange.bind(this),
      onShowDataPointsChange: this.onShowDataPointsChange.bind(this),
      gaugesLayout: options.gaugesLayout,
      gaugesLayoutOptions: options.gaugesLayoutOptions,
      onGaugesLayoutChange: this.onGaugesLayoutChange.bind(this),
      gaugesMinValue: options.gaugesMinValue,
      onGaugesMinValueChange: this.onGaugesMinValueChange.bind(this),
      gaugesMaxValue: options.gaugesMaxValue,
      onGaugesMaxValueChange: this.onGaugesMaxValueChange.bind(this),
      gaugesDecimalPlaces: options.gaugesDecimalPlaces,
      onGaugesDecimalPlacesChange: this.onGaugesDecimalPlacesChange.bind(this),
      gaugesSuffixLabel: options.gaugesSuffixLabel,
      onGaugesSuffixLabelChange: this.onGaugesSuffixLabelChange.bind(this),
      gaugeStopColor1Value: options.gaugeStopColor1Value,
      gaugeStopColor2Value: options.gaugeStopColor2Value,
      gaugeStopColor3Value: options.gaugeStopColor3Value,
      gaugeStopColor4Value: options.gaugeStopColor4Value,
      gaugeStopColor1Color: options.gaugeStopColor1Color,
      gaugeStopColor2Color: options.gaugeStopColor2Color,
      gaugeStopColor3Color: options.gaugeStopColor3Color,
      gaugeStopColor4Color: options.gaugeStopColor4Color,
      onGaugeStopColorValueChange: this.onGaugeStopColorValueChange.bind(this),
      onGaugeStopColorColorChange: this.onGaugeStopColorColorChange.bind(this)
    };
    this.AppearanceTab = options.AppearanceTab || AppearanceTab;
    this.renderTab(this.state);
  }

  _createClass(AppearanceTabWrapper, [{
    key: "onShowScatterLineChange",
    value: function onShowScatterLineChange() {
      this.state.showScatterLine = !this.state.showScatterLine;
    }
  }, {
    key: "onShowDataPointsChange",
    value: function onShowDataPointsChange() {
      this.state.showDataPoints = !this.state.showDataPoints;
    }
  }, {
    key: "onGaugesLayoutChange",
    value: function onGaugesLayoutChange(event) {
      this.state.gaugesLayout = event.target.value;
      this.renderTab(this.state);
    }
  }, {
    key: "onGaugesMinValueChange",
    value: function onGaugesMinValueChange(event) {
      this.state.gaugesMinValue = event.target.value;
      this.renderTab(this.state);
    }
  }, {
    key: "onGaugesMaxValueChange",
    value: function onGaugesMaxValueChange(event) {
      this.state.gaugesMaxValue = event.target.value;
      this.renderTab(this.state);
    }
  }, {
    key: "onGaugesDecimalPlacesChange",
    value: function onGaugesDecimalPlacesChange(event) {
      this.state.gaugesDecimalPlaces = event.target.value;
      this.renderTab(this.state);
    }
  }, {
    key: "onGaugesSuffixLabelChange",
    value: function onGaugesSuffixLabelChange(event) {
      this.state.gaugesSuffixLabel = event.target.value;
      this.renderTab(this.state);
    }
  }, {
    key: "onGaugeStopColorValueChange",
    value: function onGaugeStopColorValueChange(index, event) {
      // @ts-ignore
      this.state["gaugeStopColor".concat(index, "Value")] = event.target.value;
      this.renderTab(this.state);
    }
  }, {
    key: "onGaugeStopColorColorChange",
    value: function onGaugeStopColorColorChange(index, color) {
      // @ts-ignore
      this.state["gaugeStopColor".concat(index, "Color")] = color.hex;
      this.renderTab(this.state);
    }
  }, {
    key: "onSeriesColorAdd",
    value: function onSeriesColorAdd() {
      var newColorIndex = this.state.seriesColors.length;
      this.state.seriesColors.push(defaultPalette.colors[newColorIndex % defaultPalette.colors.length]);
      this.renderTab(this.state);
    }
  }, {
    key: "onSeriesColorDelete",
    value: function onSeriesColorDelete(index) {
      this.state.seriesColors = this.state.seriesColors.filter(function (color, i) {
        return i !== index;
      });
      this.renderTab(this.state);
    }
  }, {
    key: "onChartBackgroundColorChange",
    value: function onChartBackgroundColorChange(color) {
      this.state.chartBackgroundColor = color.hex;
      this.renderTab(this.state);
    }
  }, {
    key: "onPlotBackgroundColorChange",
    value: function onPlotBackgroundColorChange(color) {
      this.state.plotBackgroundColor = color.hex;
      this.renderTab(this.state);
    }
  }, {
    key: "onSeriesColorChange",
    value: function onSeriesColorChange(color, index) {
      this.state.seriesColors[index] = color.hex;
      this.renderTab(this.state);
    }
  }, {
    key: "renderTab",
    value: function renderTab(state) {
      ReactDOM.render(React.createElement(this.AppearanceTab, state), this.element);
    }
  }, {
    key: "getState",
    value: function getState() {
      return {
        seriesColors: this.state.seriesColors,
        showScatterLine: this.state.showScatterLine,
        showDataPoints: this.state.showDataPoints,
        chartBackgroundColor: this.state.chartBackgroundColor,
        plotBackgroundColor: convertPlotBackgroundColorToRGBAIfTransparent(this.state.plotBackgroundColor),
        gaugesLayout: this.state.gaugesLayout,
        gaugesMinValue: this.state.gaugesMinValue,
        gaugesMaxValue: this.state.gaugesMaxValue,
        gaugesDecimalPlaces: this.state.gaugesDecimalPlaces,
        gaugesSuffixLabel: this.state.gaugesSuffixLabel,
        gaugeStopColor1Value: this.state.gaugeStopColor1Value,
        gaugeStopColor2Value: this.state.gaugeStopColor2Value,
        gaugeStopColor3Value: this.state.gaugeStopColor3Value,
        gaugeStopColor4Value: this.state.gaugeStopColor4Value,
        gaugeStopColor1Color: this.state.gaugeStopColor1Color,
        gaugeStopColor2Color: this.state.gaugeStopColor2Color,
        gaugeStopColor3Color: this.state.gaugeStopColor3Color,
        gaugeStopColor4Color: this.state.gaugeStopColor4Color
      };
    }
  }, {
    key: "remove",
    value: function remove() {
      ReactDOM.unmountComponentAtNode(this.element);
    }
  }]);

  return AppearanceTabWrapper;
}();

module.exports = AppearanceTabWrapper;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});