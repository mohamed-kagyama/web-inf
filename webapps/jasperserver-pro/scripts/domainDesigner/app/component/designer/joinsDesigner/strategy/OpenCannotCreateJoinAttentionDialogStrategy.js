define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OpenCannotCreateJoinAttentionDialogStrategy = function OpenCannotCreateJoinAttentionDialogStrategy(options) {
  this.initialize(options);
};

_.extend(OpenCannotCreateJoinAttentionDialogStrategy.prototype, {
  initialize: function initialize(options) {
    this.attentionDialog = options.attentionDialog;
    this.attentionDialogStore = options.attentionDialogStore;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.cannotCreateJoinAttentionDialogMessageFactory = options.cannotCreateJoinAttentionDialogMessageFactory;
  },
  execute: function execute(options) {
    var item = options.item;
    var tableReferenceId = item.resource.parentTableReferenceId;
    var validationMessage = this.cannotCreateJoinAttentionDialogMessageFactory.create({
      fieldName: item.label,
      dataIslandName: this._getDataIslandName(tableReferenceId),
      tableReferenceName: this._getTableReferenceName(tableReferenceId)
    });
    this.attentionDialogStore.set({
      validationMessage: validationMessage.message,
      validationMessageDetails: validationMessage.details
    });
    this.attentionDialog.open();
  },
  _getTableReferenceName: function _getTableReferenceName(tableReferenceId) {
    var tableReference = this.clientDomainSchemaService.getTableReferenceById(tableReferenceId);
    return tableReference.name;
  },
  _getDataIslandName: function _getDataIslandName(tableReferenceId) {
    var dataIslands = this.clientDomainSchemaService.getDataIslands();
    return _.find(dataIslands, function (dataIsland) {
      return dataIsland.sourceId === tableReferenceId;
    }).name;
  }
});

module.exports = OpenCannotCreateJoinAttentionDialogStrategy;

});