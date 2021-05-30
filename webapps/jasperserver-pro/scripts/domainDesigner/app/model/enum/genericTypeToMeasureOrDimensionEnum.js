define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypes = require("../../../model/schema/enum/genericTypesEnum");

var measureOrDimensionEnum = require("../../../model/schema/enum/measureOrDimensionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var typeToKind = {};
typeToKind[genericTypes.DECIMAL] = measureOrDimensionEnum.MEASURE;
typeToKind[genericTypes.INTEGER] = measureOrDimensionEnum.MEASURE;
typeToKind[genericTypes.STRING] = measureOrDimensionEnum.DIMENSION;
typeToKind[genericTypes.BOOLEAN] = measureOrDimensionEnum.DIMENSION;
typeToKind[genericTypes.DATE] = measureOrDimensionEnum.DIMENSION;
typeToKind[genericTypes.TIMESTAMP] = measureOrDimensionEnum.DIMENSION;
typeToKind[genericTypes.TIME] = measureOrDimensionEnum.DIMENSION;
module.exports = typeToKind;

});