define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var gaugeChartUtilities = require('./utilities');

var getUserSettings = require('./getUserSettings');

var defaultPalette = require('../palette/defaultPalette');

var fontUtils = require("runtime_dependencies/js-sdk/src/common/util/fontUtils");

var browserDetection = require("runtime_dependencies/js-sdk/src/common/util/browserDetection");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var RATIO_HORIZONTAL_WHOLE_UNITS = 10;
var RATIO_VERTICAL_FIELDS_UNITS = 2;
var RATIO_VERTICAL_CHART_UNITS = 5; // ARC_CHART_SIZE is how much available space the will the arc of the chart take from the whole area for one chart

var ARC_CHART_SIZE = 0.90; // in percents, it's 90%
// this variable specifies how thick the arc would be compared to the area for one chart

var ARC_CHART_GAGE = 0.30; // in percents, it's 30%

var calculateSizes = function calculateSizes(options) {
  var chartAreaSize = options.chartAreaSize,
      containerWidth = options.containerWidth,
      containerHeight = options.containerHeight;
  var minimalContainerSideLength = Math.min(containerWidth, containerHeight); // we don't let the arc to take whole chart area, we want it be smaller to have some space
  // between one chart and the next one

  var arcDiameter = chartAreaSize.byHorizontal * ARC_CHART_SIZE; // Above the chart there will be a some text (field names), so let's find it's height:

  var heightAvailableForFields = chartAreaSize.byVertical / (RATIO_VERTICAL_FIELDS_UNITS + RATIO_VERTICAL_CHART_UNITS) * RATIO_VERTICAL_FIELDS_UNITS; //           Very important notes, please, read it carefully to understand how the arc
  //                            chart works and how to modify it:
  //
  // We'd like to move the center of the arc chart down because HC doesn't distinguish between arc and circle
  // so when we say to HC 'draw an arc' it doesn't move down the arc for 25% (because the size of arc is a 50% of the
  // full circle, and to move center of the something you need a half of this something's size, i.e. 50% / 2) of its
  // size and below the arc remains a lot of empty space (because the lower part of the full circle wasn't drew).
  // The 'arcDiameter / 4' is exactly these 25%.
  // And this is the reason why have the chart ratio not '1/1' but close to '10 / 5', because we draw half
  // of full circle.
  // But having '10 / 5' is not enough for us because we'd like to have some text (field names) above the arc.
  // And this is how the ratio '10 / 7' appears: we add 2 units of the horizontal width to the height.
  // So 2 units from 10 of the width of the chart area is the height of the room for the labels.
  // And then we are dealing with the question: how much we'd like to move the center of the arc chart to give
  // this room to labels we need to divide that room by half.
  // If it seems counter-intuitive you may draw a rectangle, find it's center, then cut some space at the top, and
  // find the center of space which left. You'll see that center was moved by half of the removed space.

  var verticalCenterOffset = heightAvailableForFields / 2 + arcDiameter / 4; // The next line might seems weird but it's actually based on HC's code and our offsets which we give to HC.
  // Here is the logic behind how HC finds the vertical position for the title (HC calls it yTitle):
  // titleYPosition = yPositionOfTheChartCenter - smallestSideOfTheContainer / 2 + usersOffset - HC.fontBaseline(fontSize)
  //               (aka center[1] from HC source)  (aka center[2] from HC source)
  // You may ask question: why it uses the minimum side of the container ?
  // Well, you need to understand what we are hacking HC, it's logic indented to render only one chart on a plot.
  // To get proper position of the title we need to remove 'smallestSideOfTheContainer / 2' and HC.fontBaseline(fontSize)
  // form the equation by adding these values to 'usersOffset'.
  // The smallest side is available here, but the font size is unknown yet. We'll add it later once we figure out the
  // font size.
  // After all of this we'll get to the center of the chart, which in case of arc char is the bottom of the arc.
  // So we need to get higher to the top of the arc. We can do this by using 'arcDiameter / 2' which is the
  // radius of the arc.

  var fieldVerticalOffset = minimalContainerSideLength / 2 - arcDiameter / 2; // the radius values given in percents
  // We are taking the horizontal size because we'd like the chart take whole 'chart area' by the chart
  // and HC converts all percents to numbers by using smallest container side

  var outerRadius = 100 * arcDiameter / minimalContainerSideLength; // the inner radius is smaller:

  var innerRadius = outerRadius * (1 - ARC_CHART_GAGE);
  return {
    arcDiameter: arcDiameter,
    heightAvailableForFields: heightAvailableForFields,
    verticalCenterOffset: verticalCenterOffset,
    fieldVerticalOffset: fieldVerticalOffset,
    outerRadius: outerRadius,
    innerRadius: innerRadius
  };
};

var calculateFontData = function calculateFontData(options) {
  var sizes = options.sizes,
      chartsData = options.chartsData,
      extraOptions = options.extraOptions,
      chartUserSettings = options.chartUserSettings;
  var bigFontSize = 16;
  var smallFontSize = 14;
  var minimalFontSize = 2; // in pixels

  var widthAvailableForOneField = Math.floor(sizes.arcDiameter);
  var widthAvailableForValueText = Math.floor(sizes.arcDiameter * (1 - ARC_CHART_GAGE - 0.3));
  var heightAvailableForValueText = Math.floor(sizes.arcDiameter * 0.3);
  var widthAvailableForMeasure = Math.floor(sizes.arcDiameter * (1 - ARC_CHART_GAGE - 0.2));
  var heightAvailableForMeasure = Math.floor(sizes.arcDiameter * 0.15);
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
    texts.push({
      field: theLongestField,
      value: chartData.valueAsString + chartUserSettings.valueSuffix,
      measure: chartData.measureName
    });
  });

  var maximalAmountOfFieldLines = Math.max.apply(Math, amountOfFieldLinesPerChart);
  var heightAvailableForOneField = Math.floor(sizes.heightAvailableForFields / maximalAmountOfFieldLines);
  var fontData = gaugeChartUtilities.calculateFontData({
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
  }); // Now, we need to find out the vertical offset for Value and Measure texts.
  // By default HC renders them incorrectly, it might be changed with new HC versions, but for now we need to patch
  // the position.
  // If you ever encounter some issue with positioning and you'd like to debug, you may use the HC debug patch from
  // https://jira.tibco.com/browse/JS-36758
  // Just try to apply it to HC source code and the rest would be easy.
  // How HC renders these labels ? Well, it creates the <g> element, inside of it a <text> element
  // and there it creates two <tspan>, one for Value and second for Measure.
  // Next, it takes the font size of <text> (yes, you read it right, from <text>), calculates the font base line and
  // assigns this value to a 'y' attribute of the first <tspan>.
  // Next, it takes the font size of the second <tspan>, calculates a font line height and assigns this value to
  // the a 'dy' attribute of the second <tspan>.
  // By this HC avoid text overlapping because by default SVG 'renders' all elements in 0,0 position.
  // Next, HC need to position this <text> element with two <tspan> inside a corresponding arc gauge, and it done by
  // taking the arc center point which is placed on the bottom line of the arc. Yes, on the bottom line because
  // 'arc gauge' is a common 'gauge' chart but just truncated by half, but it doesn't matter to HC, the center remains
  // the same.
  // Next it asks the browser what size of the <text> element. And you may be surprised by that size the browser
  // returns because... just check it out and compare to the font size of Value and Measure. Sometimes its height
  // it bigger than the sum on font size of Value and Measure, sometimes it's smaller. There is the reason behind
  // this: different font metrics. Not each user has all fonts installed and sometimes we use quite weird fonts,
  // like the 'Lucida Sans Unicode' for instance.
  // Check out next link to get it better: https://iamvdo.me/en/blog/css-font-metrics-line-height-and-vertical-align
  // So, by having the center point of arc and height of the <text> element HC can finally position the Value and
  // Measure above the arc. the formula is simple:
  //      <g>_y_translate = CenterPoint_y_position - TextElement_height
  // As you see <g> element is moved by translate() command.
  // As I mentioned above, the size of the <text> returned by browser may be bigger or smaller the actual size, and
  // the Value and Measure may get wrong vertical position.
  // To fix it we calculate the same size of the <text> by calling getSVGTextRect() method and passing to it the same
  // font specifications and text, and calculate the correct vertical offset which would be ideal.
  // All the code which does it goes below.
  // The only exception is a browser support of <text> node: the FireFox, IE11 and Ege does not support getting font
  // size assigned to style attribute:
  // textNode.style.fontSize would return '50px' in Chrome and empty string in rest browsers.
  // So, the HC code assumes the font size of 12px which is a fallback.
  // I think HC would fix this error later and if you notice that after HC update the Firefox renders Value and
  // Measure in a wrong position then check: either FF added support or HC fixed its code.

  _.each(chartsData, function (chartData, paneIndex) {
    var fontInfo = fontData[paneIndex];
    var _texts$paneIndex = texts[paneIndex],
        value = _texts$paneIndex.value,
        measure = _texts$paneIndex.measure; // we mimic the same action which HC does (read the text above to understand why it happens)

    var valueVerticalOffset = fontUtils.getFontBaseline(fontInfo.value.fontSize);

    if (browserDetection.isFirefox() || browserDetection.isIE11() || browserDetection.isEdge()) {
      // and this is a fallback
      valueVerticalOffset = 12;
    }

    var linesInTextNode = [{
      text: value,
      fontSize: fontInfo.value.fontSize,
      sizeUnits: 'px',
      fontWeight: 'bold',
      lineHeight: 'normal',
      y: valueVerticalOffset
    }];

    if (chartData.measureName) {
      linesInTextNode.push({
        text: measure,
        fontSize: fontInfo.measure.fontSize,
        sizeUnits: 'px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        y: fontUtils.getFontHeight(fontInfo.measure.fontSize)
      });
    }

    var correctOffset = 0;

    _.each(linesInTextNode, function (line) {
      correctOffset += line.y;
    });

    correctOffset = Math.round(correctOffset);
    var textRect = fontUtils.getSVGTextRect(linesInTextNode); // 'measureAndValueYOffset' is our offset to Value and Measure which Hc would take into account.
    // In the formula listen above we'd like to ger rid of 'TextElement_height' and replace it with correct offset.
    // The actual formula is:
    //     <g>_y_translate = CenterPoint_y_position - TextElement_height + correctionFromUser
    // Of course, -1 must be applied because HC adds our correction.
    // So in the final we'd have next:
    //     <g>_y_translate = CenterPoint_y_position - correctOffset
    // You may wonder why the 'correctOffset' is based on getFontBaseline() and getFontHeight().
    // Well, it's because they are applied to <tspan> elements and if you try to set them to 0 you'll see how
    // the Value and Measure would be rendered just on the top line of <text> boundary. This is how SVG works.
    // And I just don't mind to use the offsets given to <tspan> elements by HC.

    fontInfo.measureAndValueYOffset = -1 * (correctOffset - textRect.height);
  });

  return fontData;
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

  var gaugeChartConfig = _objectSpread({}, generalConfig, {
    chart: _objectSpread({}, generalConfig.chart, {
      margin: [0, 0, 0, 0],
      spacing: [0, 0, 0, 0]
    }),
    plotOptions: {
      solidgauge: {
        // stickyTracking is important, don't remove it
        stickyTracking: false
      }
    },
    tooltip: {
      enabled: false
    },
    pane: [],
    xAxis: [],
    yAxis: [],
    series: [],
    // The next variable is the internal AIC variable used to get proper reaction on resize events of the container.
    // Specifies how much the container can be resized (expanded / collapsed) before we need to re-draw the chart.
    // in pixels.
    resizeThreshold: 20
  });

  _.each(chartsData, function (chartData, paneIndex) {
    var xCenter = chartPositions[paneIndex].xCenterInPercent;
    var yCenter = chartPositions[paneIndex].yCenterInPercent;
    var fontInfo = fontData[paneIndex];
    gaugeChartConfig.pane.push({
      size: '100%',
      startAngle: -90,
      endAngle: 90,
      background: {
        backgroundColor: '#eeeeee',
        borderWidth: 0,
        shape: 'arc',
        innerRadius: sizes.innerRadius + "%",
        outerRadius: sizes.outerRadius + "%"
      },
      center: [xCenter + '%', yCenter + '%']
    });
    gaugeChartConfig.xAxis.push({
      pane: paneIndex
    }); // The next section may seem complicated. It's HC's logic, don't ask me why it works in this way :-)
    // So, sizes.fieldVerticalOffset is the offset for the fields based on an arc diameter, and it doesn't rely
    // on a font size. To find the real offset for field names we need to follow the logic which explained
    // in function calculateSizes()

    var yTitleOffset = sizes.fieldVerticalOffset + fontUtils.getFontBaseline(fontInfo.field.fontSize); // Now we need to "move" the fields to the top by the size of height which HC will add for each field line.
    // HC does this by taking font height and we need to do the same:

    yTitleOffset = yTitleOffset - fontUtils.getFontHeight(fontInfo.field.fontSize) * chartData.fieldsName.length; // and not just round the value

    yTitleOffset = Math.round(yTitleOffset);
    gaugeChartConfig.yAxis.push({
      min: chartUserSettings.minValue,
      max: chartUserSettings.maxValue,
      stops: chartUserSettings.colorStops,
      lineWidth: 0,
      minorTickInterval: 0,
      tickPositions: [chartUserSettings.minValue, chartUserSettings.maxValue],
      tickLength: 0,
      tickWidth: 0,
      labels: {
        enabled: false
      },
      pane: paneIndex,
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
    });
    var defaultColor = gaugeChartUtilities.getColorFromArray(paneIndex, defaultPalette.colors);
    var serieColor = seriesColors[paneIndex] || defaultColor;
    var dataLabelText = "<span style=\"font-size:".concat(fontInfo.value.fontSize, "px;color:'").concat(fontInfo.value.color, "'\">").concat(chartData.valueAsString).concat(chartUserSettings.valueSuffix, "</span>");

    if (chartData.measureName) {
      dataLabelText = dataLabelText + "\n                <br/>\n                <span style=\"font-weight:normal;font-size:".concat(fontInfo.measure.fontSize, "px;color:'").concat(fontInfo.measure.color, "'\">").concat(chartData.measureName, "</span>\n            ");
    } // remove all spaces at the beginning and in the end + remove spaces between tags


    dataLabelText = dataLabelText.trim().replace(new RegExp(">[\\s]+<", 'g'), '><');
    gaugeChartConfig.series.push({
      yAxis: paneIndex,
      xAxis: paneIndex,
      // this 'color' key doesn't work because it's ignored by HC because we have set 'stops' on yAxis.
      // HC uses stop colors instead of defined color here
      // But I decided to left it here because it may be extra level of redundancy
      color: serieColor,
      innerRadius: sizes.innerRadius + "%",
      radius: sizes.outerRadius + "%",
      name: chartData.measureName,
      data: [chartData.value],
      columnsOutputParams: chartData.outputParameters,
      dataLabels: {
        useHTML: false,
        allowOverlap: true,
        overflow: 'allow',
        verticalAlign: 'bottom',
        style: {
          // here we specify the font size of the upper text which is the value
          'fontSize': fontInfo.value.fontSize,
          'text-anchor': 'middle'
        },
        align: 'left',
        x: 0,
        y: fontInfo.measureAndValueYOffset,
        padding: 0,
        borderWidth: 0,
        formatter: function formatter() {
          return dataLabelText;
        }
      }
    });
  });

  return gaugeChartConfig;
};

var getArcGaugeOptions = function getArcGaugeOptions(rowAxisLeafArray, columnAxisLeafArray, rowSlider, columnSlider, extraOptions) {
  var containerWidth = extraOptions.width;
  var containerHeight = extraOptions.height;
  var chartUserSettings = getUserSettings(extraOptions);
  var chartsData = gaugeChartUtilities.collectDataForCharts.call(this, rowAxisLeafArray, columnAxisLeafArray, columnSlider, extraOptions, chartUserSettings);

  if (extraOptions.chartState.showSingleMeasuresLabels === false && extraOptions.metadata.measures.length === 1) {
    _.each(chartsData, function (chartData) {
      chartData.measureName = '';
    });
  }

  var amountOfCharts = chartsData.length;
  var chartAreaSize = gaugeChartUtilities.getChartAreaSize({
    aspectRation: RATIO_HORIZONTAL_WHOLE_UNITS / (RATIO_VERTICAL_FIELDS_UNITS + RATIO_VERTICAL_CHART_UNITS),
    amountOfCharts: amountOfCharts,
    containerWidth: containerWidth,
    containerHeight: containerHeight,
    chartUserSettings: chartUserSettings
  });
  var sizes = calculateSizes({
    chartAreaSize: chartAreaSize,
    containerWidth: containerWidth,
    containerHeight: containerHeight
  });
  var fontData = calculateFontData({
    sizes: sizes,
    chartsData: chartsData,
    extraOptions: extraOptions,
    chartUserSettings: chartUserSettings
  });
  var chartPositions = gaugeChartUtilities.getGaugeChartPositions({
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
    chartPositions: chartPositions,
    extraOptions: extraOptions,
    chartUserSettings: chartUserSettings
  });
};

module.exports = getArcGaugeOptions;

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});