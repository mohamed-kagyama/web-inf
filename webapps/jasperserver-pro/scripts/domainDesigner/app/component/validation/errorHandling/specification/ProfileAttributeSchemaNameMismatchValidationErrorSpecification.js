define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var errorParametersKeysEnum = require("../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ProfileAttributeSchemaNameMismatchValidationErrorSpecification = function ProfileAttributeSchemaNameMismatchValidationErrorSpecification(options) {
  this.initialize(options);
};

_.extend(ProfileAttributeSchemaNameMismatchValidationErrorSpecification.prototype, {
  initialize: function initialize(options) {
    this.domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification = options.domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification;
    this.profileAttributeBasedSchemaSpecification = options.profileAttributeBasedSchemaSpecification;
  },
  isSatisfiedBy: function isSatisfiedBy(errors) {
    errors = _.isArray(errors) ? errors : [errors];
    return _.some(errors, function (error) {
      var isSchemaMismatchError = this.domainSchemaNameMismatchErrorOnDomainSchemaValidationSpecification.isSatisfiedBy(error);

      if (isSchemaMismatchError) {
        var domainSchemaNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.DOMAIN_SCHEMA_NAME),
            dataSourceGroupName = domainSchemaNameProperty && domainSchemaNameProperty.value;
        return this.profileAttributeBasedSchemaSpecification.isSatisfiedBy(dataSourceGroupName);
      }
    }, this);
  }
});

module.exports = ProfileAttributeSchemaNameMismatchValidationErrorSpecification;

});