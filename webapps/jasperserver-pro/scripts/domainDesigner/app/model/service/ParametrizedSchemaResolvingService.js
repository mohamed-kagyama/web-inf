define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var profileAttributeUtil = require("../../../model/util/profileAttributeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ParametrizedSchemaResolvingService = function ParametrizedSchemaResolvingService(options) {
  this.initialize(options);
};

_.extend(ParametrizedSchemaResolvingService.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_filterParametrizedSchemas', '_mapParametrizedSchemaToProfileAttributes');

    this.profileAttributesService = options.profileAttributesService;
  },
  resolve: function resolve(collections, options) {
    options = options || {};

    var profileAttributes = this._getProfileAttributesFromParametrizedSchemas(collections);

    if (_.size(profileAttributes) > 0) {
      return this.profileAttributesService.getProfileAttributes(profileAttributes, {
        refresh: options.refresh
      });
    } else {
      return new $.Deferred().resolve([]);
    }
  },
  _getProfileAttributesFromParametrizedSchemas: function _getProfileAttributesFromParametrizedSchemas(collection) {
    return collection.dataSourceGroups.chain().filter(this._filterParametrizedSchemas).map(this._mapParametrizedSchemaToProfileAttributes).toArray();
  },
  _getSchemaName: function _getSchemaName(dataSourceGroup) {
    return dataSourceGroup.getSourceName() || dataSourceGroup.getName();
  },
  _filterParametrizedSchemas: function _filterParametrizedSchemas(dataSourceGroup) {
    var name = this._getSchemaName(dataSourceGroup);

    return profileAttributeUtil.containsProfileAttributeWithPlaceholders(name);
  },
  _mapParametrizedSchemaToProfileAttributes: function _mapParametrizedSchemaToProfileAttributes(parametrizedSchema) {
    var name = this._getSchemaName(parametrizedSchema);

    var args = profileAttributeUtil.extractProfileAttributeArgs(name);
    var profileAttribute = {
      name: args[0]
    };

    if (_.size(args) > 1) {
      profileAttribute['level'] = args[1];
    }

    return profileAttribute;
  }
});

module.exports = ParametrizedSchemaResolvingService;

});