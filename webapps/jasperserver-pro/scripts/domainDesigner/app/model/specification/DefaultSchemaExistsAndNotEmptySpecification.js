define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var defaultSchemaNameEnum = require("../enum/defaultSchemaNameEnum");

var schemaCollectionsEnum = require("../../../model/schema/enum/schemaCollectionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DefaultSchemaExistsAndNotEmptySpecification = function DefaultSchemaExistsAndNotEmptySpecification(options) {
  this.initialize(options);
};

_.extend(DefaultSchemaExistsAndNotEmptySpecification.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
  },
  isSatisfied: function isSatisfied() {
    var defaultSchema = this.dataStore.getCollection(schemaCollectionsEnum.DATA_SOURCE_GROUPS).findWhere({
      name: defaultSchemaNameEnum.DEFAULT_SCHEMA
    });
    return defaultSchema && defaultSchema.children.size() > 0;
  }
});

module.exports = DefaultSchemaExistsAndNotEmptySpecification;

});