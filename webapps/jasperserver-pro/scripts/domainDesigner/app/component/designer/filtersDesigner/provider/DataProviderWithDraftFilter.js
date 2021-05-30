define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataProviderWithDraftFilter = function DataProviderWithDraftFilter(options) {
  this.initialize(options);
};

_.extend(DataProviderWithDraftFilter.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'getData');

    this.filtersDesignerViewStateModelService = options.filtersDesignerViewStateModelService;
    this.request = options.request;
  },
  getData: function getData(options) {
    options = options || {};
    var draftFilter = this.filtersDesignerViewStateModelService.getDraftFilterState();
    options = _.extend({}, options, {
      draftFilter: draftFilter
    });
    return this.request(options);
  }
});

module.exports = DataProviderWithDraftFilter;

});