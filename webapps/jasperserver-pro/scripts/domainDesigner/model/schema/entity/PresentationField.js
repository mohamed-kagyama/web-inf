define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BasePresentationItem = require("./BasePresentationItem");

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Object.freeze({
  name: schemaEntitiesEnum.PRESENTATION_FIELD,
  properties: Object.freeze(BasePresentationItem.properties.concat([{
    name: 'dataIslandId',
    toJSON: false
  }, {
    name: 'parentId',
    toJSON: false
  }, {
    name: 'sourceId',
    toJSON: true
  }, {
    name: 'sourceType',
    toJSON: true
  }, {
    name: 'fieldId',
    toJSON: true
  }, {
    name: 'fieldType',
    toJSON: true
  }, {
    name: 'mask',
    toJSON: true
  }, {
    name: 'aggregation',
    toJSON: true
  }, {
    name: 'kind',
    toJSON: true
  }]))
});

});