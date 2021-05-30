define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ShouldDropZoneBeActiveSpecification = function ShouldDropZoneBeActiveSpecification(options) {
  this.initialize(options);
};

_.extend(ShouldDropZoneBeActiveSpecification.prototype, {
  initialize: function initialize(options) {
    this.filtersDesignerViewStateModelService = options.filtersDesignerViewStateModelService;
    this.isResourceAlreadyDroppedSpecification = options.isResourceAlreadyDroppedSpecification;
    this.isResourceDroppableSpecification = options.isResourceDroppableSpecification;
    this.isFilterDropAreaAcceptsResourceSpecification = options.isFilterDropAreaAcceptsResourceSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(filter, currentOperandSide) {
    var sidebarCurrentResource = this.filtersDesignerViewStateModelService.getSidebarCurrentResource();
    var isResourceDroppable = this.isResourceDroppableSpecification.isSatisfiedBy({
      filter: filter,
      sidebarCurrentResource: sidebarCurrentResource
    });

    if (!isResourceDroppable) {
      return false;
    }

    var isResourceAlreadyDropped = this.isResourceAlreadyDroppedSpecification.isSatisfiedBy({
      filter: filter,
      currentOperandSide: currentOperandSide,
      sidebarCurrentResource: sidebarCurrentResource
    });

    if (isResourceAlreadyDropped) {
      return false;
    }

    return this.isFilterDropAreaAcceptsResourceSpecification.isSatisfiedBy({
      filter: filter,
      sidebarCurrentResource: sidebarCurrentResource,
      currentOperandSide: currentOperandSide
    });
  }
});

module.exports = ShouldDropZoneBeActiveSpecification;

});