/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../model/enum/canvasViewDesignersEnum"],function(e,t,i){var r=e("underscore"),a=e("../model/enum/canvasViewDesignersEnum"),n=function(e){this.initialize(e)};r.extend(n.prototype,{initialize:function(e){this.viewStateModelService=e.viewStateModelService,this.domainSchemaService=e.domainSchemaService,this.resourcePropertiesService=e.resourcePropertiesService},setDesignerState:function(e){this.domainSchemaService.reset(e.schema),this.resourcePropertiesService.reset(e.resourceProperties),this.viewStateModelService.setState(e.viewState)},replaceDataSource:function(e){this.domainSchemaService.replaceDataSource({name:e.dataSource.name,schemaPairs:e.schemaPairs,orphanResources:e.orphanResources}),this.resourcePropertiesService.replaceDataSource(e.dataSource),this.viewStateModelService.replaceDataSource(e.dataSource)},setDesignerStateAvoidingHistory:function(e){this.domainSchemaService.reset(e.schema),this.resourcePropertiesService.reset(e.resourceProperties),this.viewStateModelService.setState(e.viewState)},save:function(e){this.resourcePropertiesService.save(e.resourceProperties),this.domainSchemaService.reset(e.schema),this.viewStateModelService.setState(e.viewState)},showClearAllDataDialog:function(){this.viewStateModelService.showClearAllDataDialog()},closeEmptyDataIslandAlertDialog:function(){this.viewStateModelService.closeEmptyDataIslandAlertDialog()},setCurrentDesigner:function(e){this.viewStateModelService.setCurrentDesigner(e)},clearDraftState:function(e){this.viewStateModelService.clearDraftState(e)},expandSidebarNode:function(e){this.viewStateModelService.expandSidebarNode(e)},collapseSidebarNode:function(e){this.viewStateModelService.collapseSidebarNode(e)},setMetadataDesignerSourceTreeSelection:function(e){this.viewStateModelService.setMetadataDesignerSourceTreeSelection(e.selection)},setMetadataDesignerResultTreeSelection:function(e){this.viewStateModelService.setMetadataDesignerResultTreeSelection(e.selection)},setMetadataDesignerSourceTreeSearchKeyword:function(e){this.viewStateModelService.setMetadataDesignerSourceTreeSearchKeyword(e)},setMetadataDesignerResultTreeSearchKeyword:function(e){this.viewStateModelService.setMetadataDesignerResultTreeSearchKeyword(e)},setMetadataDesignerSidebarSearchKeyword:function(e,t){this.viewStateModelService.setMetadataDesignerSidebarSearchKeyword(e,t)},addSchemaAttribute:function(e){var t=e.dataSourceGroup,i=e.parentId;this.domainSchemaService.addDataSourceGroups(t,i),this.viewStateModelService.addSchemaAttribute()},cancelSchemaAttribute:function(){this.viewStateModelService.setMetadataDesignerResultTreeSelection([])},updateSchemaAttribute:function(e){this.domainSchemaService.updateDataSourceGroup(e),this.viewStateModelService.setMetadataDesignerResultTreeSelection([])},addDataSourceGroups:function(e){var t=e.resources,i=e.parentId,a=r.pick(e,["sourceTreeSelection","resultTreeSelection"]);this.domainSchemaService.addDataSourceGroups(t,i),this.viewStateModelService.addDataSourceGroupsOrTables(a,e.addResourcesError)},removeDataSourceGroups:function(e){var t=e.ids,i=e.parentId,a=r.pick(e,["sourceTreeSelection","resultTreeSelection"]);this.domainSchemaService.removeDataSourceGroups(t,i),this.viewStateModelService.removeDataSourceGroups(a)},removeSchemasAndDefaultSchemaChildren:function(e){this.domainSchemaService.removeDataSourceGroupsAndDefaultSchemaChildren({defaultSchemaId:e.defaultSchemaId,dataSourceGroupIds:e.dataSourceGroupIds,dataSourceGroupsParentId:e.dataSourceGroupsParentId}),this.viewStateModelService.removeDataSourceGroups({sourceTreeSelection:e.sourceTreeSelection,resultTreeSelection:e.resultTreeSelection})},addTablesWithTableReferences:function(e){var t=e.resources,i=e.parentId,a=r.pick(e,["sourceTreeSelection","resultTreeSelection"]);this.domainSchemaService.addTablesWithTableReferences(t,i),this.viewStateModelService.addDataSourceGroupsOrTables(a,e.addResourcesError)},removeTables:function(e){var t=e.ids,i=e.parentId,a=r.pick(e,["sourceTreeSelection","resultTreeSelection"]);this.domainSchemaService.removeTables(t,i),this.viewStateModelService.removeTables(a)},setAddMetadataResourcesError:function(e){this.viewStateModelService.setAddMetadataResourcesError(e)},setMetadataDesignerCurrentResource:function(e){this.viewStateModelService.setCurrentResource(a.METADATA_DESIGNER,e.resource)},setJoinsDesignerCurrentResource:function(e){this.viewStateModelService.setJoinsDesignerCurrentResource(e)},setJoinsDesignerSidebarSearchKeyword:function(e,t){this.viewStateModelService.setJoinsDesignerSidebarSearchKeyword(e,t)},setJoinsDesignerSearchKeyword:function(e){this.viewStateModelService.setJoinsDesignerSearchKeyword(e)},removeJoinTree:function(e){this.domainSchemaService.removeJoinTree(e),this.viewStateModelService.removeJoinTree(e)},updateJoinTree:function(e){var t=e.joinTreeId,i=e.joinTreeJson;this.domainSchemaService.updateJoinTree(t,i)},updateJoinExpression:function(e){var t=e.joinExpressionId,i=e.options;this.domainSchemaService.updateJoinExpression(t,i)},updateJoin:function(e){var t=e.joinId,i=e.options;this.domainSchemaService.updateJoin(t,i)},createJoinExpression:function(e){this.domainSchemaService.createJoinExpression(e),this.viewStateModelService.createJoinExpression(e)},createJoinTreeWithJoinExpression:function(e){this.domainSchemaService.createJoinTreeWithJoinExpression(e),this.viewStateModelService.createJoinTreeWithJoinExpression(e)},reorderJoinTree:function(e,t){this.domainSchemaService.reorderJoinTree(e,t)},setJoinsDesignerJoinConstructorState:function(e){this.viewStateModelService.setJoinConstructorState(e)},setJoinsDesignerDraftJoinTreeState:function(e){this.viewStateModelService.setDraftJoinTreeState(e)},updateDataIsland:function(e){var t=e.id,i=e.json;this.domainSchemaService.updateDataIsland(t,i)},toggleJoinTree:function(e){var t=e.joinTreeId,i=e.isExpanded;this.viewStateModelService.toggleJoinTree(t,i)},updateJoinAlias:function(e,t){this.domainSchemaService.updateJoinAlias(e,t)},removeJoinAlias:function(e){this.domainSchemaService.removeJoinAlias(e),this.viewStateModelService.removeJoinAlias()},removeJoin:function(e){var t=e.id;this.domainSchemaService.removeJoin(t),this.viewStateModelService.removeJoin(t)},toggleJoin:function(e){this.viewStateModelService.toggleJoin(e)},removeJoinExpression:function(e){this.domainSchemaService.removeJoinExpression(e),this.viewStateModelService.removeJoinExpression()},removeConstantJoinExpression:function(e){this.domainSchemaService.removeConstantJoinExpression(e.id)},createConstantJoinExpression:function(e){this.domainSchemaService.createConstantJoinExpression(e,e.joinId)},updateConstantJoinExpression:function(e){this.domainSchemaService.updateConstantJoinExpression(e)},copyTableReference:function(e){this.domainSchemaService.copyTableReference(e)},copyDerivedTable:function(e){this.domainSchemaService.copyDerivedTable(e)},removeTableReference:function(e){this.domainSchemaService.removeTableReference(e),this.viewStateModelService.removeTableReference()},renameTableReference:function(e){this.domainSchemaService.renameTableReference(e)},generateJoins:function(e){this.domainSchemaService.generateJoins(e),this.viewStateModelService.generateJoins()},setPresentationDesignerSidebarSearchKeyword:function(e,t){this.viewStateModelService.setPresentationDesignerSidebarSearchKeyword(e,t)},setPresentationDesignerSearchKeyword:function(e){this.viewStateModelService.setPresentationDesignerSearchKeyword(e)},setPresentationDesignerSelection:function(e){this.viewStateModelService.setPresentationDesignerSelection(e)},addDataIslands:function(e){this.domainSchemaService.addDataIslands(e.dataIslands,e.position),this.viewStateModelService.addDataIslands(e)},addConstantDataIsland:function(e){this.domainSchemaService.addConstantDataIsland(e),this.viewStateModelService.addConstantDataIsland(e)},addPresentationItems:function(e){this.domainSchemaService.addPresentationItems(e),this.viewStateModelService.addPresentationItems(e)},addPresentationSet:function(e){this.domainSchemaService.addPresentationItems({presentationItems:[e.presentationSet]}),this.viewStateModelService.addPresentationSet(e)},presentationDesignerReorderDataIslands:function(e){this.domainSchemaService.reorderDataIslands(e),this.viewStateModelService.presentationDesignerReorderDataIslands()},presentationDesignerReorderPresentationItems:function(e){this.domainSchemaService.reorderPresentationItems(e),this.viewStateModelService.presentationDesignerReorderPresentationItems({parentId:e.targetParentId})},presentationDesignerMoveDataIslandsUp:function(e){this.domainSchemaService.moveDataIslandsUp(e),this.viewStateModelService.updatePresentationDataIslandsSelectionIndexes()},presentationDesignerMoveDataIslandsDown:function(e){this.domainSchemaService.moveDataIslandsDown(e),this.viewStateModelService.updatePresentationDataIslandsSelectionIndexes()},presentationDesignerMovePresentationItemsUp:function(e){this.domainSchemaService.movePresentationItemsUp(e),this.viewStateModelService.updatePresentationSetsAndItemsSelectionIndexesAndParentId()},presentationDesignerMovePresentationItemsDown:function(e){this.domainSchemaService.movePresentationItemsDown(e),this.viewStateModelService.updatePresentationSetsAndItemsSelectionIndexesAndParentId()},setPresentationDesignerDataIslandNodeExpandedState:function(e){var t=e.dataIslandId,i=e.isExpanded;this.viewStateModelService.setPresentationDesignerDataIslandNodeExpandedState(t,i)},setPresentationDesignerPresentationSetNodeExpandedState:function(e){var t=e.presentationSetId,i=e.isExpanded;this.viewStateModelService.setPresentationDesignerPresentationSetNodeExpandedState(t,i)},setPresentationDesignerDataIslandEditorExpandedState:function(e){var t=e.dataIslandId,i=e.isPropertiesEditorExpanded;this.viewStateModelService.setPresentationDesignerDataIslandEditorExpandedState(t,i)},setPresentationDesignerPresentationSetEditorExpandedState:function(e){var t=e.presentationSetId,i=e.isPropertiesEditorExpanded;this.viewStateModelService.setPresentationDesignerPresentationSetEditorExpandedState(t,i)},setPresentationDesignerPresentationFieldEditorExpandedState:function(e){var t=e.presentationFieldId,i=e.isPropertiesEditorExpanded;this.viewStateModelService.setPresentationDesignerPresentationFieldEditorExpandedState(t,i)},setPresentationDesignerSidebarSelection:function(e){this.viewStateModelService.setPresentationDesignerSidebarSelection(e.selection)},updatePresentationField:function(e){var t=e.id,i=e.json;this.domainSchemaService.updatePresentationField(t,i)},updatePresentationSet:function(e){var t=e.id,i=e.json;this.domainSchemaService.updatePresentationSet(t,i)},removeDataIslands:function(e){this.domainSchemaService.removeDataIslands(e),this.viewStateModelService.removeDataIslands()},removePresentationItems:function(e){this.domainSchemaService.removePresentationItems(e),this.viewStateModelService.removePresentationItems()},changePresentationDesignerColumnSet:function(e){this.viewStateModelService.setColumnSet(e)},expandAllPresentationItems:function(){this.viewStateModelService.expandAllPresentationItems()},collapseAllPresentationItems:function(){this.viewStateModelService.collapseAllPresentationItems()},presentationDesignerSetDropZoneActivator:function(e){this.viewStateModelService.presentationDesignerSetDropZoneActivator(e)},createDerivedTable:function(e){this.domainSchemaService.addDerivedTables([e],e.dataSourceId),this.viewStateModelService.createDerivedTable(e.dataSourceId)},updateDerivedTable:function(e){this.domainSchemaService.updateDerivedTable(e)},removeDerivedTable:function(e,t){this.domainSchemaService.removeTables(e,t),this.viewStateModelService.removeDerivedTable()},updatePresentationDesignerCellsWidth:function(e){this.viewStateModelService.updatePresentationDesignerCellsWidth(e)},setFiltersDesignerSidebarSearchKeyword:function(e,t){this.viewStateModelService.setFiltersDesignerSidebarSearchKeyword(e,t)},removeFilter:function(e){this.domainSchemaService.removeFilter(e),this.viewStateModelService.removeFilter(e)},setDraftFilter:function(e){this.viewStateModelService.setDraftFilter(e)},editDraftFilter:function(e){this.viewStateModelService.setDraftFilter(e)},cancelDraftFilter:function(){this.viewStateModelService.cancelDraftFilter()},setFiltersDesignerCurrentResource:function(e){this.viewStateModelService.setFiltersDesignerCurrentResource(e)},updateFilter:function(e){this.viewStateModelService.cancelDraftFilter(),this.domainSchemaService.updateFilter(e)},addFilter:function(e){this.domainSchemaService.addFilter(e),this.viewStateModelService.addFilter()},setFiltersDesignerSearchKeyword:function(e){this.viewStateModelService.setFiltersDesignerSearchKeyword(e)},showCalculatedFieldsDesigner:function(e){this.viewStateModelService.showCalculatedFieldsDesigner(e)},hideCalculatedFieldsDesigner:function(){this.viewStateModelService.hideCalculatedFieldsDesigner()},createCalcField:function(e){this.domainSchemaService.addCalcField(e),this.viewStateModelService.addCalcField(e)},updateCalcField:function(e){this.domainSchemaService.updateCalcField(e),this.viewStateModelService.hideCalculatedFieldsDesigner()},removeCalcField:function(e){this.domainSchemaService.removeCalcField(e),this.viewStateModelService.removeCalcField()},removeBundle:function(e){this.resourcePropertiesService.removeBundle(e)},addBundles:function(e){this.resourcePropertiesService.addBundles(e)},replaceBundles:function(e){this.resourcePropertiesService.replaceBundles(e)},generateBundleKeys:function(e){this.domainSchemaService.generateBundleKeys(e)},addSecurityFile:function(e){this.resourcePropertiesService.addSecurityFile(e)},replaceSecurityFile:function(e){this.resourcePropertiesService.addSecurityFile(e)},uploadSchema:function(e){this.domainSchemaService.reset(e.schema),this.viewStateModelService.setState(e.viewState),this.resourcePropertiesService.replaceDataSource(e.dataSource)},removeSecurityFile:function(){this.resourcePropertiesService.removeSecurityFile()}}),i.exports=n});