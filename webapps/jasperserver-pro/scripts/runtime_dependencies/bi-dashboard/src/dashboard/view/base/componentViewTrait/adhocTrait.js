define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var Report = require("runtime_dependencies/bi-report/src/bi/report/Report");

var AdHocView = require("runtime_dependencies/bi-adhoc/src/bi/adhoc/AdHocView");

var HoverMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu");

var Notification = require("runtime_dependencies/js-sdk/src/common/component/notification/Notification");

var LoadingDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/LoadingDialog");

var dashboardWiringStandardIds = require('../../../enum/dashboardWiringStandardIds');

var dashboardSettings = require('../../../dashboardSettings');

var menuContainerTemplate = require("text!../../../template/menuContainerTemplate.htm");

var menuOptionTemplate = require("text!../../../template/menuOptionTemplate.htm");

var jasperserverMessages = require("bundle!jasperserver_messages");

var defaultLinkOptions = require('../../../hyperlink/defaultLinkOptions');

var sandboxFactory = require('../../../factory/sandboxFactory');

var DashboardBundle = require("bundle!DashboardBundle");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var i18n = _extends({}, jasperserverMessages, DashboardBundle);

var exportOptions = [{
  label: i18n['jasper.report.view.hint.export.pdf'],
  action: 'pdf',
  params: {
    outputFormat: "pdf"
  }
}, {
  label: i18n['jasper.report.view.hint.export.excel'],
  action: 'excel',
  params: {
    outputFormat: "xls"
  }
}, {
  label: i18n['jasper.report.view.hint.export.excel.nopag'],
  action: 'excel.nopag',
  params: {
    outputFormat: "xls",
    ignorePagination: true
  }
}, {
  label: i18n['jasper.report.view.hint.export.rtf'],
  action: 'rtf',
  params: {
    outputFormat: "rtf"
  }
}, {
  label: i18n['jasper.report.view.hint.export.csv'],
  action: 'csv',
  params: {
    outputFormat: "csv"
  }
}, {
  label: i18n['jasper.report.view.hint.export.odt'],
  action: 'odt',
  params: {
    outputFormat: "odt"
  }
}, {
  label: i18n['jasper.report.view.hint.export.ods'],
  action: 'ods',
  params: {
    outputFormat: "ods"
  }
}, {
  label: i18n['jasper.report.view.hint.export.docx'],
  action: 'docx',
  params: {
    outputFormat: "docx"
  }
}, {
  label: i18n['jasper.report.view.hint.export.xlsx'],
  action: 'xlsx',
  params: {
    outputFormat: "xlsx"
  }
}, {
  label: i18n['jasper.report.view.hint.export.xlsx.nopag'],
  action: 'xlsx.nopag',
  params: {
    outputFormat: "xlsx",
    ignorePagination: true
  }
}, {
  label: i18n['jasper.report.view.hint.export.pptx'],
  action: 'pptx',
  params: {
    outputFormat: "pptx"
  }
}];
/**
 * @memberof adhocTrait
 * @access private
 * @desc checks if adhoc is Ad Hoc Chart
 * @param {object} adhocView
 * @returns {boolean}
 */

function isAdhocChart(adhocView) {
  return adhocView.$("> .dashletContent > .content > .jr-mAdhocViewer > .jr-mAdhoc-visualization > .jr-mVisualization-canvas > .jr-mChartContainer").length > 0;
}

function signalHandler(payload) {
  if (payload.name === dashboardWiringStandardIds.REFRESH_SLOT) {
    if (this.paramsModel.paramsChanged) {
      this.paramsModel.paramsChanged = false;
      this.component.params(extractExecutionParams(this));
    }

    this.refresh();
  } else if (payload.name === dashboardWiringStandardIds.APPLY_SLOT) {
    if (this.paramsModel.paramsChanged) {
      this.paramsModel.paramsChanged = false;
      this.isAdhocRan = false;
      this.component.params(extractExecutionParams(this));
      this.refresh();
    }
  }
}

function extractExecutionParams(self) {
  var fromProps = _.reduce(self.model.get("parameters"), function (memo, parameter) {
    if (parameter.parametrizeProperty) {
      memo.push(parameter.id);
    }

    return memo;
  }, []);

  return _.omit(self.paramsModel.attributes, fromProps);
}

function createReportInstance(resourceUri, params) {
  return new Report({
    resource: resourceUri,
    params: params,
    server: dashboardSettings.CONTEXT_PATH
  });
}

function processLinkOptions(AdhocView) {
  if (!AdhocView) {
    return;
  }

  var processedOptions = {
    events: {}
  },
      self = this;

  for (var event in defaultLinkOptions.events) {
    if (!processedOptions.events.hasOwnProperty(event)) {
      processedOptions.events[event] = function (ev, link) {
        var eventName = ev.eventType === "jr_hyperlink_interception" ? "click" : ev.type.toLowerCase();
        defaultLinkOptions.events[eventName] && defaultLinkOptions.events[eventName].call(self.component, ev, link, self);
      };
    }
  }

  return processedOptions;
}

function createAdhocViewInstance(resourceUri, params) {
  return new AdHocView({
    resource: resourceUri,
    container: this.$content,
    params: params,
    autoresize: true,
    server: dashboardSettings.CONTEXT_PATH
  });
}

function onAdhocSuccessfulRun(triggerComponentRendered) {
  this.hideMessage();
  toggleVizIcon.call(this);
  adjustTitleHeight.call(this);
  triggerComponentRendered !== false && this.trigger("componentRendered", self);
}

function toggleVizIcon() {
  var $content,
      showVizSelector = false;

  if (this.model.get('showVizSelectorIcon') !== undefined && this.$el && this.$el.find('.jr-mAdhoc-visualization-launcher').length) {
    showVizSelector = true;
    $content = this.$('> .dashletContent > .content');
    this.model.get('showVizSelectorIcon') ? $content.removeClass("hideVizLauncher") : $content.addClass("hideVizLauncher");
  }

  this.model.set('showVizSelector', showVizSelector);
}

function onAdhocFailedRun(errorObj) {
  if (errorObj.errorCode) {
    var errorContainer = this.$content.find('.jr-mMessageError');
    errorContainer.length ? errorContainer.parent().remove() : this.$content.empty();
    errorObj.errorCode = 'adhoc.' + errorObj.errorCode;
    this.showMessage(errorObj);
    this.trigger("componentRendered", this);
    this.ready.resolve();
  }
}

function exportReport(self, options, Notification, i18n, loading) {
  self.reportComponent["export"](options).done(function (result) {
    window.open(result.href);
  }).fail(function () {
    Notification.show({
      message: i18n["dashboard.dashlet.error.report.export.failed"]
    });
  }).always(function () {
    loading.close();
    loading.remove();
  });
}

function adjustTitleHeight() {
  this.$title = this.$('.jr-jAdhocVisualizationTitle');
  this.$titleText = this.$('.jr-jAdhocVisualizationTitleText');

  if (this.$title && this.$titleText) {
    this.$titleText.length > 0 && this.$titleText.css({
      height: 'auto'
    });
    this.$title.length > 0 && this.$title.css({
      height: this.$titleText.height()
    });
  }
}

module.exports = {
  _onViewInitialize: function _onViewInitialize() {
    this.$el.addClass("dashboardVisualization");
    this.listenTo(this.model, "signal", _.bind(signalHandler, this));
  },
  exportAs: function exportAs(options) {
    var updatedChartType,
        chartComponent,
        self = this,
        loading = new LoadingDialog({
      cancellable: false
    });
    loading.open();
    this.reportComponent = createReportInstance.call(this, this.createReportUri, this.component.params());
    this.reportComponent.run().then(function () {
      updatedChartType = self.component.canvas() && self.component.canvas().type;

      if (updatedChartType) {
        chartComponent = self.reportComponent.data().components[0];
        chartComponent.chartType = updatedChartType;
        self.reportComponent.updateComponent(chartComponent).done(function () {
          exportReport(self, options, Notification, i18n, loading);
        });
      } else {
        exportReport(self, options, Notification, i18n, loading);
      }
    });
  },
  updateAdhocLinkOptions: function updateAdhocLinkOptions() {
    this.component && this.component.linkOptions(processLinkOptions.call(this, this.component) || {});
  },

  /**
   * @memberof adhocTrait
   * @access protected
   * @desc initializes adhoc view component specific behavior
   */
  _initComponent: function _initComponent() {
    var self = this;

    _.bindAll(this, "updateAdhocLinkOptions");

    if (this.dashboardId) {
      var sandbox = sandboxFactory.get(this.dashboardId);
      sandbox.on("linkOptions", this.updateAdhocLinkOptions());
    }

    this.model.getReportResourceUri().done(function (uri, adhocUri, error) {
      if (error) {
        self._broken = true;
        onAdhocFailedRun.call(self, error);
      } else {
        self.createReportUri = uri;
        adhocUri = !_.isString(adhocUri) ? self.model.resource.resource.attributes.uri : adhocUri;
        self.component = createAdhocViewInstance.call(self, adhocUri, {});
        self.updateAdhocLinkOptions();
      }
    });
  },

  /**
   * @memberof adhocTrait
   * @access protected
   * @desc remove component, sign off all events remove sub components
   */
  _removeComponent: function _removeComponent(options) {
    var sessionExpired = options ? options.sessionExpired : false;
    !sessionExpired && this.isAdhocRan && this.component.destroy();
    !sessionExpired && this.reportComponent && this.reportComponent.destroy();
    this.component = null;
    this.reportComponent = null;
    this.isAdhocRan = false;
    this.exportMenu && this.exportMenu.remove();

    if (this.dashboardId) {
      var sandbox = sandboxFactory.get(this.dashboardId);
      sandbox.off("linkOptions", this.updateAdhocLinkOptions);
    }
  },
  _renderComponent: function _renderComponent() {
    if (this.toolbar) {
      var self = this;
      this.exportMenu = new HoverMenu(exportOptions, this.toolbar.getOptionView('export').$el, null, {
        menuContainerTemplate: menuContainerTemplate,
        menuOptionTemplate: menuOptionTemplate
      });

      _.each(exportOptions, function (option) {
        self.listenTo(self.exportMenu, "option:" + option.action, function () {
          self.exportMenu.hide();
          self.exportAs(option.params);
        });
      });
    }
  },
  _resizeComponent: function _resizeComponent() {
    if (this.component && this.isAdhocRan) {
      this.component.resize();
    }
  },
  notify: function notify(parameters) {
    var signals = _.reduce(this.model.get("outputParameters"), function (memo, param) {
      var value = parameters[param.id];

      if (value) {
        memo || (memo = {});
        memo[param.id] = _.isArray(value) ? value : [value];
      }

      return memo;
    }, false);

    if (signals) {
      this.model.notify(signals);
      this.model.collection.getDashboardPropertiesComponent().applyParameters();
    }
  },
  refresh: function refresh() {
    this.toolbar && this.toolbar.getOptionView("export").disable();
    var self = this,
        res = new $.Deferred(),
        dfd = this.cancel();
    dfd.always(function () {
      if (self.isAdhocRan) {
        self.ready.done(function () {
          self.isAdhocRunning = true;
          self.component.refresh().fail(res.reject).done(function () {
            onAdhocSuccessfulRun.call(self, false);
            res.resolve();
          });
        });
      } else {
        self.isAdhocRunning = true;

        if (self.component) {
          self.component.run().fail(res.reject).done(function () {
            self.isAdhocRan = true;
            onAdhocSuccessfulRun.call(self);
            res.resolve();
          });
        } else {
          self._broken || self.hideMessage();
          res.resolve();
        }
      }
    });
    res.fail(_.bind(onAdhocFailedRun, this)).always(_.bind(this._onAdhocRunFinished, this));
    return res;
  },
  cancel: function cancel() {
    return this.isAdhocRunning && this.component ? this.component.cancel() : new $.Deferred().resolve();
  },
  _onComponentRendered: function _onComponentRendered() {
    this.model.set("isAdhocChart", isAdhocChart(this));
  },
  _onAdhocRunFinished: function _onAdhocRunFinished() {
    this.isAdhocRunning = false;
    this.$el.addClass("rendered");
    this.isAdhocRan && this.toolbar && this.toolbar.getOptionView("export").enable();
  }
};

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});