define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.DATA_SOURCE_GROUP,
  collections: Object.freeze([{
    name: 'children',
    entityName: 'child'
  }]),
  properties: Object.freeze([{
    name: 'parentId',
    toJSON: false
  }, {
    name: 'dataSourceId',
    toJSON: false
  }, {
    name: 'sourceName',
    toJSON: true
  }, {
    name: 'name',
    toJSON: true
  }])
});

});