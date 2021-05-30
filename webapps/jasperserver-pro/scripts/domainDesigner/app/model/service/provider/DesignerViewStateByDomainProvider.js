define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../model/schema/util/entityUtil");

var canvasViewDesignersEnum = require("../../enum/canvasViewDesignersEnum");

var schemaEntitiesEnum = require("../../../../model/schema/enum/schemaEntitiesEnum");

var schemaCollectionsEnum = require("../../../../model/schema/enum/schemaCollectionsEnum");

var artificialTreeResourceTypesEnum = require("../../../component/layout/sidebarView/enum/artificialTreeResourceTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var entitiesToExpandMap = [{
  artificial: true,
  type: artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP,
  lookupType: schemaEntitiesEnum.DERIVED_TABLE,
  lookupCollection: schemaCollectionsEnum.TABLES
}, {
  artificial: true,
  type: artificialTreeResourceTypesEnum.CONSTANT_GROUP,
  lookupType: schemaEntitiesEnum.CONSTANT_GROUP,
  lookupCollection: schemaCollectionsEnum.CONSTANT_GROUPS
}, {
  type: schemaEntitiesEnum.DATA_SOURCE,
  collection: schemaCollectionsEnum.DATA_SOURCES,
  childrenCollection: 'children'
}, {
  type: schemaEntitiesEnum.DATA_SOURCE_GROUP,
  collection: schemaCollectionsEnum.DATA_SOURCE_GROUPS,
  childrenCollection: 'children'
}, {
  type: schemaEntitiesEnum.JOIN_TREE,
  collection: schemaCollectionsEnum.JOIN_TREES,
  childrenCollection: schemaCollectionsEnum.JOIN_ALIASES
}];

var DesignerViewStateByDomainProvider = function DesignerViewStateByDomainProvider(options) {
  this.initialize(options);
};

_.extend(DesignerViewStateByDomainProvider.prototype, {
  initialize: function initialize(options) {
    this.viewStateDefaultsProvider = options.viewStateDefaultsProvider;
    this.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider = options.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider;
    this.designerViewStateFiltersPositionsProvider = options.designerViewStateFiltersPositionsProvider;
    this.designerViewStateJoinTreesStateProvider = options.designerViewStateJoinTreesStateProvider;
    this.designerViewStateJoinsStateProvider = options.designerViewStateJoinsStateProvider;
  },
  getViewState: function getViewState(collections, options) {
    var self = this,
        dataSourceName = collections.dataSources.first().name,
        dataSourceType = options.dataSourceType,
        currentDesigner = options.currentDesigner;
    var viewState = this.viewStateDefaultsProvider.defaults();
    viewState.dataSource[dataSourceName] = {
      type: dataSourceType
    };
    viewState.currentDesigner = currentDesigner ? currentDesigner : viewState.currentDesigner;
    viewState.designer.sidebar.expandedNodes = entitiesToExpandMap.reduce(function (memo, entry) {
      if (entry.artificial) {
        if (self._isArtificialGroupNotEmpty(entry, collections)) {
          memo[entry.type] = {
            type: entry.type
          };
        }
      } else {
        memo = collections[entry.collection].reduce(function (memo, element) {
          if (element[entry.childrenCollection].size()) {
            memo[element.id] = {
              type: entry.type
            };
          }

          return memo;
        }, memo);
      }

      return memo;
    }, {});
    var joinTreesState = this.designerViewStateJoinTreesStateProvider.getJoinTreesViewState(collections.joinTrees),
        joinsState = this.designerViewStateJoinsStateProvider.getJoinsViewStateByJoinTrees(collections.joinTrees),
        filtersPositionsState = this.designerViewStateFiltersPositionsProvider.getFiltersPositionsByFilters(collections.filters),
        metadataDesignerSidebarSelectedResource = this.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider.getSidebarSelectedResource(collections.dataSources);
    viewState.designer[canvasViewDesignersEnum.JOINS_DESIGNER].joinTrees = joinTreesState;
    viewState.designer[canvasViewDesignersEnum.JOINS_DESIGNER].joins = joinsState;
    viewState.designer[canvasViewDesignersEnum.FILTERS_DESIGNER].filtersPositions = filtersPositionsState;
    viewState.designer[canvasViewDesignersEnum.METADATA_DESIGNER].selectedResource = metadataDesignerSidebarSelectedResource;
    return viewState;
  },
  _isArtificialGroupNotEmpty: function _isArtificialGroupNotEmpty(entry, collections) {
    return collections[entry.lookupCollection].some(function (element) {
      return entityUtil.getEntityName(element) === entry.lookupType;
    });
  }
});

module.exports = DesignerViewStateByDomainProvider;

});