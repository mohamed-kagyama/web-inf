define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var artificialTreeResourceTypesEnum = require("../../layout/sidebarView/enum/artificialTreeResourceTypesEnum");

var schemaEntitiesEnum = require("../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var schemaEntitiesWithoutFilters = _.omit(schemaEntitiesEnum, [schemaEntitiesEnum.FILTER_EXPRESSION, schemaEntitiesEnum.COMPLEX_FILTER]);

var preFilter = _.pick(artificialTreeResourceTypesEnum, artificialTreeResourceTypesEnum.PRE_FILTER);

module.exports = _.extend({}, preFilter, schemaEntitiesWithoutFilters);

});