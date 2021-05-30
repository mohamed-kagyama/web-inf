define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IsResourcesHaveTheSameSourceSpecification = function IsResourcesHaveTheSameSourceSpecification(options) {
  this.initialize(options);
};

_.extend(IsResourcesHaveTheSameSourceSpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    var filter = options.filter,
        left = filter.expression.left,
        right = filter.expression.right,
        sourceId = left.sourceId || right.sourceId,
        sourceType = left.sourceType || right.sourceType,
        sidebarCurrentResource = options.sidebarCurrentResource,
        sidebarCurrentResourceSourceId = sidebarCurrentResource.sourceId,
        sidebarCurrentResourceSourceType = sidebarCurrentResource.sourceType;

    if (entityUtil.isJoinAlias(sourceType)) {
      sourceId = this.clientDomainSchemaService.getJoinTreeIdByJoinAliasId(sourceId);
    }

    if (entityUtil.isJoinAlias(sidebarCurrentResourceSourceType)) {
      sidebarCurrentResourceSourceId = this.clientDomainSchemaService.getJoinTreeIdByJoinAliasId(sidebarCurrentResourceSourceId);
    }

    var isResourceGlobalConstantCalcField = entityUtil.isConstantGroup(sidebarCurrentResourceSourceType);
    var isDroppedResourceGlobalConstant = entityUtil.isConstantGroup(sourceType);
    return sidebarCurrentResourceSourceId === sourceId || isResourceGlobalConstantCalcField || isDroppedResourceGlobalConstant;
  }
});

module.exports = IsResourcesHaveTheSameSourceSpecification;

});