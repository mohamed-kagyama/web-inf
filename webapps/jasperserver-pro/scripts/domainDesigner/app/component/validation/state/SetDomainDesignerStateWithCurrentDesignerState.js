define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../model/enum/canvasViewDesignersEnum");

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SetDomainDesignerStateWithCurrentDesignerState = function SetDomainDesignerStateWithCurrentDesignerState(options) {
  this.initialize(options);
};

_.extend(SetDomainDesignerStateWithCurrentDesignerState.prototype, {
  initialize: function initialize(options) {
    this.clientDomainValidationService = options.clientDomainValidationService;
  },
  enter: function enter(context, stateFactory) {
    if (context.initialState === validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE) {
      context.domainDesignerState = this.clientDomainValidationService.getDesignerStateAfterValidation({
        currentDesigner: canvasViewDesignersEnum.PRESENTATION_DESIGNER
      });
    } else {
      context.domainDesignerState = this.clientDomainValidationService.getDesignerStateAfterValidation();
    }

    stateFactory.enter(validationStateNameEnum.SET_DOMAIN_DESIGNER_STATE_STATE, context);
  }
});

module.exports = SetDomainDesignerStateWithCurrentDesignerState;

});