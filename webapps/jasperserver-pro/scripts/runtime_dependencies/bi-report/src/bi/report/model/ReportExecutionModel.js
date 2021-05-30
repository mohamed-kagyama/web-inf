define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var reportStatuses = require('../enum/reportStatuses');

var request = require("request");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ATTACHMENT_PREFIX_PATTERN = '{contextPath}/rest_v2/reportExecutions/{reportExecutionId}/exports/{exportExecutionId}/attachments/';
module.exports = Backbone.Model.extend({
  defaults: function defaults() {
    return {
      'reportUnitUri': undefined,
      'async': true,
      //TODO: remove 'allowInlineScripts' after merging with report executor extention
      'allowInlineScripts': false,
      'markupType': 'embeddable',
      'outputFormat': undefined,
      'interactive': true,
      'freshData': false,
      'saveDataSnapshot': false,
      'transformerKey': null,
      'ignorePagination': false,
      'pages': 1,
      'anchor': undefined,
      'attachmentsPrefix': undefined,
      'baseUrl': undefined,
      'parameters': undefined
    };
  },
  urlRun: function urlRun() {
    var url = this.get('baseUrl');

    if ((url || url === '') && url[url.length - 1] !== '/') {
      url += '/';
    }

    url += 'rest_v2/reportExecutions';
    return url;
  },
  urlRemove: function urlRemove() {
    return this.urlRun() + '/' + this.report.get('requestId');
  },
  urlUpdate: function urlUpdate() {
    if (!this.report.has('requestId')) {
      throw new Error('You must execute report before requesting it\'s execution details or status.');
    }

    return this.urlRun() + '/' + this.report.get('requestId');
  },
  urlExisting: function urlExisting() {
    if (!this.report.has("executionId")) {
      throw new Error("No execution ID to work with!");
    }

    return this.urlRun() + "/" + this.report.get("executionId");
  },
  urlParameters: function urlParameters(refresh) {
    return this.urlUpdate() + '/parameters?freshData=' + !!refresh;
  },
  urlStatus: function urlStatus() {
    return this.urlUpdate() + '/status';
  },
  urlPageStatus: function urlPageStatus(pageIndex) {
    return this.urlUpdate() + "/pages/" + pageIndex + "/status";
  },
  initialize: function initialize(attrs, options) {
    options || (options = {});
    this.report = options.report;
    this.on('change:baseUrl', function () {
      this.set('attachmentsPrefix', ATTACHMENT_PREFIX_PATTERN.replace('{contextPath}', this.get('baseUrl')));
    }, this);
  },
  run: function run() {
    if (!this.report.has("executionId")) {
      return Backbone.ajax({
        url: this.urlRun(),
        type: 'POST',
        processData: false,
        dataType: 'json',
        contentType: 'application/json',
        headers: {
          'Accept': 'application/json'
        },
        data: JSON.stringify(this.toJSON())
      });
    } else {
      return Backbone.ajax({
        url: this.urlExisting(),
        type: "GET",
        dataType: "json",
        contentType: "application/json",
        headers: {
          "Accept": "application/json"
        }
      });
    }
  },
  status: function status() {
    return Backbone.ajax({
      type: 'GET',
      url: this.urlStatus(),
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/status+json'
      }
    });
  },
  pageStatus: function pageStatus(pageIndex) {
    return Backbone.ajax({
      type: "GET",
      url: this.urlPageStatus(pageIndex),
      dataType: "json",
      contentType: "application/json",
      headers: {
        "Accept": "application/json"
      }
    });
  },
  update: function update() {
    return Backbone.ajax({
      url: this.urlUpdate(),
      type: 'GET',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/json'
      }
    });
  },
  cancel: function cancel() {
    return Backbone.ajax({
      url: this.urlStatus(),
      type: 'PUT',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/json'
      },
      data: JSON.stringify({
        value: reportStatuses.CANCELLED
      })
    });
  },
  applyParameters: function applyParameters(refresh) {
    return Backbone.ajax({
      url: this.urlParameters(refresh),
      type: 'POST',
      dataType: 'json',
      contentType: 'application/json',
      headers: {
        'Accept': 'application/json'
      },
      data: JSON.stringify(this.has('parameters') ? this.get('parameters').reportParameter : [])
    });
  },
  remove: function remove() {
    return this.removeExecution();
  },
  removeExecution: function removeExecution() {
    return request({
      url: this.urlRemove(),
      type: 'DELETE'
    });
  }
});

});