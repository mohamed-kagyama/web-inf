define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerSidebarIsItemDraggableSpecification = function JoinsDesignerSidebarIsItemDraggableSpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerSidebarIsItemDraggableSpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
  },
  isSatisfiedBy: function isSatisfiedBy(item) {
    var resourceType = item.type,
        resourceId = item.resourceId,
        calcFieldSourceType = item.calcFieldSourceType;
    var canDropField = entityUtil.isField(resourceType);

    if (entityUtil.isCalcField(resourceType)) {
      canDropField = !entityUtil.isConstantGroup(calcFieldSourceType) && !entityUtil.isJoinTree(calcFieldSourceType) && !this.clientDomainSchemaCalcFieldsService.isConstantCalcField(resourceId);
    }

    return canDropField;
  }
});

module.exports = JoinsDesignerSidebarIsItemDraggableSpecification;

});