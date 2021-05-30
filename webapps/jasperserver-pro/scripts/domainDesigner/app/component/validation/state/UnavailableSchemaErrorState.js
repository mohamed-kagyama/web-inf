define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var UnavailableSchemaErrorState = function UnavailableSchemaErrorState(options) {
  this.initialize(options);
};

_.extend(UnavailableSchemaErrorState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.validationErrorDialogStore = options.validationErrorDialogStore;
    this.unavailableSchemasErrorDialogStateFactory = options.unavailableSchemasErrorDialogStateFactory;
    this.domainMapSchemaUnavailableSchemaErrorToErrorParametersConverter = options.domainMapSchemaUnavailableSchemaErrorToErrorParametersConverter;
    this.validationEventBus = options.validationEventBus;
  },
  enter: function enter(context, stateFactory) {
    var dialogStateErrors = [{
      category: i18nMessage("domain.designer.error.dialog.schema.map.schemas"),
      errorParameters: this.domainMapSchemaUnavailableSchemaErrorToErrorParametersConverter.convert(context.unavailableSchemaError)
    }];

    var state = _.extend({}, this.unavailableSchemasErrorDialogStateFactory.create(dialogStateErrors), {
      show: true
    });

    this._subscribeToDialogEvents(context, stateFactory, state);

    this.validationErrorDialogStore.setState(state);
  },
  _subscribeToDialogEvents: function _subscribeToDialogEvents(context, stateFactory, state) {
    this.listenTo(this.validationEventBus, state.confirmEvent, _.bind(this._mapSchemas, this, context, stateFactory));
    this.listenTo(this.validationEventBus, state.rejectEvent, _.bind(this._goToPreviousLocationOrStateInDesigner, this, context, stateFactory));
  },
  _mapSchemas: function _mapSchemas(context, stateFactory) {
    this._closeDialog();

    stateFactory.enter(validationStateNameEnum.MAP_SCHEMAS_STATE, context);
  },
  _closeDialog: function _closeDialog() {
    this.stopListening(this.validationEventBus);
    this.validationErrorDialogStore.set("show", false);
  },
  _goToPreviousLocationOrStateInDesigner: function _goToPreviousLocationOrStateInDesigner(context, stateFactory) {
    this._closeDialog();

    stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE, context);
  }
});

module.exports = UnavailableSchemaErrorState;

});