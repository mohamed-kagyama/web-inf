define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var menuEventsMap = {};
var optionPrefix = 'option';
var separator = ':';
menuEventsMap.COPY_TABLE_REFERENCE = {
  event: 'copyTableReference'
};
menuEventsMap.COPY_DERIVED_TABLE = {
  event: 'copyDerivedTable'
};
menuEventsMap.CREATE_DERIVED_TABLE = {
  event: 'createDerivedTable'
};
menuEventsMap.RENAME_TABLE_REFERENCE = {
  event: 'renameTableReference'
};
menuEventsMap.EDIT_DERIVED_TABLE = {
  event: 'editDerivedTable'
};
menuEventsMap.REMOVE_TABLE_REFERENCE = {
  event: 'removeTableReference'
};
menuEventsMap.REMOVE_DERIVED_TABLE = {
  event: 'removeDerivedTable'
};
menuEventsMap.ALWAYS_INCLUDE_TABLE = {
  event: 'alwaysIncludeTable'
};
menuEventsMap.GENERATE_JOINS = {
  event: 'generateJoins'
};
menuEventsMap.CREATE_CALC_FIELD = {
  event: 'createCalcField'
};
menuEventsMap.EDIT_CALC_FIELD = {
  event: 'editCalcField'
};
menuEventsMap.REMOVE_CALC_FIELD = {
  event: 'removeCalcField'
};
module.exports = _.reduce(menuEventsMap, function (memo, value, key) {
  memo[key] = _.extend({}, value, {
    eventWithPrefix: optionPrefix + separator + value.event
  });
  return memo;
}, {});

});