define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourcePropertiesUtil = require("../util/resourcePropertiesUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientResourcePropertiesService = function ClientResourcePropertiesService(options) {
  this.initialize(options);
};

_.extend(ClientResourcePropertiesService.prototype, {
  initialize: function initialize(options) {
    this.resourcePropertiesService = options.resourcePropertiesService;
    this.serverResourcePropertiesModelSerializer = options.serverResourcePropertiesModelSerializer;
    this.resourceProperties = options.resourceProperties;
  },
  isDomainSaved: function isDomainSaved() {
    return Boolean(this.resourceProperties.get('uri'));
  },
  serialize: function serialize(useContentInsteadOfResourceReference) {
    return this.serverResourcePropertiesModelSerializer.serialize(this.resourceProperties, useContentInsteadOfResourceReference);
  },
  serializeToClientModel: function serializeToClientModel() {
    return this.resourceProperties.toJSON();
  },
  getBundles: function getBundles() {
    var bundles = this.resourceProperties.get('bundles');
    return bundles.map(_.cloneDeep);
  },
  getDataSourceUri: function getDataSourceUri(dataSourceName) {
    return this.resourceProperties.get('dataSources')[dataSourceName];
  },
  getDomainLabel: function getDomainLabel() {
    return this.resourceProperties.get('label');
  },
  getDataSourceName: function getDataSourceName() {
    var dataSources = this.resourceProperties.get('dataSources');
    return resourcePropertiesUtil.getFirstDataSourceName(dataSources);
  },
  replaceBundles: function replaceBundles(bundles) {
    var self = this,
        savedBundles = this.getBundles();

    var replacedBundles = _.reduce(savedBundles, function (memo, addedBundle) {
      var bundleToReplace = _.find(bundles, function (bundle) {
        return self._isBundlesTheSame(bundle, addedBundle);
      });

      if (bundleToReplace) {
        memo.push(bundleToReplace);
      } else {
        memo.push(addedBundle);
      }

      return memo;
    }, []);

    var newBundles = _.reduce(bundles, function (memo, bundle) {
      var isBundleAlreadyReplaced = _.find(replacedBundles, function (replacedBundle) {
        return self._isBundlesTheSame(bundle, replacedBundle);
      });

      if (!isBundleAlreadyReplaced) {
        memo.push(bundle);
      }

      return memo;
    }, []);

    return replacedBundles.concat(newBundles);
  },
  isAnyDuplicateBundles: function isAnyDuplicateBundles(bundles) {
    var self = this,
        savedBundles = this.getBundles();
    return _.some(bundles, function (bundle) {
      return _.some(savedBundles, function (savedBundle) {
        return self._isBundlesTheSame(bundle, savedBundle);
      });
    });
  },
  // private methods
  _isBundlesTheSame: function _isBundlesTheSame(bundle1, bundle2) {
    var bundle1Name = resourcePropertiesUtil.getBundleName(bundle1),
        bundle2Name = resourcePropertiesUtil.getBundleName(bundle2);
    return bundle1Name === bundle2Name;
  }
});

module.exports = ClientResourcePropertiesService;

});