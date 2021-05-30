define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var defaultSchemaNameEnum = require("../../../../model/enum/defaultSchemaNameEnum");

var errorParametersKeysEnum = require("../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataSourceSchemaNameMismatchValidationErrorSpecification = function DataSourceSchemaNameMismatchValidationErrorSpecification(options) {
  this.initialize(options);
};

_.extend(DataSourceSchemaNameMismatchValidationErrorSpecification.prototype, {
  initialize: function initialize(options) {
    this.defaultSchemaExistsAndNotEmptySpecification = options.defaultSchemaExistsAndNotEmptySpecification;
    this.domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification = options.domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification;
    this.profileAttributeBasedSchemaSpecification = options.profileAttributeBasedSchemaSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(errors) {
    var self = this;
    errors = _.isArray(errors) ? errors : [errors];
    return Boolean(_.find(errors, function (error) {
      var dataSourceGroupName,
          domainSchemaNameProperty,
          isSchemaMismatchError = self.domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification.isSatisfiedBy(error);

      if (isSchemaMismatchError) {
        domainSchemaNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.DOMAIN_SCHEMA_NAME);
        dataSourceGroupName = domainSchemaNameProperty && domainSchemaNameProperty.value;

        if (dataSourceGroupName === defaultSchemaNameEnum.DEFAULT_SCHEMA) {
          return self.defaultSchemaExistsAndNotEmptySpecification.isSatisfied();
        } else {
          return !self.profileAttributeBasedSchemaSpecification.isSatisfiedBy(dataSourceGroupName);
        }
      }
    }));
  }
});

module.exports = DataSourceSchemaNameMismatchValidationErrorSpecification;

});