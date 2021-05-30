define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Highcharts = require("highcharts-treemap");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JRTreemapSettingService = {
  perform: function perform(highchartsOptions, serviceData) {
    this.setupTreemap(highchartsOptions);
  },
  setupTreemap: function setupTreemap(options) {
    if (options.series.length < 1) {
      return;
    }

    this.set(options, 'tooltip', {});
    this.set(options.tooltip, 'valueDecimals', 2);
    this.set(options, 'plotOptions', {});
    this.set(options.plotOptions, 'treemap', {});
    this.set(options.plotOptions.treemap, 'borderWidth', 1);
    this.set(options.plotOptions.treemap, 'layoutAlgorithm', 'squarified');
    this.set(options.plotOptions.treemap, 'allowDrillToNode', true);
    this.set(options.plotOptions.treemap, 'levelIsConstant', false);
    this.set(options.plotOptions.treemap, 'dataLabels', {});
    this.set(options.plotOptions.treemap.dataLabels, 'enabled', false); //TODO check if already present?
    //TODO check if already present?

    options.plotOptions.treemap.levels = [{
      level: 1,
      dataLabels: {
        enabled: true
      },
      borderWidth: 3
    }];
    var defaultColors = Highcharts.getOptions().colors;

    if (options.colorAxis) {
      this.set(options.colorAxis, 'minColor', '#FFFFFF');
      this.set(options.colorAxis, 'maxColor', defaultColors[0]);
      this.set(options.tooltip, 'pointFormat', '{point.fullName}<br/>{series.name}: <b>{point.value}</b><br/>' + '{series.options.colorMeasureName}: <b>{point.colorValue}</b>');
    } else {
      this.set(options.tooltip, 'pointFormat', '{point.fullName}<br/>{series.name}: <b>{point.value}</b>');
      var series = options.series[0];
      var defaultColorsIdx = 0;

      for (var i = 0; i < series.data.length; ++i) {
        if (!series.data[i].parent) {
          var seriesItemColor = series.data[i].color;

          if (!seriesItemColor) {
            seriesItemColor = defaultColors[defaultColorsIdx];
            defaultColorsIdx = (defaultColorsIdx + 1) % defaultColors.length;
            series.data[i].color = seriesItemColor;
          }
        }
      }
    }
  },
  set: function set(object, property, value) {
    if (!(property in object)) {
      object[property] = value;
    }
  }
};
module.exports = JRTreemapSettingService;

});