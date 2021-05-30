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

var DomainSchemaNameMismatchErrorToResourceNameConverter = function DomainSchemaNameMismatchErrorToResourceNameConverter(options) {
  this.missingSchemasConverter = options.missingSchemasConverter;
};

_.extend(DomainSchemaNameMismatchErrorToResourceNameConverter.prototype, {
  convert: function convert(errors) {
    errors = _.isArray(errors) ? errors : [errors];

    var firstError = _.first(errors);

    var missingSchemaNames = extractPropertyByKeyUtil.extract(firstError.parameters, errorParametersKeysEnum.DOMAIN_SCHEMA_NAME);

    if (_.isEmpty(missingSchemaNames)) {
      return i18nMessage('domain.designer.error.dialog.schema.name.mismatch.empty');
    } else {
      return this.missingSchemasConverter.convert(errors);
    }
  }
});

module.exports = DomainSchemaNameMismatchErrorToResourceNameConverter;

});