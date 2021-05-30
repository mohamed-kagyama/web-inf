define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var Highcharts = require("highcharts-more");

var i18n = require("bundle!adhoc_messages");

require("highcharts-heatmap");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var api = {
  changeType: {}
};

var HCChart = function HCChart(config) {
  this.rdy = new $.Deferred();
  this.config = config;
  this.parent = null;
  this.loader = null;
  this.api = api;
  this.highchartsInstance = null;
  this.events = {
    ACTION_PERFORMED: "action",
    HYPERLINK_INTERACTION: "hyperlinkInteraction"
  };

  this._init();
};

HCChart.prototype = {
  changeType: function changeType(parms) {
    var it = this,
        payload = {
      action: {
        actionName: 'changeChartType',
        changeChartTypeData: {
          chartComponentUuid: it.config.chartUuid,
          chartType: parms.type
        }
      }
    };
    return this.loader.runAction(payload).then(function (jsonData) {
      it._notify({
        name: it.events.ACTION_PERFORMED,
        type: "changeChartType",
        data: jsonData
      });

      return it;
    });
  },
  render: function render(options) {
    var it = this,
        msg;
    options = options || {};

    if (options.recreateConfig) {
      if (it.highchartsInstance && it.highchartsInstance.destroy) {
        it.highchartsInstance.destroy();
        it.highchartsInstance = undefined;
      }

      it.rdy = new $.Deferred();

      it._init(options);
    }

    it.rdy.then(function () {
      try {
        it.highchartsInstance = new Highcharts.Chart(it.hcConfig);
      } catch (e) {
        if (/\#19/.test(e)) {
          msg = i18n["ADH_1214_ICHARTS_ERROR_TOO_MANY_VALUES"];
        } else {
          msg = i18n["ADH_1214_ICHARTS_ERROR_UNCAUGHT"];
        } // destroy the Highcharts chart instance


        $.each(Highcharts.charts, function (i, chart) {
          chart && it.hcConfig.chart.renderTo === chart.renderTo.id && chart.destroy();
        });

        if (it.highchartsInstance && it.highchartsInstance.destroy) {
          it.highchartsInstance.destroy();
          it.highchartsInstance = undefined;
        }

        it._notify({
          name: "error",
          type: "highchartsInternalError",
          data: {
            error: e,
            message: msg
          }
        });
      }
    });
  },
  // internal functions
  _init: function _init(options) {
    // apply chart services asynchronously
    var it = this,
        instanceData = this.config.hcinstancedata;
    options = options || {};
    this.config.globalOptions && Highcharts.setOptions(this.config.globalOptions);
    it.hcConfig = {};

    it._setConfigDefaults();

    var MasterDfd = new $.Deferred();
    MasterDfd.resolve();
    $.each(this.config.hcinstancedata.services, function (idx, entry) {
      var srv = entry.service;
      var srvData = entry.data;
      MasterDfd = MasterDfd.then(function () {
        var DFD = new $.Deferred();

        require([srv], function (Service) {
          if ('itemHyperlinkSettingService' === srv) {
            var hService = new Service(it, it.hcConfig, srvData);
            hService.hyperlinkSeriesPointClickedHandler = it._hyperlinkSeriesPointClicked;
            hService.perform();
          } else {
            Service.perform(it.hcConfig, srvData);
          }

          DFD.resolve();
        });

        return DFD;
      });
    }); // create the actual Highcharts chart

    MasterDfd.then(function () {
      it.hcConfig.chart.renderTo = instanceData.renderto;

      if (!options.ignoreSize) {
        it.hcConfig.chart.width = instanceData.width;
        it.hcConfig.chart.height = instanceData.height;
      }

      it.rdy.resolve();
    });
  },
  _hyperlinkSeriesPointClicked: function _hyperlinkSeriesPointClicked(hyperlinkData) {
    this._notify({
      name: this.events.HYPERLINK_INTERACTION,
      type: "hyperlinkClicked",
      data: hyperlinkData
    });
  },
  _notify: function _notify(evt) {
    // bubble the event
    this.parent._notify(evt);
  },
  _setConfigDefaults: function _setConfigDefaults() {
    if (this.config.charttype && this.config.charttype.indexOf("TreeMap") >= 0) {
      $.extend(true, this.hcConfig, {
        plotOptions: {
          treemap: {
            drillUpButton: {
              position: {
                y: -45
              }
            }
          }
        }
      });
    }
  }
};
module.exports = HCChart;

});