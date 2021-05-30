define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Highcharts = require("highcharts");

var chartLayouts = require('./supportedLayoutsEnum');

var fontUtils = require("runtime_dependencies/js-sdk/src/common/util/fontUtils");

var NumberUtils = require("runtime_dependencies/js-sdk/src/common/util/parse/NumberUtils");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var numberUtils = new NumberUtils();

var getColorFromArray = function getColorFromArray(index, array) {
  return array[index % array.length];
};

var getAxisItemTypes = function getAxisItemTypes(extraOptions) {
  var axisItemsTypes = {};
  var amountOfItemsOnAxe = extraOptions.metadata.axes[1].length;

  _.each(extraOptions.metadata.axes[1], function (item, index) {
    if (item.dimension === 'Measures') {
      axisItemsTypes[amountOfItemsOnAxe - (index + 1)] = 'measure';
    } else {
      axisItemsTypes[amountOfItemsOnAxe - (index + 1)] = 'field';
    }
  });

  return axisItemsTypes;
};

var getDataFromLeafNode = function getDataFromLeafNode(options) {
  var columnAxisLeafNode = options.columnAxisLeafNode,
      rowAxisLeafArray = options.rowAxisLeafArray,
      columnSlider = options.columnSlider,
      extraOptions = options.extraOptions,
      chartUserSettings = options.chartUserSettings;
  var axisItemsTypes = getAxisItemTypes(extraOptions);
  var value = this.getDataValue(rowAxisLeafArray[0], columnAxisLeafNode);
  var valueAsString = numberUtils.formatNumber(value, {
    decimalSeparator: '.',
    groupingSeparator: ','
  }); // 'decimalPlaces' for a user is a text field, which he may left empty to indicate 'no rounding'
  // or can set it to some number which specifies how many decimal places he wants to have

  if (chartUserSettings.decimalPlaces !== "") {
    var decimalPlaces = Math.min(parseInt(chartUserSettings.decimalPlaces), 20);
    valueAsString = numberUtils.formatNumber(value, {
      decimalSeparator: '.',
      groupingSeparator: ',',
      decimalPlacesAmount: decimalPlaces
    });
  }

  var outputParameters = this.createOutputParameters(columnAxisLeafNode, 1, extraOptions); // We need to collect all fields name and measure names from the tree-like structure
  // which is tricky because the fields

  var measureName = '';
  var fieldsName = [];
  var itemIndex = 0;
  var node = columnAxisLeafNode;

  do {
    // the 'if' check skips the latest node which is the global "Totals"
    // node (not a field/measure at all)
    if (node.parent) {
      if (axisItemsTypes[itemIndex] === 'measure') {
        measureName = node.label;
      } else {
        fieldsName.push(node.label);
      }
    } // get one level deeper


    node = node.parent; // and increase our itemIndex in types map

    itemIndex += 1;
  } while (node); // because of the way how server sends us data we need to reverse the array


  fieldsName.reverse();

  if (columnSlider === 0 && fieldsName.length > 0) {
    // if the column slider selector set to minimum position then let's take just one of the 'Totals'
    // labels because all of them are the same on this level of slider.
    // Important note: we are getting 'Totals' label form here because it will be i18n'ed, which is cool
    // and we don't need to translate word 'Totals'
    fieldsName = [fieldsName[0]];
  }

  return {
    value: value,
    valueAsString: valueAsString,
    outputParameters: outputParameters,
    fieldsName: fieldsName,
    measureName: measureName
  };
};

var collectDataForCharts = function collectDataForCharts(rowAxisLeafArray, columnAxisLeafArray, columnSlider, extraOptions, chartUserSettings) {
  var chartsInfo = [];

  for (var i = 0; i < columnAxisLeafArray.length; i++) {
    var columnAxisLeafNode = columnAxisLeafArray[i];
    var data = getDataFromLeafNode.call(this, {
      columnAxisLeafNode: columnAxisLeafNode,
      rowAxisLeafArray: rowAxisLeafArray,
      columnSlider: columnSlider,
      extraOptions: extraOptions,
      chartUserSettings: chartUserSettings
    });
    chartsInfo.push(data);
  }

  return chartsInfo;
};

var groupDataByCharts = function groupDataByCharts(rowAxisLeafArray, columnAxisLeafArray, columnSlider, extraOptions, chartUserSettings) {
  var chartsInfo = {};

  for (var i = 0; i < columnAxisLeafArray.length; i++) {
    var columnAxisLeafNode = columnAxisLeafArray[i];
    var data = getDataFromLeafNode.call(this, {
      columnAxisLeafNode: columnAxisLeafNode,
      rowAxisLeafArray: rowAxisLeafArray,
      columnSlider: columnSlider,
      extraOptions: extraOptions,
      chartUserSettings: chartUserSettings
    }); // we need to build unique combination from fields for this columnAxisLeafNode
    // and this is gonna be a one chart on a plot

    var chartKey = data.fieldsName.join('_');

    if (!chartsInfo[chartKey]) {
      chartsInfo[chartKey] = {
        fieldsName: data.fieldsName,
        measures: []
      };
    }

    chartsInfo[chartKey].measures.push({
      value: data.value,
      valueAsString: data.valueAsString,
      outputParameters: data.outputParameters,
      name: data.measureName
    });
  }

  return chartsInfo;
};

var getChartAreaSize = function getChartAreaSize(options) {
  var amountOfCharts = options.amountOfCharts,
      chartUserSettings = options.chartUserSettings;
  var aspectRation = options.aspectRation,
      containerWidth = options.containerWidth,
      containerHeight = options.containerHeight;
  containerWidth -= chartUserSettings.plotOffsets.left + chartUserSettings.plotOffsets.right;
  containerHeight -= chartUserSettings.plotOffsets.top + chartUserSettings.plotOffsets.bottom; // The 'aspectRation' is the requested aspect ratio for the area we are trying to find out.
  // Introducing 'aspectRation' allows us to find area not only for square areas but also for rectangular.
  // We threat 'aspectRation' as "horizontal side / vertical side",
  // so the 'vertical' = 'horizontal' / aspectRation
  // and 'horizontal' = 'vertical' * aspectRation

  if (_.isUndefined(aspectRation)) {
    aspectRation = 1;
  } // Test for invalid input: check what amount of pixels in 'width * height' area is less than
  // the squares we need to place on this area


  if (containerWidth * containerHeight < amountOfCharts) {
    return 0;
  }

  var layout = chartLayouts.BEST_FIT;

  var supportedLayouts = _.values(chartLayouts);

  if (chartUserSettings.layout && supportedLayouts.indexOf(chartUserSettings.layout) !== -1) {
    layout = chartUserSettings.layout;
  }

  var byVertical = 0;
  var byHorizontal = 0;
  var chartAreaSize = 0;

  if (layout === chartLayouts.BEST_FIT) {
    containerHeight = containerHeight * aspectRation; // Initial guess.

    var containerAspect = containerHeight / containerWidth;
    var xf = Math.sqrt(amountOfCharts / containerAspect);
    var yf = xf * containerAspect;
    var x = Math.max(1.0, Math.floor(xf));
    var y = Math.max(1.0, Math.floor(yf));
    var x_size = Math.floor(containerWidth / x);
    var y_size = Math.floor(containerHeight / y);
    chartAreaSize = Math.min(x_size, y_size); // Test our guess:

    x = Math.floor(containerWidth / chartAreaSize);
    y = Math.floor(containerHeight / chartAreaSize); // We guessed too high.

    if (x * y < amountOfCharts) {
      if ((x + 1) * y < amountOfCharts && x * (y + 1) < amountOfCharts) {
        // Case 2: the upper bound is correct compute the chartAreaSize that will result in (x+1)*(y+1) tiles.
        x_size = Math.floor(containerWidth / (x + 1));
        y_size = Math.floor(containerHeight / (y + 1));
        chartAreaSize = Math.min(x_size, y_size);
      } else {
        // Case 3: solve an equation to determine the final x and y dimensions and then compute
        // the chartAreaSize that results in those dimensions.
        var test_x = Math.ceil(amountOfCharts / y);
        var test_y = Math.ceil(amountOfCharts / x);
        x_size = Math.min(Math.floor(containerWidth / test_x), Math.floor(containerHeight / y));
        y_size = Math.min(Math.floor(containerWidth / x), Math.floor(containerHeight / test_y));
        chartAreaSize = Math.max(x_size, y_size);
      }
    }

    byHorizontal = chartAreaSize;
    byVertical = Math.floor(chartAreaSize / aspectRation);
  }

  if (layout === chartLayouts.HORIZONTAL) {
    byHorizontal = Math.floor(containerWidth / amountOfCharts);

    if (containerHeight * aspectRation < byHorizontal) {
      byHorizontal = Math.floor(containerHeight * aspectRation);
    }

    byVertical = Math.floor(byHorizontal / aspectRation);
  }

  if (layout === chartLayouts.VERTICAL) {
    byVertical = Math.floor(containerHeight / amountOfCharts);

    if (containerWidth / aspectRation < byVertical) {
      byVertical = Math.floor(containerWidth / aspectRation);
    }

    byHorizontal = Math.floor(byVertical * aspectRation);
  }

  return {
    byVertical: byVertical,
    byHorizontal: byHorizontal
  };
};

var getGaugeChartPositions = function getGaugeChartPositions(options) {
  var amountOfCharts = options.amountOfCharts,
      chartAreaSize = options.chartAreaSize,
      containerWidth = options.containerWidth,
      containerHeight = options.containerHeight,
      sizes = options.sizes,
      chartUserSettings = options.chartUserSettings;
  var availableWidth = containerWidth - (chartUserSettings.plotOffsets.left + chartUserSettings.plotOffsets.right);
  var availableHeight = containerHeight - (chartUserSettings.plotOffsets.top + chartUserSettings.plotOffsets.bottom);
  var layout = chartLayouts.BEST_FIT;

  var supportedLayouts = _.values(chartLayouts);

  if (chartUserSettings.layout && supportedLayouts.indexOf(chartUserSettings.layout) !== -1) {
    layout = chartUserSettings.layout;
  } // calculate how many charts we can place in the container


  var chartsByHorizontal;
  var chartsByVertical;

  if (layout === chartLayouts.HORIZONTAL) {
    chartsByHorizontal = Math.floor(availableWidth / chartAreaSize.byHorizontal);
    chartsByVertical = 1;
  } else if (layout === chartLayouts.VERTICAL) {
    chartsByHorizontal = 1;
    chartsByVertical = Math.floor(availableHeight / chartAreaSize.byVertical);
  } else {
    chartsByHorizontal = Math.floor(availableWidth / chartAreaSize.byHorizontal);
    chartsByVertical = Math.ceil(amountOfCharts / chartsByHorizontal);
  } // if the container is too big and we are rendering just one chart then we need to correct values which we got:


  chartsByHorizontal = Math.min(chartsByHorizontal, amountOfCharts);
  chartsByVertical = Math.min(chartsByVertical, amountOfCharts);
  var horizontalGap = (availableWidth - chartAreaSize.byHorizontal * chartsByHorizontal) / (chartsByHorizontal + 1);
  var verticalGap = (availableHeight - chartAreaSize.byVertical * chartsByVertical) / (chartsByVertical + 1);
  var positions = [];

  for (var i = 0; i < amountOfCharts; i++) {
    // we are dealing with multiplication and the math requires us to
    // start counting from 1 (not from 0, as the binary system does)
    var chartNumber = i + 1;
    var xPositionNumber = chartNumber % chartsByHorizontal === 0 ? chartsByHorizontal : chartNumber % chartsByHorizontal;
    var yPositionNumber = Math.floor(chartNumber / chartsByHorizontal) + (chartNumber % chartsByHorizontal === 0 ? 0 : 1); // we use 'chartAreaSize. ...' divided by 2 because we want to take the center

    var xCenterPosition = chartAreaSize.byHorizontal * (xPositionNumber - 1) + chartAreaSize.byHorizontal / 2 + horizontalGap * xPositionNumber;
    var yCenterPosition = chartAreaSize.byVertical * (yPositionNumber - 1) + chartAreaSize.byVertical / 2 + verticalGap * yPositionNumber;
    xCenterPosition += chartUserSettings.plotOffsets.left;
    yCenterPosition += chartUserSettings.plotOffsets.top + sizes.verticalCenterOffset;
    positions.push({
      // added for debugging purpose
      xCenter: Math.round(xCenterPosition),
      yCenter: Math.round(yCenterPosition),
      left: Math.round(xCenterPosition - chartAreaSize.byHorizontal / 2),
      top: Math.round(yCenterPosition - (chartAreaSize.byVertical / 2 + sizes.verticalCenterOffset)),
      // don't round positions in percents because this will lead to miss-positioning
      xCenterInPercent: xCenterPosition / containerWidth * 100,
      yCenterInPercent: yCenterPosition / containerHeight * 100
    });
  }

  return positions;
};

var calculateFontData = function calculateFontData(options) {
  var texts = options.texts,
      extraOptions = options.extraOptions,
      autoScaleStrategy = options.autoScaleStrategy,
      fonts = options.fonts,
      constrains = options.constrains;
  var minimalFontSize = fonts.minimalFontSize;
  var fieldFontSize = fonts.fieldFontSize;
  var fieldColor = Highcharts.theme && Highcharts.theme.contrastTextColor || 'black';
  var valueFontSize = fonts.valueFontSize;
  var valueColor = Highcharts.theme && Highcharts.theme.contrastTextColor || 'black';
  var measureFontSize = fonts.measureFontSize;
  var measureColor = Highcharts.theme && Highcharts.theme.contrastTextColor || 'black';
  var fontData = [];

  if (!extraOptions || !extraOptions.chartState.autoScaleFonts) {
    _.each(texts, function () {
      fontData.push({
        field: {
          fontSize: fieldFontSize,
          color: fieldColor
        },
        value: {
          fontSize: valueFontSize,
          color: valueColor
        },
        measure: {
          fontSize: measureFontSize,
          color: measureColor
        }
      });
    });

    return fontData;
  } // form structures to collect min/max font


  var fieldFonts = [];
  var valueFonts = [];
  var measureFonts = [];

  _.each(texts, function (text) {
    if (text.field) {
      var fontForField = fontUtils.findFontSize({
        text: text.field,
        sizeUnits: 'px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        minimalFontSize: minimalFontSize,
        fontCheckingStrategy: 'basedOnFontHeight',
        widthAvailable: constrains.field.width,
        heightAvailable: constrains.field.height
      });
      fieldFonts.push(fontForField);
    }

    if (text.value) {
      var fontForValue = fontUtils.findFontSize({
        text: text.value,
        sizeUnits: 'px',
        fontWeight: 'bold',
        lineHeight: 'normal',
        minimalFontSize: minimalFontSize,
        fontCheckingStrategy: 'basedOnFontHeight',
        widthAvailable: constrains.value.width,
        heightAvailable: constrains.value.height
      });
      valueFonts.push(fontForValue);
    }

    if (text.measure) {
      var fontForMeasure = fontUtils.findFontSize({
        text: text.measure,
        sizeUnits: 'px',
        fontWeight: 'normal',
        lineHeight: 'normal',
        minimalFontSize: minimalFontSize,
        fontCheckingStrategy: 'basedOnFontHeight',
        widthAvailable: constrains.measure.width,
        heightAvailable: constrains.measure.height
      });
      measureFonts.push(fontForMeasure);
    }
  });

  if (fieldFonts.length === 0) {
    fieldFonts.push({
      fontSize: fieldFontSize
    });
  }

  if (valueFonts.length === 0) {
    valueFonts.push({
      fontSize: valueFontSize
    });
  }

  if (measureFonts.length === 0) {
    measureFonts.push({
      fontSize: measureFontSize
    });
  }

  if (autoScaleStrategy === "minimalFontForAll") {
    fieldFontSize = _.min(fieldFonts, function (font) {
      return font.fontSize;
    }).fontSize;
    valueFontSize = _.min(valueFonts, function (font) {
      return font.fontSize;
    }).fontSize;
    measureFontSize = _.min(measureFonts, function (font) {
      return font.fontSize;
    }).fontSize;
  } else if (autoScaleStrategy === "maximalFontForAll") {
    fieldFontSize = _.max(fieldFonts, function (font) {
      return font.fontSize;
    }).fontSize;
    valueFontSize = _.max(valueFonts, function (font) {
      return font.fontSize;
    }).fontSize;
    measureFontSize = _.max(measureFonts, function (font) {
      return font.fontSize;
    }).fontSize;
  } // in other case (else) the font size will get initial value as indication what
  // user has specified wrong parameters


  _.each(texts, function () {
    fontData.push({
      field: {
        fontSize: fieldFontSize,
        color: fieldColor
      },
      value: {
        fontSize: valueFontSize,
        color: valueColor
      },
      measure: {
        fontSize: measureFontSize,
        color: measureColor
      }
    });
  });

  return fontData;
};

module.exports = {
  getColorFromArray: getColorFromArray,
  collectDataForCharts: collectDataForCharts,
  groupDataByCharts: groupDataByCharts,
  getChartAreaSize: getChartAreaSize,
  getGaugeChartPositions: getGaugeChartPositions,
  getMultiLevelGaugeChartPositions: getGaugeChartPositions,
  calculateFontData: calculateFontData
};

});