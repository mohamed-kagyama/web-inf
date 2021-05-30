define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DesignerViewStateFiltersPositionsProvider = function DesignerViewStateFiltersPositionsProvider(options) {
  this.initialize(options);
};

_.extend(DesignerViewStateFiltersPositionsProvider.prototype, {
  initialize: function initialize(options) {
    this.sequenceGenerator = options.sequenceGenerator;
  },
  getFiltersPositionsByFilters: function getFiltersPositionsByFilters(filters) {
    var self = this;
    this.sequenceGenerator.reset();
    return filters.reduce(function (memo, filter) {
      memo[filter.id] = self.sequenceGenerator.next();
      return memo;
    }, {});
  },
  getNextFilterPosition: function getNextFilterPosition() {
    return this.sequenceGenerator.next();
  }
});

module.exports = DesignerViewStateFiltersPositionsProvider;

});