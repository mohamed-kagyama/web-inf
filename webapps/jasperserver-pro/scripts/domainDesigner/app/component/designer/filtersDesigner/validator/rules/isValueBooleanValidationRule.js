define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var booleanStringEquivalentEnum = require("../../../../../util/designer/filters/enum/booleanStringEquivalentEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

function isTrue(value) {
  return value === booleanStringEquivalentEnum.TRUE;
}

function isFalse(value) {
  return value === booleanStringEquivalentEnum.FALSE;
}

module.exports = {
  validate: function validate(value) {
    if (!value || isTrue(value) || isFalse(value)) {
      return;
    }

    return i18nMessage('domain.designer.filters.validation.rightOperand.isNotAValidBoolean');
  }
};

});