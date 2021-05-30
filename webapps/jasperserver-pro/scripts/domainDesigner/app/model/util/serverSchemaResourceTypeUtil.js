define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesEnum = require("../enum/resourcePropertiesEnum");

var resourceTypeEnum = require("../enum/resourceTypeEnum");

var dataSourceLevelEnum = require("../enum/dataSourceLevelEnum");

var serverToDataSourceLevelEnum = require("../enum/serverToDataSourceLevelEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getMetadataResourceType: function getMetadataResourceType(resource) {
    var group = resource.group,
        rawResourceType = group[resourcePropertiesEnum.type];
    return dataSourceLevelEnum[serverToDataSourceLevelEnum[rawResourceType]];
  },
  isJoinAlias: function isJoinAlias(resourceType) {
    return resourceType === resourceTypeEnum.resources.joinGroups.REFERENCE;
  },
  isQueryGroup: function isQueryGroup(resourceType) {
    return resourceType === resourceTypeEnum.resources.groups.QUERY_GROUP;
  },
  isResourceGroup: function isResourceGroup(resourceType) {
    return resourceType === resourceTypeEnum.resources.groups.GROUP;
  },
  isResourceElement: function isResourceElement(resourceType) {
    return resourceType === resourceTypeEnum.resources.groups.ELEMENT;
  },
  isConstantGroup: function isConstantGroup(resourceType) {
    return resourceType === resourceTypeEnum.resources.constantsGroups.GROUP;
  },
  isJoinGroup: function isJoinGroup(resourceType) {
    return resourceType === resourceTypeEnum.resources.joinGroups.GROUP;
  },
  isPresentationElement: function isPresentationElement(resourceType) {
    return resourceType === resourceTypeEnum.presentation.ELEMENT;
  },
  isPresentationGroup: function isPresentationGroup(resourceType) {
    return resourceType === resourceTypeEnum.presentation.GROUP;
  },
  getResourceType: function getResourceType(resource) {
    return _.keys(resource)[0];
  },
  getResourceValue: function getResourceValue(resource, type) {
    return resource[type];
  }
};

});