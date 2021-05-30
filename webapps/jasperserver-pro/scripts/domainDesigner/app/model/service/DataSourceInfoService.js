define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require("underscore");

var $ = require("jquery");

var dataSourceTypeUtil = require("../service/util/dataSourceTypeUtil");

var emptyDataSourceEnum = require("../enum/emptyDataSourceEnum");

var uriUtil = require("../../util/uriUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataSourceInfoService = function DataSourceInfoService(options) {
  this.initialize(options);
};

_.extend(DataSourceInfoService.prototype, {
  initialize: function initialize(options) {
    this.metadataService = options.metadataService;
  },
  getDataSourceInfo: function getDataSourceInfo(dataSourceUri, options) {
    var self = this;
    return this.metadataService.getMetadata(dataSourceUri, [], options).then(function (data) {
      if (self._isEmptyDataSource(data)) {
        return self._getEmptyDataSourceErrorPromise();
      } else {
        return {
          uri: dataSourceUri,
          name: uriUtil.getLastSegment(dataSourceUri),
          type: dataSourceTypeUtil.getDataSourceType(data)
        };
      }
    });
  },
  _isEmptyDataSource: function _isEmptyDataSource(data) {
    return !data;
  },
  _getEmptyDataSourceErrorPromise: function _getEmptyDataSourceErrorPromise() {
    var deferred = new $.Deferred().reject({
      responseJSON: {
        errorCode: emptyDataSourceEnum.DATA_SOURCE_IS_EMPTY
      }
    });
    return deferred.promise();
  }
});

module.exports = DataSourceInfoService;

});