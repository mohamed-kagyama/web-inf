define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var requestCanceledEnum = require("../../../../rest/enum/requestCanceledEnum");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TreeActionsErrorsController = function TreeActionsErrorsController(options) {
  this.initialize(options);
};

_.extend(TreeActionsErrorsController.prototype, {
  initialize: function initialize(options) {
    this.metadataDesignerEventBus = options.metadataDesignerEventBus;
    this.addFetchedResourcesToSchemaStrategy = options.addFetchedResourcesToSchemaStrategy;
    this.confirmationDialog = options.confirmationDialog;
    this.confirmationDialogStore = options.confirmationDialogStore;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.metadataDesignerErrorByXhrFactory = options.metadataDesignerErrorByXhrFactory;
    this.treeActionsErrorMessageFactory = options.treeActionsErrorMessageFactory;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.metadataDesignerEventBus, 'fetchSubResource:invalidResources', this._onFetchInvalidResources);
    this.listenTo(this.metadataDesignerEventBus, 'fetchSubResource:fail', this._onFetchFail);
  },
  _onFetchInvalidResources: function _onFetchInvalidResources(options) {
    var errors = this.treeActionsErrorMessageFactory.create(options);

    if (errors.confirmationDialogErrors) {
      this._openConfirmationDialog(errors, options);
    } else {
      this._showAddResourcesError(errors.popoverErrors);
    }
  },
  _onFetchFail: function _onFetchFail(options) {
    var xhr = options.xhr;

    if (xhr !== requestCanceledEnum.CANCELED) {
      this._showAddResourcesError(this.metadataDesignerErrorByXhrFactory.create(xhr));
    }
  },
  _onAddResourcesConfirm: function _onAddResourcesConfirm(options) {
    var resourcesWithChildren = options.resourcesWithChildren,
        selectedResources = options.selectedResources,
        metadataResourcesType = options.metadataResourcesType;

    this._onConfirmClose();

    this.addFetchedResourcesToSchemaStrategy.execute({
      selectedResources: selectedResources,
      fetchedResources: resourcesWithChildren,
      parentId: options.parentId,
      dataSourceId: options.dataSourceId,
      metadataResourcesType: metadataResourcesType,
      popoverMessage: options.popoverMessage,
      highlightInvalidResources: true
    });
  },
  _openConfirmationDialog: function _openConfirmationDialog(errors, options) {
    options = _.extend({
      popoverMessage: errors.popoverErrors
    }, options);

    var warnings = this._getConfirmationDialogWarnings(errors.confirmationDialogErrors);

    this.confirmationDialogStore.set('warnings', warnings);
    this.listenTo(this.metadataDesignerEventBus, 'warningDialog:addResources', _.bind(this._onAddResourcesConfirm, this, options));
    this.listenTo(this.metadataDesignerEventBus, 'warningDialog:cancelResourcesAdd', this._onConfirmClose);
    this.confirmationDialog.open();
  },
  _getConfirmationDialogWarnings: function _getConfirmationDialogWarnings(errors) {
    if (_.isArray(errors)) {
      return errors.map(this._getConfirmationDialogWarning);
    }

    return [this._getConfirmationDialogWarning(errors)];
  },
  _getConfirmationDialogWarning: function _getConfirmationDialogWarning(error) {
    return {
      category: {
        label: error,
        isBold: false
      }
    };
  },
  _showAddResourcesError: function _showAddResourcesError(error) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.METADATA_DESIGNER_SET_ADD_RESOURCES_ERROR, {
      popoverMessage: error,
      highlightInvalidResources: true
    });
  },
  _onConfirmClose: function _onConfirmClose() {
    this.confirmationDialog.close();
    this.stopListening(this.metadataDesignerEventBus, 'warningDialog:addResources');
    this.stopListening(this.metadataDesignerEventBus, 'warningDialog:cancelResourcesAdd');
  }
}, Backbone.Events);

module.exports = TreeActionsErrorsController;

});