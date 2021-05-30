define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResourcePropertiesService = function ResourcePropertiesService(options) {
  this.resourceProperties = options.resourceProperties;
};

_.extend(ResourcePropertiesService.prototype, {
  save: function save(properties) {
    this.resourceProperties.set(properties);
  },
  reset: function reset(properties) {
    properties = _.defaults({}, properties, _.result(this.resourceProperties, 'defaults'));
    this.resourceProperties.set(properties);
  },
  replaceDataSource: function replaceDataSource(options) {
    var dataSources = this.resourceProperties.get('dataSources'),
        dataSourcesClone = _.clone(dataSources),
        firstDataSource = _.first(_.keys(dataSources));

    dataSourcesClone = _.omit(dataSourcesClone, firstDataSource);
    dataSourcesClone[options.name] = options.uri;
    this.resourceProperties.set('dataSources', dataSourcesClone);
  },
  removeBundle: function removeBundle(index) {
    var bundles = _.cloneDeep(this.resourceProperties.get('bundles'));

    bundles.splice(index, 1);
    this.resourceProperties.set('bundles', bundles);
  },
  addBundles: function addBundles(bundles) {
    bundles = this.resourceProperties.get('bundles').concat(bundles);
    this.resourceProperties.set('bundles', bundles);
  },
  replaceBundles: function replaceBundles(bundles) {
    this.resourceProperties.set('bundles', bundles);
  },
  addSecurityFile: function addSecurityFile(securityFile) {
    this.resourceProperties.set('securityFile', securityFile);
  },
  removeSecurityFile: function removeSecurityFile() {
    this.resourceProperties.set('securityFile', null);
  }
});

module.exports = ResourcePropertiesService;

});