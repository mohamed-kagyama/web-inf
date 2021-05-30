define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var $ = require('jquery');

var ReportView = require('./view/ReportView');

var ReportStateStack = require('./model/ReportStateStack');

var PageComponentMetaCollection = require('./jive/collection/PageComponentMetaCollection');

var ReportComponentMetaCollection = require('./jive/collection/ReportComponentMetaCollection');

var ReportComponentCollection = require('./jive/collection/ReportComponentCollection');

var ReportModel = require('./model/ReportModel');

var ExportModel = require('./model/ReportExportModel');

var biComponentErrorFactoryReportProxy = require('./error/biComponentErrorFactoryReportProxy');

var reportEvents = require('./enum/reportEvents');

var reportStatuses = require('./enum/reportStatuses');

var reportOutputFormats = require('./enum/reportOutputFormats');

var request = require("request");

var logger = require("runtime_dependencies/js-sdk/src/common/logging/logger");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Kostiantyn Tsaregradskyi
 * @version: $Id$
 */
var log = logger.register("ReportController");

function runNonFillingAction(action) {
  var dfd = new $.Deferred(),
      self = this;
  this.view.showOverlay();
  this.model.runAction(action).then(function (result) {
    self.view.hideOverlay();
    dfd.resolve(result);
  }, function (response) {
    self.view.hideOverlay();
    dfd.reject(response);
  });
  return dfd;
}

function runAction(action) {
  var dfd = new $.Deferred(),
      self = this,
      actionObj;
  actionObj = action.options && action.options.showErrorDialog ? _.omit(action, "options") : action;
  this.view.showOverlay();
  this.model.runAction(actionObj).then(_.bind(self.model.updateStatus, self.model), function (xhr) {
    return dfd.reject(xhr);
  }).then(function () {
    if (self.model.isFailed() || self.model.isCancelled()) {
      dfd.reject({
        source: "execution",
        status: self.model.get("status"),
        errorDescriptor: self.model.get("errorDescriptor")
      });
    } else {
      action.silent || self.trigger(reportEvents.AFTER_REPORT_EXECUTION);
      self.fetchPageHtmlExportAndJiveComponents({
        silent: action.silent
      }).done(dfd.resolve).fail(dfd.reject);
    }
  }, function (xhr) {
    dfd.reject(xhr);
  });
  dfd.fail(function (response) {
    action = _.isArray(action) ? _.reduce(action) : action;
    var handlerError;
    var actionName = action.actionName + "Data";
    var actionObject = action[actionName];
    var showErrorDialog = action.options && action.options.showErrorDialog;

    if (response.readyState === 4 && response.status === 500) {
      if (showErrorDialog) {
        if (actionObject.chartComponentUuid) {
          handlerError = self.components.find(function (model) {
            return model.get("chartUuid") == actionObject.chartComponentUuid;
          });
        } else {
          handlerError = self.components.get(actionObject[actionObject.chartComponentUuid ? "chartComponentUuid" : "tableUuid"]);
        }
      }

      if (handlerError && handlerError.handleServerError) {
        handlerError.handleServerError(_.extend({}, action, response.responseJSON.result));
      }
    }

    if (response.type === "highchartsInternalError") {
      if (showErrorDialog) {
        if (actionObject.chartComponentUuid) {
          handlerError = self.components.find(function (model) {
            return model.get("chartUuid") == actionObject.chartComponentUuid;
          });
        } else {
          handlerError = self.components.get(actionObject[actionObject.chartComponentUuid ? "chartComponentUuid" : "tableUuid"]);
        }
      }

      if (handlerError && handlerError.handleClientError) {
        handlerError.handleClientError(response);
      }
    }

    self.view.hideOverlay();
  });
  return dfd;
}

function ReportController(stateModel) {
  var self = this;
  this.model = new ReportModel();
  this.stateModel = stateModel;
  this.pageComponentsMeta = new PageComponentMetaCollection([], {
    report: this.model
  });
  this.reportComponentsMeta = new ReportComponentMetaCollection([], {
    report: this.model
  });
  this.components = new ReportComponentCollection([], {
    report: this.model,
    pageComponentsMeta: this.pageComponentsMeta,
    reportComponentsMeta: this.reportComponentsMeta,
    stateModel: stateModel
  });
  this.view = new ReportView({
    model: this.model,
    collection: this.components,
    stateModel: stateModel
  });
  this.stateStack = new ReportStateStack(); // dirty hack to make JIVE work now

  this.model.components = this.components;
  this.model.config = {
    container: this.view.$el
  };

  if (!this.model.getExport(reportOutputFormats.HTML)) {
    this.model.addExport({
      options: {
        outputFormat: reportOutputFormats.HTML
      }
    });
  }

  this.listenTo(this.model.getExport(reportOutputFormats.HTML), "change:outputFinal", function () {
    self.trigger(reportEvents.PAGE_FINAL, this.model.getExport(reportOutputFormats.HTML).getHTMLOutput());
  });
  this.listenTo(this.components, reportEvents.ACTION, this.runReportAction);
  this.listenTo(this.model, "change:status", function () {
    log.info("Report status changed to '" + self.model.get("status") + "'");

    if (self.model.isReady()) {
      self.model.update().done(function () {
        if (self.exportDfd) {
          self.exportDfd.done(function () {
            log.info("Report total pages number is " + self.model.get("totalPages"));
            var exp = self.model.getExport(reportOutputFormats.HTML);

            if (exp.get("outputFinal")) {
              self.fetchReportJiveComponents().then(function () {
                // HTML is final, don't need to reload.
                self.trigger(reportEvents.REPORT_COMPLETED, self.model.get("status"));
              }, function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(reportStatuses.FAILED);
                args.unshift(reportEvents.REPORT_COMPLETED);
                self.trigger.apply(self, args);
              });
            } else if (!exp.get("outputEmpty")) {
              self.fetchPageHtmlExportAndJiveComponents().fail(function () {
                var args = Array.prototype.slice.call(arguments);
                args.unshift(reportStatuses.FAILED);
                args.unshift(reportEvents.REPORT_COMPLETED);
                self.trigger.apply(self, args);
              });
            } else {
              self.trigger(reportEvents.REPORT_COMPLETED, self.model.get("status"));
            }
          });
        }
      });
    } else if (self.model.isCancelled() || self.model.isFailed()) {
      var errorDescriptor = self.model.get("errorDescriptor");

      if (self.model.isFailed() && errorDescriptor != null && errorDescriptor.message) {
        log.error(errorDescriptor.message);
      }

      self.trigger(reportEvents.REPORT_COMPLETED, self.model.get("status"), {
        source: "execution",
        status: self.model.get("status"),
        errorDescriptor: errorDescriptor
      });
    }
  });
  this.listenTo(this.model, "change:pageStatus", function () {
    var htmlExport = self.model.getExport(reportOutputFormats.HTML);

    if (!self.model.isReady() && !htmlExport.get("outputFinal") && (self.model.get("pageStatus").pageFinal || self.model.get("pageStatus").timestamp > htmlExport.get("outputTimestamp"))) {
      log.info("page updated from " + htmlExport.get("outputTimestamp") + " to " + self.model.get("pageStatus").timestamp);
      self.fetchPageHtmlExportAndJiveComponents();
    }
  });
  log.debug("Attach first `REQUESTED_PAGES_READY` event listener to report");
  this.once(reportEvents.REQUESTED_PAGES_READY, function (rc, dfd) {
    dfd.resolve();

    if (!self.model.isCompleted()) {
      self.model.waitForExecution();
    } // first REQUESTED_PAGES_READY event differs a bit from consequent events


    log.debug("Attach second `REQUESTED_PAGES_READY` event listener to report");
    self.on(reportEvents.REQUESTED_PAGES_READY, function (rc, dfd) {
      if (!self.model.isCompleted()) {
        self.model.waitForExecution();
      }

      if (self._reportRenderFinished) {
        self.view.renderReport();
        self.view.renderJive().done(function () {
          dfd.resolve();

          if (self.model.isReady()) {
            self.trigger(reportEvents.REPORT_COMPLETED, self.model.get("status"));
          }
        }).fail(function (ex) {
          dfd.reject(ex);
        });
      }
    });
  });
  this.on(reportEvents.AFTER_REPORT_EXECUTION, function () {
    self.model.execution.set({
      "pages": 1,
      "anchor": undefined
    });

    _.extend(self.model.getExport(reportOutputFormats.HTML).get("options"), {
      "pages": 1,
      "anchor": undefined
    });
  });
}

_.extend(ReportController.prototype, Backbone.Events, {
  undoReportAction: function undoReportAction() {
    var self = this;
    return runAction.call(this, {
      actionName: "undo"
    }).done(function () {
      self.stateStack.previousState();
    });
  },
  undoAllReportAction: function undoAllReportAction() {
    var self = this;
    return runAction.call(this, {
      actionName: "undoAll"
    }).done(function () {
      self.stateStack.firstState();
    });
  },
  redoReportAction: function redoReportAction() {
    var self = this;
    return runAction.call(this, {
      actionName: "redo"
    }).done(function () {
      self.stateStack.nextState();
    });
  },
  runReportAction: function runReportAction(action) {
    var self = this;
    return runAction.call(this, action).done(function () {
      self.stateStack.newState();
    });
  },
  searchReportAction: function searchReportAction(options) {
    var action = {
      actionName: "search",
      searchData: {}
    };

    if (typeof options === "string") {
      action.searchData.searchString = options;
    } else {
      action.searchData = {
        searchString: options.text,
        caseSensitive: options.caseSensitive,
        wholeWordsOnly: options.wholeWordsOnly
      };
    }

    return runNonFillingAction.call(this, action);
  },
  save: function save(options) {
    var self = this;
    return runAction.call(this, _.extend(options || {}, {
      actionName: "saveReport"
    })).done(function () {
      self.stateStack.newState();
    });
  },
  executeReport: function executeReport(refresh) {
    var dfd = new $.Deferred(),
        self = this;
    this.model.execute({
      freshData: !!refresh
    }).then(function () {
      var boundedFetch = _.bind(self.fetchPageHtmlExportAndJiveComponents, self);

      self.exportDfd = boundedFetch(arguments);
      return self.exportDfd;
    }, dfd.reject).then(function () {
      self.stateStack.newState();
      dfd.resolve.apply(dfd, arguments);
    }, dfd.reject);
    return dfd;
  },
  cancelReportExecution: function cancelReportExecution() {
    if (this.fetchExportDfd && this.fetchExportDfd.state() === "pending") {
      this.fetchExportDfd.reject({
        source: "execution",
        status: "cancelled"
      });
    }

    return this.model.cancel();
  },
  removeReportExecution: function removeReportExecution() {
    var dfd = new $.Deferred(),
        self = this;
    this.cancelReportExecution().done(function () {
      self.model.removeExecution().done(dfd.resolve.bind(dfd)).fail(dfd.reject.bind(dfd));
    }).fail(dfd.reject.bind(dfd));
    return dfd;
  },
  applyReportParameters: function applyReportParameters(refresh) {
    var dfd = new $.Deferred(),
        self = this;
    this.fetchExportDfd && this.fetchExportDfd.state() === "pending" && this.fetchExportDfd.reject({
      source: "execution",
      status: "cancelled"
    });
    this.model.applyParameters(refresh).then(function () {
      self.trigger(reportEvents.AFTER_REPORT_EXECUTION); //silent because JIVE will be rendered in full report rendering cycle later

      self.fetchExportDfd = self.fetchPageHtmlExportAndJiveComponents({
        silent: true
      });
      return self.fetchExportDfd;
    }, dfd.reject).then(_.bind(self.model.updateStatus, self.model), dfd.reject).then(_.bind(self.model.waitForExecution, self.model), dfd.reject).then(dfd.resolve, dfd.reject);
    return dfd;
  },
  fetchPageHtmlExportAndJiveComponents: function fetchPageHtmlExportAndJiveComponents(options) {
    var dfd = new $.Deferred(),
        exportDfd,
        outputDfd;
    log.debug("Start fetching of html and JIVE");
    dfd.fail(function (error) {
      exportDfd && exportDfd.state() === "pending" && (exportDfd.reject ? exportDfd.reject(error) : exportDfd.abort(error));
      outputDfd && outputDfd.state() === "pending" && (outputDfd.reject ? outputDfd.reject(error) : outputDfd.abort(error));
    });

    if (this.model.isFailed() || this.model.isCancelled()) {
      dfd.reject({
        source: "execution",
        status: this.model.get("status"),
        errorDescriptor: this.model.get("errorDescriptor")
      });
    } else {
      var self = this,
          htmlExport = this.model.getExport(reportOutputFormats.HTML);
      exportDfd = htmlExport.run();
      exportDfd.then(function () {
        if (htmlExport.isFailed() || htmlExport.isCancelled()) {
          dfd.reject({
            source: "export",
            format: reportOutputFormats.HTML,
            status: htmlExport.get("status"),
            errorDescriptor: htmlExport.get("errorDescriptor")
          });
        } else {
          outputDfd = htmlExport.waitForExport().then(_.bind(htmlExport.fetchOutput, htmlExport));
          outputDfd.then(function (response, status, jqXhr) {
            if (response) {
              if (!(options && options.silent === true)) {
                try {
                  var currentPage = parseInt(jqXhr.getResponseHeader("report-pages"), 10),
                      previousPage = self.stateModel.get("pages");

                  if (!isNaN(currentPage)) {
                    self.model.execution.set("pages", currentPage, {
                      silent: true
                    });
                    previousPage = parseInt(_.isObject(previousPage) ? previousPage.pages : previousPage, 10);

                    if (currentPage !== previousPage) {
                      log.debug("Fetching of html and JIVE: fires CURRENT_PAGE_CHANGED");
                      self.trigger(reportEvents.CURRENT_PAGE_CHANGED, currentPage);
                    }
                  }
                } catch (e) {
                  log.error("Failed to parse 'report-pages' response header from server", e);
                }
              }

              self.pageComponentsMeta.fetch().then(_.bind(self.components.fetch, self.components), dfd.reject).then(function () {
                if (options && options.silent === true) {
                  log.debug("Finish fetching of html and JIVE: silent");
                  dfd.resolve();
                } else {
                  log.debug("Finish fetching of html and JIVE: fires REQUESTED_PAGES_READY");
                  self.trigger(reportEvents.REQUESTED_PAGES_READY, self, dfd);
                  dfd.resolve();
                }
              }, function (error) {
                dfd.state() === "pending" && dfd.reject(error);
              });
            } else {
              log.debug("Report is empty! Nothing to do!");

              if (!(options && options.silent === true)) {
                self.trigger(reportEvents.REQUESTED_PAGES_READY, self, dfd);
              }

              dfd.resolve();
            }
          }, dfd.reject);
        }
      }, function (error) {
        dfd.state() === "pending" && dfd.reject(error);
      });
    }

    return dfd;
  },
  renderReport: function renderReport() {
    return this.view.render().always(_.bind(function () {
      this._reportRenderFinished = true;
    }, this));
  },
  fetchReportJiveComponents: function fetchReportJiveComponents() {
    var dfd = new $.Deferred();
    log.debug("Start fetching of report-level JIVE components");

    if (this.model.isFailed() || this.model.isCancelled()) {
      dfd.reject({
        source: "execution",
        status: this.model.get("status"),
        errorDescriptor: this.model.get("errorDescriptor")
      });
    } else {
      this.reportComponentsMeta.fetch().then(_.bind(this.components.fetchReportComponents, this.components), dfd.reject).then(function () {
        log.debug("Finish fetching of report-level JIVE components");
        dfd.resolve();
      }, function (error) {
        dfd.state() === "pending" && dfd.reject(error);
      });
    }

    return dfd;
  },
  exportReport: function exportReport(options) {
    var dfd = new $.Deferred();

    if (this.model.isFailed() || this.model.isCancelled()) {
      var err = biComponentErrorFactoryReportProxy.reportStatus({
        source: "execution",
        status: this.model.get("status"),
        errorDescriptor: this.model.get("errorDescriptor")
      });
      dfd.reject(err);
    } else {
      options || (options = {});

      var exportOptions = _.pick(options, "outputFormat", "ignorePagination");

      if (_.isObject(options.pages)) {
        exportOptions.pages = options.pages.pages;
        exportOptions.anchor = options.pages.anchor;
      } else {
        exportOptions.pages = options.pages;
        exportOptions.anchor = undefined;
      }

      var exportModel = new ExportModel({
        options: exportOptions
      }, {
        report: this.model
      }),
          wait = _.bind(exportModel.waitForExport, exportModel);

      exportModel.run().then(wait, dfd.reject).then(function () {
        if (exportModel.isFailed() || exportModel.isCancelled()) {
          var err = biComponentErrorFactoryReportProxy.reportStatus({
            source: "export",
            format: options.outputFormat,
            status: exportModel.get("status"),
            errorDescriptor: exportModel.get("errorDescriptor")
          });
          dfd.reject(err);
        } else {
          //TODO: extend link with export mime-type info, resource name
          dfd.resolve({
            href: exportModel.urlOutput()
          }, function (options) {
            options = _.defaults(options || {}, {
              url: exportModel.urlOutput(),
              type: "GET",
              headers: {
                "Accept": "text/plain, application/json"
              },
              dataType: "text",
              data: {
                suppressContentDisposition: true
              }
            });
            return request(options);
          });
        }
      });
    }

    return dfd;
  },
  destroy: function destroy() {
    return this.removeReportExecution().done(_.bind(this.view.remove, this.view));
  }
});

module.exports = ReportController;

});