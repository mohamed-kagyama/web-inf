define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DATA_SOURCE_REFERENCE_ATTRIBUTE = 'dataSource';

var DataSourceInvalidValidationErrorSpecification = function DataSourceInvalidValidationErrorSpecification(options) {
  this.initialize(options);
};

_.extend(DataSourceInvalidValidationErrorSpecification.prototype, {
  initialize: function initialize(options) {
    this.referenceNotFoundErrorOnDomainSchemaValidationSpecification = options.referenceNotFoundErrorOnDomainSchemaValidationSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(errors) {
    var self = this;
    return _.some(errors, function (error) {
      return self.referenceNotFoundErrorOnDomainSchemaValidationSpecification.isSatisfiedBy(error) && self._containsDataSourceAttribute(error.parameters);
    });
  },
  _containsDataSourceAttribute: function _containsDataSourceAttribute(errorParameters) {
    var attr = errorParameters[1];
    return attr === DATA_SOURCE_REFERENCE_ATTRIBUTE;
  }
});

module.exports = DataSourceInvalidValidationErrorSpecification;

});