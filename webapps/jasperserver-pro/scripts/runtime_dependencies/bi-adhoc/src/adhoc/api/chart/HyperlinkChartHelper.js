define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!AdHocBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var HyperlinkChartHelper = function HyperlinkChartHelper() {
  this._timestampToMemberMapping = {};
};

function getOutputParamsForHeatmap(serie, point) {
  var outputParameters = _.cloneDeep(serie.columnsOutputParams);

  outputParameters = outputParameters.concat(point.rowsOutputParams);

  if (outputParameters[0].name.name !== 'Measures') {
    var x = point.options ? point.options.x : point.x;

    if (!_.isUndefined(x)) {
      outputParameters[0].value = serie.heatmapXCategories[x];
    }
  }

  return outputParameters;
}

_.extend(HyperlinkChartHelper.prototype, {
  perform: function perform(view, highchartsOptions) {
    var linkOptions = view.options.linkOptions,
        self = this;

    if (linkOptions && linkOptions.events) {
      if (highchartsOptions.series[0].chartType === 'timeseries_heatmap') {
        highchartsOptions.chart.events || (highchartsOptions.chart.events = {});

        if (linkOptions.events.click) {
          highchartsOptions.chart.events.click = function (event) {
            var point = this.hoverPoint,
                serie = point.series.options;
            linkOptions.events.click.call(this, event, self.getHyperlink(serie, point, view));
          };
        }
      }

      _.forEach(highchartsOptions.series, function (serie) {
        serie.cursor = 'pointer';
        serie.point || (serie.point = {});
        serie.point.events = {};
        serie.chartType !== 'timeseries_heatmap' && self.attachEvent.call(self, 'click', linkOptions, serie, view);
        self.attachEvent.call(self, 'mouseOver', linkOptions, serie, view);
        self.attachEvent.call(self, 'mouseOut', linkOptions, serie, view);
      });
    }
  },
  getOutputParamsForTreemap: function getOutputParamsForTreemap(serie, point, view) {
    var chartComponent = view.adHocModel.component.getChartComponent(),
        measures = chartComponent.components.findComponentDeep('measure'),
        levels = _.pluck(view.adHocModel.dataSet.attributes.dataset.axes[1].levels, 'level'),
        levelValues = levels.length > 1 ? point.id.split('/@#/').slice(1) : [point.name];

    return _.map(levelValues, function (levelValue, levelIdx) {
      return {
        value: levelValue,
        name: {
          name: levels[levelIdx].referenceObject.name
        }
      };
    }).concat({
      value: _.map(measures, function (measure) {
        return measure.label(true);
      }),
      name: {
        name: 'Measures'
      }
    });
  },
  getOutputParams: function getOutputParams(serie, point, view) {
    var outputParameters = []; // Adding columns parameters.
    // Adding columns parameters.

    if (serie.columnsOutputParams) {
      outputParameters = outputParameters.concat(serie.columnsOutputParams);
    } // Adding rows parameters.
    // Adding rows parameters.


    if (point && point.rowsOutputParams) {
      outputParameters = outputParameters.concat(point.rowsOutputParams);
    } // For Treemap
    // For Treemap


    if (serie.chartType === 'treemap' && point) {
      outputParameters = outputParameters.concat(this.getOutputParamsForTreemap(serie, point, view));
    } // For Heatmap
    // For Heatmap


    if (serie.chartType === 'heatmap' && point) {
      outputParameters = getOutputParamsForHeatmap(serie, point);
    } // empty trash (case DualLevelPie chart type)
    // empty trash (case DualLevelPie chart type)


    outputParameters = _.filter(outputParameters, function (param) {
      return !_.isUndefined(param.value);
    });
    return outputParameters;
  },
  getMeasureReferenceByLabel: function getMeasureReferenceByLabel(measures, label) {
    return _.find(measures, function (measure) {
      return measure.label(true) === label;
    }).get('reference');
  },
  getMeasures: function getMeasures(label, view) {
    var chartComponent = view.adHocModel.component.getChartComponent(),
        measures = chartComponent.components.findComponentDeep('measure');

    if (_.isArray(label)) {
      return _.map(label, function (label) {
        return this.getMeasureReferenceByLabel(measures, label);
      }, this);
    } else {
      return [this.getMeasureReferenceByLabel(measures, label)];
    }
  },
  getHyperlink: function getHyperlink(serie, point, view) {
    return _.reduce(this.getOutputParams(serie, point, view), function (memo, obj) {
      if (obj.name.name === 'Measures' || obj.name.name === 'MeasuresLevel') {
        memo.Measures = this.getMeasures(obj.value, view);
      } else {
        memo[obj.name.name] = this.loadInitialValue(this.encodeFieldValue(obj.value));
      }

      return memo;
    }, {}, this);
  },
  getHyperlinks: function getHyperlinks(options, view) {
    var self = this;
    return _.map(_.flatten(_.map(options.series, function (serie) {
      return _.map(serie.data, function (dataPoint) {
        return self.getHyperlink(serie, dataPoint, view);
      });
    })), function (link) {
      return {
        element: null,
        data: link
      };
    });
  },
  encodeFieldValue: function encodeFieldValue(value) {
    switch (value) {
      case i18n['adhoc.node.other.node']:
        value = 'other_node';
        break;

      case i18n['adhoc.node.total.node']:
        value = 'total_node';
        break;
    }

    return value;
  },
  attachEvent: function attachEvent(eventName, linkOptions, serie, view) {
    var self = this;

    if (linkOptions.events[eventName.toLowerCase()]) {
      serie.point.events[eventName] = function (event) {
        var point = this;
        linkOptions.events[eventName.toLowerCase()].call(self, event, self.getHyperlink(serie, point, view), null, null);
      };
    }
  },
  saveInitialValue: function saveInitialValue(timestamp, member) {
    this._timestampToMemberMapping[timestamp] = member;
  },
  loadInitialValue: function loadInitialValue(timestamp) {
    return _.isUndefined(this._timestampToMemberMapping[timestamp]) ? timestamp : this._timestampToMemberMapping[timestamp];
  }
});

module.exports = HyperlinkChartHelper;

});