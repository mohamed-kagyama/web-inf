define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  convert: function convert(error) {
    var unavailableSchemas = error.parameters.unavailableSchemas;
    var dataSourceName = error.parameters.dataSourceName;

    var result = _.map(unavailableSchemas, function (schema) {
      return i18nMessage('domain.designer.error.dialog.schema.message', schema, dataSourceName);
    });

    result.push(i18nMessage('domain.designer.error.dialog.schema.message.generic'));
    return result;
  }
};

});