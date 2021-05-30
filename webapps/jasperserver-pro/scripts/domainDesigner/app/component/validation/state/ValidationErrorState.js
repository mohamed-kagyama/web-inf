define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ValidationErrorState = function ValidationErrorState(options) {
  this.initialize(options);
};

_.extend(ValidationErrorState.prototype, {
  initialize: function initialize(options) {},
  enter: function enter(context, stateFactory) {
    if (context.initialState === validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE) {
      stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_VALIDATION_ERROR_STATE, context);
    } else if (context.initialState === validationStateNameEnum.REPLACE_DATA_SOURCE_INITIAL_STATE) {
      stateFactory.enter(validationStateNameEnum.REPLACE_DATA_SOURCE_VALIDATION_ERROR_STATE, context);
    } else if (context.initialState === validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE) {
      stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_VALIDATION_ERROR_STATE, context);
    }
  }
});

module.exports = ValidationErrorState;

});