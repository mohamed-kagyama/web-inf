define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var restErrorCodesEnum = require("../../../../../../rest/enum/restErrorCodesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter = function DomainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter(options) {
  this.initialize(options);
};

_.extend(DomainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter.prototype, {
  initialize: function initialize(options) {
    this.domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter = options.domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter;
    this.domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter = options.domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter;
  },
  convert: function convert(error) {
    var errorDetails = error.details,
        detailedError = _.first(errorDetails);

    if (detailedError.errorCode === restErrorCodesEnum.DOMAIN_SCHEMA_PROFILE_ATTRIBUTE_NOT_FOUND) {
      return this.domainSchemaProfileAttributeNotFoundErrorToErrorMessageConverter.convert(detailedError);
    }

    if (detailedError.errorCode === restErrorCodesEnum.DOMAIN_SCHEMA_PROFILE_ATTRIBUTE_INVALID_CATEGORY) {
      return this.domainSchemaProfileAttributeInvalidCategoryErrorToErrorMessageConverter.convert(detailedError);
    }
  }
});

module.exports = DomainSchemaResourcesGroupProfileAttributeExceptionToErrorMessageConverter;

});