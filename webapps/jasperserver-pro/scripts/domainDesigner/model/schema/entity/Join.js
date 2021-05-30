define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseJoin = require("./BaseJoin");

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.JOIN,
  collections: Object.freeze([{
    name: 'joinExpressions'
  }]),
  properties: Object.freeze(BaseJoin.properties.concat([]))
});

});