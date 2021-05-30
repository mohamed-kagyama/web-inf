define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityTypeToSchemaCollectionMap = require("../enum/entityTypeToSchemaCollectionMap");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (schema, entityType) {
  var collection = entityTypeToSchemaCollectionMap[entityType];
  return schema[collection];
};

});