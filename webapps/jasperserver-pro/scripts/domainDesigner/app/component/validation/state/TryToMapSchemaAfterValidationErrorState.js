define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

var validationStateContextUtil = require("./util/validationStateContextUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TryToMapSchemaAfterValidationErrorState = function TryToMapSchemaAfterValidationErrorState(options) {
  this.initialize(options);
};

_.extend(TryToMapSchemaAfterValidationErrorState.prototype, {
  initialize: function initialize(options) {
    this.dataSourceFreshInfoService = options.dataSourceFreshInfoService;
    this.clientDomainValidationService = options.clientDomainValidationService;
  },
  enter: function enter(context, stateFactory) {
    var self = this;

    if (validationStateContextUtil.isSchemasMapped(context)) {
      var dataSourceUri = this.clientDomainValidationService.getDataSource().uri;
      this.dataSourceFreshInfoService.refreshDataSource(dataSourceUri).then(function () {
        var schemaPairs = context.schemaPairs,
            availableSchemas = context.availableSchemasToMap,
            dataSource = self.clientDomainValidationService.getDataSource();

        var unavailableSchemas = _.reduce(schemaPairs, function (memo, mappedPair) {
          if (!_.contains(availableSchemas, mappedPair[1])) {
            memo.push(mappedPair[1]);
          }

          return memo;
        }, []);

        context.unavailableSchemaError = {
          parameters: {
            unavailableSchemas: unavailableSchemas,
            dataSourceName: dataSource.name
          }
        };
        stateFactory.enter(validationStateNameEnum.UNAVAILABLE_SCHEMA_ERROR_STATE, context);
      }, function (xhr) {
        context.xhr = xhr;
        stateFactory.enter(validationStateNameEnum.VALIDATION_ERROR_STATE, context);
      });
    } else {
      stateFactory.enter(validationStateNameEnum.MAP_SCHEMAS_STATE, context);
    }
  }
});

module.exports = TryToMapSchemaAfterValidationErrorState;

});