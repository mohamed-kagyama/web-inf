define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionsEnum = require("./expressionsEnum");

var genericTypesEnum = require("../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var genericTypeToExpressionLiteralTypeEnum = {};
genericTypeToExpressionLiteralTypeEnum[genericTypesEnum.INTEGER] = expressionsEnum.operators.number.name;
genericTypeToExpressionLiteralTypeEnum[genericTypesEnum.DECIMAL] = expressionsEnum.operators.number.name;
genericTypeToExpressionLiteralTypeEnum[genericTypesEnum.STRING] = expressionsEnum.operators.string.name;
genericTypeToExpressionLiteralTypeEnum[genericTypesEnum.BOOLEAN] = expressionsEnum.operators["boolean"].name;
genericTypeToExpressionLiteralTypeEnum[genericTypesEnum.DATE] = expressionsEnum.operators.date.name;
genericTypeToExpressionLiteralTypeEnum[genericTypesEnum.TIMESTAMP] = expressionsEnum.operators.timestamp.name;
genericTypeToExpressionLiteralTypeEnum[genericTypesEnum.TIME] = expressionsEnum.operators.time.name;
module.exports = genericTypeToExpressionLiteralTypeEnum;

});