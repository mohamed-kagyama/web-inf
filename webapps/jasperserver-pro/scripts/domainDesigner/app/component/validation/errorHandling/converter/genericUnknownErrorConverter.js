define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  convert: function convert(unknownErrors, options) {
    options = options || {
      convertedErrors: []
    };

    if (!options.convertedErrors.length && unknownErrors.length) {
      return [{
        category: '',
        errorParameters: [i18nMessage('domain.designer.error.handling.unknown.error')]
      }];
    } else {
      return [];
    }
  }
};

});