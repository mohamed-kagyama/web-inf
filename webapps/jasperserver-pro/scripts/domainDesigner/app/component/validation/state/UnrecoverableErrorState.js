define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UnrecoverableErrorState = function UnrecoverableErrorState(options) {
  this.initialize(options);
};

_.extend(UnrecoverableErrorState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.validationEventBus = options.validationEventBus;
    this.validationErrorDialogStore = options.validationErrorDialogStore;
    this.unrecoverableErrorDialogStateFactoryFactory = options.unrecoverableErrorDialogStateFactoryFactory;
    this.unrecoverableErrorsConverterFactory = options.unrecoverableErrorsConverterFactory;
    this.dropRecoverableErrorsFilterFactory = options.dropRecoverableErrorsFilterFactory;
  },
  enter: function enter(context, stateFactory) {
    var dropRecoverableErrorsFilter = this.dropRecoverableErrorsFilterFactory.create(context.initialState);
    var filteredErrors = dropRecoverableErrorsFilter.filter(context.errors);
    var unrecoverableErrorsConverter = this.unrecoverableErrorsConverterFactory.create(context.initialState);
    var convertedErrors = unrecoverableErrorsConverter.convert(filteredErrors, context);
    var unrecoverableErrorDialogStateFactory = this.unrecoverableErrorDialogStateFactoryFactory.create(context.initialState);

    var dialogState = _.extend({}, unrecoverableErrorDialogStateFactory.create(convertedErrors), {
      show: true
    });

    this._initEvents(context, stateFactory, dialogState);

    this.validationErrorDialogStore.setState(dialogState);
  },
  _initEvents: function _initEvents(context, stateFactory, dialogState) {
    this.listenTo(this.validationEventBus, dialogState.confirmEvent, _.bind(this._goToPreviousLocationOrStayInDesigner, this, context, stateFactory));
    this.listenTo(this.validationEventBus, dialogState.rejectEvent, _.bind(this._goToPreviousLocationOrStayInDesigner, this, context, stateFactory));
  },
  _goToPreviousLocationOrStayInDesigner: function _goToPreviousLocationOrStayInDesigner(context, stateFactory) {
    this.stopListening(this.validationEventBus);
    this.validationErrorDialogStore.set("show", false);
    stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE, context);
  }
});

module.exports = UnrecoverableErrorState;

});