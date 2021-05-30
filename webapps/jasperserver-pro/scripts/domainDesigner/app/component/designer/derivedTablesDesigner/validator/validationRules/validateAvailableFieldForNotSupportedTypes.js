define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var dataSourceMetadataTypesEnum = require("../../../../../../model/schema/enum/dataSourceMetadataTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var supportedTypes = _.values(dataSourceMetadataTypesEnum);

module.exports = {
  validate: function validate(field) {
    var isFieldTypeSupported = !_.contains(supportedTypes, field.type);

    if (isFieldTypeSupported) {
      return i18nMessage('domain.designer.derivedTables.createDerivedTables.dialog.input.query.result.cant.parse');
    }
  }
};

});