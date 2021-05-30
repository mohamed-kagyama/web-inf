define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function TableReducer() {
  _.bindAll(this, 'reduce');
}

_.extend(TableReducer.prototype, {
  reduce: function reduce(collections) {
    return _.omit(collections, [schemaEntitiesEnum.TABLE]);
  }
});

module.exports = TableReducer;

});