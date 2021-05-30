define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataSourceGroupNameIsEmptySpecification = function DataSourceGroupNameIsEmptySpecification(options) {
  this.initialize(options);
};

_.extend(DataSourceGroupNameIsEmptySpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDataSourceGroupService = options.clientDataSourceGroupService;
  },
  isSatisfied: function isSatisfied(dataSourceGroupJSON) {
    return this.clientDataSourceGroupService.getName(dataSourceGroupJSON) === '';
  }
});

module.exports = DataSourceGroupNameIsEmptySpecification;

});