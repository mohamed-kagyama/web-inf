define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

var $ = require("jquery");

var VisualChooserDialog = require("runtime_dependencies/bi-adhoc/src/adhoc/api/visualChooser/VisualChooserDialog");

var chartMenuTemplate = require("text!runtime_dependencies/bi-chart/src/jr/jive/highcharts/template/chartMenuTemplate.htm");

var i18nAdhoc = require("bundle!adhoc_messages");

var browserDetection = require("runtime_dependencies/js-sdk/src/common/util/browserDetection");

require("csslink!runtime_dependencies/bi-chart/src/jr/jive/highcharts/theme/highcharts.csslink.css");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Narcis Marcu (nmarcu@tibco.com)
 */
var opacityCssTransparent = {
  "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=30)",
  "filter": "alpha(opacity=30)",
  "opacity": "0.3"
},
    opacityCssVisible = {
  "-ms-filter": "progid:DXImageTransform.Microsoft.Alpha(Opacity=100)",
  "filter": "alpha(opacity=100)",
  "opacity": "1"
};
var ChartSelector = {
  init: function init(report) {
    var self = this;
    this._reportInstance = report;

    if (!this._dialog) {
      this._dialog = new VisualChooserDialog({
        typesToExclude: ['Crosstab', 'Table']
      });

      this._dialog.on('visualizationTypeChange', this._onVisualizationTypeChange, this);
    }

    $.each(report.components.chart, function () {
      var chart = this;

      if (!chart.config.interactive) {
        return;
      }

      self._insertMenu(chart.config.hcinstancedata.renderto, chart.config.chartUuid);
    });
  },
  _onVisualizationTypeChange: function _onVisualizationTypeChange(newType) {
    this._currentChart.changeType({
      type: newType.type
    });

    this._dialog.setSelectedType(newType.type);
  },
  _insertMenu: function _insertMenu(location, uuid) {
    var $menu = $(_.template(chartMenuTemplate, {
      i18n: i18nAdhoc
    })),
        self = this;
    $menu.insertBefore("#" + location);
    $menu.css({
      "top": "0"
    });

    if (!browserDetection.isIE8()) {
      $menu.css(opacityCssTransparent);
    }

    var $chartSettingsIcon = $menu.find('.jive_chartSettingsIcon');
    $chartSettingsIcon.data("chartuuid", uuid); // make Chart Type selection button visible when active

    $chartSettingsIcon.on('mouseenter', function () {
      if (!browserDetection.isIE8()) {
        $(this).parent().css(opacityCssVisible);
      }

      self._currentChartUuid = $(this).data("chartuuid");
    }); // make Chart Type selection button transparent when not active

    $menu.find('.jive_chartMenu').on('mouseleave touchend', function () {
      if (!browserDetection.isIE8()) {
        $(this).parent().css(opacityCssTransparent);
      }
    }); // expand menu on mouse over

    $chartSettingsIcon.on('mouseenter', function () {
      var jo = $(this);
      jo.addClass('over');
      jo.next('.jive_chartMenu').show().position({
        top: jo.height(),
        left: 0
      });
    }); // hide menu on mouse leave

    $menu.find('.jive_chartMenu').on('mouseleave touchend', function () {
      var jo = $(this);
      jo.prev('.jive_chartSettingsIcon').removeClass('over');
      jo.hide();
    }); // highlighting selected element in menu

    $menu.find('.jive_chartMenu').on('mouseenter touchstart', 'p.wrap', function () {
      $(this).addClass('over');
    });
    $menu.find('.jive_chartMenu').on('mouseleave touchend', 'p.wrap', function () {
      $(this).removeClass('over');
    }); // open chart type selection dialog on click on that element

    $menu.find('.jive_chartMenu').on('click touchend', 'li.jive_chartTypeMenuEntry', function () {
      var currentChart = self._currentChart = _.find(self._reportInstance.components.chart, function (chart) {
        return chart.config.chartUuid === self._currentChartUuid;
      });

      var disabledTypes = [];

      if (!currentChart.config.datetimeSupported) {
        disabledTypes = disabledTypes.concat(['TimeSeriesLine', 'TimeSeriesSpline', 'TimeSeriesArea', 'TimeSeriesAreaSpline', 'TimeSeriesHeatMap']);
      }

      if (!currentChart.config.treemapSupported) {
        disabledTypes = disabledTypes.concat(['DualMeasureTreeMap', 'TreeMap', 'OneParentTreeMap']);
      }

      if (!currentChart.config.gaugesSupported) {
        disabledTypes = disabledTypes.concat(['Gauge', 'MultiLevelGauge', 'ArcGauge']);
      }

      disabledTypes = _.uniq(disabledTypes);

      self._dialog.setDisabledTypes(disabledTypes);

      self._dialog.setSelectedType(currentChart.config.charttype);

      self._dialog.open();
    });
  }
};
module.exports = ChartSelector;

});