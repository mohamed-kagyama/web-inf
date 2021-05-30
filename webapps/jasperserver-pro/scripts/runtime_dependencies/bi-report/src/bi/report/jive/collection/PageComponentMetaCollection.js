define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var BaseComponentMetaModel = require('../model/BaseComponentMetaModel');

var reportOutputFormats = require('../../enum/reportOutputFormats');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  initialize: function initialize(models, options) {
    this.report = options.report;
  },
  model: function model(attrs, options) {
    return new BaseComponentMetaModel(attrs, options);
  },
  url: function url() {
    return this.report.getExport(reportOutputFormats.HTML).urlAttachments() + "reportComponents.json";
  },
  fetch: function fetch() {
    if (!this.report.has("requestId")) {
      throw new Error("You must run report first before fetching components.");
    }

    return Backbone.Collection.prototype.fetch.call(this, {
      type: "GET",
      reset: true,
      headers: {
        "Accept": "application/json",
        "x-jrs-base-url": this.report.contextPath
      }
    });
  },
  parse: function parse(response) {
    // each component meta is bound to a property in the response object
    return _.values(response);
  }
});

});