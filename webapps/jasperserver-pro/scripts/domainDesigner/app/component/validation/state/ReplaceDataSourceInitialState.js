define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ReplaceDataSourceInitialState = function ReplaceDataSourceInitialState(options) {
  this.initialize(options);
};

_.extend(ReplaceDataSourceInitialState.prototype, {
  initialize: function initialize(options) {
    this.domainValidationMutations = options.domainValidationMutations;
    this.clientCurrentDesignerStateService = options.clientCurrentDesignerStateService;
  },
  enter: function enter(context, stateFactory) {
    var designerState = this.clientCurrentDesignerStateService.getDesignerState();
    this.domainValidationMutations.setDesignerState(designerState);
    stateFactory.enter(validationStateNameEnum.SELECT_DATA_SOURCE_STATE, context);
  }
});

module.exports = ReplaceDataSourceInitialState;

});