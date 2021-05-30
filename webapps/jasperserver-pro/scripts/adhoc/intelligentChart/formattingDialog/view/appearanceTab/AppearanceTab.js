define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var React = require('react');

var _runtime_dependenciesJsSdkSrcCommonComponentColorPickerReactColorSelector = require("runtime_dependencies/js-sdk/src/common/component/colorPicker/react/ColorSelector");

var ColorSelectorComponent = _runtime_dependenciesJsSdkSrcCommonComponentColorPickerReactColorSelector.ColorSelector;

var _componentsAddSeriesColorButton = require('./components/AddSeriesColorButton');

var AddSeriesColorButtonComponent = _componentsAddSeriesColorButton.AddSeriesColorButton;

var _componentsSeriesColorSet = require('./components/SeriesColorSet');

var SeriesColorSetComponent = _componentsSeriesColorSet.SeriesColorSet;

var _componentsBaseGroup = require('./components/base/Group');

var GroupComponent = _componentsBaseGroup.Group;

var _componentsBaseControlCheckbox = require('./components/base/ControlCheckbox');

var ControlCheckboxComponent = _componentsBaseControlCheckbox.ControlCheckbox;

var _componentsBaseSelectControl = require('./components/base/SelectControl');

var SelectControlComponent = _componentsBaseSelectControl.SelectControl;

var _componentsBaseInputControl = require('./components/base/InputControl');

var InputControlComponent = _componentsBaseInputControl.InputControl;

var _componentsBaseColorControl = require('./components/base/ColorControl');

var ColorControlComponent = _componentsBaseColorControl.ColorControl;

var _componentsBaseColorSetControl = require('./components/base/ColorSetControl');

var ColorSetControlComponent = _componentsBaseColorSetControl.ColorSetControl;

var Spacer = require('./components/base/Spacer');

var getColorLabel = require('./util/getColorLabel');

var gaugeValidators = require('./util/validators');

var i18n = require("bundle!adhoc_messages");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// @ts-ignore
var lineAndAreaLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GROUP_NAME_LINE_AND_AREA';
var scatterAndBubbleLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GROUP_NAME_SCATTER_AND_BUBBLE';
var showScatterLineLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_SHOW_SCATTER_LINE';
var showDataPointsLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_SHOW_DATA_POINTS';
var seriesColorsLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_SERIES_COLORS';
var backgroundColorsLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_BACKGROUND_COLORS';
var chartLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_CHART';
var plotLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_PLOT';
var gaugesLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GROUP_GAUGES';
var gaugesLayoutLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GAUGES_LAYOUT';
var gaugesMinValueLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GAUGES_MIN_VALUE';
var gaugesMaxValueLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GAUGES_MAX_VALUE';
var gaugesDecimalPlacesLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GAUGES_DECIMAL_PLACES';
var gaugesSuffixLabel = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_GAUGES_SUFFIX_LABEL';
var colorStops1Label = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_COLOR_STOPS_1';
var colorStops2Label = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_COLOR_STOPS_2';
var colorStops3Label = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_COLOR_STOPS_3';
var colorStops4Label = 'ADH_1214_ICHARTS_CHART_FORMAT_DIALOG_COLOR_STOPS_4';

var createAppearanceTab = function createAppearanceTab(AddSeriesColorButton, SeriesColorSet, ColorSelector, Group, ControlCheckbox, SelectControl, InputControl, ColorControl, ColorSetControl) {
  return function AppearanceTab(props) {
    var SeriesColorGroupContent;

    var onGaugeStopColor1ValueChange = function onGaugeStopColor1ValueChange(e) {
      props.onGaugeStopColorValueChange(1, e);
    },
        onGaugeStopColor2ValueChange = function onGaugeStopColor2ValueChange(e) {
      props.onGaugeStopColorValueChange(2, e);
    },
        onGaugeStopColor3ValueChange = function onGaugeStopColor3ValueChange(e) {
      props.onGaugeStopColorValueChange(3, e);
    },
        onGaugeStopColor4ValueChange = function onGaugeStopColor4ValueChange(e) {
      props.onGaugeStopColorValueChange(4, e);
    },
        onGaugeStopColor1ColorChange = function onGaugeStopColor1ColorChange(color) {
      props.onGaugeStopColorColorChange(1, color);
    },
        onGaugeStopColor2ColorChange = function onGaugeStopColor2ColorChange(color) {
      props.onGaugeStopColorColorChange(2, color);
    },
        onGaugeStopColor3ColorChange = function onGaugeStopColor3ColorChange(color) {
      props.onGaugeStopColorColorChange(3, color);
    },
        onGaugeStopColor4ColorChange = function onGaugeStopColor4ColorChange(color) {
      props.onGaugeStopColorColorChange(4, color);
    };

    if (props.seriesColors.length > 0) {
      SeriesColorGroupContent = React.createElement(SeriesColorSet, {
        colors: props.seriesColors,
        onSeriesColorAdd: props.onSeriesColorAdd,
        onSeriesColorDelete: props.onSeriesColorDelete,
        onSeriesColorChange: props.onSeriesColorChange
      });
    } else {
      SeriesColorGroupContent = React.createElement(AddSeriesColorButton, {
        onClick: function onClick() {
          return props.onSeriesColorAdd();
        }
      });
    }

    var validationErrors = gaugeValidators.validateGaugesProps(props);
    var warnings = [];
    validationErrors.forEach(function (value, key) {
      // eslint-disable-next-line react/no-array-index-key
      warnings.push(React.createElement("span", {
        key: key,
        className: "message warning"
      }, value));
    });
    return React.createElement(React.Fragment, null, React.createElement(Group, {
      name: i18n[seriesColorsLabel]
    }, SeriesColorGroupContent), React.createElement(Group, {
      name: i18n[backgroundColorsLabel]
    }, React.createElement(ColorSetControl, null, React.createElement(ColorControl, {
      label: "".concat(i18n[chartLabel], ":"),
      isControl: true,
      isInlineControl: false,
      color: props.chartBackgroundColor,
      colorLabel: getColorLabel(props.chartBackgroundColor),
      showTransparentPreset: false,
      onColorChange: props.onChartBackgroundColorChange
    }), React.createElement(Spacer, null), React.createElement(ColorControl, {
      label: "".concat(i18n[plotLabel], ":"),
      isControl: true,
      isInlineControl: false,
      color: props.plotBackgroundColor,
      colorLabel: getColorLabel(props.plotBackgroundColor),
      onColorChange: props.onPlotBackgroundColorChange
    }))), React.createElement(Group, {
      name: i18n[lineAndAreaLabel]
    }, React.createElement(ControlCheckbox, {
      id: "showDataPoints",
      label: i18n[showDataPointsLabel],
      defaultChecked: props.showDataPoints,
      onChange: props.onShowDataPointsChange
    })), React.createElement(Group, {
      name: i18n[scatterAndBubbleLabel]
    }, React.createElement(ControlCheckbox, {
      id: "showScatterLine",
      label: i18n[showScatterLineLabel],
      defaultChecked: props.showScatterLine,
      onChange: props.onShowScatterLineChange
    })), React.createElement("div", {
      className: "group gaugesSection"
    }, React.createElement("div", {
      className: "groupName"
    }, i18n[gaugesLabel]), React.createElement(SelectControl, {
      label: i18n[gaugesLayoutLabel],
      "class": "gaugesLayout",
      options: props.gaugesLayoutOptions,
      selectedValue: props.gaugesLayout,
      onChange: props.onGaugesLayoutChange
    }), React.createElement("div", {
      className: "jr-mGrid jr"
    }, React.createElement("div", {
      className: "jr-mGrid-column jr"
    }, React.createElement(InputControl, {
      label: i18n[gaugesMinValueLabel],
      "class": "minValue",
      value: props.gaugesMinValue,
      onChange: props.onGaugesMinValueChange
    })), React.createElement("div", {
      className: "jr-mGrid-column jr"
    }, React.createElement(InputControl, {
      label: i18n[gaugesMaxValueLabel],
      "class": "maxValue",
      value: props.gaugesMaxValue,
      onChange: props.onGaugesMaxValueChange
    }))), React.createElement("div", {
      className: "jr-mGrid jr"
    }, React.createElement("div", {
      className: "jr-mGrid-column jr"
    }, React.createElement(InputControl, {
      label: i18n[gaugesDecimalPlacesLabel],
      "class": "decimalPlaces",
      value: props.gaugesDecimalPlaces,
      onChange: props.onGaugesDecimalPlacesChange
    })), React.createElement("div", {
      className: "jr-mGrid-column jr"
    }, React.createElement(InputControl, {
      label: i18n[gaugesSuffixLabel],
      "class": "suffix",
      value: props.gaugesSuffixLabel,
      onChange: props.onGaugesSuffixLabelChange
    }))), React.createElement("div", {
      className: "control"
    }, React.createElement(ColorControl, {
      label: "".concat(i18n[colorStops1Label], ":"),
      isControl: false,
      isInlineControl: true,
      color: props.gaugeStopColor1Color,
      colorLabel: getColorLabel(props.gaugeStopColor1Color),
      showTransparentPreset: false,
      onColorChange: onGaugeStopColor1ColorChange
    }, React.createElement("div", {
      className: "jr-mInput jr-uLeft-single jr"
    }, React.createElement("input", {
      type: "text",
      className: "jr jr-mInput-text",
      value: props.gaugeStopColor1Value,
      onChange: onGaugeStopColor1ValueChange
    })))), React.createElement("div", {
      className: "control"
    }, React.createElement(ColorControl, {
      label: "".concat(i18n[colorStops2Label], ":"),
      isControl: false,
      isInlineControl: true,
      color: props.gaugeStopColor2Color,
      colorLabel: getColorLabel(props.gaugeStopColor2Color),
      showTransparentPreset: false,
      onColorChange: onGaugeStopColor2ColorChange
    }, React.createElement("div", {
      className: "jr-mInput jr-uLeft-single jr"
    }, React.createElement("input", {
      type: "text",
      className: "jr jr-mInput-text",
      value: props.gaugeStopColor2Value,
      onChange: onGaugeStopColor2ValueChange
    })))), React.createElement("div", {
      className: "control"
    }, React.createElement(ColorControl, {
      label: "".concat(i18n[colorStops3Label], ":"),
      isControl: false,
      isInlineControl: true,
      color: props.gaugeStopColor3Color,
      colorLabel: getColorLabel(props.gaugeStopColor3Color),
      showTransparentPreset: false,
      onColorChange: onGaugeStopColor3ColorChange
    }, React.createElement("div", {
      className: "jr-mInput jr-uLeft-single jr"
    }, React.createElement("input", {
      type: "text",
      className: "jr jr-mInput-text",
      value: props.gaugeStopColor3Value,
      onChange: onGaugeStopColor3ValueChange
    })))), React.createElement("div", {
      className: "control"
    }, React.createElement(ColorControl, {
      label: "".concat(i18n[colorStops4Label], ":"),
      isControl: false,
      isInlineControl: true,
      color: props.gaugeStopColor4Color,
      colorLabel: getColorLabel(props.gaugeStopColor4Color),
      showTransparentPreset: false,
      onColorChange: onGaugeStopColor4ColorChange
    }, React.createElement("div", {
      className: "jr-mInput jr-uLeft-single jr"
    }, React.createElement("input", {
      type: "text",
      className: "jr jr-mInput-text",
      value: props.gaugeStopColor4Value,
      onChange: onGaugeStopColor4ValueChange
    })))), React.createElement("div", {
      className: "error gaugesErrors"
    }, warnings)));
  };
};

var AppearanceTab = createAppearanceTab(AddSeriesColorButtonComponent, SeriesColorSetComponent, ColorSelectorComponent, GroupComponent, ControlCheckboxComponent, SelectControlComponent, InputControlComponent, ColorControlComponent, ColorSetControlComponent);
exports.createAppearanceTab = createAppearanceTab;
exports.AppearanceTab = AppearanceTab;

});