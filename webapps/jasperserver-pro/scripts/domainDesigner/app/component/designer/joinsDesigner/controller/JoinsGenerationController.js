define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var JoinsGenerationController = function JoinsGenerationController(options) {
  _.bindAll(this, '_onForeignKeyInfoReceived');

  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.joinsDesignerEventBus = options.joinsDesignerEventBus;
  this.foreignKeyDiscoveryService = options.foreignKeyDiscoveryService;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.confirmationDialog = options.confirmationDialog;
  this.alertDialog = options.alertDialog;
  this.clientDomainSchemaJoinsDesignerService = options.clientDomainSchemaJoinsDesignerService;

  this._initEvents();
};

_.extend(JoinsGenerationController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'generate:joins', this._generateJoins);
  },
  _generateJoins: function _generateJoins(dataSourceId) {
    if (this._atLeastOneTableAddedToDataSource(dataSourceId)) {
      this.foreignKeyDiscoveryService.getForeignKeys(dataSourceId).then(this._onForeignKeyInfoReceived);
    } else {
      this.alertDialog.setMessage(i18nMessage('domain.designer.joinsDesigner.generate.dialog.warning.noTables'));
      this.alertDialog.open();
    }
  },
  _atLeastOneTableAddedToDataSource: function _atLeastOneTableAddedToDataSource(dataSourceId) {
    return this.clientDomainSchemaService.getTablesCount(dataSourceId) > 0;
  },
  _onForeignKeyInfoReceived: function _onForeignKeyInfoReceived(info) {
    if (info.length === 0) {
      this.alertDialog.setMessage(i18nMessage('domain.designer.joinsDesigner.generate.dialog.warning.noForeignKeyInfo'));
      this.alertDialog.open();
    } else {
      this._initConfirmationDialogEvents(info);

      this.confirmationDialog.open();
    }
  },
  _initConfirmationDialogEvents: function _initConfirmationDialogEvents(info) {
    this.listenTo(this.confirmationDialog, 'button:yes', _.bind(this._onJoinsGenerationConfirmed, this, info));
    this.listenTo(this.confirmationDialog, 'button:yes button:no', _.bind(this._stopListeningForConfirmationDialog, this));
  },
  _stopListeningForConfirmationDialog: function _stopListeningForConfirmationDialog() {
    this.stopListening(this.confirmationDialog);
  },
  _onJoinsGenerationConfirmed: function _onJoinsGenerationConfirmed(info) {
    var joinsInfo = this.clientDomainSchemaJoinsDesignerService.generateJoins(info);
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_GENERATE_JOINS, joinsInfo);
  }
});

module.exports = JoinsGenerationController;

});