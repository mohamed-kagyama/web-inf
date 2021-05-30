define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var encryptedProfileAttributeErrorParamKeyEnum = require("../../../../../rest/enum/encryptedProfileAttributeErrorParamKeyEnum");

var extractPropertyByKeyUtil = require("../../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  convert: function convert(error) {
    var attributeNameProperty = extractPropertyByKeyUtil.extract(error.parameters, encryptedProfileAttributeErrorParamKeyEnum.ATTRIBUTE_NAME);
    return i18nMessage("profile.attribute.exception.value.is.encrypted", attributeNameProperty.value);
  }
};

});