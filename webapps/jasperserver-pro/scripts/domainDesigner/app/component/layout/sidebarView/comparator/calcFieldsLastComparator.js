define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (left, right) {
  left = left.resource;
  right = right.resource;
  var isLeftCalcField = entityUtil.isCalcField(left.type),
      isRightCalcField = entityUtil.isCalcField(right.type),
      areBothCalcFields = isLeftCalcField && isRightCalcField,
      noCalcFields = !isLeftCalcField && !isRightCalcField;

  if (noCalcFields || areBothCalcFields) {
    return 0;
  } else if (isLeftCalcField) {
    return 1;
  } else if (isRightCalcField) {
    return -1;
  }
};

});