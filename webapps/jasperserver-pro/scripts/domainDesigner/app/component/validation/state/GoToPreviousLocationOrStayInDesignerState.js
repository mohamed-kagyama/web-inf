define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var GoToPreviousLocationOrStayInDesignerState = function GoToPreviousLocationOrStayInDesignerState(options) {
  this.initialize(options);
};

_.extend(GoToPreviousLocationOrStayInDesignerState.prototype, {
  initialize: function initialize(options) {
    this.clientCurrentDesignerStateService = options.clientCurrentDesignerStateService;
  },
  enter: function enter(context, stateFactory) {
    if (!this.clientCurrentDesignerStateService.doesCurrentDesignerStateContainsDataSources() || context.isAnyEncryptedProfileAttributes) {
      stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_STATE, context);
    }
  }
});

module.exports = GoToPreviousLocationOrStayInDesignerState;

});