define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var AdhocHighchartsAdapter = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter");

var AdhocDataProcessor = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter/adhocDataProcessor");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function attachEvent(eventName, linkOptions, serie, serviceData) {
  if (linkOptions.events[eventName.toLowerCase()]) {
    serie.point.events[eventName] = function (event) {
      var hyperlink = AdhocHighchartsSettingService.getHyperlink(serie, this, serviceData.queryData.metadata.isOLAP, serviceData.queryData.metadata);

      if (isHyperlinkFeasible(hyperlink, eventName, serie.chartType, serviceData)) {
        linkOptions.events[eventName.toLowerCase()].call(this, hyperlink, event);
      }
    };
  }
}

function isHyperlinkFeasible(hyperlink, eventName, chartType, adHocState) {
  var res = true;

  if (chartType === 'treemap' && eventName.toLowerCase() === 'click') {
    res = _.reduce(adHocState.chartState.rowsSelectedLevels, function (memo, level) {
      return !_.isUndefined(hyperlink.parameters[level.name]) && memo;
    }, true);
  }

  return res;
}

var AdhocHighchartsSettingService = {
  perform: function perform(highchartsOptions, serviceData, linkOptions) {
    var chartState = serviceData.chartState,
        extraOptions = serviceData.extraOptions;

    if (serviceData.chartType) {
      chartState.chartType = serviceData.chartType;
    }

    if (extraOptions) {
      var chartContainer = $('#' + serviceData.chartContainerId);

      if (chartContainer.length) {
        extraOptions.width = chartContainer.parent().width();
        extraOptions.height = chartContainer.parent().height() || 400;
      }
    }

    var clonedQueryData = JSON.parse(JSON.stringify(serviceData.queryData));
    var clonedChartState = JSON.parse(JSON.stringify(chartState));
    AdhocDataProcessor.load(clonedQueryData);
    AdhocDataProcessor.messages = extraOptions.messages;
    $.extend(highchartsOptions, AdhocHighchartsAdapter.generateOptions(clonedQueryData, clonedChartState, extraOptions));

    if (linkOptions && linkOptions.events && linkOptions.events) {
      if (highchartsOptions.series[0].chartType === 'timeseries_heatmap') {
        highchartsOptions.chart.events || (highchartsOptions.chart.events = {});

        if (linkOptions.events.click) {
          highchartsOptions.chart.events.click = function (event) {
            var point = this.hoverPoint,
                serie = point.series.options;
            linkOptions.events.click.call(this, AdhocHighchartsSettingService.getHyperlink(serie, point, serviceData.queryData.metadata.isOLAP), event);
          };
        }
      }

      _.forEach(highchartsOptions.series, function (serie) {
        serie.cursor = 'pointer';
        serie.point || (serie.point = {});
        serie.point.events = {};
        serie.chartType !== 'timeseries_heatmap' && attachEvent.call(this, 'click', linkOptions, serie, serviceData);
        attachEvent.call(this, 'mouseOver', linkOptions, serie, serviceData);
        attachEvent.call(this, 'mouseOut', linkOptions, serie, serviceData);
      });
    }
  },
  getOutputParams: function getOutputParams(serie, point, metadata) {
    var outputParameters = []; // Adding columns parameters.
    // Adding columns parameters.
    // Adding columns parameters.
    // Adding columns parameters.

    if (serie.columnsOutputParams) {
      outputParameters = outputParameters.concat(serie.columnsOutputParams);
    } // Adding rows parameters.
    // Adding rows parameters.
    // Adding rows parameters.
    // Adding rows parameters.


    if (point.rowsOutputParams) {
      outputParameters = outputParameters.concat(point.rowsOutputParams);
    } // For regular Heatmap only.
    // For regular Heatmap only.
    // For regular Heatmap only.
    // For regular Heatmap only.


    if (serie.chartType === 'heatmap' && serie.heatmapXCategories) {
      outputParameters[0].value = serie.heatmapXCategories[point.x];
    }

    if (serie.chartType === 'treemap' && metadata) {
      //Dual measure or not
      var valueString = metadata.measures.length === 2 ? point.name : point.id;
      outputParameters = _.map(_.compact(valueString.split('/@#/')), function (val, index) {
        return {
          value: val,
          name: metadata.axes[0][index]
        };
      });
    }

    return outputParameters;
  },
  getHyperlink: function getHyperlink(serie, point, isOlap, metadata) {
    return {
      type: 'AdHocExecution',
      parameters: _.reduce(AdhocHighchartsSettingService.getOutputParams(serie, point, metadata), function (memo, obj) {
        if (isOlap && obj.name.dimension !== 'Measures') {
          memo['[' + obj.name.dimension + ']' + obj.name.name] = obj.value;
        } else {
          if (obj.name.name === 'Measures' || obj.name.name === 'MeasuresLevel') {
            memo[obj.name.name] = _.isArray(obj.value) ? obj.value : [obj.value];
          } else {
            memo[obj.name.name] = obj.value;
          }
        }

        return memo;
      }, {})
    };
  }
};
module.exports = AdhocHighchartsSettingService;

});