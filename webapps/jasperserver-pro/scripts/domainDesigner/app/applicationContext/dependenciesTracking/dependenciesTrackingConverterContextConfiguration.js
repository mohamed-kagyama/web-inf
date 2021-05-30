define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dependenciesConverterContextConfigurationFactory = require("./factory/dependenciesConverterContextConfigurationFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  context.register('dependenciesTrackingConverter', dependenciesConverterContextConfigurationFactory.create({
    dependencyItemHeight: options.dependenciesInspector.itemHeight,
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    filterExpressionSerializer: context.get('filterExpressionSerializer'),
    schemaPathGenerationService: context.get('clientDomainSchemaPathGenerationService')
  }));
};

});