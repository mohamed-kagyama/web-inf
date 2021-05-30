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

var DataIslandNameValidator = function DataIslandNameValidator(options) {
  _.bindAll(this, 'fn');

  this.domainSchemaSpecification = options.domainSchemaSpecification;
};

_.extend(DataIslandNameValidator.prototype, {
  fn: function fn(value) {
    if (value) {
      if (value && !this.domainSchemaSpecification.canUseDataIslandName(value, this.id)) {
        return i18nMessage('domain.designer.presentationDesigner.validation.item.exists');
      }
    }
  }
});

module.exports = DataIslandNameValidator;

});