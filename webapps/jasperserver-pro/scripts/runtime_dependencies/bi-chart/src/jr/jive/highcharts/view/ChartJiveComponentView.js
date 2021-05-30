define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var $ = require('jquery');

var VisualChooserDialog = require("runtime_dependencies/bi-adhoc/src/adhoc/api/visualChooser/VisualChooserDialog");

var VisualizationTypesController = require("runtime_dependencies/bi-adhoc/src/adhoc/api/visualChooser/VisualizationTypesController");

var AlertDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/AlertDialog");

var chartMenuTemplate = require("text!../template/chartMenuTemplate.htm");

var i18nAdhoc = require("bundle!adhoc_messages");

var Highcharts = require('highcharts');

var reportCreators = require('./enum/reportCreatorEnum');

require("csslink!../theme/highcharts.csslink.css");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
* @author: Kostiantyn Tsaregradskyi
* @version: $Id: ChartJiveComponentView.js 3544 2015-11-05 22:05:36Z psavushc $
*/
var nextID = 0;

var getLogger = function getLogger() {
  nextID++;
  return function (myID) {
    return function () {//console.log.apply(console, [myID + ': ', ...arguments]);
    };
  }(nextID);
};

var services = {
  dataSettingService: "../services/dataSettingService",
  defaultSettingService: "../services/defaultSettingService",
  dualPieSettingService: "../services/dualPieSettingService",
  treemapSettingService: "../services/treemapSettingService",
  gaugeSettingService: "../services/gaugeSettingService",
  itemHyperlinkSettingService: "../services/itemHyperlinkSettingService",
  yAxisSettingService: "../services/yAxisSettingService"
};

function setAnimation(hcConfig, animation) {
  hcConfig.chart.animation = animation;
  hcConfig.plotOptions || (hcConfig.plotOptions = {});
  hcConfig.plotOptions.series || (hcConfig.plotOptions.series = {});
  hcConfig.plotOptions.series.animation = animation;
  hcConfig.legend || (hcConfig.legend = {});
  hcConfig.legend.navigation || (hcConfig.legend.navigation = {});
  hcConfig.legend.navigation.animation = animation;
  hcConfig.tooltip || (hcConfig.tooltip = {});
  hcConfig.tooltip.animation = animation;
}

var JiveHighcharts = function JiveHighcharts(config, $el, logger) {
  this._logger = logger || getLogger();
  this.initCompleteDfr = new $.Deferred();

  if (!config.hcinstancedata.width || !config.hcinstancedata.height) {
    this._logger('jive constructor: got wrong container with size:', config.hcinstancedata.width, config.hcinstancedata.height);

    this.initCompleteDfr.reject({
      name: "error",
      type: "wrongContainerSize",
      data: {
        width: config.hcinstancedata.width,
        height: config.hcinstancedata.height
      }
    });
    return;
  }

  this.config = config;
  this.instanceData = JSON.parse(JSON.stringify(this.config.hcinstancedata));
  this.renderTo = $el;
  this.parent = null;
  this.loader = null;
  this.highchartsInstance = null;
  this.services = services;

  this._init();
};

JiveHighcharts.prototype = {
  _init: function _init() {
    var _this = this;

    var allServicesDFD = new $.Deferred();

    if (this.config.globalOptions) {
      Highcharts.setOptions(this.config.globalOptions);
    }

    this.hcConfig = {};
    allServicesDFD.resolve();
    $.each(this.instanceData.services, function (idx, entry) {
      var srvName = entry.service,
          srv = services[entry.service] || srvName,
          serviceData = entry.data;
      allServicesDFD = allServicesDFD.then(function () {
        var dfd = new $.Deferred();

        require([srv], function (Service) {
          if ('itemHyperlinkSettingService' === srvName) {
            var extData = _.extend({}, serviceData, {
              linkOptions: _this.config.linkOptions
            });

            var hService = new Service(_this, _this.hcConfig, extData);
            hService.perform();
          } else {
            Service.perform(_this.hcConfig, serviceData, _this.config.linkOptions);
          }

          dfd.resolve();
        });

        return dfd;
      });
    });
    allServicesDFD.then(function () {
      var // take a look at issue JRS-18784 where you'll see how the chart takes
      // more space which it should take. To avoid this we'll set the chart are size little
      // bit smaller
      sizeCorrectionValue = 5;
      _this.hcConfig.chart.renderTo = $("#" + _this.instanceData.renderto, _this.renderTo)[0];
      _this.hcConfig.chart.width = _this.instanceData.width - sizeCorrectionValue;
      _this.hcConfig.chart.height = _this.instanceData.height - sizeCorrectionValue;

      if (_this.hcConfig.title && !_this.hcConfig.title.text) {
        _this.hcConfig.title = _this.instanceData.title;
      }

      if (!_.isUndefined(_this.config.chart.animation)) {
        setAnimation(_this.hcConfig, _this.config.chart.animation);
      }

      if (!_.isUndefined(_this.config.chart.zoom)) {
        _this.hcConfig.chart.zoomType = _this.config.chart.zoom;
      }

      _this.initCompleteDfr.resolve();
    });
  },
  render: function render() {
    var _this2 = this;

    var dfd = new $.Deferred();
    this.initCompleteDfr.then(function () {
      var _this2$_renderChart = _this2._renderChart(),
          status = _this2$_renderChart.status,
          error = _this2$_renderChart.error,
          errorMessage = _this2$_renderChart.errorMessage;

      if (status) {
        dfd.resolve();
      } else {
        dfd.reject({
          name: "error",
          type: "highchartsInternalError",
          data: {
            error: error,
            message: errorMessage
          }
        });
      }
    });
    return dfd;
  },
  _renderChart: function _renderChart() {
    try {
      this.highchartsInstance = new Highcharts.Chart(this.hcConfig);
    } catch (e) {
      this._destroyAllChartsWhichAreStillRendered();

      var errorMessage = i18nAdhoc["ADH_1214_ICHARTS_ERROR_UNCAUGHT"];

      if (/\#19/.test(e)) {
        errorMessage = i18nAdhoc["ADH_1214_ICHARTS_ERROR_TOO_MANY_VALUES"];
      }

      return {
        status: false,
        error: e,
        errorMessage: errorMessage
      };
    }

    return {
      status: true,
      error: null,
      errorMessage: ''
    };
  },
  remove: function remove() {
    if (this.highchartsInstance && this.highchartsInstance.destroy) {
      this.highchartsInstance.destroy();
      this.highchartsInstance = undefined;
    }
  },
  _destroyAllChartsWhichAreStillRendered: function _destroyAllChartsWhichAreStillRendered() {
    var _this3 = this;

    _.each(Highcharts.charts, function (chart) {
      if (chart && _this3.hcConfig.chart.renderTo === chart.renderTo) {
        chart.destroy();
      }
    });
  }
};
var opacityCssTransparent = {
  "opacity": "0.3"
},
    opacityCssVisible = {
  "opacity": "1"
};
module.exports = Backbone.View.extend({
  initialize: function initialize(options) {
    this._logger = getLogger();
    this.isRendered = false;
    this.initOptions = options;
    this.stateModel = this.initOptions.stateModel;
    this.report = this.initOptions.report;
    this.typesManager = new VisualizationTypesController();
  },
  render: function render($el, options) {
    var _this4 = this;

    this.renderTo = $el; // the model may get changed, so we need to re-initialize all variables which depends on model

    this.renderMenuTo = $('#' + this.model.get("hcinstancedata").renderto);
    var dialogId = this.model.get("id") + "_visualChooser";
    this.visualChooserDialogStateHolder = this.initOptions.dialogStates.register(dialogId, null);
    var dialogState = this.visualChooserDialogStateHolder.get();
    this.options = options || {};

    this._getSizeOfContainer();

    var componentRenderedDfr = this._renderComponent();

    componentRenderedDfr.done(function () {
      _this4.isRendered = true;
    });

    if (this.model.get("hcinstancedata").services && _.findWhere(this.model.get("hcinstancedata").services, {
      service: "adhocHighchartsSettingService"
    })) {
      var service = this.component.services.adhocHighchartsSettingService,
          isOlap = _.findWhere(this.model.get("hcinstancedata").services, {
        service: "adhocHighchartsSettingService"
      }).data.queryData.metadata.isOLAP,
          hyperlinks = [];

      if (service) {
        _.each(this.component.hcConfig.series, function (serie) {
          hyperlinks = hyperlinks.concat(_.map(serie.data, function (point) {
            return service.getHyperlink(serie, point, isOlap);
          }));
        });

        this.model.set("hyperlinks", hyperlinks);
      }
    }

    this.errorDialog = new AlertDialog({
      additionalCssClasses: 'jive_dialog'
    });
    this.listenTo(this.model, "serverError", function (error) {
      _this4.showError({
        devmsg: error.devmsg
      }); // If we see that the error happened on attempt to change the chart type
      // we need to get back the selected chart type.
      // We have such code because there is no promises on action to change chart type,
      // so we just can't request changing chart type, wait for successful completion and then
      // change the chart type on dialog.
      // The 'changeChartType' string borrowed from 'ChartComponentModel' file


      if (error.actionName === 'changeChartType') {
        var currentChart = _this4.model.get("charttype");

        _this4.visualChooserDialog.setSelectedType(currentChart);
      }
    });

    if (!this.model.get("interactive") || !this.stateModel.isDefaultJiveUiEnabled()) {
      componentRenderedDfr.resolve();
      return componentRenderedDfr;
    }

    this._setupVisualChooserDialog(); // append menu and setup listeners


    this._renderMenu();

    return componentRenderedDfr;
  },
  _getSizeOfContainer: function _getSizeOfContainer() {
    if (this.model.get("creator") === reportCreators.AD_HOC_DESIGNER) {
      this.model.set("hcinstancedata", _.extend({}, this.model.get("hcinstancedata"), {
        width: this.renderTo.width(),
        height: this.renderTo.height() || 400,
        title: {
          text: this.options.highchartsReportTitle || ""
        }
      }), {
        silent: true
      });
    }
  },
  _setupVisualChooserDialog: function _setupVisualChooserDialog() {
    if (this.visualChooserDialog) {
      return;
    }

    this.visualChooserDialog = new VisualChooserDialog({
      typesToExclude: ['Crosstab', 'Table']
    });
    this.listenTo(this.visualChooserDialog, 'visualizationTypeChange', this._onVisualizationTypeChange);
    this.listenTo(this.visualChooserDialog, 'close', this._onVisualChooserDialogCloseEvent);
    var currentChart = this.model.get("charttype");
    this.visualChooserDialog.setSelectedType(currentChart);
    var disabledTypes = [];

    if (!this.model.get("datetimeSupported")) {
      disabledTypes = disabledTypes.concat(['TimeSeriesLine', 'TimeSeriesSpline', 'TimeSeriesArea', 'TimeSeriesAreaSpline', 'TimeSeriesHeatMap']);
    }

    if (!this.model.get("treemapSupported")) {
      disabledTypes = disabledTypes.concat(['DualMeasureTreeMap', 'TreeMap', 'OneParentTreeMap']);
    }

    disabledTypes = _.uniq(disabledTypes);
    this.visualChooserDialog.setDisabledTypes(disabledTypes); // once the user has chosen the new visualization type this component gets removed and new one is rendered.
    // This is why we have this variable which hold the state.
    // So, if the dialog was opened on previous state we need to open and this one as well

    var dialogState = this.visualChooserDialogStateHolder.get();

    if (dialogState) {
      this.visualChooserDialog.applyDialogState(dialogState);
    }
  },
  _onVisualizationTypeChange: function _onVisualizationTypeChange(newType) {
    // the change of visualization will re-render this component, but we need to simulate
    // that the dialog left unchanged, so we need to save not only is it open or not, but also is location
    var dialogState = this.visualChooserDialog.getDialogState();
    this.visualChooserDialogStateHolder.set(dialogState);
    this.model.changeType({
      type: newType.type
    });
  },
  _onVisualChooserDialogCloseEvent: function _onVisualChooserDialogCloseEvent() {
    // need to record the closed dialog state because on next re-rendering the dialog may get opened
    // because we didn't update the register
    var dialogState = this.visualChooserDialog.getDialogState();
    dialogState.isDialogOpen = false;
    this.visualChooserDialogStateHolder.set(dialogState);
  },
  _renderComponent: function _renderComponent() {
    var _this5 = this;

    var componentRenderedDfr = new $.Deferred();
    var linkOptions = this.model.collection ? this.model.collection.linkOptions : null;

    var data = _.extend(this.model.toJSON(), {
      chart: _.clone(this.stateModel.get("chart"))
    });

    if (linkOptions) {
      data.linkOptions = linkOptions;
    }

    if (this.component && this.component.remove) {
      this.component.remove();
    }

    this.component = new JiveHighcharts(data, this.renderTo, this._logger);
    this.component.initCompleteDfr.done(function () {
      _this5.component.render().then(componentRenderedDfr.resolve, function (reason) {
        componentRenderedDfr.reject(reason);

        _this5._renderComponentFailed(reason);
      });
    });
    this.component.initCompleteDfr.fail(function (reason) {
      _this5._logger('failed to initialize JiveHighcharts component because', reason);

      componentRenderedDfr.reject(reason);
    });
    return componentRenderedDfr;
  },
  _renderComponentFailed: function _renderComponentFailed(reason) {
    if (reason.type === "highchartsInternalError") {
      var errorMessage = i18nAdhoc["ADH_1214_ICHARTS_ERROR_CANT_RENDER_CHART"] + ':' + reason.data.error;
      this.showError({
        devmsg: errorMessage
      });
    }
  },
  _renderMenu: function _renderMenu() {
    var _this6 = this;

    var $menu = $(_.template(chartMenuTemplate, {
      i18n: i18nAdhoc
    }));
    this.$menu = $menu;
    $menu.insertBefore(this.renderMenuTo);
    $menu.css({
      "top": "0"
    });
    $menu.css(opacityCssTransparent);
    var $chartSettingsIcon = $menu.find('.jive_chartSettingsIcon');
    var $chartMenu = $menu.find('.jive_chartMenu'); // make Chart Type selection button visible when active + expand menu on mouse over

    $chartSettingsIcon.on('mouseenter touchstart', function () {
      $chartSettingsIcon.addClass('over');
      $chartMenu.show().position({
        top: $chartSettingsIcon.height(),
        left: 0
      });
      $menu.css(opacityCssVisible);
    }); // make Chart Type selection button transparent when not active + hide menu on mouse leave

    $chartMenu.on('mouseleave touchend', function () {
      $chartSettingsIcon.removeClass('over');
      $chartMenu.hide();
      $menu.css(opacityCssTransparent);
    }); // highlighting selected element in menu

    $chartMenu.on('mouseenter touchstart', 'p.wrap', function () {
      $(this).addClass('over');
    });
    $chartMenu.on('mouseleave touchend', 'p.wrap', function () {
      $(this).removeClass('over');
    }); // open chart type selection dialog on click on that element

    $chartMenu.on('click touchend', 'li.jive_chartTypeMenuEntry', function (event) {
      event.preventDefault();
      event.stopPropagation(); // hide menu

      $chartMenu.hide();
      $chartSettingsIcon.removeClass('over'); // make Chart Type selection button transparent when not active

      $menu.css(opacityCssTransparent);

      _this6.visualChooserDialog.open();
    });
  },
  showError: function showError(result) {
    this.errorDialog.setMessage(result.devmsg);
    this.errorDialog.open();
  },
  setSize: function setSize(width, height, animation) {
    if (width < 1 || height < 1) {
      // no need to react on wrong resize event or wrong container size
      return;
    }

    if (!this.isRendered) {
      // no need to react on container resize event if we are rendered
      return;
    }

    if (this._resizeTimer) {
      clearTimeout(this._resizeTimer);
    }

    this._resizeTimer = setTimeout(this._reactOnResize.bind(this, animation), 500);
  },
  _reactOnResize: function _reactOnResize(animation) {
    this._resizeTimer = null;

    this._getSizeOfContainer();

    var currentChartType = this.model.get("charttype");
    var canBeResized = this.typesManager.doesChartSupportResizing(currentChartType);

    if (canBeResized) {
      var data = this.model.get('hcinstancedata');

      if (this.component && this.component.highchartsInstance) {
        this.component.highchartsInstance.setSize(data.width, data.height, animation);
      }
    } else {
      this._renderComponent();
    }
  },
  remove: function remove() {
    this.$menu && this.$menu.find('.jive_chartMenu').off('click mouseenter touchstart mouseleave touchend').find('.jive_chartSettingsIcon').off('mouseenter');
    this.$menu && this.$menu.remove();
    this.stopListening(this.visualChooserDialog);
    this.visualChooserDialog && this.visualChooserDialog.remove();
    this.errorDialog && this.errorDialog.remove();
    Backbone.View.prototype.remove.call(this, arguments);
  }
});

});