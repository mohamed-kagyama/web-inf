define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var dataSourceTypeUtil = require("./util/dataSourceTypeUtil");

var metadataRequestLevelsEnum = require("../enum/metadataRequestLevelsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MetadataService = function MetadataService(options) {
  this.initialize(options);
};

_.extend(MetadataService.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.restMetadataService = options.restMetadataService;
    this.metadataServiceCache = options.metadataServiceCache;
    this.profileAttributeResolver = options.profileAttributeResolver;
  },

  /**
     * Get datasource metadata for given datasource and specific resourcepath.
     * getMetadata loads metadadta only one level deep,
     * so when you want to load next level resource path to this level should be passed
     *
     * @param dataSourceUri data source for which we going to load metadata
     * @param resources path to level we want to load. or array of such pathes. root level if empty
     * @param options additional options
     * @returns {*} array of groups/elements or single group/element
     */
  getMetadata: function getMetadata(dataSourceUri, resources, options) {
    return this._getMetadata(dataSourceUri, resources, options);
  },
  _getMetadata: function _getMetadata(dataSourceUri, resources, options) {
    options = options || {};
    resources = resources || [];
    var deferred = new $.Deferred();
    var self = this;
    var resourcesToFetch = null;

    try {
      resourcesToFetch = this._getResourcesToFetch(dataSourceUri, resources, options);
    } catch (e) {
      deferred.reject({
        responseJSON: {
          errorCode: e.message
        }
      });
      return deferred.promise();
    }

    var opts = {
      dataSourceUri: dataSourceUri,
      resourcesToFetch: resourcesToFetch,
      resources: resources,
      additionalOptions: options
    };

    if (this._shouldLoadMetadataFromServer(opts)) {
      this._convertResourcesToServerFormat(opts).then(function (resourcesInServerFormat) {
        return self._getMetadataInternal(_.extend({
          resourcesInServerFormat: resourcesInServerFormat
        }, opts));
      }).then(function (result) {
        deferred.resolve(result);
      }, function (xhr) {
        deferred.reject(xhr);
      });
    } else {
      var result = this._getMetadataFromCache({
        dataSourceUri: dataSourceUri,
        resources: resources
      });

      deferred.resolve(result);
    }

    return deferred.promise();
  },
  _getMetadataInternal: function _getMetadataInternal(options) {
    var dataSourceUri = options.dataSourceUri,
        resources = options.resources,
        resourcesToFetch = options.resourcesToFetch,
        resourcesInServerFormat = options.resourcesInServerFormat,
        additionalOptions = options.additionalOptions;
    var self = this;
    return this.restMetadataService.getMetadata(dataSourceUri, resourcesInServerFormat, additionalOptions).then(function (data) {
      self.metadataServiceCache.add({
        dataSourceUri: dataSourceUri,
        resources: resourcesToFetch,
        data: data
      });
      return self._getMetadataFromCache({
        dataSourceUri: dataSourceUri,
        resources: resources
      });
    });
  },
  _getResourcesToFetch: function _getResourcesToFetch(dataSourceUri, resources, options) {
    var resourcesToFetch = this._getNotCachedResources({
      dataSourceUri: dataSourceUri,
      resources: resources,
      refresh: options.refresh
    });

    return this._resolveResources(resourcesToFetch);
  },
  _getNotCachedResources: function _getNotCachedResources(options) {
    var dataSourceUri = options.dataSourceUri,
        resources = options.resources,
        refresh = options.refresh;

    if (refresh) {
      return resources;
    }

    return _.filter(resources, function (path) {
      var dataFromCache = this.metadataServiceCache.get({
        dataSourceUri: dataSourceUri,
        path: path
      });
      return !Boolean(dataFromCache);
    }, this);
  },
  _resolveResources: function _resolveResources(resources) {
    return _.map(resources, function (resourcePath) {
      return _.map(resourcePath, function (pathFragment) {
        return this.profileAttributeResolver.resolve(pathFragment);
      }, this);
    }, this);
  },
  _convertResourcesToServerFormat: function _convertResourcesToServerFormat(options) {
    var resourcesToFetch = options.resourcesToFetch,
        additionalOptions = options.additionalOptions,
        dataSourceUri = options.dataSourceUri,
        deferred = new $.Deferred();

    if (resourcesToFetch.length === 0) {
      deferred.resolve(resourcesToFetch);
    } else {
      this._getMetadata(dataSourceUri, [], additionalOptions).then(function (rootLevelData) {
        var dataSourceType = dataSourceTypeUtil.getDataSourceType(rootLevelData);
        return _.map(resourcesToFetch, function (resourcePath) {
          return _.reduce(resourcePath, function (memo, pathFragment, index) {
            var levelName = metadataRequestLevelsEnum[dataSourceType][index];
            memo[levelName] = pathFragment;
            return memo;
          }, {});
        });
      }).then(deferred.resolve, deferred.reject);
    }

    return deferred.promise();
  },
  _shouldLoadMetadataFromServer: function _shouldLoadMetadataFromServer(options) {
    var dataSourceUri = options.dataSourceUri,
        resourcesToFetch = options.resourcesToFetch,
        resources = options.resources;

    var shouldRefreshData = options.additionalOptions.refresh,
        shouldLoadRootLevel = _.isEmpty(resources) && this._isRootLevelCacheEmpty(dataSourceUri),
        shouldLoadSubresources = !_.isEmpty(resources) && resourcesToFetch.length;

    return shouldRefreshData || shouldLoadRootLevel || shouldLoadSubresources;
  },
  _isRootLevelCacheEmpty: function _isRootLevelCacheEmpty(dataSourceUri) {
    var rootLevelFromCache = this.metadataServiceCache.get({
      dataSourceUri: dataSourceUri,
      path: []
    });
    return _.isEmpty(rootLevelFromCache);
  },
  _getMetadataFromCache: function _getMetadataFromCache(options) {
    var dataSourceUri = options.dataSourceUri,
        resources = options.resources;
    var result;

    if (resources.length > 0) {
      result = _.reduce(resources, function (memo, path) {
        var metadataFromCache = this.metadataServiceCache.get({
          dataSourceUri: dataSourceUri,
          path: path
        });

        if (metadataFromCache) {
          memo.notSingleResourceWasFoundInCache = false;
          memo.data.push(metadataFromCache);
        }

        return memo;
      }, {
        data: [],
        notSingleResourceWasFoundInCache: true
      }, this);

      if (result.notSingleResourceWasFoundInCache) {
        result = undefined;
      } else {
        result = result.data;
      }
    } else {
      result = this.metadataServiceCache.get({
        dataSourceUri: dataSourceUri,
        path: resources
      });
    }

    return result;
  }
});

module.exports = MetadataService;

});