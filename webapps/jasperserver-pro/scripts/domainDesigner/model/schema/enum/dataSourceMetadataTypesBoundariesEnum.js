define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dataSourceMetadataTypesEnum = require("./dataSourceMetadataTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var boundariesEnum = {};
boundariesEnum[dataSourceMetadataTypesEnum.Double] = {
  min: -Infinity,
  max: Infinity
};
boundariesEnum[dataSourceMetadataTypesEnum.BigDecimal] = {
  min: -Infinity,
  max: Infinity
};
boundariesEnum[dataSourceMetadataTypesEnum.BigInteger] = {
  min: -Infinity,
  max: Infinity
};
boundariesEnum[dataSourceMetadataTypesEnum.Long] = {
  min: -Infinity,
  max: Infinity
};
boundariesEnum[dataSourceMetadataTypesEnum.Float] = {
  min: 1.401298464324817e-45,
  max: 3.4028234663852886e+38
};
boundariesEnum[dataSourceMetadataTypesEnum.Integer] = {
  min: -2147483648,
  max: 2147483647
};
boundariesEnum[dataSourceMetadataTypesEnum.Short] = {
  min: -32768,
  max: 32767
};
boundariesEnum[dataSourceMetadataTypesEnum.Byte] = {
  min: -128,
  max: 127
};
module.exports = boundariesEnum;

});