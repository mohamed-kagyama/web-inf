define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerCanResourceParticipateInJoinSpecification = function JoinsDesignerCanResourceParticipateInJoinSpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerCanResourceParticipateInJoinSpecification.prototype, {
  initialize: function initialize(options) {
    this.isResourceDroppableFieldSpecification = options.isResourceDroppableFieldSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    var resource = options.resource,
        resourceId = resource.id,
        resourceType = resource.type,
        calcFieldSourceType = resource.calcFieldSourceType;

    if (entityUtil.isJoinTree(calcFieldSourceType) || entityUtil.isConstantGroup(calcFieldSourceType)) {
      return false;
    }

    var isResourceUnderTheSameJoinTreeAsDropArea = false;

    if (options.joinTreeId && resource.parentJoinTreeId) {
      isResourceUnderTheSameJoinTreeAsDropArea = options.joinTreeId === resource.parentJoinTreeId;
    }

    var isResourceUnderDataSource = !resource.parentJoinTreeId;
    var isFieldDroppable = this.isResourceDroppableFieldSpecification.isSatisfiedBy({
      id: resourceId,
      type: resourceType
    });
    return isFieldDroppable && (isResourceUnderDataSource || isResourceUnderTheSameJoinTreeAsDropArea);
  }
});

module.exports = JoinsDesignerCanResourceParticipateInJoinSpecification;

});