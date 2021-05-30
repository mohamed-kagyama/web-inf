define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var EntityCollector = require("../../component/dependenciesInspector/collector/EntityCollector");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createEntityCollector(context, options) {
  context.register('validationDependenciesTrackingEntityCollector', new EntityCollector({
    dataStore: context.get('domainValidationDataStore'),
    dependenciesTrackingStore: context.get('dependenciesTrackingStore'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    applicationMutations: context.get('virtualApplicationMutations')
  }));
}

module.exports = function (context, options) {
  createEntityCollector(context, options);
};

});