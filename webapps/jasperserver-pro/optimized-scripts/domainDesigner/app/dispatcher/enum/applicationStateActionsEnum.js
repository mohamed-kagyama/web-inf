/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../model/schema/enum/schemaEntitiesEnum","./applicationStateEventsEnum"],function(e,E,t){var S=e("../../../model/schema/enum/schemaEntitiesEnum"),a=e("./applicationStateEventsEnum");t.exports={setDesignerState:{event:a.SET_STATE,changes:{viewState:!0,resourceProperties:!0,schema:!0}},replaceDataSource:{event:a.REPLACE_DATA_SOURCE,changes:{viewState:!0,resourceProperties:!0,schema:{entityType:S.DATA_SOURCE}}},setDesignerStateAvoidingHistory:{event:a.SET_STATE_NO_HISTORY,emitEvent:a.SET_STATE,skipHistory:!0,changes:{viewState:!0,resourceProperties:!0,schema:!0}},setCurrentDesigner:{event:a.DESIGNER_SWITCHER_SET_DESIGNER,changes:{viewState:!0}},save:{event:a.SAVE_SUCCESS,changes:{viewState:!0}},showClearAllDataDialog:{event:a.SHOW_CLEAR_ALL_DATA_DIALOG,changes:{viewState:!0}},clearDraftState:{event:a.CLEAR_DRAFT_STATE,changes:{viewState:!0}},expandSidebarNode:{event:a.EXPAND_SIDEBAR_NODE,changes:{viewState:!0}},collapseSidebarNode:{event:a.COLLAPSE_SIDEBAR_NODE,changes:{viewState:!0}},addSchemaAttribute:{event:a.METADATA_DESIGNER_ADD_SCHEMA_ATTRIBUTE,changes:{schema:!0}},cancelSchemaAttribute:{event:a.METADATA_DESIGNER_CANCEL_SCHEMA_ATTRIBUTE,changes:{viewState:!0}},updateSchemaAttribute:{event:a.METADATA_DESIGNER_UPDATE_SCHEMA_ATTRIBUTE,changes:{schema:!0}},addDataSourceGroups:{event:a.METADATA_DESIGNER_ADD_DATA_SOURCE_GROUPS,changes:{schema:!0,viewState:!0}},removeDataSourceGroups:{event:a.METADATA_DESIGNER_REMOVE_DATA_SOURCE_GROUPS,changes:{schema:{entityType:S.DATA_SOURCE_GROUP},viewState:!0}},removeSchemasAndDefaultSchemaChildren:{event:a.METADATA_DESIGNER_REMOVE_SCHEMAS_AND_DEFAULT_SCHEMA_CHILDREN,changes:{schema:!0,viewState:!0}},addTablesWithTableReferences:{event:a.METADATA_DESIGNER_ADD_TABLES_WITH_TABLE_REFERENCES,changes:{schema:!0,viewState:!0}},removeTables:{event:a.METADATA_DESIGNER_REMOVE_TABLES,changes:{schema:{entityType:S.TABLE},viewState:!0}},setAddMetadataResourcesError:{event:a.METADATA_DESIGNER_SET_ADD_RESOURCES_ERROR,changes:{viewState:!0}},setMetadataDesignerCurrentResource:{event:a.METADATA_DESIGNER_SELECT_RESOURCE,changes:{viewState:!0}},setMetadataDesignerSourceTreeSelection:{event:a.METADATA_DESIGNER_SET_SOURCE_TREE_SELECTION,changes:{viewState:!0}},setMetadataDesignerResultTreeSelection:{event:a.METADATA_DESIGNER_SET_RESULT_TREE_SELECTION,changes:{viewState:!0}},setMetadataDesignerSourceTreeSearchKeyword:{event:a.METADATA_DESIGNER_SET_SOURCE_TREE_SEARCH_KEYWORD,changes:{viewState:!0}},setMetadataDesignerResultTreeSearchKeyword:{event:a.METADATA_DESIGNER_SET_RESULT_TREE_SEARCH_KEYWORD,changes:{viewState:!0}},setMetadataDesignerSidebarSearchKeyword:{event:a.METADATA_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,changes:{viewState:!0}},setJoinsDesignerCurrentResource:{event:a.JOINS_DESIGNER_SELECT_RESOURCE,changes:{viewState:!0}},setJoinsDesignerSidebarSearchKeyword:{event:a.JOINS_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,changes:{viewState:!0}},setJoinsDesignerSearchKeyword:{event:a.JOINS_DESIGNER_SET_SEARCH_KEYWORD,changes:{viewState:!0}},removeJoinTree:{event:a.JOINS_DESIGNER_REMOVE_JOIN_TREE,changes:{schema:{entityType:S.JOIN_TREE},viewState:!0}},updateJoinTree:{event:a.JOINS_DESIGNER_UPDATE_JOIN_TREE,changes:{schema:!0}},updateJoin:{event:a.JOINS_DESIGNER_UPDATE_JOIN,changes:{schema:!0}},updateJoinExpression:{event:a.JOINS_DESIGNER_UPDATE_JOIN_EXPRESSION,changes:{schema:!0}},createJoinExpression:{event:a.JOINS_DESIGNER_CREATE_JOIN_EXPRESSION,changes:{schema:!0,viewState:!0}},createJoinTreeWithJoinExpression:{event:a.JOINS_DESIGNER_CREATE_JOIN_TREE_WITH_JOIN_EXPRESSION,changes:{schema:!0,viewState:!0}},reorderJoinTree:{event:a.JOINS_DESIGNER_REORDER_JOIN_TREE,changes:{schema:!0}},setJoinsDesignerJoinConstructorState:{event:a.JOINS_DESIGNER_SET_JOIN_CONSTRUCTOR_STATE,changes:{viewState:!0}},setJoinsDesignerDraftJoinTreeState:{event:a.JOINS_DESIGNER_SET_DRAFT_JOIN_TREE_STATE,changes:{viewState:!0}},toggleJoinTree:{event:a.JOINS_DESIGNER_TOGGLE_JOIN_TREE,changes:{viewState:!0}},removeJoinAlias:{event:a.JOINS_DESIGNER_REMOVE_JOIN_ALIAS,changes:{schema:{entityType:S.JOIN_ALIAS},viewState:!0}},removeJoin:{event:a.JOINS_DESIGNER_REMOVE_JOIN,changes:{schema:{entityType:S.JOIN},viewState:!0}},toggleJoin:{event:a.JOINS_DESIGNER_TOGGLE_JOIN,changes:{viewState:!0}},removeJoinExpression:{event:a.JOINS_DESIGNER_REMOVE_JOIN_EXPRESSION,changes:{schema:{entityType:S.JOIN_EXPRESSION},viewState:!0}},removeConstantJoinExpression:{event:a.JOINS_DESIGNER_REMOVE_CONSTANT_JOIN_EXPRESSION,changes:{schema:{entityType:S.CONSTANT_JOIN_EXPRESSION}}},createConstantJoinExpression:{event:a.JOINS_DESIGNER_CREATE_CONSTANT_JOIN_EXPRESSION,changes:{schema:!0}},updateConstantJoinExpression:{event:a.JOINS_DESIGNER_UPDATE_CONSTANT_JOIN_EXPRESSION,changes:{schema:!0}},updateJoinAlias:{event:a.JOINS_DESIGNER_UPDATE_JOIN_ALIAS,changes:{schema:!0}},generateJoins:{event:a.JOINS_DESIGNER_GENERATE_JOINS,changes:{schema:!0,viewState:!0}},copyTableReference:{event:a.JOINS_DESIGNER_COPY_TABLE_REFERENCE,changes:{schema:!0,viewState:!0}},removeTableReference:{event:a.JOINS_DESIGNER_REMOVE_TABLE_REFERENCE,changes:{schema:{entityType:S.TABLE_REFERENCE},viewState:!0}},renameTableReference:{event:a.JOINS_DESIGNER_RENAME_TABLE_REFERENCE,changes:{schema:!0}},createDerivedTable:{event:a.DERIVED_TABLES_DESIGNER_CREATE_DERIVED_TABLE,changes:{schema:!0,viewState:!0}},updateDerivedTable:{event:a.DERIVED_TABLES_DESIGNER_UPDATE_DERIVED_TABLE,changes:{schema:{entityType:S.DERIVED_TABLE}}},removeDerivedTable:{event:a.SIDEBAR_TREE_MENU_REMOVE_DERIVED_TABLE,changes:{schema:{entityType:S.DERIVED_TABLE}}},copyDerivedTable:{event:a.SIDEBAR_TREE_MENU_COPY_DERIVED_TABLE,changes:{schema:!0}},updateDataIsland:{event:a.PRESENTATION_DESIGNER_UPDATE_DATA_ISLAND,changes:{schema:!0}},setPresentationDesignerSidebarSearchKeyword:{event:a.PRESENTATION_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,changes:{viewState:!0}},setPresentationDesignerSearchKeyword:{event:a.PRESENTATION_DESIGNER_SET_SEARCH_KEYWORD,changes:{viewState:!0}},setPresentationDesignerSelection:{event:a.PRESENTATION_DESIGNER_SET_SELECTION,changes:{viewState:!0}},addPresentationItems:{event:a.PRESENTATION_DESIGNER_ADD_PRESENTATION_ITEMS,changes:{schema:!0,viewState:!0}},addPresentationSet:{event:a.PRESENTATION_DESIGNER_ADD_SET,changes:{schema:!0,viewState:!0}},addDataIslands:{event:a.PRESENTATION_DESIGNER_ADD_DATA_ISLANDS,changes:{schema:!0,viewState:!0}},addConstantDataIsland:{event:a.PRESENTATION_DESIGNER_ADD_CONSTANT_DATA_ISLAND,changes:{schema:!0,viewState:!0}},presentationDesignerReorderDataIslands:{event:a.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS,changes:{schema:!0,viewState:!0}},presentationDesignerReorderPresentationItems:{event:a.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS,changes:{schema:!0,viewState:!0}},presentationDesignerMoveDataIslandsUp:{event:a.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_UP,changes:{schema:!0,viewState:!0}},presentationDesignerMoveDataIslandsDown:{event:a.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_DOWN,changes:{schema:!0,viewState:!0}},presentationDesignerMovePresentationItemsUp:{event:a.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_UP,changes:{schema:!0,viewState:!0}},presentationDesignerMovePresentationItemsDown:{event:a.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_DOWN,changes:{schema:!0,viewState:!0}},setPresentationDesignerDataIslandNodeExpandedState:{event:a.PRESENTATION_DESIGNER_SET_DATA_ISLAND_EXPANDED_STATE,changes:{viewState:!0}},setPresentationDesignerPresentationSetNodeExpandedState:{event:a.PRESENTATION_DESIGNER_SET_PRESENTATION_SET_EXPANDED_STATE,changes:{viewState:!0}},setPresentationDesignerDataIslandEditorExpandedState:{event:a.PRESENTATION_DESIGNER_SET_DATA_ISLAND_EDITOR_EXPANDED_STATE,changes:{viewState:!0}},setPresentationDesignerPresentationSetEditorExpandedState:{event:a.PRESENTATION_DESIGNER_SET_PRESENTATION_SET_EDITOR_EXPANDED_STATE,changes:{viewState:!0}},setPresentationDesignerPresentationFieldEditorExpandedState:{event:a.PRESENTATION_DESIGNER_SET_PRESENTATION_ITEM_EDITOR_EXPANDED_STATE,changes:{viewState:!0}},setPresentationDesignerSidebarSelection:{event:a.PRESENTATION_DESIGNER_SET_SIDEBAR_SELECTION,changes:{viewState:!0}},updatePresentationField:{event:a.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_FIELD,changes:{schema:!0}},updatePresentationSet:{event:a.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_SET,changes:{schema:!0}},removeDataIslands:{event:a.PRESENTATION_DESIGNER_REMOVE_DATA_ISLANDS,changes:{schema:!0,viewState:!0}},removePresentationItems:{event:a.PRESENTATION_DESIGNER_REMOVE_PRESENTATION_ITEMS,changes:{schema:!0,viewState:!0}},changePresentationDesignerColumnSet:{event:a.PRESENTATION_DESIGNER_CHANGE_COLUMN_SET,changes:{viewState:!0}},expandAllPresentationItems:{event:a.PRESENTATION_DESIGNER_EXPAND_ALL_PRESENTATION_ITEMS,changes:{viewState:!0}},collapseAllPresentationItems:{event:a.PRESENTATION_DESIGNER_COLLAPSE_ALL_PRESENTATION_ITEMS,changes:{viewState:!0}},setFiltersDesignerSidebarSearchKeyword:{event:a.FILTERS_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,changes:{viewState:!0}},removeFilter:{event:a.FILTERS_DESIGNER_REMOVE_FILTER,changes:{schema:!0}},setDraftFilter:{event:a.FILTERS_DESIGNER_SET_DRAFT_FILTER,skipHistory:!0,changes:{viewState:!0}},editDraftFilter:{event:a.FILTERS_DESIGNER_EDIT_DRAFT_FILTER,skipHistory:!0,changes:{viewState:!0}},cancelDraftFilter:{event:a.FILTERS_DESIGNER_CANCEL_DRAFT_FILTER,skipHistory:!0,changes:{viewState:!0}},updateFilter:{event:a.FILTERS_DESIGNER_UPDATE_FILTER,changes:{viewState:!0,schema:!0}},addFilter:{event:a.FILTERS_DESIGNER_ADD_FILTER,changes:{viewState:!0,schema:!0}},setFiltersDesignerCurrentResource:{event:a.FILTERS_DESIGNER_SELECT_RESOURCE,changes:{viewState:!0}},setFiltersDesignerSearchKeyword:{event:a.FILTERS_DESIGNER_SET_SEARCH_KEYWORD,changes:{viewState:!0}},showCalculatedFieldsDesigner:{event:a.CALCULATED_FIELDS_DESIGNER_SHOW,changes:{viewState:!0}},hideCalculatedFieldsDesigner:{event:a.CALCULATED_FIELDS_DESIGNER_HIDE,changes:{viewState:!0}},createCalcField:{event:a.CALCULATED_FIELDS_DESIGNER_CREATE_CALCULATED_FIELD,changes:{schema:!0,viewState:!0}},updateCalcField:{event:a.CALCULATED_FIELDS_DESIGNER_UPDATE_CALCULATED_FIELD,changes:{schema:{schema:!0,viewState:!0}}},removeCalcField:{event:a.CALCULATED_FIELDS_DESIGNER_REMOVE_CALCULATED_FIELD,changes:{schema:{entityType:S.CALC_FIELD}}},removeBundle:{event:a.OPTIONS_DESIGNER_REMOVE_BUNDLE,changes:{resourceProperties:!0}},addBundles:{event:a.OPTIONS_DESIGNER_ADD_BUNDLES,changes:{resourceProperties:!0}},replaceBundles:{event:a.OPTIONS_DESIGNER_REPLACE_BUNDLES,changes:{resourceProperties:!0}},generateBundleKeys:{event:a.OPTIONS_DESIGNER_GENERATE_BUNDLE_KEYS,changes:{schema:!0}},addSecurityFile:{event:a.OPTIONS_DESIGNER_ADD_SECURITY_FILE,changes:{resourceProperties:!0}},replaceSecurityFile:{event:a.OPTIONS_DESIGNER_REPLACE_SECURITY_FILE,changes:{resourceProperties:!0}},removeSecurityFile:{event:a.OPTIONS_DESIGNER_REMOVE_SECURITY_FILE,changes:{resourceProperties:!0}},uploadSchema:{event:a.OPTIONS_DESIGNER_UPLOAD_SCHEMA,changes:{schema:!0,viewState:!0}}}});