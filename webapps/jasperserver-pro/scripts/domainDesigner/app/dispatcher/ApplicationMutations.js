define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../model/enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ApplicationMutations = function ApplicationMutations(options) {
  this.initialize(options);
};

_.extend(ApplicationMutations.prototype, {
  initialize: function initialize(options) {
    this.viewStateModelService = options.viewStateModelService;
    this.domainSchemaService = options.domainSchemaService;
    this.resourcePropertiesService = options.resourcePropertiesService;
  },
  // Common Actions
  setDesignerState: function setDesignerState(options) {
    this.domainSchemaService.reset(options.schema);
    this.resourcePropertiesService.reset(options.resourceProperties);
    this.viewStateModelService.setState(options.viewState);
  },
  replaceDataSource: function replaceDataSource(options) {
    this.domainSchemaService.replaceDataSource({
      name: options.dataSource.name,
      schemaPairs: options.schemaPairs,
      orphanResources: options.orphanResources
    });
    this.resourcePropertiesService.replaceDataSource(options.dataSource);
    this.viewStateModelService.replaceDataSource(options.dataSource);
  },
  //this method should not be captured by history aspect
  setDesignerStateAvoidingHistory: function setDesignerStateAvoidingHistory(options) {
    this.domainSchemaService.reset(options.schema);
    this.resourcePropertiesService.reset(options.resourceProperties);
    this.viewStateModelService.setState(options.viewState);
  },
  save: function save(options) {
    this.resourcePropertiesService.save(options.resourceProperties);
    this.domainSchemaService.reset(options.schema);
    this.viewStateModelService.setState(options.viewState);
  },
  showClearAllDataDialog: function showClearAllDataDialog() {
    this.viewStateModelService.showClearAllDataDialog();
  },
  closeEmptyDataIslandAlertDialog: function closeEmptyDataIslandAlertDialog() {
    this.viewStateModelService.closeEmptyDataIslandAlertDialog();
  },
  setCurrentDesigner: function setCurrentDesigner(designer) {
    this.viewStateModelService.setCurrentDesigner(designer);
  },
  clearDraftState: function clearDraftState(draftStateTypes) {
    this.viewStateModelService.clearDraftState(draftStateTypes);
  },
  expandSidebarNode: function expandSidebarNode(item) {
    this.viewStateModelService.expandSidebarNode(item);
  },
  collapseSidebarNode: function collapseSidebarNode(id) {
    this.viewStateModelService.collapseSidebarNode(id);
  },
  // Metadata Designer Actions
  setMetadataDesignerSourceTreeSelection: function setMetadataDesignerSourceTreeSelection(options) {
    this.viewStateModelService.setMetadataDesignerSourceTreeSelection(options.selection);
  },
  setMetadataDesignerResultTreeSelection: function setMetadataDesignerResultTreeSelection(options) {
    this.viewStateModelService.setMetadataDesignerResultTreeSelection(options.selection);
  },
  setMetadataDesignerSourceTreeSearchKeyword: function setMetadataDesignerSourceTreeSearchKeyword(searchKeyword) {
    this.viewStateModelService.setMetadataDesignerSourceTreeSearchKeyword(searchKeyword);
  },
  setMetadataDesignerResultTreeSearchKeyword: function setMetadataDesignerResultTreeSearchKeyword(searchKeyword) {
    this.viewStateModelService.setMetadataDesignerResultTreeSearchKeyword(searchKeyword);
  },
  setMetadataDesignerSidebarSearchKeyword: function setMetadataDesignerSidebarSearchKeyword(searchKeyword, nodesToExpand) {
    this.viewStateModelService.setMetadataDesignerSidebarSearchKeyword(searchKeyword, nodesToExpand);
  },
  addSchemaAttribute: function addSchemaAttribute(options) {
    var dataSourceGroup = options.dataSourceGroup,
        parentId = options.parentId;
    this.domainSchemaService.addDataSourceGroups(dataSourceGroup, parentId);
    this.viewStateModelService.addSchemaAttribute();
  },
  cancelSchemaAttribute: function cancelSchemaAttribute() {
    this.viewStateModelService.setMetadataDesignerResultTreeSelection([]);
  },
  updateSchemaAttribute: function updateSchemaAttribute(dataSourceGroup) {
    this.domainSchemaService.updateDataSourceGroup(dataSourceGroup);
    this.viewStateModelService.setMetadataDesignerResultTreeSelection([]);
  },
  addDataSourceGroups: function addDataSourceGroups(options) {
    var dataSourceGroups = options.resources,
        parentId = options.parentId,
        selection = _.pick(options, ['sourceTreeSelection', 'resultTreeSelection']);

    this.domainSchemaService.addDataSourceGroups(dataSourceGroups, parentId);
    this.viewStateModelService.addDataSourceGroupsOrTables(selection, options.addResourcesError);
  },
  removeDataSourceGroups: function removeDataSourceGroups(options) {
    var dataSourceGroupIds = options.ids,
        parentId = options.parentId,
        selection = _.pick(options, ['sourceTreeSelection', 'resultTreeSelection']);

    this.domainSchemaService.removeDataSourceGroups(dataSourceGroupIds, parentId);
    this.viewStateModelService.removeDataSourceGroups(selection);
  },
  removeSchemasAndDefaultSchemaChildren: function removeSchemasAndDefaultSchemaChildren(options) {
    this.domainSchemaService.removeDataSourceGroupsAndDefaultSchemaChildren({
      defaultSchemaId: options.defaultSchemaId,
      dataSourceGroupIds: options.dataSourceGroupIds,
      dataSourceGroupsParentId: options.dataSourceGroupsParentId
    });
    this.viewStateModelService.removeDataSourceGroups({
      sourceTreeSelection: options.sourceTreeSelection,
      resultTreeSelection: options.resultTreeSelection
    });
  },
  addTablesWithTableReferences: function addTablesWithTableReferences(options) {
    var tablesWithTableReferences = options.resources,
        parentId = options.parentId,
        selection = _.pick(options, ['sourceTreeSelection', 'resultTreeSelection']);

    this.domainSchemaService.addTablesWithTableReferences(tablesWithTableReferences, parentId);
    this.viewStateModelService.addDataSourceGroupsOrTables(selection, options.addResourcesError);
  },
  removeTables: function removeTables(options) {
    var tableIds = options.ids,
        parentId = options.parentId,
        selection = _.pick(options, ['sourceTreeSelection', 'resultTreeSelection']);

    this.domainSchemaService.removeTables(tableIds, parentId);
    this.viewStateModelService.removeTables(selection);
  },
  setAddMetadataResourcesError: function setAddMetadataResourcesError(error) {
    this.viewStateModelService.setAddMetadataResourcesError(error);
  },
  setMetadataDesignerCurrentResource: function setMetadataDesignerCurrentResource(options) {
    this.viewStateModelService.setCurrentResource(canvasViewDesignersEnum.METADATA_DESIGNER, options.resource);
  },
  // Joins Designer
  setJoinsDesignerCurrentResource: function setJoinsDesignerCurrentResource(options) {
    this.viewStateModelService.setJoinsDesignerCurrentResource(options);
  },
  setJoinsDesignerSidebarSearchKeyword: function setJoinsDesignerSidebarSearchKeyword(searchKeyword, nodesToExpand) {
    this.viewStateModelService.setJoinsDesignerSidebarSearchKeyword(searchKeyword, nodesToExpand);
  },
  setJoinsDesignerSearchKeyword: function setJoinsDesignerSearchKeyword(searchKeyword) {
    this.viewStateModelService.setJoinsDesignerSearchKeyword(searchKeyword);
  },
  removeJoinTree: function removeJoinTree(id) {
    this.domainSchemaService.removeJoinTree(id);
    this.viewStateModelService.removeJoinTree(id);
  },
  updateJoinTree: function updateJoinTree(options) {
    var joinTreeId = options.joinTreeId,
        joinTreeJson = options.joinTreeJson;
    this.domainSchemaService.updateJoinTree(joinTreeId, joinTreeJson);
  },
  updateJoinExpression: function updateJoinExpression(params) {
    var joinExpressionId = params.joinExpressionId,
        options = params.options;
    this.domainSchemaService.updateJoinExpression(joinExpressionId, options);
  },
  updateJoin: function updateJoin(params) {
    var joinId = params.joinId,
        options = params.options;
    this.domainSchemaService.updateJoin(joinId, options);
  },
  createJoinExpression: function createJoinExpression(joinExpression) {
    this.domainSchemaService.createJoinExpression(joinExpression);
    this.viewStateModelService.createJoinExpression(joinExpression);
  },
  createJoinTreeWithJoinExpression: function createJoinTreeWithJoinExpression(joinTreeWithJoinExpression) {
    this.domainSchemaService.createJoinTreeWithJoinExpression(joinTreeWithJoinExpression);
    this.viewStateModelService.createJoinTreeWithJoinExpression(joinTreeWithJoinExpression);
  },
  reorderJoinTree: function reorderJoinTree(joinTreeId, index) {
    this.domainSchemaService.reorderJoinTree(joinTreeId, index);
  },
  setJoinsDesignerJoinConstructorState: function setJoinsDesignerJoinConstructorState(state) {
    this.viewStateModelService.setJoinConstructorState(state);
  },
  setJoinsDesignerDraftJoinTreeState: function setJoinsDesignerDraftJoinTreeState(state) {
    this.viewStateModelService.setDraftJoinTreeState(state);
  },
  updateDataIsland: function updateDataIsland(options) {
    var id = options.id,
        json = options.json;
    this.domainSchemaService.updateDataIsland(id, json);
  },
  toggleJoinTree: function toggleJoinTree(options) {
    var joinTreeId = options.joinTreeId,
        isExpanded = options.isExpanded;
    this.viewStateModelService.toggleJoinTree(joinTreeId, isExpanded);
  },
  updateJoinAlias: function updateJoinAlias(joinAliasId, joinAliasJSON) {
    this.domainSchemaService.updateJoinAlias(joinAliasId, joinAliasJSON);
  },
  removeJoinAlias: function removeJoinAlias(joinAliasId) {
    this.domainSchemaService.removeJoinAlias(joinAliasId);
    this.viewStateModelService.removeJoinAlias();
  },
  removeJoin: function removeJoin(options) {
    var joinId = options.id;
    this.domainSchemaService.removeJoin(joinId);
    this.viewStateModelService.removeJoin(joinId);
  },
  toggleJoin: function toggleJoin(options) {
    this.viewStateModelService.toggleJoin(options);
  },
  removeJoinExpression: function removeJoinExpression(options) {
    this.domainSchemaService.removeJoinExpression(options);
    this.viewStateModelService.removeJoinExpression();
  },
  removeConstantJoinExpression: function removeConstantJoinExpression(options) {
    this.domainSchemaService.removeConstantJoinExpression(options.id);
  },
  createConstantJoinExpression: function createConstantJoinExpression(constantJoinExpression) {
    this.domainSchemaService.createConstantJoinExpression(constantJoinExpression, constantJoinExpression.joinId);
  },
  updateConstantJoinExpression: function updateConstantJoinExpression(constantJoinExpression) {
    this.domainSchemaService.updateConstantJoinExpression(constantJoinExpression);
  },
  copyTableReference: function copyTableReference(tableReferenceId) {
    this.domainSchemaService.copyTableReference(tableReferenceId);
  },
  copyDerivedTable: function copyDerivedTable(derivedTableId) {
    this.domainSchemaService.copyDerivedTable(derivedTableId);
  },
  removeTableReference: function removeTableReference(tableReferenceId) {
    this.domainSchemaService.removeTableReference(tableReferenceId);
    this.viewStateModelService.removeTableReference();
  },
  renameTableReference: function renameTableReference(options) {
    this.domainSchemaService.renameTableReference(options);
  },
  generateJoins: function generateJoins(info) {
    this.domainSchemaService.generateJoins(info);
    this.viewStateModelService.generateJoins();
  },
  // Presentation Designer
  setPresentationDesignerSidebarSearchKeyword: function setPresentationDesignerSidebarSearchKeyword(searchKeyword, nodesToExpand) {
    this.viewStateModelService.setPresentationDesignerSidebarSearchKeyword(searchKeyword, nodesToExpand);
  },
  setPresentationDesignerSearchKeyword: function setPresentationDesignerSearchKeyword(searchKeyword) {
    this.viewStateModelService.setPresentationDesignerSearchKeyword(searchKeyword);
  },
  setPresentationDesignerSelection: function setPresentationDesignerSelection(selection) {
    this.viewStateModelService.setPresentationDesignerSelection(selection);
  },
  addDataIslands: function addDataIslands(options) {
    this.domainSchemaService.addDataIslands(options.dataIslands, options.position);
    this.viewStateModelService.addDataIslands(options);
  },
  addConstantDataIsland: function addConstantDataIsland(options) {
    this.domainSchemaService.addConstantDataIsland(options);
    this.viewStateModelService.addConstantDataIsland(options);
  },
  addPresentationItems: function addPresentationItems(options) {
    this.domainSchemaService.addPresentationItems(options);
    this.viewStateModelService.addPresentationItems(options);
  },
  addPresentationSet: function addPresentationSet(options) {
    this.domainSchemaService.addPresentationItems({
      presentationItems: [options.presentationSet]
    });
    this.viewStateModelService.addPresentationSet(options);
  },
  presentationDesignerReorderDataIslands: function presentationDesignerReorderDataIslands(options) {
    this.domainSchemaService.reorderDataIslands(options);
    this.viewStateModelService.presentationDesignerReorderDataIslands();
  },
  presentationDesignerReorderPresentationItems: function presentationDesignerReorderPresentationItems(options) {
    this.domainSchemaService.reorderPresentationItems(options);
    this.viewStateModelService.presentationDesignerReorderPresentationItems({
      parentId: options.targetParentId
    });
  },
  presentationDesignerMoveDataIslandsUp: function presentationDesignerMoveDataIslandsUp(options) {
    this.domainSchemaService.moveDataIslandsUp(options);
    this.viewStateModelService.updatePresentationDataIslandsSelectionIndexes();
  },
  presentationDesignerMoveDataIslandsDown: function presentationDesignerMoveDataIslandsDown(options) {
    this.domainSchemaService.moveDataIslandsDown(options);
    this.viewStateModelService.updatePresentationDataIslandsSelectionIndexes();
  },
  presentationDesignerMovePresentationItemsUp: function presentationDesignerMovePresentationItemsUp(options) {
    this.domainSchemaService.movePresentationItemsUp(options);
    this.viewStateModelService.updatePresentationSetsAndItemsSelectionIndexesAndParentId();
  },
  presentationDesignerMovePresentationItemsDown: function presentationDesignerMovePresentationItemsDown(options) {
    this.domainSchemaService.movePresentationItemsDown(options);
    this.viewStateModelService.updatePresentationSetsAndItemsSelectionIndexesAndParentId();
  },
  setPresentationDesignerDataIslandNodeExpandedState: function setPresentationDesignerDataIslandNodeExpandedState(options) {
    var dataIslandId = options.dataIslandId,
        isExpanded = options.isExpanded;
    this.viewStateModelService.setPresentationDesignerDataIslandNodeExpandedState(dataIslandId, isExpanded);
  },
  setPresentationDesignerPresentationSetNodeExpandedState: function setPresentationDesignerPresentationSetNodeExpandedState(options) {
    var presentationSetId = options.presentationSetId,
        isExpanded = options.isExpanded;
    this.viewStateModelService.setPresentationDesignerPresentationSetNodeExpandedState(presentationSetId, isExpanded);
  },
  setPresentationDesignerDataIslandEditorExpandedState: function setPresentationDesignerDataIslandEditorExpandedState(options) {
    var dataIslandId = options.dataIslandId,
        isPropertiesEditorExpanded = options.isPropertiesEditorExpanded;
    this.viewStateModelService.setPresentationDesignerDataIslandEditorExpandedState(dataIslandId, isPropertiesEditorExpanded);
  },
  setPresentationDesignerPresentationSetEditorExpandedState: function setPresentationDesignerPresentationSetEditorExpandedState(options) {
    var presentationSetId = options.presentationSetId,
        isPropertiesEditorExpanded = options.isPropertiesEditorExpanded;
    this.viewStateModelService.setPresentationDesignerPresentationSetEditorExpandedState(presentationSetId, isPropertiesEditorExpanded);
  },
  setPresentationDesignerPresentationFieldEditorExpandedState: function setPresentationDesignerPresentationFieldEditorExpandedState(options) {
    var presentationFieldId = options.presentationFieldId,
        isPropertiesEditorExpanded = options.isPropertiesEditorExpanded;
    this.viewStateModelService.setPresentationDesignerPresentationFieldEditorExpandedState(presentationFieldId, isPropertiesEditorExpanded);
  },
  setPresentationDesignerSidebarSelection: function setPresentationDesignerSidebarSelection(options) {
    this.viewStateModelService.setPresentationDesignerSidebarSelection(options.selection);
  },
  updatePresentationField: function updatePresentationField(options) {
    var id = options.id,
        json = options.json;
    this.domainSchemaService.updatePresentationField(id, json);
  },
  updatePresentationSet: function updatePresentationSet(options) {
    var id = options.id,
        json = options.json;
    this.domainSchemaService.updatePresentationSet(id, json);
  },
  removeDataIslands: function removeDataIslands(dataIslandIds) {
    this.domainSchemaService.removeDataIslands(dataIslandIds);
    this.viewStateModelService.removeDataIslands();
  },
  removePresentationItems: function removePresentationItems(options) {
    this.domainSchemaService.removePresentationItems(options);
    this.viewStateModelService.removePresentationItems();
  },
  changePresentationDesignerColumnSet: function changePresentationDesignerColumnSet(columnSet) {
    this.viewStateModelService.setColumnSet(columnSet);
  },
  expandAllPresentationItems: function expandAllPresentationItems() {
    this.viewStateModelService.expandAllPresentationItems();
  },
  collapseAllPresentationItems: function collapseAllPresentationItems() {
    this.viewStateModelService.collapseAllPresentationItems();
  },
  presentationDesignerSetDropZoneActivator: function presentationDesignerSetDropZoneActivator(dropZoneActivator) {
    this.viewStateModelService.presentationDesignerSetDropZoneActivator(dropZoneActivator);
  },
  createDerivedTable: function createDerivedTable(derivedTable) {
    this.domainSchemaService.addDerivedTables([derivedTable], derivedTable.dataSourceId);
    this.viewStateModelService.createDerivedTable(derivedTable.dataSourceId);
  },
  updateDerivedTable: function updateDerivedTable(options) {
    this.domainSchemaService.updateDerivedTable(options);
  },
  removeDerivedTable: function removeDerivedTable(derivedTableId, parentId) {
    this.domainSchemaService.removeTables(derivedTableId, parentId);
    this.viewStateModelService.removeDerivedTable();
  },
  updatePresentationDesignerCellsWidth: function updatePresentationDesignerCellsWidth(options) {
    this.viewStateModelService.updatePresentationDesignerCellsWidth(options);
  },
  // Filters Designer
  setFiltersDesignerSidebarSearchKeyword: function setFiltersDesignerSidebarSearchKeyword(searchKeyword, nodesToExpand) {
    this.viewStateModelService.setFiltersDesignerSidebarSearchKeyword(searchKeyword, nodesToExpand);
  },
  removeFilter: function removeFilter(options) {
    this.domainSchemaService.removeFilter(options);
    this.viewStateModelService.removeFilter(options);
  },
  setDraftFilter: function setDraftFilter(draftFilterState) {
    this.viewStateModelService.setDraftFilter(draftFilterState);
  },
  editDraftFilter: function editDraftFilter(draftFilterState) {
    this.viewStateModelService.setDraftFilter(draftFilterState);
  },
  cancelDraftFilter: function cancelDraftFilter() {
    this.viewStateModelService.cancelDraftFilter();
  },
  setFiltersDesignerCurrentResource: function setFiltersDesignerCurrentResource(options) {
    this.viewStateModelService.setFiltersDesignerCurrentResource(options);
  },
  updateFilter: function updateFilter(options) {
    this.viewStateModelService.cancelDraftFilter();
    this.domainSchemaService.updateFilter(options);
  },
  addFilter: function addFilter(options) {
    this.domainSchemaService.addFilter(options);
    this.viewStateModelService.addFilter();
  },
  setFiltersDesignerSearchKeyword: function setFiltersDesignerSearchKeyword(searchKeyword) {
    this.viewStateModelService.setFiltersDesignerSearchKeyword(searchKeyword);
  },
  // Calculated Fields Designer
  showCalculatedFieldsDesigner: function showCalculatedFieldsDesigner(context) {
    this.viewStateModelService.showCalculatedFieldsDesigner(context);
  },
  hideCalculatedFieldsDesigner: function hideCalculatedFieldsDesigner() {
    this.viewStateModelService.hideCalculatedFieldsDesigner();
  },
  createCalcField: function createCalcField(options) {
    this.domainSchemaService.addCalcField(options);
    this.viewStateModelService.addCalcField(options);
  },
  updateCalcField: function updateCalcField(options) {
    this.domainSchemaService.updateCalcField(options);
    this.viewStateModelService.hideCalculatedFieldsDesigner();
  },
  removeCalcField: function removeCalcField(options) {
    this.domainSchemaService.removeCalcField(options);
    this.viewStateModelService.removeCalcField();
  },
  removeBundle: function removeBundle(index) {
    this.resourcePropertiesService.removeBundle(index);
  },
  addBundles: function addBundles(bundles) {
    this.resourcePropertiesService.addBundles(bundles);
  },
  replaceBundles: function replaceBundles(bundles) {
    this.resourcePropertiesService.replaceBundles(bundles);
  },
  generateBundleKeys: function generateBundleKeys(bundleKeys) {
    this.domainSchemaService.generateBundleKeys(bundleKeys);
  },
  addSecurityFile: function addSecurityFile(securityFile) {
    this.resourcePropertiesService.addSecurityFile(securityFile);
  },
  replaceSecurityFile: function replaceSecurityFile(securityFile) {
    this.resourcePropertiesService.addSecurityFile(securityFile);
  },
  uploadSchema: function uploadSchema(options) {
    this.domainSchemaService.reset(options.schema);
    this.viewStateModelService.setState(options.viewState);
    this.resourcePropertiesService.replaceDataSource(options.dataSource);
  },
  removeSecurityFile: function removeSecurityFile() {
    this.resourcePropertiesService.removeSecurityFile();
  }
});

module.exports = ApplicationMutations;

});