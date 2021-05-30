define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var _ = require("underscore");

var dataSourceTypeEnum = require("../../../model/enum/dataSourceTypeEnum");

var dataSourceLevelEnum = require("../../../model/enum/dataSourceLevelEnum");

var serverSchemaResourceTypeUtil = require("../../../model/util/serverSchemaResourceTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataSourceFreshInfoService = function DataSourceFreshInfoService(options) {
  this.initialize(options);
};

_.extend(DataSourceFreshInfoService.prototype, {
  initialize: function initialize(options) {
    this.encryptedProfileAttributeErrorSpecification = options.encryptedProfileAttributeErrorSpecification;
    this.domainValidationCacheRefresher = options.domainValidationCacheRefresher;
    this.dataSourceInfoService = options.dataSourceInfoService;
    this.metadataService = options.metadataService;
  },
  //Clean data source caches and check if data source is empty
  refreshDataSource: function refreshDataSource(dataSourceUri) {
    var deferred = new $.Deferred();

    this._fetchFreshDataSourceInfo(dataSourceUri).then(function () {
      //we do not need result of the dataSourceInfo execution
      deferred.resolve();
    }, deferred.reject);

    return deferred.promise();
  },
  fetchFreshDataSourceInfoWithAvailableSchemas: function fetchFreshDataSourceInfoWithAvailableSchemas(dataSourceUri) {
    var self = this;
    return this._fetchFreshDataSourceInfo(dataSourceUri).then(function (dataSourceInfo) {
      return self.metadataService.getMetadata(dataSourceUri).then(function (data) {
        var availableSchemas = [];

        if (dataSourceInfo.type === dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS) {
          availableSchemas = self._getAvailableSchemas(data);
        }

        return _.extend(dataSourceInfo, {
          availableSchemas: availableSchemas
        });
      });
    });
  },
  _getAvailableSchemas: function _getAvailableSchemas(data) {
    return _.reduce(data, function (memo, item) {
      if (serverSchemaResourceTypeUtil.getMetadataResourceType(item) === dataSourceLevelEnum.DATA_SOURCE_GROUP) {
        memo.push(item.group.name);
      }

      return memo;
    }, []);
  },
  _fetchFreshDataSourceInfo: function _fetchFreshDataSourceInfo(dataSourceUri) {
    var self = this,
        deferred = new $.Deferred();
    this.domainValidationCacheRefresher.refresh().then(function () {
      self.dataSourceInfoService.getDataSourceInfo(dataSourceUri).then(deferred.resolve, deferred.reject);
    }, function (xhr) {
      if (self.encryptedProfileAttributeErrorSpecification.isSatisfiedBy(xhr)) {
        deferred.reject(xhr);
      } else {
        self.dataSourceInfoService.getDataSourceInfo(dataSourceUri).then(deferred.resolve, deferred.reject);
      }
    });
    return deferred.promise();
  }
});

module.exports = DataSourceFreshInfoService;

});