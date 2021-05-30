define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JRItemHyperlinkHighchartsSettingService = function JRItemHyperlinkHighchartsSettingService(chartInstance, chartOptions, serviceData) {
  this.chartInstance = chartInstance;
  this.chartOptions = chartOptions;
  this.serviceData = serviceData;
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
        series = null,
        linkOptions = this.serviceData && this.serviceData.linkOptions ? this.serviceData.linkOptions : {};

    for (var idx = 0; idx < it.chartOptions.series.length; ++idx) {
      if (it.chartOptions.series[idx]._jrid == seriesId) {
        series = it.chartOptions.series[idx];
        break;
      }
    }

    if (!series) {
      return;
    }

    series.cursor = "pointer";
    series.point = series.point || {};
    series.point.events = createEvents(series.point.events, wrapHyperlinkEvents(linkOptions.events, it.serviceData.hyperlinkProperty));
  },
  configureChartHyperlink: function configureChartHyperlink(hyperlink) {
    var it = this,
        options = it.chartOptions,
        linkOptions = this.serviceData && this.serviceData.linkOptions ? this.serviceData.linkOptions : {};
    options.chart = options.chart || {};
    options.chart.style = options.chart.style || {};
    options.chart.style.cursor = "pointer";
    options.chart.events = createEvents(options.chart.events, wrapChartEvents(linkOptions.events, hyperlink.id));
  }
};
module.exports = JRItemHyperlinkHighchartsSettingService;

function createEvents(pointEvents, linkEvents, id) {
  pointEvents || (pointEvents = {});
  linkEvents || (linkEvents = {});
  var events = {
    click: mergeHandlers(linkEvents.click, pointEvents.click),
    mouseOut: mergeHandlers(linkEvents.mouseout || linkEvents.mouseOut, pointEvents.mouseOut),
    mouseOver: mergeHandlers(linkEvents.mouseover || linkEvents.mouseOver, pointEvents.mouseOver)
  };

  _.each(events, function (event, eventName) {
    if (_.isUndefined(events[eventName])) {
      delete events[eventName];
    }
  });

  return events;
}

function wrapChartEvents(linkEvents, id) {
  linkEvents || (linkEvents = {});
  return {
    click: wrapHandler(linkEvents.click, id),
    mouseOut: wrapHandler(linkEvents.mouseout || linkEvents.mouseOut, id),
    mouseOver: wrapHandler(linkEvents.mouseover || linkEvents.mouseOver, id)
  };
}

function wrapHandler(handler, id) {
  if (handler) {
    return function (event) {
      handler.call(this, id, event);
    };
  }
}

function wrapHyperlinkEvents(linkEvents, hyperlinkProperty) {
  linkEvents || (linkEvents = {});
  return {
    click: wrapHyperlinkHandler(linkEvents.click, hyperlinkProperty),
    mouseOut: wrapHyperlinkHandler(linkEvents.mouseout || linkEvents.mouseOut, hyperlinkProperty),
    mouseOver: wrapHyperlinkHandler(linkEvents.mouseover || linkEvents.mouseOver, hyperlinkProperty)
  };
}

function wrapHyperlinkHandler(handler, hyperlinkProperty) {
  if (handler) {
    return function (event) {
      handler.call(this, this.options[hyperlinkProperty].id, event);
    };
  }
}

function mergeHandlers(h1, h2) {
  if (h1 && !h2) {
    return h1;
  }

  if (!h1 && h2) {
    return h2;
  }

  if (h1 && h2) {
    return function () {
      h1.apply(this, arguments);
      h2.apply(this, arguments);
    };
  }
}

});