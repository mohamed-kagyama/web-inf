define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var ReportExportModel = require('../model/ReportExportModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  model: function model(attrs, options) {
    return new ReportExportModel(attrs, {
      report: options.collection.report
    });
  },
  initialize: function initialize(models, options) {
    this.report = options.report;
  }
});

});