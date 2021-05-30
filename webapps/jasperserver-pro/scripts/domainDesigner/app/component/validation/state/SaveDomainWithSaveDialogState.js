define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SaveDomainWithSaveDialogState = function SaveDomainWithSaveDialogState(options) {
  this.initialize(options);
};

_.extend(SaveDomainWithSaveDialogState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.saveDialog = options.saveDialog;
  },
  enter: function enter(context, stateFactory) {
    this._subscribeToDialogEvents(context, stateFactory);

    if (context.useSaveMethod) {
      delete context.useSaveMethod;
      this.saveDialog[context.saveMethod]();
    } else {
      this.saveDialog.saveModelOnServer();
    }
  },
  _subscribeToDialogEvents: function _subscribeToDialogEvents(context, stateFactory) {
    this.listenTo(this.saveDialog, 'save:validation:error', _.bind(this._onSaveValidationError, this, context, stateFactory));
    this.listenTo(this.saveDialog, 'save', _.bind(this._onSuccessfullySavedOnServer, this, context, stateFactory));
  },
  _closeDialogAnUnsubscribe: function _closeDialogAnUnsubscribe() {
    this.saveDialog.close();
    this.stopListening(this.saveDialog, 'save:validation:error');
    this.stopListening(this.saveDialog, 'save');
  },
  _onSaveValidationError: function _onSaveValidationError(context, stateFactory, xhr, saveDialogProperties) {
    this._closeDialogAnUnsubscribe();

    context.xhr = xhr;
    context.saveDialogProperties = saveDialogProperties;
    stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_VALIDATION_ERROR_STATE, context);
  },
  _onSuccessfullySavedOnServer: function _onSuccessfullySavedOnServer(context, stateFactory, dialog, response) {
    this._closeDialogAnUnsubscribe();

    context.response = response;
    stateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_IS_SUCCESSFUL_STATE, context);
  }
});

module.exports = SaveDomainWithSaveDialogState;

});