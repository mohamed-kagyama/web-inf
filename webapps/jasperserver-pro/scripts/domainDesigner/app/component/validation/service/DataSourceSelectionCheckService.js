define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function DataSourceSelectionCheckService(options) {
  options = options || options;

  _.bindAll(this, 'isValid');

  this.resourceService = options.resourceService;
  this.dataSourceInfoService = options.dataSourceInfoService;
}

_.extend(DataSourceSelectionCheckService.prototype, {
  isValid: function isValid(resourceProps) {
    var self = this;
    var dataSourceUri = resourceProps.uri;
    return this.resourceService.getResource(dataSourceUri).then(function () {
      return self.dataSourceInfoService.getDataSourceInfo(dataSourceUri, {
        refresh: true
      });
    });
  }
});

module.exports = DataSourceSelectionCheckService;

});