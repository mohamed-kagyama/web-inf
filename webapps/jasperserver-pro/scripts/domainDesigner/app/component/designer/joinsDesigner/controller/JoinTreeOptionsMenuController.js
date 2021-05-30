define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinTreeOptionsMenuController = function JoinTreeOptionsMenuController(options) {
  _.bindAll(this, "_onClickOKRenameDialog", "_onClickCancelRenameDialog", "_onRenameDialogInput");

  this.renameJoinTreeDialog = options.renameJoinTreeDialog;
  this.renameJoinTreeDialogStore = options.renameJoinTreeDialogStore;
  this.renameJoinTreeValidator = options.renameJoinTreeValidator;
  this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
  this.joinsDesignerEventBus = options.joinsDesignerEventBus;
  this.advancedJoinsMappingSpecification = options.advancedJoinsMappingSpecification;

  this._initEvents();
};

_.extend(JoinTreeOptionsMenuController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'toggle:useMinimumPathJoins', this._onBeforeToggleUseMinimumPathJoins);
    this.listenTo(this.joinsDesignerEventBus, 'toggle:useAllDataIslandJoins', this._onBeforeToggleUseAllDataIslandJoins);
    this.listenTo(this.joinsDesignerEventBus, 'show:renameJoinTreeDialog', this._onShowRenameJoinTreeDialog);
    this.renameJoinTreeDialog.$on("ok", this._onClickOKRenameDialog);
    this.renameJoinTreeDialog.$on("cancel", this._onClickCancelRenameDialog);
    this.renameJoinTreeDialog.$on("input", this._onRenameDialogInput);
  },
  _onBeforeToggleUseMinimumPathJoins: function _onBeforeToggleUseMinimumPathJoins(options) {
    var useMinimumPathJoins = !options.joinTree.useMinimumPathJoins,
        useAllDataIslandJoins = false;
    var joinTreeJson = {
      suppressCircularJoins: this.advancedJoinsMappingSpecification.isSuppressCircularJoinOn(useMinimumPathJoins, useAllDataIslandJoins),
      includeAllDataIslandJoins: this.advancedJoinsMappingSpecification.isIncludeAllDataIslandJoinsOn(useMinimumPathJoins, useAllDataIslandJoins)
    },
        joinTreeId = options.joinTree.id;

    this._updateJoinTree(joinTreeJson, joinTreeId);
  },
  _onBeforeToggleUseAllDataIslandJoins: function _onBeforeToggleUseAllDataIslandJoins(options) {
    var useMinimumPathJoins = false,
        useAllDataIslandJoins = !options.joinTree.useAllDataIslandJoins;
    var joinTreeJson = {
      suppressCircularJoins: this.advancedJoinsMappingSpecification.isSuppressCircularJoinOn(useMinimumPathJoins, useAllDataIslandJoins),
      includeAllDataIslandJoins: this.advancedJoinsMappingSpecification.isIncludeAllDataIslandJoinsOn(useMinimumPathJoins, useAllDataIslandJoins)
    },
        joinTreeId = options.joinTree.id;

    this._updateJoinTree(joinTreeJson, joinTreeId);
  },
  _updateJoinTree: function _updateJoinTree(joinTreeJson, joinTreeId) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_TREE, {
      joinTreeId: joinTreeId,
      joinTreeJson: joinTreeJson
    });
  },
  _onShowRenameJoinTreeDialog: function _onShowRenameJoinTreeDialog(options) {
    this.renameJoinTreeDialogStore.show = true;
    this.renameJoinTreeDialogStore.value = options.joinTree.name;
    this.renameJoinTreeDialogStore.originalValue = options.joinTree.name;
    this.renameJoinTreeDialogStore.joinTreeId = options.joinTree.id;
    this.renameJoinTreeDialogStore.validationMessage = '';
  },
  _onRenameDialogInput: function _onRenameDialogInput(value) {
    this.renameJoinTreeDialogStore.value = value;
    this.renameJoinTreeDialogStore.validationMessage = '';
  },
  _onClickOKRenameDialog: function _onClickOKRenameDialog(value) {
    var validationMessage = this.renameJoinTreeValidator.validate(this.renameJoinTreeDialogStore);

    if (validationMessage) {
      this.renameJoinTreeDialogStore.validationMessage = validationMessage;
    } else {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_TREE, {
        joinTreeId: this.renameJoinTreeDialogStore.joinTreeId,
        joinTreeJson: {
          name: value
        }
      });
      this.renameJoinTreeDialogStore.show = false;
    }
  },
  _onClickCancelRenameDialog: function _onClickCancelRenameDialog() {
    this.renameJoinTreeDialogStore.show = false;
  }
});

module.exports = JoinTreeOptionsMenuController;

});