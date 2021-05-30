define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionsEnum = require("./expressionsEnum");

var genericTypesEnum = require("../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var castFunctions = expressionsEnum.castFunctions;
var genericTypeToCastFunctionEnum = {};
genericTypeToCastFunctionEnum[genericTypesEnum.INTEGER] = castFunctions.Integer.name;
genericTypeToCastFunctionEnum[genericTypesEnum.DECIMAL] = castFunctions.Decimal.name;
genericTypeToCastFunctionEnum[genericTypesEnum.BOOLEAN] = castFunctions.Boolean.name;
genericTypeToCastFunctionEnum[genericTypesEnum.DATE] = castFunctions.Date.name;
genericTypeToCastFunctionEnum[genericTypesEnum.TIME] = castFunctions.Time.name;
genericTypeToCastFunctionEnum[genericTypesEnum.TIMESTAMP] = castFunctions.Timestamp.name;
module.exports = genericTypeToCastFunctionEnum;

});