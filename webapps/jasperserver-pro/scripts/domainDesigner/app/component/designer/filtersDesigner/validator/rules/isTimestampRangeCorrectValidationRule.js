define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var date = require("runtime_dependencies/js-sdk/src/common/util/parse/date");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18Message = i18nMessageUtil.create(i18n);
module.exports = {
  validate: function validate(range) {
    var result = date.compareTimestamps(range.start.value, range.end.value);

    if (result !== -1) {
      return {
        end: i18Message('domain.designer.filters.validation.range.endTimestampMustBeAfterStartTimestamp')
      };
    }
  }
};

});