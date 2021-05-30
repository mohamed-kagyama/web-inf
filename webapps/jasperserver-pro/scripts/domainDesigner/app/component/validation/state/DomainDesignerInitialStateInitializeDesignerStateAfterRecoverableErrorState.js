define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainDesignerInitialStateInitializeDesignerStateAfterRecoverableErrorState = function DomainDesignerInitialStateInitializeDesignerStateAfterRecoverableErrorState(options) {
  this.initialize(options);
};

_.extend(DomainDesignerInitialStateInitializeDesignerStateAfterRecoverableErrorState.prototype, {
  initialize: function initialize(options) {
    this.clientDomainInitialDesignerStateService = options.clientDomainInitialDesignerStateService;
    this.domainValidationMutations = options.domainValidationMutations;
  },
  enter: function enter(context, stateFactory) {
    var self = this;
    var domainResource = context.domainResource;
    return self.clientDomainInitialDesignerStateService.getInitialDesignerStateByDomainResource(domainResource).then(function (domainInitialDesignerState) {
      self.domainValidationMutations.setDesignerState(domainInitialDesignerState);
      stateFactory.enter(validationStateNameEnum.DOMAIN_VALIDATION_STATE, context);
    }, function (xhr) {
      context.xhr = xhr;
      stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_FAIL_STATE, context);
    });
  }
});

module.exports = DomainDesignerInitialStateInitializeDesignerStateAfterRecoverableErrorState;

});