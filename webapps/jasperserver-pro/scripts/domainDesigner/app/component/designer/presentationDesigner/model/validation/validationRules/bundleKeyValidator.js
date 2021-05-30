define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var clientValidationRegExpEnum = require("../../../../../../enum/clientValidationRegExpEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  fn: function fn(value) {
    if (value && value.match(clientValidationRegExpEnum.BUNDLE_KEY_BLACKLIST_REGEX_PATTERN)) {
      return i18nMessage('domain.designer.presentationDesigner.validation.itemBundle.key.invalid');
    }
  }
};

});