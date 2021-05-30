define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DataSourceErrorState = function DataSourceErrorState(options) {
  this.initialize(options);
};

_.extend(DataSourceErrorState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.dataSourceErrorsConverterFactory = options.dataSourceErrorsConverterFactory;
    this.dataSourceInvalidErrorsSorter = options.dataSourceInvalidErrorsSorter;
    this.validationErrorDialogStore = options.validationErrorDialogStore;
    this.validationEventBus = options.validationEventBus;
    this.dataSourceErrorValidationDialogStateFactory = options.dataSourceErrorValidationDialogStateFactory;
  },
  enter: function enter(context, stateFactory) {
    var sortedErrors = this.dataSourceInvalidErrorsSorter.sort(context.errors);
    var dataSourceErrorsConverter = this.dataSourceErrorsConverterFactory.create(context.initialState);
    var convertedErrors = dataSourceErrorsConverter.convert(sortedErrors);
    var dialogState = this.dataSourceErrorValidationDialogStateFactory.create(convertedErrors);

    var dialogState = _.extend({}, this.dataSourceErrorValidationDialogStateFactory.create(convertedErrors), {
      show: true
    });

    this._subscribeToDialogEvents(context, stateFactory, dialogState);

    this.validationErrorDialogStore.setState(dialogState);
  },
  _subscribeToDialogEvents: function _subscribeToDialogEvents(context, stateFactory, dialogState) {
    this.listenTo(this.validationEventBus, dialogState.confirmEvent, _.bind(this._selectDifferentDataSource, this, context, stateFactory));
    this.listenTo(this.validationEventBus, dialogState.rejectEvent, _.bind(this._goToPreviousLocationOrStayInDesigner, this, context, stateFactory));
  },
  _selectDifferentDataSource: function _selectDifferentDataSource(context, stateFactory) {
    this._closeDialogAndUnsubscribe();

    stateFactory.enter(validationStateNameEnum.SELECT_DATA_SOURCE_STATE, context);
  },
  _closeDialogAndUnsubscribe: function _closeDialogAndUnsubscribe() {
    this.stopListening(this.validationEventBus);
    this.validationErrorDialogStore.set("show", false);
  },
  _goToPreviousLocationOrStayInDesigner: function _goToPreviousLocationOrStayInDesigner(context, stateFactory) {
    this._closeDialogAndUnsubscribe();

    stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE, context);
  }
});

module.exports = DataSourceErrorState;

});