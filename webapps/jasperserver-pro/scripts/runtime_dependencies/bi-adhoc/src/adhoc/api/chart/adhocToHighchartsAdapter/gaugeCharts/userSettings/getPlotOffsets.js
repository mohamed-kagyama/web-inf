define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var fontUtils = require("runtime_dependencies/js-sdk/src/common/util/fontUtils");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var getPlotOffsets = function getPlotOffsets(chartState) {
  // this is a plot offsets, they work like padding for chart area, but I call them offsets
  var plotOffsets = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }; // we support adding few titles to the chart, like 'title.text' and 'subtitle.text'
  // the support means we give some extra space above the chart to fix them

  var advancedProperties = chartState.advancedProperties || {};

  if (_.isArray(advancedProperties)) {
    var hasTitle = false;
    var hasSubTitle = false;

    var titleSetting = _.find(advancedProperties, function (setting) {
      return setting.name === 'title.text';
    });

    if (titleSetting && titleSetting.value) {
      // the default font size which is the same as HC has
      var fontSize = 18; // check if user has supplied a font size

      var fontSizeFromUser = _.find(advancedProperties, function (setting) {
        return setting.name === 'title.style.fontSize';
      });

      if (fontSizeFromUser) {
        var parsedFontSize = parseInt(fontSizeFromUser.value);

        if (parsedFontSize) {
          fontSize = parsedFontSize;
        }
      }

      var fontHeight = fontUtils.getFontHeight(fontSize);
      plotOffsets.top += fontHeight;
      hasTitle = true;
    }

    var subTitleSetting = _.find(advancedProperties, function (setting) {
      return setting.name === 'subtitle.text';
    });

    if (subTitleSetting && subTitleSetting.value) {
      // the default font size which is the same as HC has
      var _fontSize = 11; // check if user has supplied a font size

      var _fontSizeFromUser = _.find(advancedProperties, function (setting) {
        return setting.name === 'subtitle.style.fontSize';
      });

      if (_fontSizeFromUser) {
        var _parsedFontSize = parseInt(_fontSizeFromUser.value);

        if (_parsedFontSize) {
          _fontSize = _parsedFontSize;
        }
      }

      var _fontHeight = fontUtils.getFontHeight(_fontSize);

      plotOffsets.top += _fontHeight;
      hasSubTitle = true;
    } // if title or subtitle are present then increase top offset more


    if (hasTitle || hasSubTitle) {
      plotOffsets.top += 10;
    }
  }

  return plotOffsets;
};

module.exports = getPlotOffsets;

});