define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var errorParametersKeysEnum = require("../../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  convert: function convert(error) {
    var bundleCode,
        lineNumber = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.LINE_NUMBER),
        columnNumber = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.COLUMN_NUMBER);

    if (_.isEmpty(columnNumber)) {
      bundleCode = 'domain.designer.error.dialog.schema.xml.parse.error.unexpected.string.no.column';
    } else {
      bundleCode = 'domain.designer.error.dialog.schema.xml.parse.error.unexpected.string';
    }

    return i18nMessage(bundleCode, lineNumber.value, columnNumber.value);
  }
};

});