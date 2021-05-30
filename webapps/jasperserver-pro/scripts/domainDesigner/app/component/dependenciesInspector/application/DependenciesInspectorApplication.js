define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var dependenciesTreeAlignmentEnum = require('../enum/dependenciesTreeAlignmentEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DependenciesInspectorApplication = function DependenciesInspectorApplication(options) {
  this.dependenciesInspectorModel = options.dependenciesInspectorModel;
  this.dependenciesInspectorDialog = options.dependenciesInspectorDialog;
  this.dependenciesInspectorEventBus = options.dependenciesInspectorEventBus;
  this.leftVirtualDataEventBus = options.leftVirtualDataEventBus;
  this.rightVirtualDataEventBus = options.rightVirtualDataEventBus;
  this.dependenciesLeftTreeVirtualDataComponentEventBus = options.dependenciesLeftTreeVirtualDataComponentEventBus;
  this.dependenciesRightTreeVirtualDataComponentEventBus = options.dependenciesRightTreeVirtualDataComponentEventBus;
  this.dependenciesInspectorLeftTreeStoreMutations = options.dependenciesInspectorLeftTreeStoreMutations;
  this.dependenciesInspectorRightTreeStoreMutations = options.dependenciesInspectorRightTreeStoreMutations;

  this._initEvents();
};

_.extend(DependenciesInspectorApplication.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.dependenciesInspectorEventBus, 'dependenciesInspectorComponent:confirm', this._onConfirm);
    this.listenTo(this.dependenciesInspectorEventBus, 'dependenciesInspectorComponent:reject', this._onReject);
    this.listenTo(this.dependenciesInspectorDialog, 'dialog:resize', this._onDialogResize);
    this.listenTo(this.dependenciesInspectorDialog, 'dialog:resize:started', this._onDialogResizeStarted);
    this.listenTo(this.dependenciesLeftTreeVirtualDataComponentEventBus, 'tree:toggle', this._onLeftTreeToggle);
    this.listenTo(this.dependenciesRightTreeVirtualDataComponentEventBus, 'tree:toggle', this._onRightTreeToggle);
    this.listenTo(this.leftVirtualDataEventBus, 'canvas:scroll', this._onScrollChange);
    this.listenTo(this.rightVirtualDataEventBus, 'canvas:scroll', this._onScrollChange);
  },
  open: function open(dependenciesGroups) {
    this.dependenciesInspectorModel.reset();
    this.dependenciesInspectorLeftTreeStoreMutations.reset();
    this.dependenciesInspectorRightTreeStoreMutations.reset();
    var leftGroup = dependenciesGroups.leftGroup,
        rightGroup = dependenciesGroups.rightGroup;
    var isLeftGroupVisible = !_.isEmpty(leftGroup),
        isRightGroupVisible = !_.isEmpty(rightGroup);

    if (isLeftGroupVisible) {
      this.dependenciesInspectorModel.set('isAllDependenciesExceptDataIslandsVisible', isLeftGroupVisible);
      this.dependenciesInspectorLeftTreeStoreMutations.setItems(leftGroup);
    }

    if (isRightGroupVisible) {
      this.dependenciesInspectorModel.set('isDataIslandsVisible', isRightGroupVisible);
      this.dependenciesInspectorRightTreeStoreMutations.setItems(rightGroup);
    }

    if (isRightGroupVisible && isLeftGroupVisible) {
      this.dependenciesInspectorModel.set({
        allDependenciesExceptDataIslandsAlignment: dependenciesTreeAlignmentEnum.LEFT_ALIGNMENT,
        dataIslandsAlignment: dependenciesTreeAlignmentEnum.RIGHT_ALIGNMENT
      });
    }

    this.dependenciesInspectorDialog.open();
  },
  _onConfirm: function _onConfirm() {
    this.trigger('confirm');
  },
  _onReject: function _onReject() {
    this.trigger('reject');
  },
  _onLeftTreeToggle: function _onLeftTreeToggle(props) {
    this.dependenciesInspectorLeftTreeStoreMutations.toggle(props);
  },
  _onRightTreeToggle: function _onRightTreeToggle(props) {
    this.dependenciesInspectorRightTreeStoreMutations.toggle(props);
  },
  _onScrollChange: function _onScrollChange(scrollPos) {
    this.dependenciesInspectorLeftTreeStoreMutations.updateScrollPos(scrollPos);
    this.dependenciesInspectorRightTreeStoreMutations.updateScrollPos(scrollPos);
  },
  _onDialogResize: function _onDialogResize(options) {
    var currentSize = options.size,
        dialogInitialHeight = this.dependenciesInspectorModel.get('dialogInitialHeight'),
        initialDependenciesHeight = this.dependenciesInspectorModel.get('initialDependenciesHeight');
    var deltaHeight = currentSize.height - dialogInitialHeight,
        newQueryResultSetHeight = initialDependenciesHeight + deltaHeight,
        height;

    if (currentSize.height > dialogInitialHeight) {
      height = newQueryResultSetHeight;
    } else {
      height = initialDependenciesHeight;
    }

    this.dependenciesInspectorLeftTreeStoreMutations.updateHeight(height);
    this.dependenciesInspectorRightTreeStoreMutations.updateHeight(height);
  },
  _onDialogResizeStarted: function _onDialogResizeStarted() {
    var dialogInitialHeight = this.dependenciesInspectorModel.get('dialogInitialHeight'),
        initialDependenciesHeight = this.dependenciesInspectorModel.get('initialDependenciesHeight');

    if (!dialogInitialHeight && !initialDependenciesHeight) {
      dialogInitialHeight = this.dependenciesInspectorDialog.$el.outerHeight();
      initialDependenciesHeight = this.dependenciesInspectorDialog.$el.find('.jr-jDependencies').outerHeight();
      this.dependenciesInspectorModel.set({
        'dialogInitialHeight': dialogInitialHeight,
        'initialDependenciesHeight': initialDependenciesHeight
      });
    }
  },
  close: function close() {
    this.dependenciesInspectorDialog.close();
  }
});

module.exports = DependenciesInspectorApplication;

});