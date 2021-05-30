define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SaveDomainSecurityFileErrorState = function SaveDomainSecurityFileErrorState(options) {
  this.initialize(options);
};

_.extend(SaveDomainSecurityFileErrorState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.validationEventBus = options.validationEventBus;
    this.validationErrorDialogStore = options.validationErrorDialogStore;
    this.saveDomainSecurityFileErrorDialogStateFactory = options.saveDomainSecurityFileErrorDialogStateFactory;
    this.securityFileErrorsConverter = options.securityFileErrorsConverter;
  },
  enter: function enter(context, stateFactory) {
    var dialogState = _.extend({}, this._getDialogState(context), {
      show: true
    });

    this.listenTo(this.validationEventBus, dialogState.confirmEvent, _.bind(this._onConfirmOptionClicked, this, context, stateFactory));
    this.validationErrorDialogStore.set(dialogState);
  },
  _getDialogState: function _getDialogState(context) {
    var convertedErrors = this.securityFileErrorsConverter.convert(context.errors);
    return this.saveDomainSecurityFileErrorDialogStateFactory.create(convertedErrors);
  },
  _cleanUpDialog: function _cleanUpDialog() {
    this.stopListening(this.validationEventBus);
    this.validationErrorDialogStore.set("show", false);
  },
  _onConfirmOptionClicked: function _onConfirmOptionClicked(context, stateFactory) {
    this._cleanUpDialog();
  }
});

module.exports = SaveDomainSecurityFileErrorState;

});