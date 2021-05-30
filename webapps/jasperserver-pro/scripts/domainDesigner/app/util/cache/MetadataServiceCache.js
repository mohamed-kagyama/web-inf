define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var profileAttributeUtil = require("../../../model/util/profileAttributeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CACHE_KEY_SEPARATOR = '.';

var MetadataServiceCache = function MetadataServiceCache(options) {
  this.initialize(options);
};

_.extend(MetadataServiceCache.prototype, {
  initialize: function initialize(options) {
    options = options || {};
    this.cache = options.cache;
    this.profileAttributeResolver = options.profileAttributeResolver;
  },
  get: function get(options) {
    var dataSourceUri = options.dataSourceUri,
        path = options.path;

    var dataSourceCache = this._getDataSourceCache(dataSourceUri);

    if (this._isRootLevel(path)) {
      return dataSourceCache.root;
    } else {
      var cacheKey = this._getCacheKey(path);

      return dataSourceCache.subResources[cacheKey];
    }
  },
  add: function add(options) {
    var dataSourceUri = options.dataSourceUri,
        metadata = options.data,
        resources = options.resources;

    var dataSourceCache = this._getDataSourceCache(dataSourceUri);

    metadata = metadata ? metadata : [];

    if (this._isRootLevel(resources)) {
      dataSourceCache.root = metadata.elements;
    } else {
      this._putSubResourcesIntoCache(dataSourceCache, metadata, resources);
    }

    return dataSourceCache;
  },
  reset: function reset(dataSourceUri) {
    this.cache.reset(dataSourceUri);
  },
  // private methods
  _resolvePathFragments: function _resolvePathFragments(path) {
    return _.map(path, function (pathFragment) {
      if (profileAttributeUtil.containsProfileAttributeWithPlaceholdersOnly(pathFragment)) {
        return this.profileAttributeResolver.resolve(pathFragment);
      }

      return pathFragment;
    }, this);
  },
  _getCacheKey: function _getCacheKey(path) {
    return this._resolvePathFragments(path).join(CACHE_KEY_SEPARATOR);
  },
  _getDataSourceCache: function _getDataSourceCache(dataSourceUri) {
    var dataSourceCache = this.cache.get(dataSourceUri);

    if (!dataSourceCache) {
      dataSourceCache = {
        root: [],
        subResources: {}
      };
      this.cache.add(dataSourceUri, dataSourceCache);
    }

    return dataSourceCache;
  },
  _isRootLevel: function _isRootLevel(path) {
    return _.isEmpty(path);
  },
  _putSubResourcesIntoCache: function _putSubResourcesIntoCache(dataSourceCache, metadata, resources) {
    _.each(metadata.elements, function (element) {
      var cacheKey = null;

      var found = _.find(resources, function (path) {
        cacheKey = this._getCacheKey(path);
        return _.last(path) === element.group.name;
      }, this);

      if (found) {
        dataSourceCache.subResources[cacheKey] = element;
      }
    }, this);
  }
});

module.exports = MetadataServiceCache;

});