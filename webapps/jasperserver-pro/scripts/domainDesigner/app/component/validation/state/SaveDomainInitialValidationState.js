define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SaveDomainInitialValidationState = function SaveDomainInitialValidationState(options) {
  this.initialize(options);
};

_.extend(SaveDomainInitialValidationState.prototype, {
  initialize: function initialize(options) {
    this.domainValidationMutations = options.domainValidationMutations;
    this.clientCurrentDesignerStateService = options.clientCurrentDesignerStateService;
  },
  enter: function enter(context, stateFactory) {
    var designerState = this.clientCurrentDesignerStateService.getDesignerState();
    this.domainValidationMutations.setDesignerState(designerState);
    context.useSaveMethod = true;
    stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_VALIDATION_SECURITY_FILE_STATE, context);
  }
});

module.exports = SaveDomainInitialValidationState;

});