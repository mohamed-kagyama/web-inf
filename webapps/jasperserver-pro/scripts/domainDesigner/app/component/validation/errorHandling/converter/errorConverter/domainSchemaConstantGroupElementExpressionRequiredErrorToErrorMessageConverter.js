define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

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
    var invalidElementNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.INVALID_ELEMENT_NAME),
        resourcePathProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.RESOURCE_PATH);
    return i18nMessage('domain.designer.error.dialog.schema.constant.group.element.expression.required.error.template', invalidElementNameProperty.value, resourcePathProperty.value);
  }
};

});