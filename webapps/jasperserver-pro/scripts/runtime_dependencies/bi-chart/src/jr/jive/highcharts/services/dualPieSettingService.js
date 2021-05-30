define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Highcharts = require("highcharts-more");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JRDualPieSettingService = {
  perform: function perform(highchartsOptions, serviceData) {
    this.setupDualPie(highchartsOptions);
  },
  setupDualPie: function setupDualPie(options) {
    if (options.series.length != 2) {
      return;
    }

    var parentSeries = options.series[0];
    parentSeries.center = ["50%", "50%"];
    parentSeries.size = "60%";
    parentSeries.dataLabels = parentSeries.dataLabels || {};
    parentSeries.dataLabels.color = "#FFFFFF";
    parentSeries.dataLabels.distance = -30;
    var childSeries = options.series[1];
    childSeries.center = ["50%", "50%"];
    childSeries.innerSize = "60%";
    childSeries.size = "90%";
    var defaultColors = Highcharts.getOptions().colors;
    var defaultColorsIdx = 0;
    var childSeriesIdx = 0;

    for (var i = 0; i < parentSeries.data.length; ++i) {
      var parentSeriesItemColor = parentSeries.data[i].color;

      if (!parentSeriesItemColor) {
        parentSeriesItemColor = defaultColors[defaultColorsIdx];
        defaultColorsIdx = (defaultColorsIdx + 1) % defaultColors.length;
        parentSeries.data[i].color = parentSeriesItemColor;
      }

      var childSeriesItemCount = parentSeries.data[i]._jrChildCount;

      if (childSeriesItemCount) {
        for (var j = 0; j < childSeriesItemCount; ++j, ++childSeriesIdx) {
          if (childSeriesIdx < childSeries.data.length && !childSeries.data[childSeriesIdx].color) {
            var brightness = 0.2 - j / childSeriesItemCount / 5;
            childSeries.data[childSeriesIdx].color = Highcharts.Color(parentSeriesItemColor).brighten(brightness).get();
          }
        }
      }
    }
  }
};
module.exports = JRDualPieSettingService;

});