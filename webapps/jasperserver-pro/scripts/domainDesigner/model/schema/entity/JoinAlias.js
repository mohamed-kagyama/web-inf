define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.JOIN_ALIAS,
  properties: Object.freeze([{
    name: 'joinTreeId',
    toJSON: false
  }, {
    name: 'tableReferenceId',
    toJSON: true
  }, {
    name: 'alwaysIncludeTable',
    toJSON: true
  }, {
    name: 'name',
    toJSON: true
  }])
});

});