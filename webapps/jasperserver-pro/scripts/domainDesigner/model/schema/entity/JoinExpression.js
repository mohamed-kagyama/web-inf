define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.JOIN_EXPRESSION,
  properties: Object.freeze([{
    name: 'joinId',
    toJSON: false
  }, {
    name: 'rightJoinAliasId',
    toJSON: true
  }, {
    name: 'leftJoinAliasId',
    toJSON: true
  }, {
    name: 'leftFieldId',
    toJSON: true
  }, {
    name: 'rightFieldId',
    toJSON: true
  }, {
    name: 'operator',
    toJSON: true
  }])
});

});