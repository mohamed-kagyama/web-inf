define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Table = require('./Table');

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.DERIVED_TABLE,
  collections: Object.freeze(Table.collections.concat([])),
  properties: Object.freeze(Table.properties.concat([{
    name: 'query',
    toJSON: true
  }]))
});

});