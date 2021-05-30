define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dataSourceMetadataTypesEnum = require("./dataSourceMetadataTypesEnum");

var genericTypes = require("./genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var domElTypesToGenericTypesMap = {};
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Byte] = genericTypes.INTEGER;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Integer] = genericTypes.INTEGER;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Long] = genericTypes.INTEGER;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Double] = genericTypes.DECIMAL;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Short] = genericTypes.INTEGER;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Float] = genericTypes.DECIMAL;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.BigDecimal] = genericTypes.DECIMAL;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.BigInteger] = genericTypes.INTEGER;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.String] = genericTypes.STRING;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Boolean] = genericTypes.BOOLEAN;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Date] = genericTypes.DATE;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Timestamp] = genericTypes.TIMESTAMP;
domElTypesToGenericTypesMap[dataSourceMetadataTypesEnum.Time] = genericTypes.TIME;
module.exports = domElTypesToGenericTypesMap;

});