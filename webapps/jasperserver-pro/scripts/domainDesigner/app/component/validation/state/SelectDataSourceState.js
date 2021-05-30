define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var requestCanceledEnum = require("../../../rest/enum/requestCanceledEnum");

var errorHandlingUtil = require("../../../rest/errorHandling/errorHandlingUtil");

var validationStateNameEnum = require("./enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SelectDataSourceState = function SelectDataSourceState(options) {
  this.initialize(options);
};

_.extend(SelectDataSourceState.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.selectDataSourceLoaderDialogEventBus = options.selectDataSourceLoaderDialogEventBus;
    this.dataSourceChooserDialog = options.dataSourceChooserDialog;
    this.dataSourceChooserDialogStore = options.dataSourceChooserDialogStore;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
    this.dataSourceSelectionCheckService = options.dataSourceSelectionCheckService;
    this.dataSourceChooserPopoverErrorMessageConverter = options.dataSourceChooserPopoverErrorMessageConverter;
    this.repositoryResourceChooserStateMutations = options.repositoryResourceChooserStateMutations;
    this.repositoryResourceChooserActions = options.repositoryResourceChooserActions;
  },
  enter: function enter(context, stateFactory) {
    this.listenTo(this.dataSourceChooserDialog, 'dialog:resource:confirm', _.bind(this._onDataSourceSelectionConfirmed, this, context, stateFactory));
    this.listenTo(this.dataSourceChooserDialog, 'dialog:resource:reject', _.bind(this._onDataSourceCheckRejected, this, context, stateFactory));
    this.listenTo(this.selectDataSourceLoaderDialogEventBus, 'show', this._onShowLoader);
    this.listenTo(this.selectDataSourceLoaderDialogEventBus, 'hide', this._onHideLoader);
    var selection = {
      listSelection: {}
    },
        dataSourceName = this.clientResourcePropertiesService.getDataSourceName();

    if (dataSourceName) {
      var dataSourceUri = this.clientResourcePropertiesService.getDataSourceUri(dataSourceName);
      selection.listSelection[dataSourceUri] = true;
    }

    this.dataSourceChooserDialog.open(selection);
  },
  _onShowLoader: function _onShowLoader() {
    this.dataSourceChooserDialogStore.set('isCheckInProgress', true);
  },
  _onHideLoader: function _onHideLoader() {
    this.dataSourceChooserDialogStore.set('isCheckInProgress', false);
  },
  _onDataSourceSelectionConfirmed: function _onDataSourceSelectionConfirmed(context, stateFactory, dataSourceUri) {
    var self = this;
    this.dataSourceSelectionCheckService.isValid({
      uri: dataSourceUri
    }).then(function () {
      self._onDataSourceCheckSuccess(context, stateFactory, dataSourceUri);
    }).fail(function (xhr) {
      self._onDataSourceCheckFailed(context, stateFactory, xhr);
    });
  },
  _onDataSourceCheckRejected: function _onDataSourceCheckRejected(context, stateFactory) {
    var isCheckInProgress = this.dataSourceChooserDialogStore.get('isCheckInProgress');
    this.selectDataSourceLoaderDialogEventBus.trigger('cancel');

    if (!isCheckInProgress) {
      this._closeDialogAndSwitchState(context, stateFactory);
    }
  },
  _onDataSourceCheckFailed: function _onDataSourceCheckFailed(context, stateFactory, xhr) {
    if (xhr === requestCanceledEnum.CANCELED) {
      return;
    }

    this._setPopoverErrorMessage(xhr);

    var selection = this.repositoryResourceChooserActions.getCurrentModeSelection();
    this.repositoryResourceChooserStateMutations.markCurrentModeNodesInvalid(selection);
  },
  _setPopoverErrorMessage: function _setPopoverErrorMessage(xhr) {
    var errors = errorHandlingUtil.getErrors(xhr);
    var convertedErrors = this.dataSourceChooserPopoverErrorMessageConverter.convert(errors);
    var errorMessage = convertedErrors[0].errorParameters[0];
    this.repositoryResourceChooserStateMutations.setPopoverErrorMessage(errorMessage);
  },
  _onDataSourceCheckSuccess: function _onDataSourceCheckSuccess(context, stateFactory, dataSourceUri) {
    this._closeDialog();

    context.dataSourceUri = dataSourceUri;
    var isReplaceDataSourceInitialState = context.initialState === validationStateNameEnum.REPLACE_DATA_SOURCE_INITIAL_STATE,
        isSaveDomainInitialState = context.initialState === validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE;

    if (context.initialState === validationStateNameEnum.INITIALIZE_DOMAIN_DESIGNER_STATE) {
      stateFactory.enter(validationStateNameEnum.DOMAIN_DESIGNER_INITIAL_STATE_DATA_SOURCE_URI_SELECTED_STATE, context);
    } else if (isReplaceDataSourceInitialState || isSaveDomainInitialState) {
      stateFactory.enter(validationStateNameEnum.REPLACE_DATA_SOURCE_DATA_SOURCE_URI_SELECTED_STATE, context);
    } else if (context.initialState === validationStateNameEnum.UPLOAD_SCHEMA_INITIAL_STATE) {
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_DATA_SOURCE_URI_SELECTED_STATE, context);
    }
  },
  _closeDialog: function _closeDialog() {
    this.stopListening(this.dataSourceChooserDialog);
    this.stopListening(this.selectDataSourceLoaderDialogEventBus);
    this.dataSourceChooserDialogStore.reset();
    this.dataSourceChooserDialog.close();
  },
  _closeDialogAndSwitchState: function _closeDialogAndSwitchState(context, stateFactory) {
    this._closeDialog();

    stateFactory.enter(validationStateNameEnum.GOTO_PREVIOUS_LOCATION_OR_STAY_IN_DESIGNER_STATE, context);
  }
});

module.exports = SelectDataSourceState;

});