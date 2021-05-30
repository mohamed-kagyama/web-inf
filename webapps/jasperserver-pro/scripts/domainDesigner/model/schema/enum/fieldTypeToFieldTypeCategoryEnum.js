define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var fieldTypeCategoryEnum = require("./fieldTypeCategoryEnum");

var dataSourceMetadataTypesEnum = require("./dataSourceMetadataTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var fieldTypeToFieldTypeCategoryMap = {};
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Byte] = fieldTypeCategoryEnum.NUMBER;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Integer] = fieldTypeCategoryEnum.NUMBER;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Long] = fieldTypeCategoryEnum.NUMBER;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Double] = fieldTypeCategoryEnum.NUMBER;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Short] = fieldTypeCategoryEnum.NUMBER;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Float] = fieldTypeCategoryEnum.NUMBER;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.BigDecimal] = fieldTypeCategoryEnum.NUMBER;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.BigInteger] = fieldTypeCategoryEnum.NUMBER;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.String] = fieldTypeCategoryEnum.STRING;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Boolean] = fieldTypeCategoryEnum.BOOLEAN;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Date] = fieldTypeCategoryEnum.TIME;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Timestamp] = fieldTypeCategoryEnum.TIME;
fieldTypeToFieldTypeCategoryMap[dataSourceMetadataTypesEnum.Time] = fieldTypeCategoryEnum.TIME;
module.exports = fieldTypeToFieldTypeCategoryMap;

});