define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var BaseComponentMetaModel = require('../model/BaseComponentMetaModel');

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
    var url = this.report.contextPath;

    if (url[url.length - 1] !== "/") {
      url += "/";
    }

    url += "rest_v2/reportExecutions/" + this.report.get("requestId") + "/info";
    return url;
  },
  fetch: function fetch() {
    if (!this.report.has('requestId')) {
      throw new Error('You must run report first before fetching components.');
    }

    return Backbone.Collection.prototype.fetch.call(this, {
      type: 'GET',
      reset: true,
      headers: {
        'Accept': 'application/json'
      }
    });
  },
  parse: function parse(response) {
    var res;

    if (response.errorCode) {
      // the report is either cancelled or failed and this is handled already
      // some valid value is required to no cause errors
      res = this.toJSON();
    } else {
      // each component meta is bound to a property in the response object
      res = _.values(response);
    }

    return res;
  }
});

});