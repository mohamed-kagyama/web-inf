define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BasePresentationItem = require("./BasePresentationItem");

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.DATA_ISLAND,
  collections: Object.freeze([{
    name: 'children',
    entityName: 'child'
  }]),
  properties: Object.freeze(BasePresentationItem.properties.concat([{
    name: 'sourceId',
    toJSON: true
  }, {
    name: 'sourceType',
    toJSON: true
  }]))
});

});