define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expandedDomainSchemaUrlParamsEnum = require("./enum/expandedDomainSchemaUrlParamsEnum");

var replaceExpandedDataSourceWithDataSourceReferenceUtil = require('./util/replaceExpandedDataSourceWithDataSourceReferenceUtil');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

var validationStateContextUtil = require("./util/validationStateContextUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var InitializeDomainDesignerByDomainUriState = function InitializeDomainDesignerByDomainUriState(options) {
  this.initialize(options);
};

_.extend(InitializeDomainDesignerByDomainUriState.prototype, {
  initialize: function initialize(options) {
    this.resourcesService = options.resourcesService;
    this.validationService = options.validationService;
    this.domainValidationMutations = options.domainValidationMutations;
    this.clientDomainInitialDesignerStateService = options.clientDomainInitialDesignerStateService;
  },
  enter: function enter(context, stateFactory) {
    var self = this,
        domainUri = context.domainUri;
    this.resourcesService.getDomain(domainUri, {
      urlParams: expandedDomainSchemaUrlParamsEnum
    }).then(function (domainResource) {
      domainResource = replaceExpandedDataSourceWithDataSourceReferenceUtil.replace(domainResource);
      validationStateContextUtil.setDomainResource(context, domainResource);
      return self.validationService.validateDomain(domainResource, {}).then(function () {
        return domainResource;
      });
    }).then(function (domainResource) {
      return self.clientDomainInitialDesignerStateService.getInitialDesignerStateByDomainResource(domainResource);
    }).then(function (domainState) {
      context.domainDesignerState = domainState;
      self.domainValidationMutations.setDesignerState(context.domainDesignerState);
      stateFactory.enter(validationStateNameEnum.LOAD_NEW_FIELDS_FOR_ALL_TABLES_STATE, context);
    }, function (xhr) {
      context.xhr = xhr;
      stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_FAIL_STATE, context);
    });
  }
});

module.exports = InitializeDomainDesignerByDomainUriState;

});