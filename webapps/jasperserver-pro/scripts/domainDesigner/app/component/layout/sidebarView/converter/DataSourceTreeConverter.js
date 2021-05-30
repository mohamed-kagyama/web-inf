define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var baseSidebarTreeConverter = require("./baseSidebarTreeConverter");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataSourceToNestedTreeModelConverter = function DataSourceToNestedTreeModelConverter(options) {
  this.initialize(options);
};

_.extend(DataSourceToNestedTreeModelConverter.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
    this.resourceMatch = options.resourceMatch;
    this.doNotSkipResourceConversion = options.doNotSkipResourceConversion;
    this.resourceOrChildrenMatch = options.resourceOrChildrenMatch;
    this.resourceJsonMatch = options.resourceJsonMatch;
    this.convertResource = options.convertResource;
    this.convertResourceNoChildren = options.convertResourceNoChildren;
    this.convertChildrenMatch = options.convertChildrenMatch;
    this.postProcess = options.postProcess;
    this.comparator = options.comparator;
  },
  convert: function convert(options) {
    var schema = options.schema,
        isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();
    return baseSidebarTreeConverter.convertResources(schema.dataSources, _.extend({}, {
      isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute: isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute,
      parentMatchResult: false,
      resourceMatch: this.resourceMatch,
      doNotSkipResourceConversion: this.doNotSkipResourceConversion,
      resourceOrChildrenMatch: this.resourceOrChildrenMatch,
      resourceJsonMatch: this.resourceJsonMatch,
      convertResource: this.convertResource.convert,
      convertResourceNoChildren: this.convertResourceNoChildren.convert,
      convertChildrenMatch: this.convertChildrenMatch,
      postProcess: this.postProcess,
      comparator: this.comparator
    }, options));
  }
});

module.exports = DataSourceToNestedTreeModelConverter;

});