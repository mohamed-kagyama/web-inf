define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var Highcharts = require("highcharts-solid-gauge");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var basicGaugeInnerRadius = "90%";
var basicGaugeOuterRadius = "100%";
var HCColors = Highcharts.getOptions().colors;
var GAUGE_TYPES = {
  GAUGE: "Gauge",
  ARC_GAUGE: "ArcGauge",
  MULTI_LEVEL_GAUGE: "MultiLevelGauge"
};
var commonOptions = {
  plotOptions: {
    solidgauge: {
      dataLabels: {
        align: 'left',
        style: {
          'text-anchor': 'middle'
        },
        verticalAlign: 'bottom',
        borderWidth: 0,
        format: "<span>{y}</span><br/><span style=\"font-weight:normal\">{series.name}</span>"
      },
      stickyTracking: false
    }
  },
  tooltip: {
    shape: "square"
  },
  yAxis: {
    labels: {
      enabled: false
    },
    title: {
      align: "high",
      textAlign: "center",
      useHTML: true
    },
    lineWidth: 0,
    minorTickInterval: 0,
    tickAmount: 0,
    tickLength: 0,
    tickWidth: 0
  }
};
var arcArcGaugeCommonOptions = {
  pane: {
    background: {
      borderWidth: 0,
      shape: "arc",
      innerRadius: basicGaugeInnerRadius,
      outerRadius: basicGaugeOuterRadius
    }
  }
};

function calculateMLGRadiuses(amountOfMeasures) {
  var maxOuterRadiusForChart = 100;
  var maximumRadiusDecrementStep = 15;
  var minimumInnerRadiusForChartInPercents = 5;
  var radiusDecrementStep = (maxOuterRadiusForChart - minimumInnerRadiusForChartInPercents) / amountOfMeasures; // check that our radius decrement step is not bigger than the maximum value:

  radiusDecrementStep = Math.min(maximumRadiusDecrementStep, radiusDecrementStep);
  var radiuses = [{
    outer: maxOuterRadiusForChart,
    inner: maxOuterRadiusForChart - radiusDecrementStep
  }];

  for (var i = 1; i < amountOfMeasures; i++) {
    radiuses.push({
      outer: radiuses[i - 1].inner,
      inner: radiuses[i - 1].inner - radiusDecrementStep
    });
  }

  return radiuses;
}

var JRGaugeSettingService = {
  perform: function perform(options, serviceData) {
    if (GAUGE_TYPES.GAUGE === serviceData.chartType) {
      this.setupGauge(options);
    } else if (GAUGE_TYPES.ARC_GAUGE === serviceData.chartType) {
      this.setupArcGauge(options);
    } else if (GAUGE_TYPES.MULTI_LEVEL_GAUGE === serviceData.chartType) {
      this.setupMultiLevelGauge(options);
    }
  },
  setupGauge: function setupGauge(options) {
    $.extend(true, options, commonOptions, arcArcGaugeCommonOptions);
    options.series[0].data[0].innerRadius = basicGaugeInnerRadius;
    options.series[0].data[0].outerRadius = basicGaugeOuterRadius;
  },
  setupArcGauge: function setupArcGauge(options) {
    $.extend(true, options, commonOptions, arcArcGaugeCommonOptions, {
      pane: {
        startAngle: -90,
        endAngle: 90
      }
    });
    options.series[0].data[0].innerRadius = basicGaugeInnerRadius;
    options.series[0].data[0].outerRadius = basicGaugeOuterRadius;
  },
  setupMultiLevelGauge: function setupMultiLevelGauge(options) {
    $.extend(true, options, commonOptions, {
      pane: {
        startAngle: 0,
        endAngle: 360
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            enabled: false
          },
          linecap: "round",
          rounded: true
        }
      }
    });
    var seriesLength = options.series.length;
    var radiuses = calculateMLGRadiuses(seriesLength);
    options.pane.background = [];

    for (var i = 0; i < seriesLength; i++) {
      var color = HCColors[i],
          backgroundColor = Highcharts.Color(color).setOpacity(0.3).get();
      options.pane.background.push({
        backgroundColor: backgroundColor,
        borderWidth: 0,
        outerRadius: radiuses[i].outer + "%",
        innerRadius: radiuses[i].inner + "%"
      });
      options.series[i].data[0].color = color;
      options.series[i].data[0].radius = radiuses[i].outer + "%";
      options.series[i].data[0].innerRadius = radiuses[i].inner + "%";
    }
  }
};
module.exports = JRGaugeSettingService;

});