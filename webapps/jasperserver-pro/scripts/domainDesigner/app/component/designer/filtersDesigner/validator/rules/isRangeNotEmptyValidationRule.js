define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

function isEmpty(value) {
  return value === '';
}

module.exports = {
  validate: function validate(range) {
    var message = {};

    if (isEmpty(range.start.value)) {
      message.start = i18nMessage('domain.designer.filters.validation.rightOperand.emptyValue');
    }

    if (isEmpty(range.end.value)) {
      message.end = i18nMessage('domain.designer.filters.validation.rightOperand.emptyValue');
    }

    if (message.start || message.end) {
      return message;
    }
  }
};

});