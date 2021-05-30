define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JRItemHyperlinkHighchartsSettingService = function JRItemHyperlinkHighchartsSettingService(chartInstance, chartOptions, serviceData) {
  this.chartInstance = chartInstance;
  this.chartOptions = chartOptions;
  this.serviceData = serviceData;
  this.hyperlinkSeriesPointClickedHandler = null;
};

JRItemHyperlinkHighchartsSettingService.prototype = {
  perform: function perform() {
    var it = this;

    if (it.serviceData.seriesId) {
      this.configureHyperlinks(it.serviceData.seriesId);
    } else if (it.serviceData.chartHyperlink) {
      this.configureChartHyperlink(it.serviceData.chartHyperlink);
    }
  },
  configureHyperlinks: function configureHyperlinks(seriesId) {
    var it = this,
        series = null;

    for (var idx = 0; idx < it.chartOptions.series.length; ++idx) {
      if (it.chartOptions.series[idx]._jrid == seriesId) {
        series = it.chartOptions.series[idx];
        break;
      }
    }

    if (!series) {
      return;
    }

    series.cursor = 'pointer';
    series.point = series.point || {};
    series.point.events = series.point.events || {}; //FIXME check if click already exists?

    if (it.hyperlinkSeriesPointClickedHandler) {
      series.point.events.click = function (evt) {
        it.hyperlinkSeriesPointClickedHandler.call(it.chartInstance, {
          hyperlink: this.options[it.serviceData.hyperlinkProperty]
        });
      };
    } else {
      series.point.events.click = function (evt) {
        it.openHyperlink(this.options[it.serviceData.hyperlinkProperty]);
      };
    }
  },
  configureChartHyperlink: function configureChartHyperlink(hyperlink) {
    var it = this,
        options = it.chartOptions;
    options.chart = options.chart || {};
    options.chart.style = options.chart.style || {};
    options.chart.style.cursor = 'pointer';
    options.chart.events = options.chart.events || {};

    options.chart.events.click = function (evt) {
      //highcharts calls the click event even when a button such as the reset zoom button is clicked
      //we don't want to follow the hyperlink when buttons are clicked
      var parents = $(evt.target).parentsUntil('div.highcharts-container');

      if (parents.is('.highcharts-button') // the test above doesn't actually work for the reset button because the button gets removed from the document/svg before the click event is called
      // therefore we're also checking whether the target has been removed from the svg
      || !parents.is('svg')) {
        return;
      }

      if (it.hyperlinkSeriesPointClickedHandler) {
        it.hyperlinkSeriesPointClickedHandler.call(it.chartInstance, {
          hyperlink: hyperlink
        });
      } else {
        it.openHyperlink(hyperlink);
      }
    };
  },
  openHyperlink: function openHyperlink(hyperlink) {
    if (!hyperlink || !hyperlink.url) {
      return;
    }

    if (!hyperlink.target || hyperlink.target == 'None' || hyperlink.target == 'Self') {
      location.href = hyperlink.url;
    } else if (hyperlink.target == 'Blank') {
      window.open(hyperlink.url, '_blank');
    } else if (hyperlink.target == 'Parent') {
      window.open(hyperlink.url, '_parent');
    } else if (hyperlink.target == 'Top') {
      window.open(hyperlink.url, '_top');
    } else {
      // assuming hyperlink.target is a frame/window name
      window.open(hyperlink.url, hyperlink.target);
    }
  }
};
module.exports = JRItemHyperlinkHighchartsSettingService;

});