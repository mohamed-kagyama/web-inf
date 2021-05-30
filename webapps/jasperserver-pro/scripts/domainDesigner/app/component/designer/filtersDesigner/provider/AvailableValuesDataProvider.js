define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var genericTypesEnum = require("../../../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AvailableValuesDataProvider = function AvailableValuesDataProvider(options) {
  this.initialize(options);
};

_.extend(AvailableValuesDataProvider.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'getData');

    this.booleanAvailableValuesDataProvider = options.booleanAvailableValuesDataProvider;
    this.queryExecutionAvailableValuesDataProvider = options.queryExecutionAvailableValuesDataProvider;
    this.filtersDesignerViewStateModelService = options.filtersDesignerViewStateModelService;
  },
  getData: function getData(options) {
    var draftFilter = this.filtersDesignerViewStateModelService.getDraftFilterState(),
        dataType = draftFilter.dataType;

    if (dataType === genericTypesEnum.BOOLEAN) {
      return this.booleanAvailableValuesDataProvider.getData(options);
    }

    return this.queryExecutionAvailableValuesDataProvider.getData(options);
  }
});

module.exports = AvailableValuesDataProvider;

});