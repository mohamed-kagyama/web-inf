define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.JOIN_TREE,
  collections: Object.freeze([{
    name: 'joins'
  }, {
    name: 'joinAliases',
    entityName: 'joinAlias'
  }, {
    name: 'calcFields'
  }, {
    name: 'filters'
  }]),
  properties: Object.freeze([{
    name: 'name',
    toJSON: true
  }, {
    name: 'includeAllDataIslandJoins',
    toJSON: true
  }, {
    name: 'suppressCircularJoins',
    toJSON: true
  }])
});

});