define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getResourcesByParentResourceUtil = require("./util/getResourcesByParentResourceUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResultTreeSelectionProvider = function ResultTreeSelectionProvider(options) {
  this.initialize(options);
};

_.extend(ResultTreeSelectionProvider.prototype, {
  initialize: function initialize(options) {
    this.process = options.process || _.identity;
    this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
  },
  getSelectedResources: function getSelectedResources(options) {
    var selection = options.selection,
        isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();
    var resources = getResourcesByParentResourceUtil.getResources({
      parentId: options.metadataResourceId,
      parentType: options.metadataResourceType,
      collections: options.dataStore,
      isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute: isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute
    });
    return resources.map(function (resource) {
      return this.process(resource.toJSON(), {
        entity: resource
      });
    }, this).filter(function (resourceJSON) {
      return Boolean(selection[resourceJSON.name]);
    }, this).toArray();
  }
});

module.exports = ResultTreeSelectionProvider;

});