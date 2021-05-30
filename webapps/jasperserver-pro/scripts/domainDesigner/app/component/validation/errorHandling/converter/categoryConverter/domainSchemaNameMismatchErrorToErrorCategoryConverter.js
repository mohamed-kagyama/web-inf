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
  convert: function convert(errors) {
    var firstError = _.first(errors);

    var missingSchemaNames = extractPropertyByKeyUtil.extract(firstError.parameters, errorParametersKeysEnum.DOMAIN_SCHEMA_NAME);
    return _.isEmpty(missingSchemaNames) ? '' : i18nMessage('domain.designer.error.dialog.schema.name.mismatch.category');
  }
};

});