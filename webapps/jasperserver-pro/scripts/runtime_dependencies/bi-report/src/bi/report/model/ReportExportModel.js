define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseModel = require("runtime_dependencies/js-sdk/src/common/model/BaseModel");

var Backbone = require('backbone');

var _ = require('underscore');

var $ = require('jquery');

var reportStatusTrait = require('./reportStatusTrait');

var reportOutputFormats = require('../enum/reportOutputFormats');

var reportStatuses = require("../enum/reportStatuses");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var STATUS_RETRY_TIMEOUT = 1000;

function parseMarkup(markup) {
  var elements = $.parseHTML(markup, document);
  elements = _.filter(elements, function (node) {
    var $el = $(node),
        tagName = $el.prop('tagName');
    tagName = tagName ? tagName : '';
    return 'table' === tagName.toLowerCase();
  });

  if (elements.length === 0) {
    return false;
  }

  return elements;
}

var ReportExportModel = BaseModel.extend({
  defaults: function defaults() {
    return {
      attachments: undefined,
      id: undefined,
      options: undefined,
      outputResource: undefined,
      outputFinal: false,
      outputEmpty: false,
      ignorePagination: undefined,
      status: undefined
    };
  },
  initialize: function initialize(attrs, options) {
    options || (options = {});
    this.report = options.report;
    this.isFirstRun = true;
    BaseModel.prototype.initialize.apply(this, arguments);
  },
  url: function url() {
    if (_.isUndefined(this.report.get('requestId'))) {
      throw new Error('You must execute report before fetching export.');
    }

    var url = this.report.contextPath;

    if (url[url.length - 1] !== '/') {
      url += '/';
    }

    url += 'rest_v2/reportExecutions/' + this.report.get('requestId') + '/exports';
    return url;
  },
  urlStatus: function urlStatus() {
    if (_.isUndefined(this.get('id'))) {
      throw new Error('Export ID is not specified');
    }

    return this.url() + '/' + this.get('id') + '/status';
  },
  urlOutput: function urlOutput() {
    if (_.isUndefined(this.get('id'))) {
      throw new Error('Export ID is not specified');
    }

    return this.url() + '/' + this.get('id') + '/outputResource';
  },
  urlAttachments: function urlAttachments() {
    if (_.isUndefined(this.get("id"))) {
      throw new Error("Export ID is not specified");
    }

    return this.url() + "/" + this.get("id") + "/attachments/";
  },
  run: function run(settings) {
    settings || (settings = {});

    var data = _.extend( //TODO: remove 'allowInlineScripts' after merging report executor extention
    this.report.execution.pick('outputFormat', 'pages', 'anchor', 'attachmentsPrefix', 'allowInlineScripts', 'markupType', 'baseUrl', 'ignorePagination'), this.get('options') ? _.pick(this.get('options'), 'outputFormat', 'pages', 'anchor', 'attachmentsPrefix', 'allowInlineScripts', 'markupType', 'baseUrl', 'ignorePagination') : {}, settings);

    if (this.isFirstRun) {
      data.clearContextCache = true;
      this.isFirstRun = false;
    }

    return BaseModel.prototype.fetch.call(this, {
      url: this.url(),
      type: 'POST',
      contentType: 'application/json',
      headers: {
        Accept: 'application/json'
      },
      data: JSON.stringify(data)
    });
  },
  fetchOutput: function fetchOutput() {
    var self = this;
    return Backbone.ajax({
      url: this.urlOutput(),
      type: 'GET',
      headers: {
        'Accept': 'text/html, application/json'
      },
      dataType: this.get('options').outputFormat
    }).done(function (response, status, xhr) {
      var output = response;

      if (self.get('options').outputFormat === reportOutputFormats.HTML) {
        self.set({
          outputEmpty: !response
        });
        output = response && response.markup ? response.markup : _.isUndefined(response) ? '' : response;
      }

      self.set({
        output: output,
        outputFinal: xhr.getResponseHeader('output-final') === 'true',
        outputTimestamp: parseInt(xhr.getResponseHeader("output-timestamp")) //TODO handle NaN?

      });
    });
  },
  getHTMLOutput: function getHTMLOutput() {
    return parseMarkup(this.get('output'));
  },
  updateStatus: function updateStatus() {
    var self = this,
        xhr = Backbone.ajax({
      type: 'GET',
      url: this.urlStatus(),
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/status+json'
      }
    }).done(function (response) {
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
    this.trigger('request', this, xhr);
    return xhr;
  },
  waitForExport: function waitForExport() {
    var self = this,
        dfd = new $.Deferred(),
        completeFunc = function completeFunc() {
      if (!self.isCompleted()) {
        this.timeout = setTimeout(function () {
          self.updateStatus().done(completeFunc).fail(dfd.reject);
        }, STATUS_RETRY_TIMEOUT);
      } else {
        dfd.resolve();
      }
    };

    this.updateStatus().done(completeFunc).fail(dfd.reject);
    return dfd;
  },
  cancel: function cancel() {
    this.timeout && clearTimeout(this.timeout);
    this.set({
      status: reportStatuses.CANCELLED
    });
  }
});

_.extend(ReportExportModel.prototype, reportStatusTrait);

module.exports = ReportExportModel;

});