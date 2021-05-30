define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var joinTreeRelatedEntities = [schemaEntitiesEnum.JOIN, schemaEntitiesEnum.JOIN_ALIAS, schemaEntitiesEnum.JOIN_EXPRESSION, schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION, schemaEntitiesEnum.COMPLEX_JOIN];

var AffectedEntitiesReducer = function AffectedEntitiesReducer(options) {
  this.initialize(options);
};

_.extend(AffectedEntitiesReducer.prototype, {
  initialize: function initialize() {
    _.bindAll(this, 'reduce');
  },
  reduce: function reduce(collections, targetEntityOptions) {
    if (_.indexOf(joinTreeRelatedEntities, targetEntityOptions.targetEntityType) === -1) {
      return collections;
    }

    return [];
  }
});

module.exports = AffectedEntitiesReducer;

});