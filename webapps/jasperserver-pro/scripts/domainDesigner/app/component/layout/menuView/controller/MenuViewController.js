define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var saveMethodEnum = require("../../../enum/saveMethodEnum");

var storeChangeEventCallbackExecutorUtil = require("../../../../common/util/storeChangeEventCallbackExecutorUtil");

var validationStateNameEnum = require("../../../validation/state/enum/validationStateNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var MenuViewController = function MenuViewController(options) {
  this.initialize(options);
};

_.extend(MenuViewController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.historyModel = options.historyModel;
    this.menuEventBus = options.menuEventBus;
    this.menuStore = options.menuStore;
    this.validationStateFactory = options.validationStateFactory;
    this.schemaIsIntegralAndCompleteSpecification = options.schemaIsIntegralAndCompleteSpecification;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    var executor = storeChangeEventCallbackExecutorUtil.getExecutor(this);
    this.listenTo(this.storeChangeEventBus, 'change', executor);
    this.listenTo(this.storeChangeEventBus, 'change', this._onSchemaChange);
    this.listenTo(this.menuEventBus, 'save', this._onSave);
    this.listenTo(this.menuEventBus, 'saveAs', this._onSaveAs);
    this.listenTo(this.menuEventBus, 'downloadSchemaJson', this._onDownloadSchemaJson);
    this.listenTo(this.menuEventBus, 'downloadSchemaXml', this._onDownloadSchemaXml);
    this.listenTo(this.menuEventBus, 'uploadSchema', this._onUploadSchema);
    this.listenTo(this.menuEventBus, 'redo', this._onRedo);
    this.listenTo(this.menuEventBus, 'undo', this._onUndo);
    this.listenTo(this.menuEventBus, 'undo:all', this._onUndoAll);
  },
  // Event handlers
  _onDownloadSchemaJson: function _onDownloadSchemaJson() {
    this.applicationCrossComponentEventBus.trigger('schema:json:download');
  },
  _onDownloadSchemaXml: function _onDownloadSchemaXml() {
    this.applicationCrossComponentEventBus.trigger('schema:xml:download');
  },
  _onUploadSchema: function _onUploadSchema() {
    this.applicationCrossComponentEventBus.trigger('schema:upload');
  },
  _onSave: function _onSave() {
    this.validationStateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE, {
      saveMethod: saveMethodEnum.SAVE
    });
  },
  _onSaveAs: function _onSaveAs() {
    this.validationStateFactory.enter(validationStateNameEnum.SAVE_DOMAIN_INITIAL_VALIDATION_STATE, {
      saveMethod: saveMethodEnum.SAVE_AS
    });
  },
  _onUndo: function _onUndo() {
    this.historyModel.undo();
  },
  _onUndoAll: function _onUndoAll() {
    this.historyModel.undoAll();
  },
  _onRedo: function _onRedo() {
    this.historyModel.redo();
  },
  _onSchemaChange: function _onSchemaChange() {
    this.menuStore.set({
      undo: this.historyModel.isUndoAvailable(),
      redo: this.historyModel.isRedoAvailable(),
      isSaveEnabled: this.schemaIsIntegralAndCompleteSpecification.isSatisfied()
    });
  }
});

module.exports = MenuViewController;

});