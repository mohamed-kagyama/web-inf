define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ValidationStateFactory = function ValidationStateFactory(options) {
  this.initialize(options);
};

_.extend(ValidationStateFactory.prototype, {
  initialize: function initialize(options) {
    this.validationStates = options.validationStates;
  },
  enter: function enter(stateName, stateContext) {
    var validationState = this.validationStates[stateName];

    if (!stateContext.initialState) {
      stateContext.initialState = stateName;
    }

    validationState.enter(stateContext, this);
  }
});

module.exports = ValidationStateFactory;

});