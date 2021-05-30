define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var measureOrDimensionEnum = require("../../../model/schema/enum/measureOrDimensionEnum");

var presentationFieldsMeasureOrDimensionEnum = require("./presentationFieldsMeasureOrDimensionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = [{
  label: presentationFieldsMeasureOrDimensionEnum[measureOrDimensionEnum.MEASURE],
  value: measureOrDimensionEnum.MEASURE
}, {
  label: presentationFieldsMeasureOrDimensionEnum[measureOrDimensionEnum.DIMENSION],
  value: measureOrDimensionEnum.DIMENSION
}];

});