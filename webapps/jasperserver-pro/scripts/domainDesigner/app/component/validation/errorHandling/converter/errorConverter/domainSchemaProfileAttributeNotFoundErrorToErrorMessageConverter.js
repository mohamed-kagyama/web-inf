define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var errorParametersKeysEnum = require("../../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../../util/extractPropertyByKeyUtil");

var profileAttributeCategoryToI18nKeyEnum = require("../../enum/profileAttributeCategoryToI18nKeyEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  convert: function convert(error) {
    var hierarchyNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.HIERARCHY_NAME),
        attributeNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.ATTRIBUTE_NAME),
        attributeName = attributeNameProperty.value,
        attributeCategoryKey = profileAttributeCategoryToI18nKeyEnum[hierarchyNameProperty.value],
        attributeCategory = i18nMessage(attributeCategoryKey);
    return i18nMessage("profile.attribute.exception.substitution.not.found", attributeName, attributeCategory);
  }
};

});