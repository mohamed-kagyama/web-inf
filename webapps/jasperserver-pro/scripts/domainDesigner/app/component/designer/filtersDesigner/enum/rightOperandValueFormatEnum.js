define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var rightOperandValueFormatEnum = {};

rightOperandValueFormatEnum[filterOperandTypesEnum.LIST] = function (items, options) {
  options = options || {};
  return {
    isAll: Boolean(options.isTrueAll),
    items: items
  };
};

rightOperandValueFormatEnum[filterOperandTypesEnum.RANGE] = function (value) {
  return {
    start: {
      value: value.start
    },
    end: {
      value: value.end
    }
  };
};

rightOperandValueFormatEnum[filterOperandTypesEnum.LITERAL] = function (value) {
  return {
    value: value
  };
};

module.exports = rightOperandValueFormatEnum;

});