define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainSchemaValidationErrorsToOrphanResourcesConverter = function DomainSchemaValidationErrorsToOrphanResourcesConverter(options) {
  this.initialize(options);
};

_.extend(DomainSchemaValidationErrorsToOrphanResourcesConverter.prototype, {
  initialize: function initialize(options) {
    this.specsAndConverters = options.specsAndConverters;
    this.dataSourceInfoService = options.dataSourceInfoService;
  },
  convert: function convert(errors, options) {
    var self = this;
    return this.dataSourceInfoService.getDataSourceInfo(options.dataSourceUri).then(function (dataSourceInfo) {
      return _.reduce(errors, function (memo, error) {
        return _.reduce(self.specsAndConverters, function (memo, specAndConverter) {
          if (specAndConverter.spec.isSatisfiedBy(error)) {
            memo.push(specAndConverter.converter.convert(error, {
              dataSourceType: dataSourceInfo.type
            }));
          }

          return memo;
        }, memo, self);
      }, [], self);
    });
  }
});

module.exports = DomainSchemaValidationErrorsToOrphanResourcesConverter;

});