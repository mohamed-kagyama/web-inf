define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IsFilterDropAreaAcceptsResourceSpecification = function IsFilterDropAreaAcceptsResourceSpecification(options) {
  this.initialize(options);
};

_.extend(IsFilterDropAreaAcceptsResourceSpecification.prototype, {
  initialize: function initialize(options) {
    this.isResourcesHaveTheSameTypeSpecification = options.isResourcesHaveTheSameTypeSpecification;
    this.isResourcesHaveTheSameSourceSpecification = options.isResourcesHaveTheSameSourceSpecification;
    this.isResourcesHaveRelatedTypesSpecification = options.isResourcesHaveRelatedTypesSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    var filter = options.filter,
        currentOperandSide = options.currentOperandSide,
        dataType = filter.dataType,
        fieldId = filter.expression[currentOperandSide].fieldId;

    if (!dataType) {
      return true;
    }

    if (fieldId) {
      return false;
    }

    var typeCheckIsSatisfied = this.isResourcesHaveTheSameTypeSpecification.isSatisfiedBy(options) || this.isResourcesHaveRelatedTypesSpecification.isSatisfiedBy(options);
    return typeCheckIsSatisfied && this.isResourcesHaveTheSameSourceSpecification.isSatisfiedBy(options);
  }
});

module.exports = IsFilterDropAreaAcceptsResourceSpecification;

});