define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var operators = clientExpressionsEnum.operators;
var FORBIDDEN_OPERATORS = [operators.greater.name, operators.less.name, operators.greaterOrEqual.name, operators.lessOrEqual.name];
module.exports = {
  validate: function validate(value, options) {
    if (value === '' && _.indexOf(FORBIDDEN_OPERATORS, options.operator) > -1) {
      return i18nMessage('domain.designer.filters.validation.rightOperand.emptyValue', value);
    }
  }
};

});