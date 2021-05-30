define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IllegalDataSourceUriValidationSpecification = function IllegalDataSourceUriValidationSpecification(options) {
  this.initialize(options);
};

_.extend(IllegalDataSourceUriValidationSpecification.prototype, {
  initialize: function initialize(options) {
    this.illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification = options.illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(error) {
    return this.illegalParameterValueErrorErrorOnDomainSchemaValidationSpecification.isSatisfiedBy(error) && error.parameters[0] === 'resourceReference.uri';
  }
});

module.exports = IllegalDataSourceUriValidationSpecification;

});