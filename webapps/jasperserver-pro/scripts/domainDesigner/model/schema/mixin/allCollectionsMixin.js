define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityTypeToSchemaCollectionMap = require("../enum/entityTypeToSchemaCollectionMap");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var collections = _.chain(entityTypeToSchemaCollectionMap).values().unique().value();

module.exports = {
  mixInAllCollections: function mixInAllCollections(dataStore) {
    collections.forEach(function (collection) {
      this[collection] = dataStore.getCollection(collection);
    }, this);
  }
};

});