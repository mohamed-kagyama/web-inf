define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var defaultSchemaEnum = require("../enum/defaultSchemaNameEnum");

var profileAttributeErrorEnum = require("../enum/profileAttributeErrorEnum");

var schemaCollectionsEnum = require("../../../model/schema/enum/schemaCollectionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DefaultSchemaAwareProfileAttributeResolver = function DefaultSchemaAwareProfileAttributeResolver(options) {
  this.initialize(options);
};

_.extend(DefaultSchemaAwareProfileAttributeResolver.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.profileAttributesServiceCache = options.profileAttributesServiceCache;
  },
  resolve: function resolve(value) {
    var resolvedProfileAttribute = this.profileAttributesServiceCache.get(value),
        resolvedProfileAttributeValue = resolvedProfileAttribute && resolvedProfileAttribute.value;

    if (resolvedProfileAttributeValue === '') {
      var defaultSchema = this.dataStore.getCollection(schemaCollectionsEnum.DATA_SOURCE_GROUPS).byField('name', defaultSchemaEnum.DEFAULT_SCHEMA);

      if (defaultSchema) {
        return defaultSchema.sourceName;
      } else {
        throw new Error(profileAttributeErrorEnum.PROFILE_ATTRIBUTE_EMPTY_FOR_SCHEMA_FULL_DATASOURCE);
      }
    }

    return _.isUndefined(resolvedProfileAttributeValue) ? value : resolvedProfileAttributeValue;
  }
});

module.exports = DefaultSchemaAwareProfileAttributeResolver;

});