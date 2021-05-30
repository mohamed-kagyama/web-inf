define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainDesignerInitialStateSecurityFileErrorState = function DomainDesignerInitialStateSecurityFileErrorState(options) {
  this.initialize(options);
};

_.extend(DomainDesignerInitialStateSecurityFileErrorState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.validationEventBus = options.validationEventBus;
    this.validationWarningDialog = options.validationWarningDialog;
    this.validationWarningDialogStore = options.validationWarningDialogStore;
    this.domainInitialStateSecurityFileErrorWarningDialogStateFactory = options.domainInitialStateSecurityFileErrorWarningDialogStateFactory;
    this.securityFileErrorsConverter = options.securityFileErrorsConverter;
  },
  enter: function enter(context, stateFactory) {
    var dialogState = this._getWarningDialogState(context);

    this.listenTo(this.validationEventBus, dialogState.confirmEvent, _.bind(this._onConfirmOptionClicked, this, context, stateFactory));
    this.listenTo(this.validationEventBus, dialogState.rejectEvent, _.bind(this._goToPreviousLocationOrStayInDesigner, this, context, stateFactory));
    this.validationWarningDialogStore.set(dialogState);
    this.validationWarningDialog.open();
  },
  _getWarningDialogState: function _getWarningDialogState(context) {
    var errors = this.securityFileErrorsConverter.convert(context.errors);
    var dialogState = this.domainInitialStateSecurityFileErrorWarningDialogStateFactory.create();
    dialogState.warnings = dialogState.warnings.concat(errors);
    return dialogState;
  },
  _cleanUpDialog: function _cleanUpDialog() {
    this.stopListening(this.validationEventBus);
    this.validationWarningDialog.close();
  },
  _onConfirmOptionClicked: function _onConfirmOptionClicked(context, stateFactory) {
    this._cleanUpDialog();

    stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_INITIALIZE_DESIGNER_STATE_AFTER_RECOVERABLE_ERROR_STATE, context);
  },
  _goToPreviousLocationOrStayInDesigner: function _goToPreviousLocationOrStayInDesigner(context, stateFactory) {
    this._cleanUpDialog();

    stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE, context);
  }
});

module.exports = DomainDesignerInitialStateSecurityFileErrorState;

});