define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var numberUtil = require("../../../../../common/util/numberUtil");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18Message = i18nMessageUtil.create(i18n);
module.exports = {
  validate: function validate(range) {
    var start = numberUtil.parseNumber(range.start.value),
        end = numberUtil.parseNumber(range.end.value);

    if (start >= end) {
      return {
        end: i18Message('domain.designer.filters.validation.range.secondValueShouldBeLessThanFirstValue')
      };
    }
  }
};

});