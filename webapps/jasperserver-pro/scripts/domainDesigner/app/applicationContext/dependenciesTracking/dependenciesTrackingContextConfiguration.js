define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dependenciesTrackingConverterContextConfiguration = require("./dependenciesTrackingConverterContextConfiguration");

var dependenciesInspectorContextConfiguration = require("./dependenciesInspectorContextConfiguration");

var dependenciesTrackingApplicationDispatcherContextConfiguration = require("./dependenciesTrackingApplicationDispatcherContextConfiguration");

var dependenciesTrackingDomainSchemaServicesContextConfiguration = require("./dependenciesTrackingDomainSchemaServicesContextConfiguration");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  dependenciesTrackingDomainSchemaServicesContextConfiguration(context, options);
  dependenciesTrackingConverterContextConfiguration(context, options);
  dependenciesInspectorContextConfiguration(context, options);
  dependenciesTrackingApplicationDispatcherContextConfiguration(context, options);
};

});