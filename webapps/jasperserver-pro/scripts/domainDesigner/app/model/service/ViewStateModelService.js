define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientSchemaModelUtil = require("../util/clientSchemaModelUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var presentationItemsSelectionUtil = require("../util/presentationItemsSelectionUtil");

var currentSidebarResourceUtil = require("../util/currentSidebarResourceUtil");

var defaultValueUtil = require("../util/defaultValueUtil");

var canvasViewDesignersEnum = require("../enum/canvasViewDesignersEnum");

var schemaEntitiesEnum = require("../../../model/schema/enum/schemaEntitiesEnum");

var viewStateModelDefaultsEnum = require("../enum/viewStateModelDefaultsEnum");

var draftStateTypesEnum = require("../enum/draftStateTypesEnum");

var artificialTreeResourceTypesEnum = require("../../component/layout/sidebarView/enum/artificialTreeResourceTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ViewStateModelService = function ViewStateModelService(options) {
  this.viewStateModel = options.viewStateModel;
  this.dataStore = options.dataStore;
  this.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider = options.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider;
  this.designerViewStateFiltersPositionsProvider = options.designerViewStateFiltersPositionsProvider;
  this.designerViewStateJoinTreesStateProvider = options.designerViewStateJoinTreesStateProvider;
  this.designerViewStateJoinsStateProvider = options.designerViewStateJoinsStateProvider;
};

_.extend(ViewStateModelService.prototype, {
  // Generic methods
  setCurrentDesigner: function setCurrentDesigner(designer) {
    this.viewStateModel.setCurrentDesigner(designer);
  },
  setState: function setState(state) {
    this.viewStateModel.set(state);
  },
  setCurrentResource: function setCurrentResource(currentDesigner, resource) {
    this._setCurrentResource(currentDesigner, resource);
  },
  replaceDataSource: function replaceDataSource(options) {
    var name = options.name,
        type = options.type;
    var designer = this.viewStateModel.getCurrentDesigner();

    this._resetViewStateModel();

    this._setDataSource(name, type);

    this.viewStateModel.setCurrentDesigner(designer);
  },
  // DD
  closeSaveDialog: function closeSaveDialog() {},
  showClearAllDataDialog: function showClearAllDataDialog() {},
  openEmptyDataIslandAlertDialog: function openEmptyDataIslandAlertDialog() {},
  closeEmptyDataIslandAlertDialog: function closeEmptyDataIslandAlertDialog() {},
  expandSidebarNode: function expandSidebarNode(item) {
    this._expandSidebarNode(item);

    var relatedItem = this._getToggledNodeRelatedItem(item);

    if (relatedItem) {
      this._expandSidebarNode(relatedItem);
    }
  },
  collapseSidebarNode: function collapseSidebarNode(item) {
    this._collapseSidebarNode(item);

    var relatedItem = this._getToggledNodeRelatedItem(item);

    if (relatedItem) {
      this._collapseSidebarNode(relatedItem);
    }
  },
  // Metadata Designer
  addDataSourceGroupsOrTables: function addDataSourceGroupsOrTables(selection, error) {
    var selectedResource = this._getMetadataDesignerSpecificProperty('selectedResource');

    this._addNodeToExpandedNodes(selectedResource);

    this._setMetadataDesignerTreesSelection(selection);

    this._setAddMetadataResourcesError(error);
  },
  removeDataSourceGroups: function removeDataSourceGroups(selection) {
    this._cleanupViewState();

    this._setMetadataDesignerTreesSelection(selection);

    this._clearAddResourcesError();
  },
  removeTables: function removeTables(selection) {
    this._cleanupViewState();

    this._setMetadataDesignerTreesSelection(selection);

    this._clearAddResourcesError();
  },
  removeDerivedTable: function removeDerivedTable() {
    this._cleanupViewState();
  },
  addSchemaAttribute: function addSchemaAttribute() {
    this._setMetadataDesignerTreesSelection({
      resultTreeSelection: []
    });

    var selectedResource = this._getMetadataDesignerSpecificProperty('selectedResource');

    this._addNodeToExpandedNodes(selectedResource);
  },
  setMetadataDesignerSourceTreeSelection: function setMetadataDesignerSourceTreeSelection(treeSelection) {
    this._setMetadataDesignerTreesSelection({
      sourceTreeSelection: treeSelection
    });

    this._clearAddResourcesError();
  },
  setMetadataDesignerResultTreeSelection: function setMetadataDesignerResultTreeSelection(treeSelection) {
    this._setMetadataDesignerTreesSelection({
      resultTreeSelection: treeSelection
    });
  },
  setMetadataDesignerSourceTreeSearchKeyword: function setMetadataDesignerSourceTreeSearchKeyword(searchKeyword) {
    var searchKeywordObj = this._getMetadataDesignerSpecificProperty('searchKeyword'),
        selectedResource = this._getMetadataDesignerSpecificProperty('selectedResource');

    searchKeywordObj.sourceTree[selectedResource.id] = searchKeyword;

    this._setMetadataDesignerSpecificProperty('searchKeyword', searchKeywordObj);
  },
  setMetadataDesignerResultTreeSearchKeyword: function setMetadataDesignerResultTreeSearchKeyword(searchKeyword) {
    var searchKeywordObj = this._getMetadataDesignerSpecificProperty('searchKeyword'),
        selectedResource = this._getMetadataDesignerSpecificProperty('selectedResource');

    searchKeywordObj.resultTree[selectedResource.id] = searchKeyword;

    this._setMetadataDesignerSpecificProperty('searchKeyword', searchKeywordObj);
  },
  setMetadataDesignerSidebarSearchKeyword: function setMetadataDesignerSidebarSearchKeyword(searchKeyword) {
    this._setDesignerSidebarSearchKeyword(searchKeyword);
  },
  setAddMetadataResourcesError: function setAddMetadataResourcesError(error) {
    this._setAddMetadataResourcesError(error);
  },
  setMetadataDesignerCurrentSidebarResource: function setMetadataDesignerCurrentSidebarResource(resource) {
    this._setMetadataDesignerCurrentSidebarResource(resource);
  },
  // Derived Tables Designer
  createDerivedTable: function createDerivedTable(dataSourceId) {
    this._addNodeToExpandedNodes({
      resourceId: dataSourceId,
      type: schemaEntitiesEnum.DATA_SOURCE
    });

    this._addNodeToExpandedNodes({
      resourceId: artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP,
      type: artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP
    });
  },
  // Joins Designer
  setJoinsDesignerSidebarSearchKeyword: function setJoinsDesignerSidebarSearchKeyword(searchKeyword) {
    this._setDesignerSidebarSearchKeyword(searchKeyword);
  },
  setJoinsDesignerSearchKeyword: function setJoinsDesignerSearchKeyword(searchKeyword) {
    var searchKeywordObj = this._getJoinsDesignerSpecificProperty('searchKeyword');

    searchKeywordObj.canvas = searchKeyword;

    this._setJoinsDesignerSpecificProperty('searchKeyword', searchKeywordObj);
  },
  setJoinsDesignerCurrentResource: function setJoinsDesignerCurrentResource(options) {
    this._setJoinsDesignerCurrentSidebarResource(options.resource);
  },
  generateJoins: function generateJoins() {
    this._cleanUpSidebarExpandedNodes();

    this.viewStateModel.resetDesigner(canvasViewDesignersEnum.JOINS_DESIGNER);
    this.viewStateModel.resetDesigner(canvasViewDesignersEnum.FILTERS_DESIGNER);
    this.viewStateModel.resetDesigner(canvasViewDesignersEnum.PRESENTATION_DESIGNER);

    this._setJoinTreesInitialViewState();

    this._setFiltersInitialViewState();

    this._setJoinsInitialViewState();
  },
  removeJoin: function removeJoin() {
    this._cleanupViewStateFromJoinsDesigner();
  },
  removeJoinAlias: function removeJoinAlias() {
    this._cleanupViewStateFromJoinsDesigner();
  },
  removeJoinExpression: function removeJoinExpression() {
    this._cleanupViewStateFromJoinsDesigner();
  },
  removeTableReference: function removeTableReference() {
    this._cleanupViewStateFromJoinsDesigner();
  },
  removeJoinTree: function removeJoinTree() {
    this._cleanupViewStateFromJoinsDesigner();
  },
  createJoinExpression: function createJoinExpression(joinExpression) {
    this._createJoinExpression(joinExpression);
  },
  createJoinTreeWithJoinExpression: function createJoinTreeWithJoinExpression(joinTreeWithJoinExpression) {
    var joinTreeIndex = joinTreeWithJoinExpression.index,
        joinExpression = joinTreeWithJoinExpression.joinExpression;
    var joinTrees = this.dataStore.getCollection('joinTrees').toArray(),
        joinTree = joinTrees[joinTreeIndex],
        joinTreeViewState = {};
    joinTreeViewState[joinTree.id] = this.designerViewStateJoinTreesStateProvider.getJoinTreeViewState();

    var joinTreesState = this._getJoinsDesignerSpecificProperty('joinTrees');

    this._setJoinsDesignerSpecificProperty('joinTrees', _.extend({}, joinTreesState, joinTreeViewState));

    this._createJoinExpression(joinExpression);

    this._setDraftJoinTreeState({});

    this._addNodeToExpandedNodes({
      resourceId: joinTree.id,
      type: schemaEntitiesEnum.JOIN_TREE
    });
  },
  setJoinConstructorState: function setJoinConstructorState(state) {
    this._setJoinConstructorState(state);
  },
  setDraftJoinTreeState: function setDraftJoinTreeState(state) {
    this._setDraftJoinTreeState(state);
  },
  toggleJoinTree: function toggleJoinTree(joinTreeId, isExpanded) {
    var joinTrees = this._getJoinsDesignerSpecificProperty('joinTrees'),
        joinTree = joinTrees[joinTreeId];

    joinTree.isExpanded = isExpanded;

    this._setJoinsDesignerSpecificProperty('joinTrees', joinTrees);
  },
  toggleJoin: function toggleJoin(options) {
    var joinId = options.joinId,
        joins = this._getJoinsDesignerSpecificProperty('joins'),
        join = joins[joinId];

    join.isExpanded = options.isExpanded;

    this._setJoinsDesignerSpecificProperty('joins', joins);
  },
  // Presentation Designer
  addConstantDataIsland: function addConstantDataIsland(options) {
    var dataIslands = this.dataStore.getCollection('dataIslands'),
        constantDataIsland = dataIslands.findWhere({
      sourceType: schemaEntitiesEnum.CONSTANT_GROUP
    });

    var selection = _.extend({
      parentId: constantDataIsland.getId()
    }, options.selection);

    selection = this._getPresentationCanvasSelectionAfterNewItemsWereAdded(selection);

    this._setPresentationDesignerSelection(selection);
  },
  addDataIslands: function addDataIslands(options) {
    var dataIsland,
        selection = options.selection,
        selectChildren = selection.selectChildren,
        dataIslands = this.dataStore.getCollection('dataIslands');
    selection = _.extend({}, selection, {
      parentId: null
    });

    if (selectChildren) {
      dataIsland = dataIslands.find(function (dataIsland, index) {
        return index === options.position;
      });
      selection.parentId = dataIsland.id;
    }

    options = _.extend({}, options, {
      selection: selection
    });

    this._addPresentationItems(options);
  },
  addPresentationItems: function addPresentationItems(options) {
    this._addPresentationItems(options);
  },
  addPresentationSet: function addPresentationSet(options) {
    var parent = options.parent;

    if (entityUtil.isDataIsland(parent.type)) {
      this._setPresentationDesignerDataIslandNodeExpandedState(parent.id, true);
    } else if (entityUtil.isPresentationSet(parent.type)) {
      this._setPresentationDesignerPresentationSetNodeExpandedState(parent.id, true);
    }
  },
  presentationDesignerReorderDataIslands: function presentationDesignerReorderDataIslands() {
    this._updatePresentationDataIslandsSelectionIndexes();
  },
  presentationDesignerReorderPresentationItems: function presentationDesignerReorderPresentationItems(options) {
    this._updatePresentationSetsAndItemsSelectionIndexesAndParentId(options);
  },
  setPresentationDesignerSidebarSearchKeyword: function setPresentationDesignerSidebarSearchKeyword(searchKeyword) {
    this._setDesignerSidebarSearchKeyword(searchKeyword);
  },
  setPresentationDesignerSearchKeyword: function setPresentationDesignerSearchKeyword(searchKeyword) {
    var searchKeywordObj = this._getPresentationDesignerSpecificProperty('searchKeyword');

    searchKeywordObj.canvas = searchKeyword;

    this._setPresentationDesignerSpecificProperty('searchKeyword', searchKeywordObj);
  },
  setPresentationDesignerSelection: function setPresentationDesignerSelection(selection) {
    this._setPresentationDesignerSelection(selection);
  },
  setPresentationDesignerSidebarSelection: function setPresentationDesignerSidebarSelection(selection) {
    this._setPresentationDesignerSpecificProperty('sidebarSelection', selection);
  },
  removeDataIslands: function removeDataIslands() {
    this._cleanupViewStateFromPresentationDesigner();
  },
  removePresentationItems: function removePresentationItems() {
    this._cleanupViewStateFromPresentationDesigner();
  },
  updatePresentationDataIslandsSelectionIndexes: function updatePresentationDataIslandsSelectionIndexes() {
    this._updatePresentationDataIslandsSelectionIndexes();
  },
  updatePresentationSetsAndItemsSelectionIndexesAndParentId: function updatePresentationSetsAndItemsSelectionIndexesAndParentId(options) {
    this._updatePresentationSetsAndItemsSelectionIndexesAndParentId(options);
  },
  setPresentationDesignerDataIslandNodeExpandedState: function setPresentationDesignerDataIslandNodeExpandedState(dataIslandId, isExpanded) {
    this._setPresentationDesignerDataIslandNodeExpandedState(dataIslandId, isExpanded);
  },
  setPresentationDesignerPresentationSetNodeExpandedState: function setPresentationDesignerPresentationSetNodeExpandedState(presentationSetId, isExpanded) {
    this._setPresentationDesignerPresentationSetNodeExpandedState(presentationSetId, isExpanded);
  },
  setPresentationDesignerDataIslandEditorExpandedState: function setPresentationDesignerDataIslandEditorExpandedState(dataIslandId, isEditorExpanded) {
    var items = this._getPresentationDesignerSpecificProperty('dataIslands');

    items = this._setPresentationDesignerItemExpandedState({
      itemType: schemaEntitiesEnum.DATA_ISLAND,
      presentationItems: items,
      presentationItemId: dataIslandId,
      isEditorExpanded: isEditorExpanded
    });

    this._setPresentationDesignerSpecificProperty('dataIslands', items);
  },
  setPresentationDesignerPresentationSetEditorExpandedState: function setPresentationDesignerPresentationSetEditorExpandedState(presentationSetId, isEditorExpanded) {
    var items = this._getPresentationDesignerSpecificProperty('presentationSets');

    items = this._setPresentationDesignerItemExpandedState({
      itemType: schemaEntitiesEnum.PRESENTATION_SET,
      presentationItems: items,
      presentationItemId: presentationSetId,
      isEditorExpanded: isEditorExpanded
    });

    this._setPresentationDesignerSpecificProperty('presentationSets', items);
  },
  setPresentationDesignerPresentationFieldEditorExpandedState: function setPresentationDesignerPresentationFieldEditorExpandedState(presentationFieldId, isEditorExpanded) {
    var items = this._getPresentationDesignerSpecificProperty('presentationFields');

    items = this._setPresentationDesignerItemExpandedState({
      itemType: schemaEntitiesEnum.PRESENTATION_FIELD,
      presentationItems: items,
      presentationItemId: presentationFieldId,
      isEditorExpanded: isEditorExpanded
    });

    this._setPresentationDesignerSpecificProperty('presentationFields', items);
  },
  setColumnSet: function setColumnSet(columnSet) {
    this._setPresentationDesignerSpecificProperty('columnSet', columnSet);
  },
  expandAllPresentationItems: function expandAllPresentationItems() {
    this._setPresentationDesignerSpecificProperty('defaultPresentationItemsNodeExpandedState', true);

    this._setPresentationDesignerSpecificProperty('defaultPresentationItemsEditorExpandedState', true);

    this._setPresentationDesignerAllItemsExpandedState();
  },
  collapseAllPresentationItems: function collapseAllPresentationItems() {
    this._setPresentationDesignerSpecificProperty('defaultPresentationItemsNodeExpandedState', false);

    this._setPresentationDesignerSpecificProperty('defaultPresentationItemsEditorExpandedState', false);

    this._setPresentationDesignerAllItemsExpandedState();
  },
  updatePresentationDesignerCellsWidth: function updatePresentationDesignerCellsWidth(widthPercentage) {
    this.viewStateModel.setDesignerSpecificRuntimeProperty(canvasViewDesignersEnum.PRESENTATION_DESIGNER, 'cellsWidth', widthPercentage);
  },
  // Calculated Fields Designer
  showCalculatedFieldsDesigner: function showCalculatedFieldsDesigner(context) {
    context = context || {};

    var visibility = viewStateModelDefaultsEnum.CALCULATED_FIELDS_DESIGNER.VISIBILITY,
        currentContext = this._getCalculatedFieldsDesignerSpecificRuntimeProperty('context');

    this._setCalculatedFieldsDesignerSpecificRuntimeProperty(visibility.property, !visibility.value);

    defaultValueUtil.setPropertyValueOrDefault(currentContext, viewStateModelDefaultsEnum.CALCULATED_FIELDS_DESIGNER.CONTEXT.SOURCE_ID.property, context.sourceId);
    defaultValueUtil.setPropertyValueOrDefault(currentContext, viewStateModelDefaultsEnum.CALCULATED_FIELDS_DESIGNER.CONTEXT.SOURCE_TYPE.property, context.sourceType);
    defaultValueUtil.setPropertyValueOrDefault(currentContext, viewStateModelDefaultsEnum.CALCULATED_FIELDS_DESIGNER.CONTEXT.SOURCE_NAME.property, context.sourceName);
    defaultValueUtil.setPropertyValueOrDefault(currentContext, viewStateModelDefaultsEnum.CALCULATED_FIELDS_DESIGNER.CONTEXT.CALC_FIELD_ID.property, context.calcFieldId);
  },
  hideCalculatedFieldsDesigner: function hideCalculatedFieldsDesigner() {
    this._hideCalculatedFieldsDesigner();
  },
  addCalcField: function addCalcField(options) {
    var joinAlias, resourceId, type;
    var joinAliases = this.dataStore.getCollection('joinAliases');

    if (options.sourceType === artificialTreeResourceTypesEnum.CONSTANT_GROUP) {
      resourceId = artificialTreeResourceTypesEnum.CONSTANT_GROUP;
      type = artificialTreeResourceTypesEnum.CONSTANT_GROUP;
    } else {
      resourceId = options.sourceId;
      type = options.sourceType;

      if (options.sourceType === schemaEntitiesEnum.TABLE_REFERENCE) {
        joinAlias = joinAliases.byField('tableReferenceId', options.sourceId);

        if (joinAlias) {
          resourceId = joinAlias.id;
          type = schemaEntitiesEnum.JOIN_ALIAS;
        }
      }
    }

    this._addNodeToExpandedNodes({
      resourceId: resourceId,
      type: type
    });

    this._hideCalculatedFieldsDesigner();
  },
  removeCalcField: function removeCalcField() {
    this._cleanupViewState();
  },
  // Filters designer
  setFiltersDesignerSidebarSearchKeyword: function setFiltersDesignerSidebarSearchKeyword(searchKeyword) {
    this._setDesignerSidebarSearchKeyword(searchKeyword);
  },
  setFiltersDesignerSearchKeyword: function setFiltersDesignerSearchKeyword(searchKeyword) {
    var searchKeywordObj = this._getFiltersDesignerSpecificProperty('searchKeyword');

    searchKeywordObj.canvas = searchKeyword;

    this._setFiltersDesignerSpecificProperty('searchKeyword', searchKeywordObj);
  },
  _setDraftStateByType: function _setDraftStateByType(draftStateType, draftStateForType) {
    var draftState = this.viewStateModel.getDraftState();
    draftState[draftStateType] = draftStateForType;
    this.viewStateModel.setDraftState(draftState);
  },
  clearDraftState: function clearDraftState(draftStateTypes) {
    var draftState = this.viewStateModel.getDraftState();
    var newDraftState = {};

    if (!_.isEmpty(draftStateTypes)) {
      newDraftState = _.reduce(draftStateTypes, function (memo, draftStateType) {
        if (memo[draftStateType]) {
          memo[draftStateType] = {};
        }

        return memo;
      }, draftState);
    }

    this.viewStateModel.setDraftState(newDraftState);
  },
  cancelDraftFilter: function cancelDraftFilter() {
    this.setDraftFilter({});
  },
  setDraftFilter: function setDraftFilter(draftState) {
    this._setDraftStateByType(draftStateTypesEnum.DRAFT_FILTER, draftState);
  },
  addFilter: function addFilter() {
    var addedFilter = this.dataStore.getCollection('filters').last(),
        filterId = addedFilter.getId();

    var filtersPositions = this._getFiltersDesignerSpecificProperty('filtersPositions');

    filtersPositions[filterId] = this.designerViewStateFiltersPositionsProvider.getNextFilterPosition();

    this._setFiltersDesignerSpecificProperty('filtersPositions', filtersPositions);

    this.setDraftFilter({});
  },
  removeFilter: function removeFilter(options) {
    var filterId = options.id;

    var filtersPositions = this._getFiltersDesignerSpecificProperty('filtersPositions');

    filtersPositions = _.omit(filtersPositions, String(filterId));

    this._setFiltersDesignerSpecificProperty('filtersPositions', filtersPositions);
  },
  setFiltersDesignerCurrentResource: function setFiltersDesignerCurrentResource(options) {
    this._setCurrentResource(canvasViewDesignersEnum.FILTERS_DESIGNER, options.resource);
  },
  // Private methods
  // actions
  _expandSidebarNode: function _expandSidebarNode(item) {
    var currentDesignerSearchKeyword = this._getCurrentDesignerSearchKeyword();

    if (currentDesignerSearchKeyword.sidebar) {
      this._removeNodeFromCollapsedNodes(item.resourceId);
    } else {
      this._addNodeToExpandedNodes(item);
    }
  },
  _collapseSidebarNode: function _collapseSidebarNode(item) {
    var currentDesignerSearchKeyword = this._getCurrentDesignerSearchKeyword();

    if (currentDesignerSearchKeyword.sidebar) {
      this._addNodeToCollapsedNodes(item);
    } else {
      this._removeNodeFromExpandedNodes(item.resourceId);
    }
  },
  _getToggledNodeRelatedItem: function _getToggledNodeRelatedItem(item) {
    var id = item.resourceId,
        type,
        collections = this.dataStore.getCollections(),
        joinAlias,
        tableReference,
        relatedResource,
        tableByTableReference;

    if (entityUtil.isDerivedTable(item.type)) {
      type = schemaEntitiesEnum.TABLE_REFERENCE;
      relatedResource = collections.tableReferences.findWhere({
        tableId: id
      });
      joinAlias = collections.joinAliases.findWhere({
        tableReferenceId: relatedResource.id
      });

      if (joinAlias) {
        relatedResource = joinAlias;
        type = schemaEntitiesEnum.JOIN_ALIAS;
      }
    } else if (entityUtil.isTableReference(item.type)) {
      tableReference = collections.tableReferences.byId(id);
      tableByTableReference = collections.tables.byId(tableReference.tableId);

      if (entityUtil.isDerivedTable(tableByTableReference)) {
        relatedResource = tableByTableReference;
      }

      type = schemaEntitiesEnum.DERIVED_TABLE;
    } else if (entityUtil.isJoinAlias(item.type)) {
      joinAlias = collections.joinAliases.byId(id);
      tableReference = collections.tableReferences.byId(joinAlias.tableReferenceId);
      tableByTableReference = collections.tables.byId(tableReference.tableId);

      if (entityUtil.isDerivedTable(tableByTableReference)) {
        relatedResource = tableByTableReference;
      }

      type = schemaEntitiesEnum.DERIVED_TABLE;
    }

    if (relatedResource) {
      return {
        resourceId: relatedResource.id,
        type: type
      };
    }
  },
  _addNodeToExpandedNodes: function _addNodeToExpandedNodes(item) {
    var expandedNodes = this.viewStateModel.getSidebarExpandedNodes();
    expandedNodes[item.resourceId] = {
      type: item.type
    };
    this.viewStateModel.setSidebarExpandedNodes(expandedNodes);
  },
  _removeNodeFromExpandedNodes: function _removeNodeFromExpandedNodes(id) {
    var expandedNodes = this.viewStateModel.getSidebarExpandedNodes();
    delete expandedNodes[id];
    this.viewStateModel.setSidebarExpandedNodes(expandedNodes);
  },
  _addNodeToCollapsedNodes: function _addNodeToCollapsedNodes(item) {
    var collapsedNodes = this.viewStateModel.getSidebarCollapsedNodes();
    collapsedNodes[item.resourceId] = {
      type: item.type
    };
    this.viewStateModel.setSidebarCollapsedNodes(collapsedNodes);
  },
  _removeNodeFromCollapsedNodes: function _removeNodeFromCollapsedNodes(id) {
    var collapsedNodes = this.viewStateModel.getSidebarCollapsedNodes();
    delete collapsedNodes[id];
    this.viewStateModel.setSidebarCollapsedNodes(collapsedNodes);
  },
  _getCurrentDesignerSearchKeyword: function _getCurrentDesignerSearchKeyword() {
    var currentDesigner = this.viewStateModel.getCurrentDesigner();
    return this.viewStateModel.getDesignerSpecificProperty(currentDesigner, 'searchKeyword');
  },
  _setDesignerSidebarSearchKeyword: function _setDesignerSidebarSearchKeyword(searchKeyword) {
    var currentDesigner = this.viewStateModel.getCurrentDesigner();
    var searchKeywordObj = this.viewStateModel.getDesignerSpecificProperty(currentDesigner, 'searchKeyword');
    searchKeywordObj.sidebar = searchKeyword;

    if (searchKeyword) {
      this.viewStateModel.setSidebarCollapsedNodes({});
    }

    this.viewStateModel.setDesignerSpecificProperty(currentDesigner, 'searchKeyword', searchKeywordObj);
  },
  _selectFirstDataSourceInMetadataSidebar: function _selectFirstDataSourceInMetadataSidebar() {
    var dataSources = this.dataStore.getCollection('dataSources'),
        selectedSidebarResource = this.designerViewStateMetadataDesignerFirstDataSourceSelectionProvider.getSidebarSelectedResource(dataSources);

    this._setMetadataDesignerCurrentSidebarResource(selectedSidebarResource);
  },
  _resetViewStateModel: function _resetViewStateModel() {
    this.viewStateModel.reset();

    this._setJoinTreesInitialViewState();

    this._setJoinsInitialViewState();

    this._setFiltersInitialViewState();

    this._selectFirstDataSourceInMetadataSidebar();
  },
  _hideCalculatedFieldsDesigner: function _hideCalculatedFieldsDesigner() {
    var visibility = viewStateModelDefaultsEnum.CALCULATED_FIELDS_DESIGNER.VISIBILITY;

    this._setCalculatedFieldsDesignerSpecificRuntimeProperty(visibility.property, visibility.value);

    this._setCalculatedFieldsDesignerSpecificRuntimeProperty('context', {});
  },
  _setAddMetadataResourcesError: function _setAddMetadataResourcesError(error) {
    this._setMetadataDesignerSpecificRuntimeProperty('addResourcesError', error);
  },
  _setMetadataDesignerCurrentSidebarResource: function _setMetadataDesignerCurrentSidebarResource(resource) {
    this._setMetadataDesignerSpecificProperty('selectedResource', resource);
  },
  _setMetadataDesignerTreesSelection: function _setMetadataDesignerTreesSelection(options) {
    var sourceTreeSelection = options.sourceTreeSelection,
        resultTreeSelection = options.resultTreeSelection;

    var selection = this._getMetadataDesignerSpecificProperty('selection'),
        selectedResource = this._getMetadataDesignerSpecificProperty('selectedResource');

    if (sourceTreeSelection) {
      selection.sourceTree[selectedResource.resourceId] = sourceTreeSelection;
    }

    if (resultTreeSelection) {
      selection.resultTree[selectedResource.resourceId] = resultTreeSelection;
    }

    this._setMetadataDesignerSpecificProperty('selection', selection);
  },
  _setCurrentResource: function _setCurrentResource(currentDesigner, resource) {
    this.viewStateModel.setCurrentResource(currentDesigner, resource);
  },
  _setJoinConstructorState: function _setJoinConstructorState(state) {
    this._setDraftStateByType(draftStateTypesEnum.JOIN_CONSTRUCTOR, state);
  },
  _setDraftJoinTreeState: function _setDraftJoinTreeState(state) {
    this._setDraftStateByType(draftStateTypesEnum.DRAFT_JOIN_TREE, state);
  },
  _addPresentationItems: function _addPresentationItems(options) {
    var selection = options.selection;

    if (selection) {
      selection = this._getPresentationCanvasSelectionAfterNewItemsWereAdded(selection);

      this._setPresentationDesignerSelection(selection);
    }
  },
  _setPresentationDesignerDataIslandNodeExpandedState: function _setPresentationDesignerDataIslandNodeExpandedState(dataIslandId, isExpanded) {
    var dataIslands = this._getPresentationDesignerSpecificProperty('dataIslands');

    dataIslands = this._setPresentationDesignerItemExpandedState({
      itemType: schemaEntitiesEnum.DATA_ISLAND,
      presentationItems: dataIslands,
      presentationItemId: dataIslandId,
      isNodeExpanded: isExpanded
    });

    this._setPresentationDesignerSpecificProperty('dataIslands', dataIslands);
  },
  _setPresentationDesignerPresentationSetNodeExpandedState: function _setPresentationDesignerPresentationSetNodeExpandedState(presentationSetId, isExpanded) {
    var presentationSets = this._getPresentationDesignerSpecificProperty('presentationSets');

    presentationSets = this._setPresentationDesignerItemExpandedState({
      itemType: schemaEntitiesEnum.PRESENTATION_SET,
      presentationItems: presentationSets,
      presentationItemId: presentationSetId,
      isNodeExpanded: isExpanded
    });

    this._setPresentationDesignerSpecificProperty('presentationSets', presentationSets);
  },
  _setPresentationDesignerSelection: function _setPresentationDesignerSelection(selection) {
    this._setPresentationDesignerSpecificProperty('selection', selection);
  },
  _updatePresentationDataIslandsSelectionIndexes: function _updatePresentationDataIslandsSelectionIndexes() {
    var newSelection,
        selection = this._getPresentationDesignerSpecificProperty('selection');

    if (!selection.parentId) {
      newSelection = this._getPresentationDataIslandsSelectionWithUpdatedParentAndIndexes();

      this._setPresentationDesignerSpecificProperty('selection', newSelection);
    }
  },
  _updatePresentationSetsAndItemsSelectionIndexesAndParentId: function _updatePresentationSetsAndItemsSelectionIndexesAndParentId(options) {
    options = options || {};

    var selection = this._getPresentationDesignerSpecificProperty('selection'),
        newSelection;

    if (selection.parentId) {
      newSelection = this._getPresentationSetsAndFieldsSelectionWithUpdatedParentAndIndexes(options);

      this._setPresentationDesignerSpecificProperty('selection', newSelection);
    }
  },
  _getPresentationDataIslandsSelectionWithUpdatedParentAndIndexes: function _getPresentationDataIslandsSelectionWithUpdatedParentAndIndexes() {
    var dataIslands = this.dataStore.getCollection('dataIslands'),
        selection = this._getPresentationDesignerSpecificProperty('selection');

    return this._getPresentationItemsSelectionWithUpdatedIndexesAndParent({
      selection: selection,
      collection: dataIslands
    });
  },
  _getPresentationSetsAndFieldsSelectionWithUpdatedParentAndIndexes: function _getPresentationSetsAndFieldsSelectionWithUpdatedParentAndIndexes(options) {
    var selection = this._getPresentationDesignerSpecificProperty('selection'),
        targetParentId = options.parentId || selection.parentId,
        collections = this.dataStore.getCollections(),
        targetParent = clientSchemaModelUtil.getDataIslandOrPresentationSetById(targetParentId, collections);

    return this._getPresentationItemsSelectionWithUpdatedIndexesAndParent({
      parentId: targetParentId,
      selection: selection,
      collection: targetParent.getChildren()
    });
  },
  _getPresentationItemsSelectionWithUpdatedIndexesAndParent: function _getPresentationItemsSelectionWithUpdatedIndexesAndParent(options) {
    var newSelection = {
      parentId: null
    },
        selection = options.selection,
        collection = options.collection,
        parentId = options.parentId || selection.parentId,
        isRangeSelectionStartItemExists = _.find(selection.items, function (item) {
      return item.rangeSelectionStartItem;
    });

    var items = _.reduce(selection.items, function (memo, item) {
      var newIndex = clientSchemaModelUtil.getResourceIndexInCollectionById(item.id, collection);

      if (!_.isUndefined(newIndex)) {
        item.index = newIndex;
        item.parentId = parentId;

        if (!isRangeSelectionStartItemExists && newIndex === 0) {
          item.rangeSelectionStartItem = true;
        }

        memo[item.id] = item;
      }

      return memo;
    }, {}, this);

    newSelection.items = items;

    if (!_.isEmpty(items)) {
      newSelection.parentId = parentId;
    }

    return newSelection;
  },
  _getPresentationCanvasSelectionAfterNewItemsWereAdded: function _getPresentationCanvasSelectionAfterNewItemsWereAdded(selection) {
    var parentId = selection.parentId,
        collection = this._getCollectionForNewPresentationCanvasSelectionGeneration(parentId);

    var itemsQuantity = selection.itemsQuantity,
        positionOffset = this._getPositionOffsetForNewPresentationCanvasSelection(selection, collection);

    var items = _.reduce(new Array(itemsQuantity), function (memo, value, index) {
      var childIndex = index + positionOffset,
          child = collection[childIndex];
      var item = {
        dataIslandId: child.dataIslandId,
        id: child.id,
        index: childIndex,
        parentId: parentId,
        type: entityUtil.getEntityName(child)
      };

      if (index === 0) {
        item.rangeSelectionStartItem = true;
      }

      memo[item.id] = item;
      return memo;
    }, {});

    return {
      items: items,
      parentId: parentId
    };
  },
  _getPositionOffsetForNewPresentationCanvasSelection: function _getPositionOffsetForNewPresentationCanvasSelection(selection, collection) {
    return _.isUndefined(selection.positionOffset) ? collection.length - selection.itemsQuantity : selection.positionOffset;
  },
  _getCollectionForNewPresentationCanvasSelectionGeneration: function _getCollectionForNewPresentationCanvasSelectionGeneration(parentId) {
    var parent, children;

    if (parentId) {
      parent = clientSchemaModelUtil.getDataIslandOrPresentationSetById(parentId, this.dataStore.getCollections());
      children = parent.getChildren().toArray();
    } else {
      children = this.dataStore.getCollection('dataIslands').toArray();
    }

    return children;
  },
  _setJoinsDesignerCurrentSidebarResource: function _setJoinsDesignerCurrentSidebarResource(resource) {
    this._setCurrentResource(canvasViewDesignersEnum.JOINS_DESIGNER, resource);
  },
  _setFiltersInitialViewState: function _setFiltersInitialViewState() {
    var filters = this.dataStore.getCollection('filters'),
        filtersPositions = this.designerViewStateFiltersPositionsProvider.getFiltersPositionsByFilters(filters);

    this._setFiltersDesignerSpecificProperty('filtersPositions', filtersPositions);
  },
  _clearAddResourcesError: function _clearAddResourcesError() {
    this._setMetadataDesignerSpecificRuntimeProperty('addResourcesError', {
      popoverMessage: '',
      highlightInvalidResources: false
    });
  },
  _createJoinExpression: function _createJoinExpression(joinExpression) {
    var leftTableReferenceId = joinExpression.leftTableReferenceId,
        rightTableReferenceId = joinExpression.rightTableReferenceId;

    this._removeNodeFromExpandedNodes(leftTableReferenceId);

    this._removeNodeFromExpandedNodes(rightTableReferenceId);

    var leftItem = this._getToggledNodeRelatedItem({
      resourceId: leftTableReferenceId,
      type: schemaEntitiesEnum.TABLE_REFERENCE
    }),
        rightItem = this._getToggledNodeRelatedItem({
      resourceId: rightTableReferenceId,
      type: schemaEntitiesEnum.TABLE_REFERENCE
    });

    if (leftItem) {
      this._removeNodeFromExpandedNodes(leftItem.resourceId);
    }

    if (rightItem) {
      this._removeNodeFromExpandedNodes(rightItem.resourceId);
    }

    this._setCurrentResource(canvasViewDesignersEnum.JOINS_DESIGNER, currentSidebarResourceUtil.getJoinsDesignerCurrentSidebarResource());

    this._setJoinConstructorState({});

    this._addJoin();
  },
  _addJoin: function _addJoin() {
    var joins = this._getJoinsDesignerSpecificProperty('joins'),
        joinsCollections = this.dataStore.getCollection('joins'),
        joinExpressions = this.dataStore.getCollection('joinExpressions');

    var lastAddedJoinExpression = joinExpressions.last(),
        joinId = lastAddedJoinExpression.getJoinId();
    var join = joinsCollections.byId(joinId);

    if (!joins[joinId]) {
      joins[joinId] = {
        isExpanded: true,
        originalWeight: join.getWeight()
      };
    }

    this._setJoinsDesignerSpecificProperty('joins', joins);
  },
  _setDataSource: function _setDataSource(name, type) {
    this.viewStateModel.setDataSource(name, {
      type: type
    });
  },
  _setMetadataDesignerSpecificProperty: function _setMetadataDesignerSpecificProperty(propertyName, value) {
    this.viewStateModel.setDesignerSpecificProperty(canvasViewDesignersEnum.METADATA_DESIGNER, propertyName, value);
  },
  _getMetadataDesignerSpecificProperty: function _getMetadataDesignerSpecificProperty(propertyName) {
    return this.viewStateModel.getDesignerSpecificProperty(canvasViewDesignersEnum.METADATA_DESIGNER, propertyName);
  },
  _setJoinsDesignerSpecificProperty: function _setJoinsDesignerSpecificProperty(propertyName, value) {
    this.viewStateModel.setDesignerSpecificProperty(canvasViewDesignersEnum.JOINS_DESIGNER, propertyName, value);
  },
  _getJoinsDesignerSpecificProperty: function _getJoinsDesignerSpecificProperty(propertyName) {
    return this.viewStateModel.getDesignerSpecificProperty(canvasViewDesignersEnum.JOINS_DESIGNER, propertyName);
  },
  _getJoinsDesignerSpecificRuntimeProperty: function _getJoinsDesignerSpecificRuntimeProperty(propertyName) {
    return this.viewStateModel.getDesignerSpecificRuntimeProperty(canvasViewDesignersEnum.JOINS_DESIGNER, propertyName);
  },
  _setFiltersDesignerSpecificProperty: function _setFiltersDesignerSpecificProperty(propertyName, value) {
    this.viewStateModel.setDesignerSpecificProperty(canvasViewDesignersEnum.FILTERS_DESIGNER, propertyName, value);
  },
  _getFiltersDesignerSpecificProperty: function _getFiltersDesignerSpecificProperty(propertyName) {
    return this.viewStateModel.getDesignerSpecificProperty(canvasViewDesignersEnum.FILTERS_DESIGNER, propertyName);
  },
  _setPresentationDesignerSpecificProperty: function _setPresentationDesignerSpecificProperty(propertyName, value) {
    this.viewStateModel.setDesignerSpecificProperty(canvasViewDesignersEnum.PRESENTATION_DESIGNER, propertyName, value);
  },
  _getPresentationDesignerSpecificProperty: function _getPresentationDesignerSpecificProperty(propertyName) {
    return this.viewStateModel.getDesignerSpecificProperty(canvasViewDesignersEnum.PRESENTATION_DESIGNER, propertyName);
  },
  _setPresentationDesignerAllItemsExpandedState: function _setPresentationDesignerAllItemsExpandedState() {
    this._setPresentationDesignerItemsExpandedState(schemaEntitiesEnum.DATA_ISLAND);

    this._setPresentationDesignerItemsExpandedState(schemaEntitiesEnum.PRESENTATION_SET);

    this._setPresentationDesignerItemsExpandedState(schemaEntitiesEnum.PRESENTATION_FIELD);
  },
  _getPresentationDesignerItemInfo: function _getPresentationDesignerItemInfo(itemType) {
    var defaultItemValue = viewStateModelDefaultsEnum.EMPTY_OBJECT,
        listName;

    if (itemType === schemaEntitiesEnum.DATA_ISLAND) {
      listName = 'dataIslands';
      defaultItemValue = viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.DATA_ISLAND.value;
    } else if (itemType === schemaEntitiesEnum.PRESENTATION_SET) {
      listName = 'presentationSets';
      defaultItemValue = viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PRESENTATION_SET.value;
    } else if (itemType === schemaEntitiesEnum.PRESENTATION_FIELD) {
      listName = 'presentationFields';
      defaultItemValue = viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PRESENTATION_FIELD.value;
    }

    return {
      listName: listName,
      defaultItemValue: defaultItemValue
    };
  },
  _setPresentationDesignerItemsExpandedState: function _setPresentationDesignerItemsExpandedState(itemType) {
    var itemInfo = this._getPresentationDesignerItemInfo(itemType),
        items = this._getPresentationDesignerSpecificProperty(itemInfo.listName),
        isNodeExpanded = this._getDefaultPresentationDesignerNodeExpandedState(),
        isEditorExpanded = this._getDefaultPresentationDesignerEditorExpandedState();

    _.each(_.keys(items), function (itemId) {
      items = this._setPresentationDesignerItemExpandedState({
        itemType: itemType,
        presentationItems: items,
        presentationItemId: itemId,
        isNodeExpanded: isNodeExpanded,
        isEditorExpanded: isEditorExpanded
      });
    }, this);

    this._setPresentationDesignerSpecificProperty(itemInfo.listName, items);
  },
  _setPresentationDesignerItemExpandedState: function _setPresentationDesignerItemExpandedState(options) {
    var presentationItems = options.presentationItems,
        presentationItemId = options.presentationItemId,
        itemType = options.itemType;
    var presentationItem = presentationItems[presentationItemId] || {};

    if (!_.isUndefined(options.isNodeExpanded)) {
      this._setPresentationDesignerItemNodeExpandedState(presentationItem, options.isNodeExpanded);
    }

    if (!_.isUndefined(options.isEditorExpanded)) {
      this._setPresentationDesignerItemEditorExpandedState(presentationItem, options.isEditorExpanded);
    }

    defaultValueUtil.setPropertyValueOrDefault(presentationItems, presentationItemId, presentationItem, this._getPresentationDesignerItemInfo(itemType).defaultItemValue);
    return presentationItems;
  },
  _setPresentationDesignerItemNodeExpandedState: function _setPresentationDesignerItemNodeExpandedState(presentationItem, isNodeExpanded) {
    defaultValueUtil.setPropertyValueOrDefault(presentationItem, viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.NODE_EXPANSION.property, isNodeExpanded, this._getDefaultPresentationDesignerNodeExpandedState());
  },
  _setPresentationDesignerItemEditorExpandedState: function _setPresentationDesignerItemEditorExpandedState(presentationItem, isEditorExpanded) {
    defaultValueUtil.setPropertyValueOrDefault(presentationItem, viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PROPERTY_EDITOR_EXPANSION.property, isEditorExpanded, this._getDefaultPresentationDesignerEditorExpandedState());
  },
  _getDefaultPresentationDesignerNodeExpandedState: function _getDefaultPresentationDesignerNodeExpandedState() {
    return this._getPresentationDesignerSpecificProperty('defaultPresentationItemsNodeExpandedState');
  },
  _getDefaultPresentationDesignerEditorExpandedState: function _getDefaultPresentationDesignerEditorExpandedState() {
    return this._getPresentationDesignerSpecificProperty('defaultPresentationItemsEditorExpandedState');
  },
  _setMetadataDesignerSpecificRuntimeProperty: function _setMetadataDesignerSpecificRuntimeProperty(propertyName, value) {
    this.viewStateModel.setDesignerSpecificRuntimeProperty(canvasViewDesignersEnum.METADATA_DESIGNER, propertyName, value);
  },
  _setCalculatedFieldsDesignerSpecificRuntimeProperty: function _setCalculatedFieldsDesignerSpecificRuntimeProperty(propertyName, value) {
    this.viewStateModel.setDesignerSpecificRuntimeProperty(canvasViewDesignersEnum.CALCULATED_FIELDS_DESIGNER, propertyName, value);
  },
  _getCalculatedFieldsDesignerSpecificRuntimeProperty: function _getCalculatedFieldsDesignerSpecificRuntimeProperty(propertyName) {
    return this.viewStateModel.getDesignerSpecificRuntimeProperty(canvasViewDesignersEnum.CALCULATED_FIELDS_DESIGNER, propertyName);
  },
  _setFiltersDesignerSpecificRuntimeProperty: function _setFiltersDesignerSpecificRuntimeProperty(propertyName, value) {
    this.viewStateModel.setDesignerSpecificRuntimeProperty(canvasViewDesignersEnum.FILTERS_DESIGNER, propertyName, value);
  },
  _getFiltersDesignerSpecificRuntimeProperty: function _getFiltersDesignerSpecificRuntimeProperty(propertyName) {
    return this.viewStateModel.getDesignerSpecificRuntimeProperty(canvasViewDesignersEnum.FILTERS_DESIGNER, propertyName);
  },
  _setJoinTreesInitialViewState: function _setJoinTreesInitialViewState() {
    var joinTrees = this.dataStore.getCollection('joinTrees'),
        joinTreesState = this.designerViewStateJoinTreesStateProvider.getJoinTreesViewState(joinTrees);

    this._setJoinsDesignerSpecificProperty('joinTrees', joinTreesState);
  },
  _setJoinsInitialViewState: function _setJoinsInitialViewState() {
    var joinTrees = this.dataStore.getCollection('joinTrees'),
        joinsState = this.designerViewStateJoinsStateProvider.getJoinsViewStateByJoinTrees(joinTrees);

    this._setJoinsDesignerSpecificProperty('joins', joinsState);
  },
  // clean up
  _cleanupViewState: function _cleanupViewState() {
    this._cleanUpSidebarExpandedNodes();

    this._cleanupMetadataDesignerViewState();

    this._cleanupJoinsDesignerViewState();

    this._cleanupFiltersDesignerViewState();

    this._cleanupPresentationDesignerViewState();
  },
  _cleanupMetadataDesignerViewState: function _cleanupMetadataDesignerViewState() {
    this._cleanupMetadataDesignerCurrentSidebarResource();

    this._cleanupMetadataDesignerSourceTreeSelection();

    this._cleanupMetadataDesignerResultTreeSelection();
  },
  _cleanupJoinsDesignerViewState: function _cleanupJoinsDesignerViewState() {
    this._cleanupJoinsDesignerCurrentSidebarResource();

    this._cleanupJoinsDesignerDraftJoinTreeViewState();

    this._cleanupJoinsDesignerJoinConstructorViewState();

    this._cleanupJoinsDesignerJoinsViewState();

    this._cleanupJoinsDesignerJoinTreesViewState();
  },
  _cleanupViewStateFromJoinsDesigner: function _cleanupViewStateFromJoinsDesigner() {
    this._cleanUpSidebarExpandedNodes();

    this._cleanupJoinsDesignerViewState();

    this._cleanupFiltersDesignerViewState();

    this._cleanupPresentationDesignerViewState();
  },
  _cleanupFiltersDesignerViewState: function _cleanupFiltersDesignerViewState() {
    this._cleanupFiltersDesignerCurrentSidebarResource();
  },
  _cleanupPresentationDesignerViewState: function _cleanupPresentationDesignerViewState() {
    this._cleanupPresentationItemsSidebarSelection();

    this._cleanupPresentationItemsSelection();

    this._cleanupPresentationDesignerDataIslandsViewProperties();

    this._cleanupPresentationDesignerSetsViewProperties();

    this._cleanupPresentationDesignerFieldsViewProperties();

    this._updatePresentationDataIslandsSelectionIndexes();

    this._updatePresentationSetsAndItemsSelectionIndexesAndParentId();
  },
  _cleanupViewStateFromPresentationDesigner: function _cleanupViewStateFromPresentationDesigner() {
    this._cleanUpSidebarExpandedNodes();

    this._cleanupPresentationDesignerViewState();
  },
  _cleanUpSidebarExpandedNodes: function _cleanUpSidebarExpandedNodes() {
    var expandedNodes = this.viewStateModel.getSidebarExpandedNodes();

    var removeExpandedNodeIds = this._getRemovedExpandedNodeIds(expandedNodes);

    this.viewStateModel.setSidebarExpandedNodes(_.omit(expandedNodes, removeExpandedNodeIds));
  },
  _cleanupMetadataDesignerSourceTreeSelection: function _cleanupMetadataDesignerSourceTreeSelection() {
    var selection = this._getMetadataDesignerSpecificProperty('selection');

    var newSelection = this._getMetadataDesignerCanvasSelection(selection.sourceTree);

    selection = _.extend({}, selection, {
      sourceTree: newSelection
    });

    this._setMetadataDesignerSpecificProperty('selection', selection);
  },
  _cleanupMetadataDesignerResultTreeSelection: function _cleanupMetadataDesignerResultTreeSelection() {
    var selection = this._getMetadataDesignerSpecificProperty('selection');

    var newSelection = this._getMetadataDesignerCanvasSelection(selection.resultTree);

    selection = _.extend({}, selection, {
      resultTree: newSelection
    });

    this._setMetadataDesignerSpecificProperty('selection', selection);
  },
  _cleanupMetadataDesignerCurrentSidebarResource: function _cleanupMetadataDesignerCurrentSidebarResource() {
    var resource = currentSidebarResourceUtil.getMetadataDesignerCurrentSidebarResource({
      currentSidebarResource: this._getMetadataDesignerSpecificProperty('selectedResource'),
      collections: this.dataStore.getCollections()
    });

    this._setCurrentResource(canvasViewDesignersEnum.METADATA_DESIGNER, resource);
  },
  _cleanupJoinsDesignerCurrentSidebarResource: function _cleanupJoinsDesignerCurrentSidebarResource() {
    var resource = currentSidebarResourceUtil.getJoinsDesignerCurrentSidebarResource({
      currentSidebarResource: this._getJoinsDesignerSpecificProperty('selectedResource'),
      collections: this.dataStore.getCollections()
    });

    this._setJoinsDesignerCurrentSidebarResource(resource);
  },
  _cleanupJoinsDesignerDraftJoinTreeViewState: function _cleanupJoinsDesignerDraftJoinTreeViewState() {
    var tableReferences = this.dataStore.getCollection('tableReferences'),
        draftState = this.viewStateModel.getDraftState(),
        draftJoinTree = draftState[draftStateTypesEnum.DRAFT_JOIN_TREE],
        tableReferenceId;

    if (!_.isEmpty(draftJoinTree)) {
      tableReferenceId = draftJoinTree.joinConstructor.leftSide.tableReferenceId;
    }

    if (tableReferenceId && !tableReferences.byId(tableReferenceId)) {
      this._setDraftStateByType(draftStateTypesEnum.DRAFT_JOIN_TREE, {});
    }
  },
  _cleanupJoinsDesignerJoinConstructorViewState: function _cleanupJoinsDesignerJoinConstructorViewState() {
    var tableReferences = this.dataStore.getCollection('tableReferences'),
        draftState = this.viewStateModel.getDraftState(),
        joinConstructor = draftState[draftStateTypesEnum.JOIN_CONSTRUCTOR],
        tableReferenceId;

    if (!_.isEmpty(joinConstructor)) {
      tableReferenceId = joinConstructor.leftSide.tableReferenceId;
    }

    if (tableReferenceId && !tableReferences.byId(tableReferenceId)) {
      this._setDraftStateByType(draftStateTypesEnum.JOIN_CONSTRUCTOR, {});
    }
  },
  _cleanupJoinsDesignerJoinsViewState: function _cleanupJoinsDesignerJoinsViewState() {
    var joins = this._getJoinsDesignerSpecificProperty('joins'),
        removedJoins = this._getRemovedResourcesIdsByCollection({
      collection: this.dataStore.getCollection('joins'),
      ids: _.keys(joins)
    });

    this._setJoinsDesignerSpecificProperty('joins', _.omit(joins, removedJoins));
  },
  _cleanupJoinsDesignerJoinTreesViewState: function _cleanupJoinsDesignerJoinTreesViewState() {
    var joinTrees = this._getJoinsDesignerSpecificProperty('joinTrees'),
        removedJoinTrees = this._getRemovedResourcesIdsByCollection({
      collection: this.dataStore.getCollection('joinTrees'),
      ids: _.keys(joinTrees)
    });

    this._setJoinsDesignerSpecificProperty('joinTrees', _.omit(joinTrees, removedJoinTrees));
  },
  _cleanupFiltersDesignerCurrentSidebarResource: function _cleanupFiltersDesignerCurrentSidebarResource() {
    var resource = currentSidebarResourceUtil.getFiltersDesignerCurrentSidebarResource({
      currentSidebarResource: this._getFiltersDesignerSpecificProperty('selectedResource'),
      collections: this.dataStore.getCollections()
    });

    this._setCurrentResource(canvasViewDesignersEnum.FILTERS_DESIGNER, resource);
  },
  _cleanupPresentationDesignerDataIslandsViewProperties: function _cleanupPresentationDesignerDataIslandsViewProperties() {
    var dataIslands = this._getPresentationDesignerSpecificProperty('dataIslands'),
        removedDataIslands = this._getRemovedResourcesIdsByCollection({
      collection: this.dataStore.getCollection('dataIslands'),
      ids: _.keys(dataIslands)
    });

    this._setPresentationDesignerSpecificProperty('dataIslands', _.omit(dataIslands, removedDataIslands));
  },
  _cleanupPresentationDesignerSetsViewProperties: function _cleanupPresentationDesignerSetsViewProperties() {
    var presentationSets = this._getPresentationDesignerSpecificProperty('presentationSets'),
        removedPresentationSets = this._getRemovedResourcesIdsByCollection({
      collection: this.dataStore.getCollection('presentationSets'),
      ids: _.keys(presentationSets)
    });

    this._setPresentationDesignerSpecificProperty('presentationSets', _.omit(presentationSets, removedPresentationSets));
  },
  _cleanupPresentationDesignerFieldsViewProperties: function _cleanupPresentationDesignerFieldsViewProperties() {
    var presentationFields = this._getPresentationDesignerSpecificProperty('presentationFields'),
        removedPresentationFields = this._getRemovedResourcesIdsByCollection({
      collection: this.dataStore.getCollection('presentationFields'),
      ids: _.keys(presentationFields)
    });

    this._setPresentationDesignerSpecificProperty('presentationFields', _.omit(presentationFields, removedPresentationFields));
  },
  _cleanupPresentationItemsSelection: function _cleanupPresentationItemsSelection() {
    var selection = presentationItemsSelectionUtil.getPresentationItemsSelection({
      currentSelection: this._getPresentationDesignerSpecificProperty('selection'),
      collections: this.dataStore.getCollections()
    });

    this._setPresentationDesignerSelection(selection);
  },
  _cleanupPresentationItemsSidebarSelection: function _cleanupPresentationItemsSidebarSelection() {
    var selection = currentSidebarResourceUtil.getPresentationItemsSidebarSelection({
      currentSelection: this._getPresentationDesignerSpecificProperty('sidebarSelection'),
      collections: this.dataStore.getCollections()
    });

    this._setPresentationDesignerSpecificProperty('sidebarSelection', selection);
  },
  // util
  _getMetadataDesignerCanvasSelection: function _getMetadataDesignerCanvasSelection(currentSelection) {
    var collections = this.dataStore.getCollections(),
        dataSources = collections.dataSources,
        dataSourceGroups = collections.dataSourceGroups;
    return _.reduce(currentSelection, function (memo, value, id) {
      if (dataSources.byId(id) || dataSourceGroups.byId(id)) {
        memo[id] = value;
      }

      return memo;
    }, {});
  },
  _getRemovedExpandedNodeIds: function _getRemovedExpandedNodeIds(expandedNodes) {
    var resources = _.map(expandedNodes, function (resource, id) {
      var parsedId = parseInt(id, 10);
      return {
        id: _.isNaN(parsedId) ? id : parsedId,
        type: resource.type
      };
    });

    return this._getRemovedResourcesByIdsAndType(resources).map(function (id) {
      return String(id);
    });
  },
  _getRemovedResourcesByIdsAndType: function _getRemovedResourcesByIdsAndType(resources) {
    var collections = this.dataStore.getCollections();
    return _.reduce(resources, function (memo, resource) {
      var isResourceExists = clientSchemaModelUtil.checkIfResourceExistsInSchemaByIdAndType(resource.id, resource.type, collections);

      if (!isResourceExists) {
        memo.push(resource.id);
      }

      return memo;
    }, []);
  },
  _getRemovedResourcesIdsByCollection: function _getRemovedResourcesIdsByCollection(options) {
    var collection = options.collection.reduce(function (memo, entity) {
      memo[entity.id] = true;
      return memo;
    }, {}),
        ids = options.ids;
    return _.reduce(ids, function (memo, id) {
      if (!collection[id]) {
        memo.push(id);
      }

      return memo;
    }, []);
  }
});

module.exports = ViewStateModelService;

});