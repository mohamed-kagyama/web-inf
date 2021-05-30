define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.COMPLEX_FILTER,
  collections: Object.freeze([{
    name: 'fieldReferences'
  }]),
  properties: Object.freeze([{
    name: 'sourceId',
    toJSON: false
  }, {
    name: 'sourceType',
    toJSON: false
  }, {
    name: 'expression',
    toJSON: true
  }, {
    name: 'name',
    toJSON: true
  }])
});

});