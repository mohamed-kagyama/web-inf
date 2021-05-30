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

var ResourceNotFoundExceptionToErrorMessageConverter = function ResourceNotFoundExceptionToErrorMessageConverter(options) {
  this.initialize(options);
};

_.extend(ResourceNotFoundExceptionToErrorMessageConverter.prototype, {
  initialize: function initialize(options) {
    this.genericResourceNotFoundErrorToErrorMessageConverter = options.genericResourceNotFoundErrorToErrorMessageConverter;
  },
  convert: function convert(errors, options) {
    options = options || {};
    var domainNotFoundError = _.size(errors) === 1 && _.first(errors).parameters[0] === options.domainUri;

    if (domainNotFoundError) {
      return {
        category: '',
        errorParameters: [i18nMessage('domain.designer.error.domain.not.found')]
      };
    } else {
      return this.genericResourceNotFoundErrorToErrorMessageConverter.convert(errors, options);
    }
  }
});

module.exports = ResourceNotFoundExceptionToErrorMessageConverter;

});