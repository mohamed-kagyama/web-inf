define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var RenameTableReferenceController = function RenameTableReferenceController(options) {
  this.initialize(options);
};

_.extend(RenameTableReferenceController.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, "_onRenameTableReferenceDialogClickOk", "_onRenameTableReferenceDialogClickCancel", "_onRenameTableReferenceDialogInput");

    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.renameTableReferenceDialog = options.renameTableReferenceDialog;
    this.renameTableReferenceDialogStore = options.renameTableReferenceDialogStore;
    this.renameTableReferenceValidator = options.renameTableReferenceValidator;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.expressionBulkUpdateService = options.expressionBulkUpdateService;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, "rename:tableReference", this._onTableReferenceRename);
    this.renameTableReferenceDialog.$on("ok", this._onRenameTableReferenceDialogClickOk);
    this.renameTableReferenceDialog.$on("cancel", this._onRenameTableReferenceDialogClickCancel);
    this.renameTableReferenceDialog.$on("input", this._onRenameTableReferenceDialogInput);
  },
  _onTableReferenceRename: function _onTableReferenceRename(tableReference) {
    this.renameTableReferenceDialogStore.show = true;
    this.renameTableReferenceDialogStore.value = tableReference.name;
    this.renameTableReferenceDialogStore.originalValue = tableReference.name;
    this.renameTableReferenceDialogStore.tableReferenceId = tableReference.id;
    this.renameTableReferenceDialogStore.validationMessage = "";
  },
  _onRenameTableReferenceDialogInput: function _onRenameTableReferenceDialogInput(value) {
    this.renameTableReferenceDialogStore.value = value;
    this.renameTableReferenceDialogStore.validationMessage = "";
  },
  _onRenameTableReferenceDialogClickOk: function _onRenameTableReferenceDialogClickOk(newName) {
    var validationMessage = this.renameTableReferenceValidator.validate(this.renameTableReferenceDialogStore);
    var tableReferenceId = this.renameTableReferenceDialogStore.tableReferenceId,
        originalName = this.renameTableReferenceDialogStore.originalValue,
        self = this;

    if (validationMessage) {
      this.renameTableReferenceDialogStore.validationMessage = validationMessage;
    } else {
      this.expressionBulkUpdateService.getUpdatedExpressions({
        resourceId: tableReferenceId,
        resourceType: schemaEntitiesEnum.TABLE_REFERENCE,
        originalName: originalName,
        newName: newName
      }).then(function (resourcesToUpdate) {
        self._renameTableReference(tableReferenceId, newName, resourcesToUpdate);

        self.renameTableReferenceDialogStore.show = false;
      });
    }
  },
  _onRenameTableReferenceDialogClickCancel: function _onRenameTableReferenceDialogClickCancel() {
    this.renameTableReferenceDialogStore.show = false;
  },
  _renameTableReference: function _renameTableReference(tableReferenceId, newName, resources) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_RENAME_TABLE_REFERENCE, {
      id: tableReferenceId,
      name: newName,
      resources: resources
    });
  }
}, Backbone.Events);

module.exports = RenameTableReferenceController;

});