define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CalculatedFieldsAvailableItemsTreeController = function CalculatedFieldsAvailableItemsTreeController(options) {
  this.initialize(options);
};

_.extend(CalculatedFieldsAvailableItemsTreeController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.treeDataProvider = options.treeDataProvider;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.calculatedFieldsDesignerViewStateModelService = options.calculatedFieldsDesignerViewStateModelService;
    this.calculatedFieldsDesignerInitialExpandedNodesProvider = options.calculatedFieldsDesignerInitialExpandedNodesProvider;
    this.calculatedFieldsDesignerEventBus = options.calculatedFieldsDesignerEventBus;
    this.tree = options.tree;
    this.store = options.store;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onStoreChange);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'change:searchKeyword', this._onSearchKeywordChange);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'availableItemsTree:expand', this._onAvailableItemsTreeExpand);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'availableItemsTree:collapse', this._onAvailableItemsTreeCollapse);
  },
  _onAvailableItemsTreeExpand: function _onAvailableItemsTreeExpand(options) {
    var searchKeyword = this.store.get('searchKeyword'),
        expandedNodes = _.clone(this.store.get('availableValuesExpandedNodes')),
        collapsedNodes = _.clone(this.store.get('availableValuesCollapsedNodes'));

    if (searchKeyword) {
      delete collapsedNodes[options.resourceId];
      this.store.set('availableValuesCollapsedNodes', collapsedNodes);
    } else {
      expandedNodes[options.resourceId] = true;
      this.store.set('availableValuesExpandedNodes', expandedNodes);
    }

    this.treeDataProvider.setNeedToConvert(true);

    this._refetchTreeIfVisible();
  },
  _onAvailableItemsTreeCollapse: function _onAvailableItemsTreeCollapse(item) {
    var id = item.resourceId,
        searchKeyword = this.store.get('searchKeyword'),
        expandedNodes = _.clone(this.store.get('availableValuesExpandedNodes')),
        collapsedNodes = _.clone(this.store.get('availableValuesCollapsedNodes'));

    if (searchKeyword) {
      collapsedNodes[id] = true;
      this.store.set('availableValuesCollapsedNodes', collapsedNodes);
    } else {
      delete expandedNodes[id];
      this.store.set('availableValuesExpandedNodes', expandedNodes);
    }

    this.treeDataProvider.setNeedToConvert(true);

    this._refetchTreeIfVisible();
  },
  _onStoreChange: function _onStoreChange(state) {
    this.treeDataProvider.setState({
      dataStore: state.dataStore
    });

    this._initialTreeRefetchIfVisible(state.dataStore);
  },
  _onSearchKeywordChange: function _onSearchKeywordChange(value) {
    this.store.set({
      'searchKeyword': value,
      'availableValuesCollapsedNodes': {}
    });
    this.treeDataProvider.setNeedToConvert(true);

    this._refetchTreeIfVisible();
  },
  _refetchTreeIfVisible: function _refetchTreeIfVisible() {
    var isVisible = this.calculatedFieldsDesignerViewStateModelService.isDesignerVisible();

    if (isVisible) {
      this.tree.fetch();
    }
  },
  _initialTreeRefetchIfVisible: function _initialTreeRefetchIfVisible(dataStore) {
    var context = this.calculatedFieldsDesignerViewStateModelService.getContext(),
        isVisible = this.calculatedFieldsDesignerViewStateModelService.isDesignerVisible(),
        expandedNodes;

    if (isVisible) {
      expandedNodes = this.calculatedFieldsDesignerInitialExpandedNodesProvider.getExpandedNodes(dataStore, context);
      this.store.set('availableValuesExpandedNodes', expandedNodes);
      this.tree.fetch();
    }
  }
});

module.exports = CalculatedFieldsAvailableItemsTreeController;

});