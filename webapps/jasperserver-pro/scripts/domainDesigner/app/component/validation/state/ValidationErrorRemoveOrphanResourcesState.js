define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ValidationErrorRemoveOrphanResourcesState = function ValidationErrorRemoveOrphanResourcesState(options) {
  this.initialize(options);
};

_.extend(ValidationErrorRemoveOrphanResourcesState.prototype, {
  initialize: function initialize(options) {
    this.domainSchemaValidationErrorsToOrphanResourcesConverter = options.domainSchemaValidationErrorsToOrphanResourcesConverter;
  },
  enter: function enter(context, stateFactory) {
    this.domainSchemaValidationErrorsToOrphanResourcesConverter.convert(context.errors, {
      dataSourceUri: context.dataSourceUri
    }).then(function (orphanResources) {
      context.orphanResources = orphanResources;
      stateFactory.enter(validationStateNameEnum.REMOVE_ORPHAN_RESOURCES_STATE, context);
    });
  }
});

module.exports = ValidationErrorRemoveOrphanResourcesState;

});