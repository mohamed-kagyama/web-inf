define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SaveDomainAfterValidationErrorIsResolvedState = function SaveDomainAfterValidationErrorIsResolvedState(options) {
  this.initialize(options);
};

_.extend(SaveDomainAfterValidationErrorIsResolvedState.prototype, {
  initialize: function initialize(options) {
    this.saveDialogModel = options.saveDialogModel;
  },
  enter: function enter(context, stateFactory) {
    this.saveDialogModel.set('saveDialogProperties', context.saveDialogProperties);
    stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_WITH_SAVE_DIALOG_STATE, context);
  }
});

module.exports = SaveDomainAfterValidationErrorIsResolvedState;

});