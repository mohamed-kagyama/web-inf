define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draftFilterStateEnum = require("../enum/draftFilterStateEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var GetRightOperandDefaultValueState = function GetRightOperandDefaultValueState(options) {
  this.initialize(options);
};

_.extend(GetRightOperandDefaultValueState.prototype, {
  initialize: function initialize(options) {
    this.shouldUseDefaultValueForRightOperandSpecification = options.shouldUseDefaultValueForRightOperandSpecification;
  },
  enter: function enter(context, stateFactory) {
    var availableValues = context.availableValues;

    if (this.shouldUseDefaultValueForRightOperandSpecification.isSatisfiedBy(context)) {
      context.newFilterOptions.availableValues = availableValues.map(function (item) {
        return item.value;
      });
    }

    delete context.availableValues;
    stateFactory.enter(draftFilterStateEnum.GET_RIGHT_OPERAND_STATE, context);
  }
});

module.exports = GetRightOperandDefaultValueState;

});