define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var config = require("runtime_dependencies/js-sdk/src/jrs.configs");

var moment = require("momentExtension");

var Backbone = require('backbone');

var Highcharts = require("highcharts");

var biComponentErrorFactoryAdHocViewProxy = require('../../../bi/adhoc/error/biComponentErrorFactoryAdHocViewProxy');

var AdHocBundle = require("bundle!AdHocBundle");

var chartDataConverter = require('./model/chartDataConverter');

var AdhocHighchartsAdapter = require('./adhocToHighchartsAdapter');

var chartTemplate = require("text!./template/chart.htm");

var timeSeriesTooltipFormatterTemplate = require("text!./template/timeSeriesTooltipFormatter.htm");

var HyperlinkService = require('./HyperlinkChartHelper');

var AdhocDataProcessor = require('./adhocToHighchartsAdapter/adhocDataProcessor');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author:
 * @version: $Id$
 */
function dualPieSpecificChecks(adHocModel) {
  if (adHocModel.component.get("visualizationType") === "DualLevelPie") {
    var query = adHocModel.dataSet.query,
        axis = query.rows.axis.multiAxisMap(function (obj) {
      return obj;
    });

    if (axis[0].isMeasure()) {
      var measuresExpansion = query.rows.expansions.find(function (exp) {
        return exp.get("level") && exp.get("level").aggregation && !exp.get("level").expanded;
      });

      if (measuresExpansion) {
        var level = _.clone(measuresExpansion.get("level"));

        level.expanded = true;
        measuresExpansion.set({
          level: level
        });
      }
    }
  }
}

module.exports = Backbone.View.extend({
  initialize: function initialize(options) {
    this.$el = $(_.template(chartTemplate)({
      i18n: AdHocBundle
    }));

    this._initElements();

    this.adHocModel = options.dataModel;
    this.options = options.options;
    this.hyperlinkService = new HyperlinkService();
  },
  render: function render($canvas) {
    var dfd = $.Deferred(),
        self = this;
    $canvas && $canvas.append(this.$el);
    this.adHocModel.trigger("component:busy", true);
    this.adHocModel.dataSet.set({
      "params": {
        "offset": [0, 0],
        "pageSize": [2147483647, 2147483647]
      }
    }); // this must be moved to specific view in future

    dualPieSpecificChecks(this.adHocModel);
    var dataDfd = this.adHocModel.dataSet.data().fail(_.bind(dfd.reject, dfd)),
        bundleDfd = this.adHocModel.bundles.bundle().fail(_.bind(dfd.reject, dfd));
    $.when(dataDfd, bundleDfd).done(function () {
      try {
        self._checkData() && self._renderChart(dfd);
        self.adHocModel.trigger("component:busy", false);
        dfd.resolve();
      } catch (err) {
        return dfd.reject(biComponentErrorFactoryAdHocViewProxy.adHocViewRender(err));
      }
    });
    return dfd;
  },
  _initElements: function _initElements() {
    this.$emptyMessage = this.$(".jr-jEmptyMessage");
    this.$canvas = this.$(".jr-mChart");
  },
  _renderChart: function _renderChart(dfd) {
    // TODO: this conversion should be removed after refactoring chart datamapper
    var state = JSON.parse(JSON.stringify(this.adHocModel.toJSON()));
    var dataset = JSON.parse(JSON.stringify(this.adHocModel.dataSet.toJSON()));
    var linkOptions = this.options.linkOptions;
    var chartComponent = this.adHocModel.component.getChartComponent();
    var oldState = chartDataConverter(state, dataset, this.adHocModel, this.hyperlinkService);
    var messages = {
      totalsLabelForChart: AdHocBundle["adhoc.node.total.node"],
      allLabelForChart: AdHocBundle["adhoc.node.total.node"]
    };
    var clonedQueryData = JSON.parse(JSON.stringify(oldState.queryData));
    var clonedChartState = JSON.parse(JSON.stringify(oldState.chartState));
    AdhocDataProcessor.load(clonedQueryData);
    AdhocDataProcessor.messages = messages;
    this._savedChartData = {
      messages: messages,
      chartComponent: chartComponent,
      oldState: oldState,
      clonedQueryData: clonedQueryData,
      clonedChartState: clonedChartState,
      linkOptions: linkOptions
    };

    this._prepareConfigForHighcharts();

    this._callHighchartsToRenderChart();
  },
  _prepareConfigForHighcharts: function _prepareConfigForHighcharts() {
    var _this$_savedChartData = this._savedChartData,
        messages = _this$_savedChartData.messages,
        chartComponent = _this$_savedChartData.chartComponent,
        oldState = _this$_savedChartData.oldState,
        clonedQueryData = _this$_savedChartData.clonedQueryData,
        clonedChartState = _this$_savedChartData.clonedChartState,
        linkOptions = _this$_savedChartData.linkOptions;
    var extraOptions = {
      width: this._getContainerWidth() || 400,
      height: this._getContainerHeight() || 300,
      messages: messages,
      isTimeSeries: chartComponent.isTimeSeries()
    };
    var highchartsOptions = AdhocHighchartsAdapter.generateOptions(clonedQueryData, clonedChartState, extraOptions);
    this.hyperlinkService.perform(this, highchartsOptions);

    this._correctOptionsForVisualize(highchartsOptions, chartComponent, oldState);

    highchartsOptions.chart.renderTo = this.$(".jr-mChart")[0]; // Get fresh width and height of the container

    if (!highchartsOptions.chart.height) {
      highchartsOptions.chart.height = this._getContainerHeight();
    }

    if (!highchartsOptions.chart.width) {
      highchartsOptions.chart.width = this._getContainerWidth();
    }

    if (linkOptions && linkOptions.beforeRender) {
      linkOptions.beforeRender(this.hyperlinkService.getHyperlinks(highchartsOptions, this));
    }

    this._highchartsOptions = highchartsOptions;
  },
  _callHighchartsToRenderChart: function _callHighchartsToRenderChart() {
    this._destroyExistingCharts();

    try {
      this.highchartsInstance = new Highcharts.Chart(this._highchartsOptions);
    } catch (e) {
      this._destroyExistingCharts();

      var msg;

      if (/\#19/.test(e)) {
        msg = AdHocBundle["adhoc.error.highcharts.19"];
      } else if (/\#13/.test(e)) {
        msg = AdHocBundle["adhoc.error.highcharts.13"];
      } else {
        msg = AdHocBundle["adhoc.error.highcharts.default"];
      }

      throw {
        name: "error",
        type: "highchartsInternalError",
        data: {
          error: e,
          message: msg
        }
      };
    }
  },
  _destroyExistingCharts: function _destroyExistingCharts() {
    var _this = this;

    _.each(Highcharts.charts, function (chart) {
      chart && _this.$el === chart.renderTo && chart.destroy();
    });

    if (this.highchartsInstance && this.highchartsInstance.destroy) {
      this.highchartsInstance.destroy();
      this.highchartsInstance = undefined;
    }
  },
  _getContainerWidth: function _getContainerWidth() {
    return this.$el.parent().width();
  },
  _getContainerHeight: function _getContainerHeight() {
    return this.$el.parent().height();
  },
  _checkData: function _checkData() {
    var hasData = !this.adHocModel.dataSet.get("dataset").empty;

    if (hasData) {
      this.$emptyMessage.addClass("jr-isHidden");
      this.$canvas.removeClass("jr-isHidden");
    } else {
      this.$emptyMessage.removeClass("jr-isHidden");
      this.$canvas.addClass("jr-isHidden");
    }

    return hasData;
  },
  _correctOptionsForVisualize: function _correctOptionsForVisualize(highchartsOptions, chartComponent, oldState) {
    var format;

    if (chartComponent.isTimeSeries()) {
      if (_.contains(["hour", "minute", "second", "millisecond"], oldState.chartState.timeSeriesCategorizerName)) {
        if (oldState.chartState.timeSeriesCategorizerName === "hour") {
          format = "HH:mm";
        } else if (oldState.chartState.timeSeriesCategorizerName === "minute") {
          format = "HH:mm";
        } else if (oldState.chartState.timeSeriesCategorizerName === "second") {
          format = "HH:mm:ss";
        } else if (oldState.chartState.timeSeriesCategorizerName === "millisecond") {
          format = "HH:mm:ss.SSS";
        }

        highchartsOptions.tooltip.formatter = function () {
          var data, html;
          data = {
            pointX: moment(this.point.x, "x").tz(config.userTimezone).format(format),
            color: this.series.color,
            seriesName: this.series.name,
            value: Highcharts.numberFormat(this.point.y, 2)
          };
          html = _.template(timeSeriesTooltipFormatterTemplate)(data);
          return html;
        };
      }
    }
  },
  refresh: function refresh(dfd) {
    this.adHocModel.dataSet.resetDataset();
    this.render().done(_.bind(dfd.resolve, dfd)).fail(_.bind(dfd.reject, dfd));
    return dfd;
  },
  resize: function resize() {
    if (this._resizeTimer) {
      clearTimeout(this._resizeTimer);
    }

    this._resizeTimer = this._savedChartData && setTimeout(this._reactOnResize.bind(this), 250);
  },
  _reactOnResize: function _reactOnResize() {
    this._resizeTimer = null;
    AdhocDataProcessor.load(this._savedChartData.clonedQueryData);

    this._prepareConfigForHighcharts();

    this._callHighchartsToRenderChart();
  },
  isAcceptable: function isAcceptable(type) {
    return type !== "Table" && type !== "Crosstab";
  }
});

});