define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require("../../../../../model/schema/enum/genericTypesEnum");

var clientExpressionsEnum = require('../../../../model/enum/clientExpressionsEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var operators = clientExpressionsEnum.operators;
var operatorsArray = [operators.equals, operators.notEqual, operators.greater, operators.less, operators.greaterOrEqual, operators.lessOrEqual, operators["in"], operators.notIn];
var operatorsForStringAndBoolean = [operators.equals, operators.notEqual, operators["in"], operators.notIn];
var genericTypeToOperatorsMap = {};
genericTypeToOperatorsMap[genericTypesEnum.INTEGER] = operatorsArray;
genericTypeToOperatorsMap[genericTypesEnum.DECIMAL] = operatorsArray;
genericTypeToOperatorsMap[genericTypesEnum.STRING] = operatorsForStringAndBoolean;
genericTypeToOperatorsMap[genericTypesEnum.BOOLEAN] = operatorsForStringAndBoolean;
genericTypeToOperatorsMap[genericTypesEnum.DATE] = operatorsArray;
genericTypeToOperatorsMap[genericTypesEnum.TIMESTAMP] = operatorsArray;
genericTypeToOperatorsMap[genericTypesEnum.TIME] = operatorsArray;
module.exports = genericTypeToOperatorsMap;

});