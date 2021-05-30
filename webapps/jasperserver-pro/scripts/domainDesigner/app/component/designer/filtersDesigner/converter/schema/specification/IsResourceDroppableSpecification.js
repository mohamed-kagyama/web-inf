define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IsResourceDroppableSpecification = function IsResourceDroppableSpecification(options) {
  this.initialize(options);
};

_.extend(IsResourceDroppableSpecification.prototype, {
  initialize: function initialize(options) {},
  isSatisfiedBy: function isSatisfiedBy(options) {
    var filter = options.filter,
        leftFieldSourceType = filter.expression.left.sourceType,
        rightFieldSourceType = filter.expression.right.sourceType,
        droppedFieldSourceType = leftFieldSourceType || rightFieldSourceType,
        sidebarCurrentResource = options.sidebarCurrentResource,
        isField = entityUtil.isField(sidebarCurrentResource.type);
    var isGlobalConstantCalcField = entityUtil.isConstantGroup(sidebarCurrentResource.sourceType);

    if (isGlobalConstantCalcField) {
      return !entityUtil.isConstantGroup(droppedFieldSourceType);
    }

    return isField;
  }
});

module.exports = IsResourceDroppableSpecification;

});