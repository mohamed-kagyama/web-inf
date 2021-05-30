define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadSchemaShowUpdateDomainWarningDialogState = function UploadSchemaShowUpdateDomainWarningDialogState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaShowUpdateDomainWarningDialogState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.validationEventBus = options.validationEventBus;
    this.validationWarningDialog = options.validationWarningDialog;
    this.validationWarningDialogStore = options.validationWarningDialogStore;
    this.updateSavedSchemaWarningDialogStateFactory = options.updateSavedSchemaWarningDialogStateFactory;
  },
  enter: function enter(context, stateFactory) {
    var dialogState = this.updateSavedSchemaWarningDialogStateFactory.create();
    this.listenTo(this.validationEventBus, dialogState.confirmEvent, _.bind(this._onConfirmSchemaUpdate, this, context, stateFactory));
    this.listenTo(this.validationEventBus, dialogState.rejectEvent, this._cleanUpAfterDialogShow);
    this.validationWarningDialogStore.set(dialogState);
    this.validationWarningDialog.open();
  },
  _cleanUpAfterDialogShow: function _cleanUpAfterDialogShow() {
    this.stopListening(this.validationEventBus);
    this.validationWarningDialog.close();
  },
  _onConfirmSchemaUpdate: function _onConfirmSchemaUpdate(context, stateFactory) {
    this._cleanUpAfterDialogShow();

    stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_CHECK_SCHEMA_TYPE_STATE, context);
  }
});

module.exports = UploadSchemaShowUpdateDomainWarningDialogState;

});