define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dependenciesGroupNamesEnum = require("./dependenciesGroupNamesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var dependencyGroupToIndexMap = {};
dependencyGroupToIndexMap[dependenciesGroupNamesEnum.TABLE_REFERENCE] = 0;
dependencyGroupToIndexMap[dependenciesGroupNamesEnum.DERIVED_TABLE] = 1;
dependencyGroupToIndexMap[dependenciesGroupNamesEnum.CALC_FIELD] = 2;
dependencyGroupToIndexMap[dependenciesGroupNamesEnum.PRE_FILTER] = 3;
dependencyGroupToIndexMap[dependenciesGroupNamesEnum.JOIN_TREE] = 4;
dependencyGroupToIndexMap[dependenciesGroupNamesEnum.DATA_ISLAND] = 5;
dependencyGroupToIndexMap[dependenciesGroupNamesEnum.PRESENTATION_SET] = 6;
dependencyGroupToIndexMap[dependenciesGroupNamesEnum.PRESENTATION_FIELD] = 7;
module.exports = dependencyGroupToIndexMap;

});