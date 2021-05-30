define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var Report = require("runtime_dependencies/bi-report/src/bi/report/Report");

var HoverMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/HoverMenu");

var Notification = require("runtime_dependencies/js-sdk/src/common/component/notification/Notification");

var LoadingDialog = require("runtime_dependencies/js-sdk/src/common/component/dialog/LoadingDialog");

var PaginationView = require("runtime_dependencies/js-sdk/src/common/component/pagination/Pagination");

var WebPageView = require("runtime_dependencies/js-sdk/src/common/component/webPageView/WebPageView");

var dashboardWiringStandardIds = require('../../../enum/dashboardWiringStandardIds');

var dashboardSettings = require('../../../dashboardSettings');

var defaultLinkOptions = require('../../../hyperlink/defaultLinkOptions');

var scaleStrategies = require("runtime_dependencies/bi-report/src/bi/report/enum/scaleStrategies");

var hyperlinkTypes = require("runtime_dependencies/bi-report/src/bi/report/jive/enum/hyperlinkTypes");

var sandboxFactory = require('../../../factory/sandboxFactory');

var reportOutputFormats = require("runtime_dependencies/bi-report/src/bi/report/enum/reportOutputFormats");

var browserDetection = require("runtime_dependencies/js-sdk/src/common/util/browserDetection");

var menuContainerTemplate = require("text!../../../template/menuContainerTemplate.htm");

var menuOptionTemplate = require("text!../../../template/menuOptionTemplate.htm");

var jasperserverMessages = require("bundle!jasperserver_messages");

var DashboardBundle = require("bundle!DashboardBundle");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var i18n = _extends({}, jasperserverMessages, DashboardBundle);

var log = logger.register("reportTrait");
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
 * @memberof reportTrait
 * @access private
 * @desc calculates scale factor, depends on scale strategy.
 * @param {string} scaleStrategy - container, page, width or height
 * @param {number} jrWidth - component width
 * @param {number} jrHeight - component height
 * @param {number} cWidth - container width
 * @param {number} cHeight - container height
 * @returns {number} scale
 */

function getScaleFactor(scaleStrategy, jrWidth, jrHeight, cWidth, cHeight) {
  var scale;

  if (scaleStrategy === scaleStrategies.WIDTH) {
    scale = cWidth / jrWidth;
  } else if (scaleStrategy === scaleStrategies.HEIGHT) {
    scale = cHeight / jrHeight;
  } else {
    var scaleV = cWidth / jrWidth,
        scaleH = cHeight / jrHeight;
    scale = scaleV * jrHeight < cHeight ? scaleV : scaleH;
  }

  return scale;
}
/**
 * @memberof reportTrait
 * @access private
 * @desc initializes pagination, if report has two or more pages. If pagination already initialized, refreshes then.
 * @param {object} options
 * @param {object} options.resetCurrent - reset current page on refresh
 */


function initPagination(options) {
  var self = this; // request export of 2 pages to know if pagination is needed. (array like func access due to IE8 issue)

  this.component && this.component["export"]({
    outputFormat: "html",
    pages: 2
  }).done(function () {
    var totalPages = self.component.data().totalPages; // pagination initialization with validation and event firing off. Needed in case of not fully loaded report so we can switch the pages in process of loading.

    if (!self.paginationView && totalPages !== 0) {
      self._initPagination({
        total: totalPages,
        silent: true,
        validate: false
      }); // make next buttons available


      self.paginationView.$el.find(".next, .prev, .first").prop("disabled", false);
    } else {
      totalPages > 1 && self._refreshPagination(totalPages, options);
    }
  });
}
/**
 * @memberof reportTrait
 * @access private
 * @desc checks if report is Ad Hoc Chart Report
 * @param {object} reportView
 * @returns {boolean}
 */


function isAdhocChartReport(reportView) {
  return reportView.$("> .dashletContent > .content > ._jr_report_container_ > .highcharts_parent_container").length > 0;
}

function signalHandler(payload, sender) {
  if (payload.name === dashboardWiringStandardIds.REFRESH_SLOT) {
    if (this.paramsModel.paramsChanged) {
      this.paramsModel.paramsChanged = false;
      this.component.params(extractExecutionParams(this));
    }

    this.refresh();
  } else if (payload.name === dashboardWiringStandardIds.APPLY_SLOT) {
    if (this.paramsModel.paramsChanged) {
      this.paramsModel.paramsChanged = false;
      this.component.params(extractExecutionParams(this));

      if (this.paginationView) {
        this.paginationView.resetSetOptions({
          silent: true,
          validate: false
        });
        this.paginationView.model.set(this.paginationView.model.defaults);
        this.paginationView.$el.find(".next, .prev, .first").prop("disabled", false);
      }

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

function convertHyperlinksParamsToVizJsApi(params) {
  var convertedParams = {};

  for (var param in params) {
    convertedParams[param] = _.isArray(params[param]) ? params[param] : [params[param]];
  }

  return convertedParams;
}

function processLinkOptions(report) {
  if (!report) {
    return;
  }

  var linkOptions = this.dashboardId ? sandboxFactory.get(this.dashboardId).get("linkOptions") || {} : {},
      processedOptions = {
    events: {}
  },
      self = this;

  for (var event in linkOptions.events) {
    processedOptions.events[event] = function (ev, link) {
      var eventName = ev.eventType === "jr_hyperlink_interception" ? "click" : ev.type.toLowerCase();
      linkOptions.events[eventName] && linkOptions.events[eventName].call(self.component, ev, link, _.bind(defaultLinkOptions.events[eventName], self.component, ev, link, self));
    };
  }

  for (var event in defaultLinkOptions.events) {
    if (!processedOptions.events.hasOwnProperty(event)) {
      processedOptions.events[event] = function (ev, link) {
        var eventName = ev.eventType === "jr_hyperlink_interception" ? "click" : ev.type.toLowerCase();
        defaultLinkOptions.events[eventName] && defaultLinkOptions.events[eventName].call(self.component, ev, link, self);
      };
    }
  }

  processedOptions.beforeRender = function (pairs) {
    defaultLinkOptions.discoverHyperlinkHandlers(pairs).done(function () {
      if (linkOptions.beforeRender) {
        linkOptions.beforeRender.call(self.component, pairs, _.bind(defaultLinkOptions.beforeRender, self.component, pairs, self));
      } else {
        defaultLinkOptions.beforeRender.call(self.component, pairs, self);
      }
    });
  };

  return processedOptions;
}

function destroyDrilldownComponent() {
  if (this.drilldownComponent) {
    this.drilldownComponent instanceof WebPageView ? this.drilldownComponent.remove() : this.drilldownComponent.destroy();
    this.drilldownComponent = null;
  }
}

function onReportCompleted(paginationView) {
  try {
    // if pagination was changed not through pagination control, but through another source (e.g. hyperlink),
    // we need to sync up pagination control with report
    if (!_.isUndefined(this.pages()) && paginationView && paginationView.model && this.pages() !== paginationView.model.get("current")) {
      var page = parseInt(_.isObject(this.pages()) ? this.pages().pages : this.pages(), 10);
      !isNaN(page) && paginationView.model.set("current", page);
    }
  } catch (ex) {
    // ignore "already.destroyed.error"
    if (ex.errorCode !== "already.destroyed.error") {
      log.error(ex.toString());
    }
  }
}

function onTotalPagesChange(totalPages) {
  if (totalPages > 1) {
    !this.paginationView ? this._initPagination({
      total: totalPages
    }) : this._refreshPagination(totalPages);
  } else {
    this.paginationView && this.paginationView.hide();
  }
}

function createReportInstance(resourceUri, params, pages) {
  var self = this,
      report = new Report({
    resource: resourceUri,
    container: this.$content,
    params: params,
    autoresize: false,
    server: dashboardSettings.CONTEXT_PATH,
    showAdhocChartTitle: true,
    scale: this.model.get("scaleToFit"),
    pages: _.isObject(pages) && _.isUndefined(pages.pages) && _.isUndefined(pages.anchor) || _.isUndefined(pages) ? 1 : pages,
    events: {
      changeTotalPages: _.bind(onTotalPagesChange, self),
      changePagesState: function changePagesState(page) {
        if (self.paginationView) {
          self.paginationView.model.set("current", page);
        } else {
          !_.isUndefined(this.data().totalPages) && this.data().totalPages > 1 && self._initPagination({
            current: page
          });
        } // update pages of current component to match inner state of report


        var oldPages = this.pages(),
            newPages = _.isObject(oldPages) ? {
          pages: page
        } : page; // do not loose anchor if it was set before

        if (_.isObject(oldPages) && !_.isUndefined(oldPages.anchor)) {
          newPages.anchor = oldPages.anchor;
        }

        this.pages(newPages);
      },
      reportCompleted: function reportCompleted() {
        onReportCompleted.call(this, self.paginationView);
      },
      beforeRender: function beforeRender() {
        self.hideMessage();

        if (self.component === this && self.drilldownComponent) {
          destroyDrilldownComponent.call(self);
          onTotalPagesChange.call(self, this.data().totalPages);
          onReportCompleted.call(this, self.paginationView);
        }
      }
    },
    defaultJiveUi: {
      floatingTableHeadersEnabled: true,
      floatingCrosstabHeadersEnabled: true
    }
  });
  this.dashboardId && report.properties(sandboxFactory.get(this.dashboardId).get("reportSettings") || {});
  return report;
}

function findJrPageTable($content) {
  //in phantomjs search by selector: this.$content.find("table.jrPage")
  //for some reason is not working, so we have to manually check classes
  var tableEl = $content.find("table")[0];
  var className = tableEl && tableEl.className;
  var isJrPage = className && className.indexOf("jrPage") >= 0;
  return isJrPage ? $(tableEl) : null;
}

function onReportSuccessfulRun(triggerComponentRendered) {
  this.hideMessage();
  triggerComponentRendered !== false && this.trigger("componentRendered", self);
  !isAdhocChartReport(this) && this._resetContentOverflow(this._calculateContentOverflow(this));
  toggleVizIcon.call(this);
  this.$el.find('.jrPage .highcharts_parent_container').attr("js-stdnav", "false");
  var isEmpty = !findJrPageTable(this.$content);
  isEmpty && this.showMessage({
    errorCode: "report.empty.error"
  });
}

function toggleVizIcon() {
  var showVizSelector = false;

  if (this.model.get('showVizSelectorIcon') !== undefined && this.$el && this.$el.find('.jive_chartSettingsIcon').length) {
    showVizSelector = true;
    this.model.get('showVizSelectorIcon') ? this.$('> .dashletContent > .content').removeClass("hideVizLauncher") : this.$('> .dashletContent > .content').addClass("hideVizLauncher");
  }

  this.model.set('showVizSelector', showVizSelector);
}

function onReportFailedRun(errorObj) {
  if (errorObj.errorCode !== "report.execution.cancelled") {
    this.paginationView && this.paginationView.hide();
    this.$content.empty();
    this.showMessage(errorObj);
    this.ready.resolve();
  }
}

function changeReportPages(component, pages) {
  if (!_.isUndefined(pages)) {
    component.pages(pages).run().done(_.bind(onReportSuccessfulRun, this)).fail(_.bind(onReportFailedRun, this));
  }
}

function buildOutputUrl(resource, output, pages, params) {
  var queryParams = _.extend({}, params),
      template = _.template("{{= contextPath }}/rest_v2/reports{{= resource }}.{{= output }}{{= params }}");

  !_.isUndefined(pages.pages) && (queryParams.pages = pages.pages);
  !_.isUndefined(pages.anchor) && (queryParams.anchor = pages.anchor);

  if (output === "xlsNoPag") {
    queryParams.ignorePagination = true;
    output = "xls";
  }

  if (output === "xlsxNoPag") {
    queryParams.ignorePagination = true;
    output = "xlsx";
  }

  return template({
    contextPath: dashboardSettings.CONTEXT_PATH,
    resource: resource,
    output: output,
    params: !_.isEmpty(queryParams) ? "?" + $.param(queryParams, true) : ""
  });
}

function buildOutputExportOptions(output, pages) {
  var exportOptions = {
    outputFormat: output,
    pages: pages
  };

  if (output === "xlsNoPag") {
    exportOptions.outputFormat = "xls";
  }

  if (output === "xlsxNoPag") {
    exportOptions.outputFormat = "xlsx";
  }

  return exportOptions;
}
/**
 * Factory to format error messages depending on error code
 */


var reportErrorMessageFactory = function () {
  var errorMessageFormatters = {};

  errorMessageFormatters["dashboard.dashlet.error.input.controls.validation.error"] = function (messageObj) {
    return i18n["dashboard.dashlet.error." + messageObj.errorCode];
  };

  return function (messageObj) {
    var formatter = errorMessageFormatters[messageObj.errorCode];
    return formatter ? formatter(messageObj) : i18n["dashboard.dashlet.error." + messageObj.errorCode] || i18n["dashboard.dashlet.error.unexpected.error"];
  };
}();

module.exports = {
  _onViewInitialize: function _onViewInitialize() {
    var self = this;
    this.$el.addClass("dashboardVisualization");
    this.listenTo(this.model, "signal", _.bind(signalHandler, this));

    if (this.model.lastPayload) {
      for (var key in this.model.lastPayload) {
        signalHandler.call(this, {
          name: key,
          value: this.model.lastPayload[key]
        }, this.model.lastSender[key]);
      }
    }
  },
  updateReportLinkOptions: function updateReportLinkOptions() {
    this.component && this.component.linkOptions(processLinkOptions.call(this, this.component) || {});
    this.drilldownComponent && this.drilldownComponent instanceof Report && this.drilldownComponent.linkOptions(processLinkOptions.call(this, this.drilldownComponent) || {});
  },
  updateReportSettings: function updateReportSettings() {
    this.component && this.component.properties(sandboxFactory.get(this.dashboardId).get("reportSettings") || {});
    this.drilldownComponent && this.drilldownComponent instanceof Report && this.drilldownComponent.properties(sandboxFactory.get(this.dashboardId).get("reportSettings") || {});
  },
  exportAs: function exportAs(options) {
    var component = this.drilldownComponent && this.drilldownComponent instanceof Report ? this.drilldownComponent : this.component,
        loading = new LoadingDialog({
      cancellable: false
    });
    loading.open();
    component["export"](options).done(function (result) {
      window.open(result.href);
    }).fail(function () {
      Notification.show({
        message: i18n["dashboard.dashlet.error.report.export.failed"]
      });
    }).always(function () {
      loading.close();
      loading.remove();
    });
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @desc initializes report component specific behavior
   */
  _initComponent: function _initComponent() {
    var self = this;

    _.bindAll(this, "updateReportLinkOptions", "updateReportSettings");

    if (this.dashboardId) {
      var sandbox = sandboxFactory.get(this.dashboardId);
      sandbox.on("linkOptions", this.updateReportLinkOptions);
      sandbox.on("reportSettings", this.updateReportSettings);
    }

    this.model.getReportResourceUri().done(function (uri, error) {
      if (error) {
        self._broken = true;
        onReportFailedRun.call(self, error);
      } else {
        self.component = createReportInstance.call(self, uri, {}); //set linkOptions manually first time

        self.updateReportLinkOptions();
      }
    });
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @desc remove component, sign off all events remove sub components
   */
  _removeComponent: function _removeComponent(options) {
    var sessionExpired = options ? options.sessionExpired : false;
    !sessionExpired && this.isReportRan && this.component.destroy();
    this.component = null;
    destroyDrilldownComponent.call(this);
    this.isReportRan = false;

    if (this.dashboardId) {
      var sandbox = sandboxFactory.get(this.dashboardId);
      sandbox.off("linkOptions", this.updateReportLinkOptions);
      sandbox.off("reportSettings", this.updateReportSettings);
    }

    this._removePagination();

    this.exportMenu && this.exportMenu.remove();
  },
  _renderComponent: function _renderComponent() {
    if (this.drilldownComponent && this.drilldownComponent instanceof WebPageView) {
      if (this.paginationView) {
        this.paginationView.hide();
        this.resizeContentContainer();
      }

      this.drilldownComponent.render(this.$content);
      this.trigger("componentRendered", this);
    } else if (this.drilldownComponent && this.drilldownComponent instanceof Report) {
      this.drilldownComponent.render(_.bind(this.trigger, this, "componentRendered", this));
      !isAdhocChartReport(this) && this._resetContentOverflow(this._calculateContentOverflow());
    } else {
      // usually initial run triggered after wiring is initialized and initial parameters for reports are set
      if (this.isReportRan) {
        this.component.render(_.bind(this.trigger, this, "componentRendered", this));
        !isAdhocChartReport(this) && this._resetContentOverflow(this._calculateContentOverflow());
      }
    }

    if (this.toolbar) {
      var self = this; //TODO: remove object with 'menuContainerTemplate' and 'menuOptionTemplate' when designing new JS component
      // required fix for JRS-10104

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
    if (this.drilldownComponent) {
      if (this.drilldownComponent instanceof Report) {
        if (this.isReportRan) {
          this.drilldownComponent.resize();
          !isAdhocChartReport(this) && this._resetContentOverflow(this._calculateContentOverflow());
        }
      } // we do nothing when we have active web page drilldown

    } else if (this.component) {
      if (this.isReportRan) {
        this.component.resize();
        !isAdhocChartReport(this) && this._resetContentOverflow(this._calculateContentOverflow());
      }
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
  drilldown: function drilldown(drilldownInfo) {
    var params = drilldownInfo.parameters ? convertHyperlinksParamsToVizJsApi(drilldownInfo.parameters) : undefined,
        output = drilldownInfo.parameters && !_.isUndefined(drilldownInfo.parameters._output) ? drilldownInfo.parameters._output : undefined,
        pages,
        self = this;

    if (!_.isUndefined(drilldownInfo.pages)) {
      pages = {
        pages: drilldownInfo.pages
      };
    }

    if (!_.isUndefined(drilldownInfo.anchor)) {
      pages = _.extend({
        anchor: drilldownInfo.anchor
      }, pages);
    }

    if (drilldownInfo.type === hyperlinkTypes.REFERENCE) {
      destroyDrilldownComponent.call(this); // URLs can contain javascript functions. Ignore them in this case

      if (drilldownInfo.href.indexOf("javascript:") > -1) {
        return;
      } else {
        this.drilldownComponent = new WebPageView({
          url: drilldownInfo.href
        });
        this.render();
      }
    } else if (drilldownInfo.type === hyperlinkTypes.REPORT_EXECUTION) {
      if (!_.isUndefined(output) && output !== reportOutputFormats.HTML) {
        // iOS doesn't support downloading files. So instead we open a new browser tab with file to give user
        // ability to decide what to do with this file.
        // To open a new tab, we emulate click on <a href="...">. We cannot wait for Viz.js export, so we
        // are using rest_v2/reports service here.
        if (_.isUndefined(pages)) {
          pages = {};
        }

        if (browserDetection.isIOS()) {
          var a = document.createElement('a');
          a.setAttribute("href", buildOutputUrl(drilldownInfo.resource, output, pages, params));
          a.setAttribute("target", "_blank");
          var dispatch = document.createEvent("HTMLEvents");
          dispatch.initEvent("click", true, true);
          a.dispatchEvent(dispatch);
        } else {
          var exportOptions = buildOutputExportOptions(output, pages),
              report = new Report({
            resource: drilldownInfo.resource,
            params: params,
            server: dashboardSettings.CONTEXT_PATH,
            showAdhocChartTitle: true,
            ignorePagination: output === "xlsNoPag" || output === "xlsxNoPag",
            pages: _.isUndefined(pages.pages) && _.isUndefined(pages.anchor) ? 1 : pages
          });
          report.run().done(function () {
            report["export"](exportOptions).done(function (link) {
              var url = link.href || link;

              if (self.dashboardId && sandboxFactory.get(self.dashboardId).get("previewMode")) {
                sandboxFactory.get(self.dashboardId).set("disablePageLeaveConfirmation", true);
              }

              window.location.href = url;

              if (self.dashboardId && sandboxFactory.get(self.dashboardId).get("previewMode")) {
                _.defer(function () {
                  sandboxFactory.get(self.dashboardId).set("disablePageLeaveConfirmation", false);
                });
              }
            });
          });
        }
      } else {
        if (drilldownInfo.resource === this.component.resource()) {
          destroyDrilldownComponent.call(this);

          if (params) {
            this.component.params(params);
            this.refresh().done(_.bind(changeReportPages, this, this.component, pages));
          } else {
            changeReportPages.call(this, this.component, pages);
          }
        } else if (this.drilldownComponent && this.drilldownComponent instanceof Report && drilldownInfo.resource === this.drilldownComponent.resource()) {
          if (params) {
            this.drilldownComponent.params(params).refresh().done(_.bind(changeReportPages, this, this.drilldownComponent, pages)).fail(_.bind(onReportFailedRun, this));
          } else {
            changeReportPages.call(this, this.drilldownComponent, pages);
          }
        } else {
          destroyDrilldownComponent.call(this);
          this.paginationView && this.paginationView.hide();
          this.paginationView && this.resizeContentContainer();
          this.drilldownComponent = createReportInstance.call(this, drilldownInfo.resource, params, pages);
          this.updateReportLinkOptions();
          this.drilldownComponent.run().done(_.bind(onReportSuccessfulRun, this)).fail(_.bind(onReportFailedRun, this));
        }
      }
    }
  },
  refresh: function refresh() {
    this.toolbar && this.toolbar.getOptionView("export").disable();
    var self = this,
        res = new $.Deferred(),
        dfd = this.cancel();
    dfd.always(function () {
      if (self.isReportRan) {
        self.ready.done(function () {
          self.isReportRunning = true;
          destroyDrilldownComponent.call(self);
          self.component.refresh().fail(res.reject).done(function () {
            var options = self.isPageChangingWhileReportIsRunning || {
              resetCurrent: true
            };
            initPagination.call(self, options);
            onReportSuccessfulRun.call(self, false);
            res.resolve();
            self.isPageChangingWhileReportIsRunning = false;
          });
        });
      } else {
        self.isReportRunning = true; // in some cases, like Undo All, component may not exist at this time, so need additional checks

        if (self.component) {
          self.component.run().fail(res.reject).done(function () {
            self.isReportRan = true;
            initPagination.call(self);
            self.resizeContentContainer();
            onReportSuccessfulRun.call(self);
            res.resolve();
          });
        } else {
          self._broken || self.hideMessage();
          res.resolve();
        }
      }
    });
    res.fail(_.bind(onReportFailedRun, this)).always(_.bind(this._onReportRunFinished, this));
    return res;
  },
  cancel: function cancel() {
    return this.isReportRunning && this.component ? this.component.cancel() : new $.Deferred().resolve();
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @param {object} options - pagination options.
   * @desc initializes pagination. Renders it, and attaches events.
   */
  _initPagination: function _initPagination(options) {
    var pagination = this.paginationView = new PaginationView(options);

    this._initPaginationEvents(pagination);

    this.$content.before(pagination.render().$el);
    !this.model.get("showPaginationControl") && pagination.hide();
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @param {object} options - paginationView.
   * @desc initializes pagination events.
   */
  _initPaginationEvents: function _initPaginationEvents(paginationView) {
    var self = this;
    this.listenTo(paginationView, "pagination:change", function (currentPage) {
      var report = self.drilldownComponent && self.drilldownComponent instanceof Report ? self.drilldownComponent : self.component;

      if (!self.isPageChangingWhileReportIsRunning) {
        self.isPageChangingWhileReportIsRunning = this.isReportRunning ? true : false;
      }

      report.pages(currentPage).run().done(_.bind(function () {
        // when event firing is off we still need to update pagination input.
        paginationView.options.silent && paginationView.$el.find(".current").val(currentPage);
      }, this)).fail(_.bind(function () {
        paginationView.model.set("current", paginationView.model.defaults.current);
      }, this)).always(_.bind(this._onReportRunFinished, this));
    });
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @param {number} totalPages - set total pages
   * @param {object} options
   * @param {boolean} [options.resetCurrent] - reset or not current page
   * @desc Refreshes pagination.
   */
  _refreshPagination: function _refreshPagination(totalPages, options) {
    var setOptions = {
      "total": totalPages
    };

    if (options && options.resetCurrent) {
      setOptions.current = this.paginationView.model.defaults.current;
    } // returns pagination validation into default state


    this.paginationView.resetSetOptions();
    this.paginationView.model.set(setOptions);
    this.model.get("showPaginationControl") && this.paginationView.show();
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @param {object} [overflow]
   * @param {string} [overflow.overflowX=auto]
   * @param {string} [overflow.overflowY=auto]
   * @desc Resets content overflow.
   */
  _resetContentOverflow: function _resetContentOverflow(overflow) {
    var overflow = overflow || {};
    this.$content.css({
      "overflow-x": overflow.overflowX || "auto",
      "overflow-y": overflow.overflowY || "auto"
    });
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @desc Calculates if overflow is needed.
   */
  _calculateContentOverflow: function _calculateContentOverflow() {
    var overflowX = "auto";
    var overflowY = "auto";
    var jrPage = findJrPageTable(this.$content);
    var jrPageW = jrPage && jrPage.outerWidth();
    var jrPageH = jrPage && jrPage.outerHeight();
    var contentW = this.$content.outerWidth();
    var contentH = this.$content.outerHeight();
    var scaleStrategy = this.model.get("scaleToFit");
    var scaleFactor = scaleStrategy !== 1 ? getScaleFactor(scaleStrategy, jrPageW, jrPageH, contentW, contentH) : 1;
    contentW >= Math.floor(jrPageW * scaleFactor) && (overflowX = "hidden");
    contentH >= Math.floor(jrPageH * scaleFactor) && (overflowY = "hidden");
    return {
      overflowX: overflowX,
      overflowY: overflowY
    };
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @desc Removes pagination.
   */
  _removePagination: function _removePagination() {
    if (this.paginationView) {
      this.stopListening(this.paginationView);
      this.paginationView.remove();
      this.paginationView = null;
    }
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @desc on component rendered event handler. If report is a chart, then scale stategy sets to container. Else content overflow is being calculated.
   */
  _onComponentRendered: function _onComponentRendered() {
    this.model.set("isAdhocChart", isAdhocChartReport(this));
  },
  _onReportRunFinished: function _onReportRunFinished() {
    this.isReportRunning = false;
    this.$el.addClass("rendered");
    this.toolbar && this.toolbar.getOptionView("export").enable();
  },

  /**
   * @memberof reportTrait
   * @access protected
   * @desc on component properties change event handler. Triggers after some properties were changed through properties dialog.
   */
  _onComponentPropertiesChange: function _onComponentPropertiesChange() {
    // Re-render report only when visual props have changed
    if (this.model.hasChanged("scaleToFit")) {
      this.component.scale(this.model.get("scaleToFit"));

      this._renderComponent();

      this._resetContentOverflow(this._calculateContentOverflow());
    }

    if (this.model.hasChanged("showPaginationControl") && this.paginationView) {
      if (this.model.get("showPaginationControl") && this.paginationView.model.get("total") > 1) {
        this.paginationView.show();
        this.resizeContentContainer();
      } else if (!this.model.get("showPaginationControl")) {
        this.paginationView.hide();
        this.resizeContentContainer();
      }
    }
  },
  _errorMessageFactory: reportErrorMessageFactory
};

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

});