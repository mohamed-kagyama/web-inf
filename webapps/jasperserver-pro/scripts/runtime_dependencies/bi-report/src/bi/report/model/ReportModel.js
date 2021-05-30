define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseModel = require("runtime_dependencies/js-sdk/src/common/model/BaseModel");

var ReportExecutionModel = require('./ReportExecutionModel');

var ReportExportCollection = require('../collection/ReportExportCollection');

var _ = require('underscore');

var Backbone = require('backbone');

var $ = require('jquery');

var reportStatusTrait = require('./reportStatusTrait');

var reportOutputFormats = require('../enum/reportOutputFormats');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var STATUS_RETRY_TIMEOUT = 1000;
var ReportModel = BaseModel.extend({
  idAttribute: 'requestId',
  defaults: function defaults() {
    return {
      exports: undefined,
      reportURI: undefined,
      requestId: undefined,
      executionId: undefined,
      status: undefined,
      totalPages: undefined
    };
  },
  initialize: function initialize(attrs, options) {
    var self = this;
    BaseModel.prototype.initialize.apply(this, arguments);
    options || (options = {});
    this.contextPath = options.contextPath;
    this.execution = new ReportExecutionModel({}, {
      report: this
    });
    this.exports = new ReportExportCollection(this.get('exports') || [], {
      report: this
    });
  },
  urlAction: function urlAction() {
    var url = this.contextPath;

    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    url += "rest_v2/reportExecutions/" + this.get("requestId") + "/runAction";
    return url;
  },
  execute: function execute(options) {
    var self = this;
    this.unset('status', {
      silent: true
    });
    options || (options = {});
    this.execution.set(_.defaults(_.extend({}, options), {
      reportUnitUri: this.get('reportURI'),
      baseUrl: this.contextPath
    }));
    var xhr = this.execution.run().then(function (response) {
      if (self.has("executionId")) {
        self.set("requestId", self.get("executionId"));
      }

      if (!self.set(self.parse(response))) {
        return false;
      }

      self.trigger('sync', self, response);
      return $.Deferred().resolve(response);
    }, function (response) {
      self.trigger('error', self, response);
      return $.Deferred().reject(response);
    });
    this.trigger('request', this, xhr);
    return xhr;
  },
  updateStatus: function updateStatus() {
    var self = this,
        htmlExport = this.getExport(reportOutputFormats.HTML),
        xhr;

    if (!htmlExport || htmlExport.get("outputFinal") || htmlExport.get("outputEmpty")) {
      xhr = this.execution.status().done(function (response) {
        if (!self.set({
          'status': response.value,
          'errorDescriptor': response.errorDescriptor
        })) {
          return false;
        }

        self.trigger('sync', self, response);
      }).fail(function (response) {
        self.trigger('error', self, response);
      });
    } else {
      xhr = this.execution.pageStatus(this.execution.get("pages")).done(function (response) {
        if (!self.set({
          "status": response.reportStatus,
          "pageStatus": {
            "pageFinal": response.pageFinal === "true",
            "timestamp": parseInt(response.pageTimestamp)
          },
          "errorDescriptor": response.errorDescriptor
        })) {
          return false;
        }

        self.trigger('sync', self, response);
      }).fail(function (response) {
        self.trigger('error', self, response);
      });
    }

    this.trigger('request', this, xhr);
    return xhr;
  },
  update: function update() {
    var self = this,
        xhr = this.execution.update().done(function (response) {
      if (!self.set(self.parse(response))) {
        return false;
      }

      self.trigger('sync', self, response);
    }).fail(function (response) {
      self.trigger('error', self, response);
    });
    this.trigger('request', this, xhr);
    return xhr;
  },
  waitForExecution: function waitForExecution() {
    if (this.updateStatusTimer != null) {
      clearTimeout(this.updateStatusTimer);
      this.updateStatusTimer = null;
    }

    var self = this,
        dfd = new $.Deferred(),
        completeFunc = function completeFunc() {
      if (!self.isCompleted()) {
        self.updateStatusTimer = setTimeout(function () {
          self.updateStatus().done(completeFunc).fail(dfd.reject);
        }, STATUS_RETRY_TIMEOUT);
      } else {
        dfd.resolve();
      }
    };

    this.updateStatus().done(completeFunc).fail(dfd.reject);
    return dfd;
  },
  runAction: function runAction(action) {
    if (!this.has('requestId')) {
      throw new Error('You must execute report first before running any action.');
    }

    this.unset('status', {
      silent: true
    });
    var self = this,
        xhr = Backbone.ajax({
      url: this.urlAction(),
      type: 'POST',
      dataType: 'json',
      headers: {
        'Accept': 'application/json'
      },
      data: {
        action: JSON.stringify(action)
      }
    }).done(function (response) {
      if (!self.set('requestId', response.result.contextid)) {
        return false;
      }

      self.trigger('sync', self, response);
    }).fail(function (response) {
      self.trigger('error', self, response);
    });
    this.trigger('request', this, xhr);
    return xhr;
  },
  cancel: function cancel() {
    if (this.isCompleted()) {
      return new $.Deferred().resolve();
    }

    var self = this,
        xhr = this.execution.cancel().done(function (response) {
      if (!response) {
        return;
      }

      if (!self.set('status', response.value)) {
        return false;
      }

      self.trigger('sync', self, response);
    }).fail(function (response) {
      self.trigger('error', self, response);
    });
    this.trigger('request', this, xhr);
    return xhr;
  },
  removeExecution: function removeExecution() {
    this.exports.each(function (exp) {
      exp.cancel();
    });
    this.exports.reset([]);
    return this.execution.removeExecution();
  },
  applyParameters: function applyParameters(refresh) {
    this.unset('status', {
      silent: true
    });
    return this.execution.applyParameters(refresh);
  },
  getExport: function getExport(format) {
    return this.exports.find(function (model) {
      return model.get('options').outputFormat === format;
    });
  },
  addExport: function addExport(attrs) {
    return this.exports.add(attrs);
  },
  // mock _notify function from jasperreports-report
  _notify: function _notify() {},
  // fake event manager for jive.interactive.column
  eventManager: {
    registerEvent: function registerEvent() {
      return {
        trigger: function trigger() {}
      };
    }
  }
});

_.extend(ReportModel.prototype, reportStatusTrait);

module.exports = ReportModel;

});