define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expandedDomainSchemaUrlParamsEnum = require("./enum/expandedDomainSchemaUrlParamsEnum");

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainValidationState = function DomainValidationState(options) {
  this.initialize(options);
};

_.extend(DomainValidationState.prototype, {
  initialize: function initialize(options) {
    this.validationService = options.validationService;
    this.domainValidationMutations = options.domainValidationMutations;
    this.domainSchemaMappingService = options.domainSchemaMappingService;
    this.clientDomainValidationService = options.clientDomainValidationService;
  },
  enter: function enter(context, stateFactory) {
    var self = this,
        domainSchemaInServerFormat;
    domainSchemaInServerFormat = this._getDomainSchemaInServerFormat(context);
    this.validationService.validateDomain(domainSchemaInServerFormat, {
      uriParams: expandedDomainSchemaUrlParamsEnum
    }).then(function () {
      if (context.schemaPairs) {
        self.domainValidationMutations.mapSchemas(context.schemaPairs);
      }

      if (context.initialState === validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE) {
        stateFactory.enter(validationStateNameEnum.SET_DOMAIN_DESIGNER_STATE_WITH_CURRENT_DESIGNER_STATE, context);
      } else {
        stateFactory.enter(validationStateNameEnum.LOAD_NEW_FIELDS_FOR_ALL_TABLES_STATE, context);
      }
    }, function (xhr) {
      context.xhr = xhr;
      stateFactory.enter(validationStateNameEnum.VALIDATION_ERROR_STATE, context);
    });
  },
  _getDomainSchemaInServerFormat: function _getDomainSchemaInServerFormat(context) {
    var domainSchemaInServerFormat,
        schemaPairs = context.schemaPairs;

    if (schemaPairs) {
      domainSchemaInServerFormat = this.domainSchemaMappingService.replaceSchemas(this.clientDomainValidationService.serialize(), schemaPairs);
    } else {
      domainSchemaInServerFormat = this.clientDomainValidationService.serializeToServerSchema();
    }

    return domainSchemaInServerFormat;
  }
});

module.exports = DomainValidationState;

});