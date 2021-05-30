define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var defaultSchemaNameEnum = require("../../../../../model/enum/defaultSchemaNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IsResourceAbsentInModelPredicate = function IsResourceAbsentInModelPredicate(options) {
  this.initialize(options);
};

_.extend(IsResourceAbsentInModelPredicate.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'match');

    this.schemaResourcesNamesAreEqualSpecification = options.schemaResourcesNamesAreEqualSpecification;
    this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
  },
  match: function match(resource, options) {
    var resourceName = resource.name,
        collection = options.collection,
        currentMetadataResourceId = options.currentMetadataResourceId,
        isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();
    return !collection.filter(function (entity) {
      var entityName = this._getEntityName(entity);

      var isResourcesHaveSameNames = this.schemaResourcesNamesAreEqualSpecification.isSatisfiedBy(entityName, resourceName),
          isResourcesUnderTheSameParentResource,
          entityParentId;

      if (isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
        entityParentId = entity.dataSourceId;
      } else {
        entityParentId = entity.parentId;
      }

      isResourcesUnderTheSameParentResource = entityParentId === currentMetadataResourceId;
      return isResourcesHaveSameNames && isResourcesUnderTheSameParentResource;
    }, this).length;
  },
  _getEntityName: function _getEntityName(entity) {
    if (entity.name === defaultSchemaNameEnum.DEFAULT_SCHEMA) {
      return entity.name;
    } else {
      return entityUtil.isDataSourceGroup(entity) ? entity.sourceName || entity.name : entity.name;
    }
  }
});

module.exports = IsResourceAbsentInModelPredicate;

});