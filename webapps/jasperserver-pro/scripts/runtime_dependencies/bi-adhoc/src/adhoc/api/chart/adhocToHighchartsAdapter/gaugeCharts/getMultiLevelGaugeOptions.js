define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Highcharts = require("highcharts");

var gaugeChartUtilities = require('./utilities');

var getUserSettings = require('./getUserSettings');

var defaultPalette = require('../palette/defaultPalette');

var fontUtils = require("runtime_dependencies/js-sdk/src/common/util/fontUtils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RATIO_HORIZONTAL_WHOLE_UNITS = 10;
var RATIO_VERTICAL_FIELDS_UNITS = 2;
var RATIO_VERTICAL_CHART_UNITS = 10; // CIRCLE_CHART_SIZE is how much available space the will the biggest circle of the chart take from the whole area for
// one chart

var CIRCLE_CHART_SIZE = 0.9; // in percents, it's 90%

var calculateSizes = function calculateSizes(options) {
  var amountOfMeasures = options.amountOfMeasures,
      chartAreaSize = options.chartAreaSize,
      containerWidth = options.containerWidth,
      containerHeight = options.containerHeight;
  var minimalContainerSideLength = Math.min(containerWidth, containerHeight); // we don't let the circle to take whole chart area, we want it be smaller to have some space
  // between one chart and the next one

  var circleDiameter = chartAreaSize.byHorizontal * CIRCLE_CHART_SIZE; // Above the chart there will be a some text (field names), so let's find it's height:

  var heightAvailableForFields = chartAreaSize.byVertical / (RATIO_VERTICAL_FIELDS_UNITS + RATIO_VERTICAL_CHART_UNITS) * RATIO_VERTICAL_FIELDS_UNITS; // also give to fields a space above the circle which we don't use because

  heightAvailableForFields = heightAvailableForFields + chartAreaSize.byHorizontal * (1 - CIRCLE_CHART_SIZE); // And we have to free that space by moving center of the chart down by half of that reserved size.
  // If it seems counter-intuitive you may draw a rectangle, find it's center, then cut some space at the top, and
  // find the center of space which left. You'll see that center was moved by half of the removed space.

  var verticalCenterOffset = heightAvailableForFields / 2; // The next line might seems weird but it's actually based on HC's code and our offsets which we give to HC.
  // Here is the logic behind how HC finds the vertical position for the title (HC calls it yTitle):
  // titleYPosition = yPositionOfTheChartCenter - smallestSideOfTheContainer / 2 + usersOffset - HC.fontBaseline(fontSize)
  //               (aka center[1] from HC source)  (aka center[2] from HC source)
  // You may ask question: why it uses the minimum side of the container ?
  // Well, you need to understand what we are hacking HC, it's logic indented to render only one chart on a plot.
  // To get proper position of the title we need to remove 'smallestSideOfTheContainer / 2' and HC.fontBaseline(fontSize)
  // form the equation by adding these values to 'usersOffset'.
  // The smallest side is available here, but the font size is unknown yet. We'll add it later once we figure out the
  // font size.
  // After all of this we'll get to the center of the chart.
  // So we need to get higher to the top of the circle. We can do this by using 'circleDiameter / 2' which is the
  // radius of the circle.
  // So, lets begin...

  var fieldVerticalOffset = minimalContainerSideLength / 2 - circleDiameter / 2; // the diameter values should be given in percents
  // and HC converts all percents to numbers by using the smallest container side, so we do the same

  var maxOuterDiameterForChart = 100 * circleDiameter / minimalContainerSideLength; // We want to have the chart which takes little space because in the center we have a text: value and measure name.
  // Because of this we need to find values for diameter for one line in gauge chart.
  // This diameter should be big enough then we have two measures and small enough when we have many measures.
  // We assume that the minimum inner diameter would be a 20 pixels wide, so:

  var minimumInnerDiameterForChartInPixels = 20; // and in percents relative to the minimal size (width or height) of the container

  var minimumInnerDiameterForChartInPercents = 100 * minimumInnerDiameterForChartInPixels / minimalContainerSideLength; // Next we set the maximum line size ('outer diameter' minus 'inner diameter') would be a 15 percent of one chart size
  // and in our tests this value showed good results.

  var maximumDiameterDecrementStep = 15; // but Highcharts library calculates percents relative to the minimal size (width or height) of the container
  // so we need to convert this value from 'one-chart' based value to 'container-based' value

  maximumDiameterDecrementStep *= circleDiameter / minimalContainerSideLength;
  var diameterDecrementStep = (maxOuterDiameterForChart - minimumInnerDiameterForChartInPercents) / amountOfMeasures; // check that our diameter decrement step is not bigger than the maximum value:

  diameterDecrementStep = Math.min(maximumDiameterDecrementStep, diameterDecrementStep);
  var sizes = {
    circleDiameter: circleDiameter,
    heightAvailableForFields: heightAvailableForFields,
    maxOuterDiameterForChart: maxOuterDiameterForChart,
    verticalCenterOffset: verticalCenterOffset,
    fieldVerticalOffset: fieldVerticalOffset,
    diameterDecrementStep: diameterDecrementStep,
    measures: [{
      outer: maxOuterDiameterForChart,
      inner: maxOuterDiameterForChart - diameterDecrementStep
    }]
  }; // starting from 1 because the size for the first measure (with index 0) was defined above

  for (var i = 1; i < amountOfMeasures; i++) {
    sizes.measures.push({
      outer: sizes.measures[i - 1].inner,
      inner: sizes.measures[i - 1].inner - diameterDecrementStep
    });
  }

  sizes.minimalInnerDiameterSize = sizes.measures[sizes.measures.length - 1].inner;
  sizes.minimalInnerDiameterSize = sizes.minimalInnerDiameterSize * minimalContainerSideLength / 100;
  return sizes;
};

var calculateFontData = function calculateFontData(options) {
  var sizes = options.sizes,
      chartsData = options.chartsData,
      extraOptions = options.extraOptions,
      chartUserSettings = options.chartUserSettings;
  var bigFontSize = 20;
  var smallFontSize = 16;
  var minimalFontSize = 2; // in pixels

  var widthAvailableForOneField = Math.floor(sizes.circleDiameter);
  var widthAvailableForValueText = Math.floor(sizes.minimalInnerDiameterSize * 0.8);
  var heightAvailableForValueText = Math.floor(sizes.minimalInnerDiameterSize * 0.3);
  var widthAvailableForMeasure = Math.floor(sizes.minimalInnerDiameterSize * 0.8);
  var heightAvailableForMeasure = Math.floor(sizes.minimalInnerDiameterSize * 0.15);
  var texts = [];
  var amountOfFieldLinesPerChart = [];

  _.each(chartsData, function (chartData) {
    var theLongestField = '';

    _.each(chartData.fieldsName, function (fieldName) {
      if (fieldName.length > theLongestField.length) {
        theLongestField = fieldName;
      }
    });

    amountOfFieldLinesPerChart.push(chartData.fieldsName.length);
    var theLongestValue = '';
    var theLongestMeasure = '';

    _.each(chartData.measures, function (measure) {
      if (measure.name.length > theLongestMeasure.length) {
        theLongestMeasure = measure.name;
      }

      if (measure.valueAsString.length > theLongestValue.length) {
        theLongestValue = measure.valueAsString;
      }
    });

    texts.push({
      field: theLongestField,
      value: theLongestValue + chartUserSettings.valueSuffix,
      measure: theLongestMeasure
    });
  });

  var maximalAmountOfFieldLines = Math.max.apply(Math, amountOfFieldLinesPerChart);
  var heightAvailableForOneField = Math.floor(sizes.heightAvailableForFields / maximalAmountOfFieldLines);
  return gaugeChartUtilities.calculateFontData({
    texts: texts,
    extraOptions: extraOptions,
    autoScaleStrategy: 'minimalFontForAll',
    fonts: {
      fieldFontSize: smallFontSize,
      valueFontSize: bigFontSize,
      measureFontSize: smallFontSize,
      minimalFontSize: minimalFontSize
    },
    constrains: {
      field: {
        width: widthAvailableForOneField,
        height: heightAvailableForOneField
      },
      value: {
        width: widthAvailableForValueText,
        height: heightAvailableForValueText
      },
      measure: {
        width: widthAvailableForMeasure,
        height: heightAvailableForMeasure
      }
    }
  });
};

var generateHighchartsConfig = function generateHighchartsConfig(options) {
  var sizes = options.sizes,
      chartsData = options.chartsData,
      fontData = options.fontData,
      chartPositions = options.chartPositions,
      extraOptions = options.extraOptions,
      chartUserSettings = options.chartUserSettings;
  var generalConfig = this.getGeneralOptions(extraOptions);
  var seriesColors = extraOptions.chartState.seriesColors || [];
  var someFontValue = 12;

  var gaugeChartConfig = _objectSpread({}, generalConfig, {
    chart: _objectSpread({}, generalConfig.chart, {
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0]
    }),
    plotOptions: {
      solidgauge: {
        dataLabels: {
          enabled: false
        },
        linecap: 'round',
        rounded: true,
        // stickyTracking is important, don't remove it
        stickyTracking: false
      }
    },
    tooltip: {
      borderWidth: 0,
      backgroundColor: 'none',
      padding: 0,
      shadow: false,
      style: {
        'fontSize': someFontValue,
        'font-weight': 'bold',
        'text-anchor': 'middle'
      },
      pointFormat: '',
      formatter: function formatter() {
        var value = this.point._jrs_valueAsString;
        var measureName = this.series.name;
        var paneIndex = this.point._jrs_paneIndex;
        var fontInfo = fontData[paneIndex || 0];
        return "<span style=\"font-size:".concat(fontInfo.measure.fontSize, "px;color:'").concat(fontInfo.measure.color, "'\">").concat(measureName, "</span><br><span style=\"font-size:").concat(fontInfo.value.fontSize, "px;color:'").concat(fontInfo.value.color, "';font-weight:'bold'\">").concat(value).concat(chartUserSettings.valueSuffix, "</span>");
      },
      positioner: function positioner(labelWidth, labelHeight, point) {
        var chartCenterX = point.plotX;
        var chartCenterY = point.plotY;
        var valueAsString = point.point._jrs_valueAsString;
        var measureName = point.point._jrs_measureName;
        var paneIndex = point.point._jrs_paneIndex;
        var fontInfo = fontData[paneIndex || 0];
        var valueFontOptions = {
          fontSize: fontInfo.value.fontSize,
          fontWeight: 'bold',
          lineHeight: 'normal',
          sizeUnits: 'px'
        };
        var valueRect = fontUtils.getTextRect(valueAsString, valueFontOptions);
        var measureFontOptions = {
          fontSize: fontInfo.measure.fontSize,
          fontWeight: 'bold',
          lineHeight: 'normal',
          sizeUnits: 'px'
        };
        var measureRect = fontUtils.getTextRect(measureName, measureFontOptions);
        var theLongest = Math.max(valueRect.width, measureRect.width);
        return {
          x: chartCenterX - (theLongest - labelWidth) / 2,
          y: chartCenterY - (someFontValue + fontUtils.getFontBaseline(fontInfo.measure.fontSize) / 2)
        };
      }
    },
    pane: [],
    yAxis: [],
    series: [],
    // The next variable is the internal AIC variable used to get proper reaction on resize events of the container.
    // Specifies how much the container can be resized (expanded / collapsed) before we need to re-draw the chart.
    // in pixels.
    resizeThreshold: 20
  });

  var paneIndex = 0;

  _.each(chartsData, function (chartData) {
    var xCenter = chartPositions[paneIndex].xCenterInPercent;
    var yCenter = chartPositions[paneIndex].yCenterInPercent;
    var fontInfo = fontData[paneIndex];
    var pane = {
      startAngle: 0,
      endAngle: 360,
      center: [xCenter + '%', yCenter + '%'],
      size: '100%',
      background: []
    }; // The next section may seem complicated. It's HC's logic, don't ask me why it works in this way :-)
    // So, sizes.fieldVerticalOffset is the offset for the fields based on an circle diameter, and it doesn't rely
    // on a font size. To find the real offset for field names we need to follow the logic which explained
    // in function calculateSizes()

    var yTitleOffset = sizes.fieldVerticalOffset + fontUtils.getFontBaseline(fontInfo.field.fontSize); // Now we need to "move" the fields to the top by the size of height which HC will add for each field line.
    // HC does this by taking font height and we need to do the same:

    yTitleOffset = yTitleOffset - fontUtils.getFontHeight(fontInfo.field.fontSize) * chartData.fieldsName.length; // and not just round the value

    yTitleOffset = Math.round(yTitleOffset);
    var yAxis = {
      pane: paneIndex,
      min: chartUserSettings.minValue,
      max: chartUserSettings.maxValue,
      minorTickLength: 0,
      minorTickInterval: 0,
      minorTickWidth: 0,
      lineWidth: 0,
      tickPositions: [chartUserSettings.minValue, chartUserSettings.maxValue],
      labels: {
        enabled: false
      },
      tickLength: 0,
      tickWidth: 0,
      tickPixelInterval: 0,
      title: {
        useHTML: false,
        align: 'high',
        textAlign: 'center',
        y: yTitleOffset,
        text: chartData.fieldsName.join('<br>'),
        style: {
          color: fontInfo.field.color,
          'text-align': 'center',
          'font-size': fontInfo.field.fontSize + 'px'
        }
      }
    };

    _.each(chartData.measures, function (measure, index) {
      var defaultColor = gaugeChartUtilities.getColorFromArray(index, defaultPalette.colors);
      var backgroundColor = seriesColors[index] ? '#f2f2f2' : Highcharts.Color(defaultColor).setOpacity(0.3).get();
      var color = seriesColors[index] || defaultColor;
      pane.background.push({
        backgroundColor: backgroundColor,
        borderWidth: 0,
        outerRadius: sizes.measures[index].outer + "%",
        innerRadius: sizes.measures[index].inner + "%"
      });
      gaugeChartConfig.series.push({
        name: measure.name,
        yAxis: paneIndex,
        data: [{
          _jrs_paneIndex: paneIndex,
          _jrs_measureName: measure.name,
          _jrs_valueAsString: measure.valueAsString,
          color: color,
          radius: sizes.measures[index].outer + '%',
          innerRadius: sizes.measures[index].inner + "%",
          y: measure.value
        }],
        columnsOutputParams: measure.outputParameters
      });
    });

    gaugeChartConfig.pane.push(pane);
    gaugeChartConfig.yAxis.push(yAxis);
    paneIndex++;
  });

  return gaugeChartConfig;
};

var getMultiLevelGaugeOptions = function getMultiLevelGaugeOptions(rowAxisLeafArray, columnAxisLeafArray, rowSlider, columnSlider, extraOptions) {
  var amountOfMeasures = extraOptions.metadata.measures.length;
  var containerWidth = extraOptions.width;
  var containerHeight = extraOptions.height;
  var chartUserSettings = getUserSettings(extraOptions);
  var chartsData = gaugeChartUtilities.groupDataByCharts.call(this, rowAxisLeafArray, columnAxisLeafArray, columnSlider, extraOptions, chartUserSettings);

  var amountOfCharts = _.keys(chartsData).length;

  var chartAreaSize = gaugeChartUtilities.getChartAreaSize({
    aspectRation: RATIO_HORIZONTAL_WHOLE_UNITS / (RATIO_VERTICAL_FIELDS_UNITS + RATIO_VERTICAL_CHART_UNITS),
    amountOfCharts: amountOfCharts,
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    chartUserSettings: chartUserSettings
  });
  var sizes = calculateSizes({
    amountOfMeasures: amountOfMeasures,
    chartAreaSize: chartAreaSize,
    containerWidth: containerWidth,
    containerHeight: containerHeight
  });
  var fontData = calculateFontData({
    sizes: sizes,
    chartAreaSize: chartAreaSize,
    chartsData: chartsData,
    extraOptions: extraOptions,
    chartUserSettings: chartUserSettings
  });
  var chartPositions = gaugeChartUtilities.getMultiLevelGaugeChartPositions({
    sizes: sizes,
    amountOfCharts: amountOfCharts,
    chartAreaSize: chartAreaSize,
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    chartUserSettings: chartUserSettings
  });
  return generateHighchartsConfig.call(this, {
    sizes: sizes,
    chartsData: chartsData,
    fontData: fontData,
    chartAreaSize: chartAreaSize,
    chartPositions: chartPositions,
    extraOptions: extraOptions,
    chartUserSettings: chartUserSettings
  });
};

module.exports = getMultiLevelGaugeOptions;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});