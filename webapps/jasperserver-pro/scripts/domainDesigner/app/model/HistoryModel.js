define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var SequenceGenerator = require("../../model/util/SequenceGenerator");

var ListWithCursor = require("../../util/ListWithCursor");

var applicationStateEventsEnum = require("../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var HistoryModel = function HistoryModel(options) {
  this.initialize(options);
};

_.extend(HistoryModel.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    var entryInitialId = this._getEntryInitialId(options);

    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.primaryList = options.list || new ListWithCursor(options);
    this.secondaryList = new ListWithCursor();
    this.activeList = this.primaryList;
    this.entryIdGenerator = new SequenceGenerator(entryInitialId);
  },
  setState: function setState(allHistoryStateList, position) {
    this._resetSecondaryList();

    this._resetPrimaryList();

    this._setActiveListToPrimary();

    this.activeList.setList(allHistoryStateList);
    this.activeList.setPosition(position);

    this._triggerActionsAndDesignerState();
  },
  getState: function getState(position, isSecondary) {
    var list = isSecondary ? this.secondaryList.getList() : this.primaryList.getList();

    if (_.isNumber(position)) {
      return list[position];
    } else {
      position = this.primaryList.getPosition();
      return {
        list: list,
        position: position
      };
    }
  },
  pushState: function pushState(state) {
    this._setActiveListToPrimary();

    this._removeAllNextEntries();

    this._mergePrimaryListWithSecondary();

    this._resetSecondaryList();

    this._pushState({
      id: this.entryIdGenerator.next(),
      viewState: state.viewState || {},
      domainState: state.domainState || {},
      resourceProperties: state.resourceProperties || {}
    });
  },
  pushViewState: function pushViewState(state) {
    this._resetSecondaryList();

    this._setActiveListToSecondary();

    var currentHistoryEntry = this.primaryList.get();

    this._pushState({
      id: currentHistoryEntry.id,
      viewState: state.viewState || {},
      domainState: state.domainState || {},
      resourceProperties: state.resourceProperties || {}
    });
  },
  undo: function undo() {
    this._resetSecondaryList();

    var undoPosition = this._getUndoPosition();

    !_.isUndefined(undoPosition) && this.primaryList.setPosition(undoPosition);

    this._triggerActionsAndDesignerState();
  },
  undoAll: function undoAll() {
    this._resetSecondaryList();

    this._setActiveListToPrimary();

    var undoAllPosition = this._getUndoAllPosition();

    this.primaryList.setPosition(undoAllPosition);

    this._triggerActionsAndDesignerState();
  },
  redo: function redo() {
    this._resetSecondaryList();

    var redoPosition = this._getRedoPosition();

    !_.isUndefined(redoPosition) && this.primaryList.setPosition(redoPosition);

    this._setActiveListToPrimary();

    this._triggerActionsAndDesignerState();
  },
  isUndoAvailable: function isUndoAvailable() {
    return !_.isUndefined(this._getUndoPosition());
  },
  isRedoAvailable: function isRedoAvailable() {
    return !_.isUndefined(this._getRedoPosition());
  },
  clearHistory: function clearHistory() {
    var currentHistoryEntry = this.primaryList.get();
    this.primaryList.setList([currentHistoryEntry], 0);
  },
  _getUndoPosition: function _getUndoPosition() {
    var position,
        currentHistoryEntry = this.primaryList.get(),
        currentPosition = this.primaryList.getPosition(),
        list = this.primaryList.getList();

    for (var i = currentPosition; i >= 0; i--) {
      var entry = list[i];

      if (entry.id !== currentHistoryEntry.id) {
        position = i;
        break;
      }
    }

    return position;
  },
  _getRedoPosition: function _getRedoPosition() {
    var position,
        currentHistoryEntry = this.primaryList.get(),
        currentPosition = this.primaryList.getPosition(),
        list = this.primaryList.getList();

    if (_.isUndefined(currentHistoryEntry)) {
      return position;
    }

    for (var i = currentPosition; i < list.length; i++) {
      var entry = list[i];

      if (entry.id !== currentHistoryEntry.id) {
        position = i;
        break;
      }
    }

    return position;
  },
  _getUndoAllPosition: function _getUndoAllPosition() {
    var position = 0,
        list = this.primaryList.getList();

    for (var i = 0; i < list.length; i++) {
      var entry = list[i],
          nextEntry = list[i + 1];

      if (!nextEntry) {
        break;
      }

      if (entry.id !== nextEntry.id) {
        position = i;
        break;
      }
    }

    return position;
  },
  _mergePrimaryListWithSecondary: function _mergePrimaryListWithSecondary() {
    var secondaryListCurrentRecord = this.secondaryList.get();

    if (secondaryListCurrentRecord) {
      this.primaryList.add(secondaryListCurrentRecord);
    }
  },
  _resetSecondaryList: function _resetSecondaryList() {
    this.secondaryList.setList();
  },
  _resetPrimaryList: function _resetPrimaryList() {
    this.primaryList.setList();
  },
  _setActiveListToSecondary: function _setActiveListToSecondary() {
    this.activeList = this.secondaryList;
  },
  _setActiveListToPrimary: function _setActiveListToPrimary() {
    this.activeList = this.primaryList;
  },
  _pushState: function _pushState(state, position) {
    if (_.isUndefined(position)) {
      this.activeList.add(state);
    } else {
      this.activeList.replace(state, position);
    }
  },
  _triggerActionsAndDesignerState: function _triggerActionsAndDesignerState() {
    this._triggerDesignerState();
  },
  _triggerDesignerState: function _triggerDesignerState() {
    var viewStateClone = this._getCurrentViewStateClone(),
        domainStateClone = this._getCurrentDomainStateClone(),
        resourcePropertiesClone = this._getCurrentResourcePropertiesStateClone();

    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.SET_STATE_NO_HISTORY, {
      schema: domainStateClone,
      viewState: viewStateClone,
      resourceProperties: resourcePropertiesClone
    });
  },
  _getCurrentDomainStateClone: function _getCurrentDomainStateClone() {
    var currentHistoryEntry = this.primaryList.get() || {};
    return currentHistoryEntry.domainState || {};
  },
  _getCurrentViewStateClone: function _getCurrentViewStateClone() {
    var currentHistoryEntry = this.primaryList.get() || {},
        viewState = currentHistoryEntry.viewState || {};
    return _.cloneDeep(viewState);
  },
  _getCurrentResourcePropertiesStateClone: function _getCurrentResourcePropertiesStateClone() {
    var currentHistoryEntry = this.primaryList.get() || {},
        resourceProperties = currentHistoryEntry.resourceProperties || {};
    return _.cloneDeep(resourceProperties);
  },
  _removeAllNextEntries: function _removeAllNextEntries() {
    this.activeList.removeAfter();
  },
  _getEntryInitialId: function _getEntryInitialId(options) {
    var initialId = 0,
        items = options.items;

    if (items && !_.isEmpty(items)) {
      var lastItem = _.last(items);

      initialId = lastItem.id + 1;
    }

    return initialId;
  }
});

module.exports = HistoryModel;

});