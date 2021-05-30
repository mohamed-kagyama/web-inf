define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadSchemaShowErrorDialogState = function UploadSchemaShowErrorDialogState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaShowErrorDialogState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.validationEventBus = options.validationEventBus;
    this.uploadSchemaValidationErrorDialogStore = options.uploadSchemaValidationErrorDialogStore;
    this.uploadSchemaUnrecoverableErrorDialogStateFactory = options.uploadSchemaUnrecoverableErrorDialogStateFactory;
  },
  enter: function enter(context, stateFactory) {
    var errors = context.errors;

    var state = _.extend({}, this.uploadSchemaUnrecoverableErrorDialogStateFactory.create(errors), {
      show: true
    });

    this._subscribeToDialogEvents();

    this.uploadSchemaValidationErrorDialogStore.setState(state);
  },
  _subscribeToDialogEvents: function _subscribeToDialogEvents() {
    this.listenTo(this.validationEventBus, "errorDialog:close", this._closeDialogAndUnsubscribe);
  },
  _closeDialogAndUnsubscribe: function _closeDialogAndUnsubscribe() {
    this.uploadSchemaValidationErrorDialogStore.set("show", false);
    this.stopListening(this.validationEventBus);
  }
});

module.exports = UploadSchemaShowErrorDialogState;

});