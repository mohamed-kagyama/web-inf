define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ReportParametersModel = require('../model/ReportParametersModel');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ReportParametersCollection = Backbone.Collection.extend({
  model: ReportParametersModel,
  getReportParameters: function getReportParameters(uri, options) {
    return this.add({
      reportUri: uri
    }).getReportParameters(options);
  },
  getReportControls: function getReportControls(uri, options) {
    return this.add({
      reportUri: uri
    }).getReportControls(options);
  },
  getInputControlAsParameter: function getInputControlAsParameter(reportUri, controlUri, options) {
    return this.add({
      reportUri: reportUri
    }).getInputControlAsParameter(controlUri, options);
  }
});
ReportParametersCollection.instance = new ReportParametersCollection();
module.exports = ReportParametersCollection;

});