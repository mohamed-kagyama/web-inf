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
    var expressionProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.EXPRESSION),
        invalidFields = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.INVALID_FIELD),
        resourcePath = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.RESOURCE_PATH);

    if (_.isArray(invalidFields)) {
      invalidFields = invalidFields.map(function (invalidField) {
        return invalidField.value;
      }).join(', ');
    } else {
      invalidFields = invalidFields.value;
    }

    return i18nMessage('domain.designer.error.dialog.schema.expression.invalid.fields.error.template', expressionProperty.value, invalidFields, resourcePath.value);
  }
};

});