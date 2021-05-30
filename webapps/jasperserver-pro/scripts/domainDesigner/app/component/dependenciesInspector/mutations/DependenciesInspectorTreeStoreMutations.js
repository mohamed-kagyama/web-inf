define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DependenciesInspectorTreeStoreMutations = function DependenciesInspectorTreeStoreMutations(options) {
  this.initialize(options);
};

_.extend(DependenciesInspectorTreeStoreMutations.prototype, {
  initialize: function initialize(options) {
    this.dependenciesTreeVirtualDataModel = options.dependenciesTreeVirtualDataModel;
    this.dependenciesTreeStateModel = options.dependenciesTreeStateModel;
    this.dependenciesGroupsToVirtualDataOptionsConverter = options.dependenciesGroupsToVirtualDataOptionsConverter;
    this.defaultCanvasHeight = options.defaultCanvasHeight;
  },
  updateScrollPos: function updateScrollPos(scrollPos) {
    this._updateScrollPos(scrollPos);
  },
  _updateScrollPos: function _updateScrollPos(scrollPos) {
    this.dependenciesTreeVirtualDataModel.set('scrollPos', scrollPos);

    this._updateViewPort();
  },
  updateHeight: function updateHeight(height) {
    this.dependenciesTreeVirtualDataModel.set('canvasHeight', height);

    this._updateViewPort();
  },
  toggle: function toggle(props) {
    var itemIndex = props.id;
    var collapsedItems = this.dependenciesTreeStateModel.get('collapsedItems');
    var isCollapsed = collapsedItems[itemIndex];
    collapsedItems[itemIndex] = !isCollapsed;
    this.dependenciesTreeStateModel.set('collapsedItems', collapsedItems);

    this._updateViewPort();
  },
  setItems: function setItems(newItems) {
    this.dependenciesTreeStateModel.set('allItems', newItems);

    this._updateViewPort();
  },
  reset: function reset() {
    this.dependenciesTreeStateModel.reset();
    this.dependenciesTreeVirtualDataModel.reset();
    this.dependenciesTreeVirtualDataModel.set('canvasHeight', this.defaultCanvasHeight);

    this._updateScrollPos(0);
  },
  _updateViewPort: function _updateViewPort() {
    var allVisibleItems = this.dependenciesTreeStateModel.get('allItems');
    var scrollPos = this.dependenciesTreeVirtualDataModel.get('scrollPos');
    var canvasHeight = this.dependenciesTreeVirtualDataModel.get('canvasHeight');
    var virtualDataOptions = this.dependenciesGroupsToVirtualDataOptionsConverter.convert({
      allItems: allVisibleItems,
      scrollPos: scrollPos,
      canvasHeight: canvasHeight
    });
    this.dependenciesTreeVirtualDataModel.set({
      top: virtualDataOptions.top,
      height: virtualDataOptions.height,
      collection: virtualDataOptions.collection
    });
  }
});

module.exports = DependenciesInspectorTreeStoreMutations;

});