define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../../../model/schema/enum/schemaEntitiesEnum");

var applicationStateEventsEnum = require("./applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  //Common actions
  setDesignerState: {
    event: applicationStateEventsEnum.SET_STATE,
    changes: {
      viewState: true,
      resourceProperties: true,
      schema: true
    }
  },
  replaceDataSource: {
    event: applicationStateEventsEnum.REPLACE_DATA_SOURCE,
    changes: {
      viewState: true,
      resourceProperties: true,
      schema: {
        entityType: schemaEntitiesEnum.DATA_SOURCE
      }
    }
  },
  setDesignerStateAvoidingHistory: {
    event: applicationStateEventsEnum.SET_STATE_NO_HISTORY,
    emitEvent: applicationStateEventsEnum.SET_STATE,
    skipHistory: true,
    changes: {
      viewState: true,
      resourceProperties: true,
      schema: true
    }
  },
  setCurrentDesigner: {
    event: applicationStateEventsEnum.DESIGNER_SWITCHER_SET_DESIGNER,
    changes: {
      viewState: true
    }
  },
  save: {
    event: applicationStateEventsEnum.SAVE_SUCCESS,
    changes: {
      viewState: true
    }
  },
  showClearAllDataDialog: {
    event: applicationStateEventsEnum.SHOW_CLEAR_ALL_DATA_DIALOG,
    changes: {
      viewState: true
    }
  },
  clearDraftState: {
    event: applicationStateEventsEnum.CLEAR_DRAFT_STATE,
    changes: {
      viewState: true
    }
  },
  expandSidebarNode: {
    event: applicationStateEventsEnum.EXPAND_SIDEBAR_NODE,
    changes: {
      viewState: true
    }
  },
  collapseSidebarNode: {
    event: applicationStateEventsEnum.COLLAPSE_SIDEBAR_NODE,
    changes: {
      viewState: true
    }
  },
  //Metadata Designer
  addSchemaAttribute: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_ADD_SCHEMA_ATTRIBUTE,
    changes: {
      schema: true
    }
  },
  cancelSchemaAttribute: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_CANCEL_SCHEMA_ATTRIBUTE,
    changes: {
      viewState: true
    }
  },
  updateSchemaAttribute: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_UPDATE_SCHEMA_ATTRIBUTE,
    changes: {
      schema: true
    }
  },
  addDataSourceGroups: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_ADD_DATA_SOURCE_GROUPS,
    changes: {
      schema: true,
      viewState: true
    }
  },
  removeDataSourceGroups: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_REMOVE_DATA_SOURCE_GROUPS,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.DATA_SOURCE_GROUP
      },
      viewState: true
    }
  },
  removeSchemasAndDefaultSchemaChildren: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_REMOVE_SCHEMAS_AND_DEFAULT_SCHEMA_CHILDREN,
    changes: {
      schema: true,
      viewState: true
    }
  },
  addTablesWithTableReferences: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_ADD_TABLES_WITH_TABLE_REFERENCES,
    changes: {
      schema: true,
      viewState: true
    }
  },
  removeTables: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_REMOVE_TABLES,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.TABLE
      },
      viewState: true
    }
  },
  setAddMetadataResourcesError: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_SET_ADD_RESOURCES_ERROR,
    changes: {
      viewState: true
    }
  },
  setMetadataDesignerCurrentResource: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_SELECT_RESOURCE,
    changes: {
      viewState: true
    }
  },
  setMetadataDesignerSourceTreeSelection: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_SET_SOURCE_TREE_SELECTION,
    changes: {
      viewState: true
    }
  },
  setMetadataDesignerResultTreeSelection: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_SET_RESULT_TREE_SELECTION,
    changes: {
      viewState: true
    }
  },
  setMetadataDesignerSourceTreeSearchKeyword: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_SET_SOURCE_TREE_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  setMetadataDesignerResultTreeSearchKeyword: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_SET_RESULT_TREE_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  setMetadataDesignerSidebarSearchKeyword: {
    event: applicationStateEventsEnum.METADATA_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  // Joins Designer
  setJoinsDesignerCurrentResource: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_SELECT_RESOURCE,
    changes: {
      viewState: true
    }
  },
  setJoinsDesignerSidebarSearchKeyword: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  setJoinsDesignerSearchKeyword: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_SET_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  removeJoinTree: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_JOIN_TREE,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.JOIN_TREE
      },
      viewState: true
    }
  },
  updateJoinTree: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_TREE,
    changes: {
      schema: true
    }
  },
  updateJoin: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN,
    changes: {
      schema: true
    }
  },
  updateJoinExpression: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_EXPRESSION,
    changes: {
      schema: true
    }
  },
  createJoinExpression: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_CREATE_JOIN_EXPRESSION,
    changes: {
      schema: true,
      viewState: true
    }
  },
  createJoinTreeWithJoinExpression: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_CREATE_JOIN_TREE_WITH_JOIN_EXPRESSION,
    changes: {
      schema: true,
      viewState: true
    }
  },
  reorderJoinTree: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_REORDER_JOIN_TREE,
    changes: {
      schema: true
    }
  },
  setJoinsDesignerJoinConstructorState: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_SET_JOIN_CONSTRUCTOR_STATE,
    changes: {
      viewState: true
    }
  },
  setJoinsDesignerDraftJoinTreeState: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_SET_DRAFT_JOIN_TREE_STATE,
    changes: {
      viewState: true
    }
  },
  toggleJoinTree: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_TOGGLE_JOIN_TREE,
    changes: {
      viewState: true
    }
  },
  removeJoinAlias: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_JOIN_ALIAS,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.JOIN_ALIAS
      },
      viewState: true
    }
  },
  removeJoin: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_JOIN,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.JOIN
      },
      viewState: true
    }
  },
  toggleJoin: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_TOGGLE_JOIN,
    changes: {
      viewState: true
    }
  },
  removeJoinExpression: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_JOIN_EXPRESSION,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.JOIN_EXPRESSION
      },
      viewState: true
    }
  },
  removeConstantJoinExpression: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_CONSTANT_JOIN_EXPRESSION,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION
      }
    }
  },
  createConstantJoinExpression: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_CREATE_CONSTANT_JOIN_EXPRESSION,
    changes: {
      schema: true
    }
  },
  updateConstantJoinExpression: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_CONSTANT_JOIN_EXPRESSION,
    changes: {
      schema: true
    }
  },
  updateJoinAlias: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_ALIAS,
    changes: {
      schema: true
    }
  },
  generateJoins: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_GENERATE_JOINS,
    changes: {
      schema: true,
      viewState: true
    }
  },
  copyTableReference: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_COPY_TABLE_REFERENCE,
    changes: {
      schema: true,
      viewState: true
    }
  },
  removeTableReference: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_TABLE_REFERENCE,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.TABLE_REFERENCE
      },
      viewState: true
    }
  },
  renameTableReference: {
    event: applicationStateEventsEnum.JOINS_DESIGNER_RENAME_TABLE_REFERENCE,
    changes: {
      schema: true
    }
  },
  createDerivedTable: {
    event: applicationStateEventsEnum.DERIVED_TABLES_DESIGNER_CREATE_DERIVED_TABLE,
    changes: {
      schema: true,
      viewState: true
    }
  },
  updateDerivedTable: {
    event: applicationStateEventsEnum.DERIVED_TABLES_DESIGNER_UPDATE_DERIVED_TABLE,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.DERIVED_TABLE
      }
    }
  },
  removeDerivedTable: {
    event: applicationStateEventsEnum.SIDEBAR_TREE_MENU_REMOVE_DERIVED_TABLE,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.DERIVED_TABLE
      }
    }
  },
  copyDerivedTable: {
    event: applicationStateEventsEnum.SIDEBAR_TREE_MENU_COPY_DERIVED_TABLE,
    changes: {
      schema: true
    }
  },
  // Presentation Designer
  updateDataIsland: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_DATA_ISLAND,
    changes: {
      schema: true
    }
  },
  setPresentationDesignerSidebarSearchKeyword: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  setPresentationDesignerSearchKeyword: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  setPresentationDesignerSelection: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SELECTION,
    changes: {
      viewState: true
    }
  },
  addPresentationItems: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_ADD_PRESENTATION_ITEMS,
    changes: {
      schema: true,
      viewState: true
    }
  },
  addPresentationSet: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_ADD_SET,
    changes: {
      schema: true,
      viewState: true
    }
  },
  addDataIslands: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_ADD_DATA_ISLANDS,
    changes: {
      schema: true,
      viewState: true
    }
  },
  addConstantDataIsland: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_ADD_CONSTANT_DATA_ISLAND,
    changes: {
      schema: true,
      viewState: true
    }
  },
  presentationDesignerReorderDataIslands: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_DATA_ISLANDS,
    changes: {
      schema: true,
      viewState: true
    }
  },
  presentationDesignerReorderPresentationItems: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_REORDER_PRESENTATION_ITEMS,
    changes: {
      schema: true,
      viewState: true
    }
  },
  presentationDesignerMoveDataIslandsUp: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_UP,
    changes: {
      schema: true,
      viewState: true
    }
  },
  presentationDesignerMoveDataIslandsDown: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_DATA_ISLANDS_DOWN,
    changes: {
      schema: true,
      viewState: true
    }
  },
  presentationDesignerMovePresentationItemsUp: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_UP,
    changes: {
      schema: true,
      viewState: true
    }
  },
  presentationDesignerMovePresentationItemsDown: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_MOVE_PRESENTATION_ITEMS_DOWN,
    changes: {
      schema: true,
      viewState: true
    }
  },
  setPresentationDesignerDataIslandNodeExpandedState: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_DATA_ISLAND_EXPANDED_STATE,
    changes: {
      viewState: true
    }
  },
  setPresentationDesignerPresentationSetNodeExpandedState: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_SET_EXPANDED_STATE,
    changes: {
      viewState: true
    }
  },
  setPresentationDesignerDataIslandEditorExpandedState: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_DATA_ISLAND_EDITOR_EXPANDED_STATE,
    changes: {
      viewState: true
    }
  },
  setPresentationDesignerPresentationSetEditorExpandedState: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_SET_EDITOR_EXPANDED_STATE,
    changes: {
      viewState: true
    }
  },
  setPresentationDesignerPresentationFieldEditorExpandedState: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_PRESENTATION_ITEM_EDITOR_EXPANDED_STATE,
    changes: {
      viewState: true
    }
  },
  setPresentationDesignerSidebarSelection: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_SET_SIDEBAR_SELECTION,
    changes: {
      viewState: true
    }
  },
  updatePresentationField: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_FIELD,
    changes: {
      schema: true
    }
  },
  updatePresentationSet: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_UPDATE_PRESENTATION_SET,
    changes: {
      schema: true
    }
  },
  removeDataIslands: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_DATA_ISLANDS,
    changes: {
      schema: true,
      viewState: true
    }
  },
  removePresentationItems: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_REMOVE_PRESENTATION_ITEMS,
    changes: {
      schema: true,
      viewState: true
    }
  },
  changePresentationDesignerColumnSet: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_CHANGE_COLUMN_SET,
    changes: {
      viewState: true
    }
  },
  expandAllPresentationItems: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_EXPAND_ALL_PRESENTATION_ITEMS,
    changes: {
      viewState: true
    }
  },
  collapseAllPresentationItems: {
    event: applicationStateEventsEnum.PRESENTATION_DESIGNER_COLLAPSE_ALL_PRESENTATION_ITEMS,
    changes: {
      viewState: true
    }
  },
  // Filters Designer
  setFiltersDesignerSidebarSearchKeyword: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_SET_SIDEBAR_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  removeFilter: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_REMOVE_FILTER,
    changes: {
      schema: true
    }
  },
  setDraftFilter: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_SET_DRAFT_FILTER,
    skipHistory: true,
    changes: {
      viewState: true
    }
  },
  editDraftFilter: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_EDIT_DRAFT_FILTER,
    skipHistory: true,
    changes: {
      viewState: true
    }
  },
  cancelDraftFilter: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_CANCEL_DRAFT_FILTER,
    skipHistory: true,
    changes: {
      viewState: true
    }
  },
  updateFilter: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_UPDATE_FILTER,
    changes: {
      viewState: true,
      schema: true
    }
  },
  addFilter: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_ADD_FILTER,
    changes: {
      viewState: true,
      schema: true
    }
  },
  setFiltersDesignerCurrentResource: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_SELECT_RESOURCE,
    changes: {
      viewState: true
    }
  },
  setFiltersDesignerSearchKeyword: {
    event: applicationStateEventsEnum.FILTERS_DESIGNER_SET_SEARCH_KEYWORD,
    changes: {
      viewState: true
    }
  },
  // Calculated Fields Designer
  showCalculatedFieldsDesigner: {
    event: applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_SHOW,
    changes: {
      viewState: true
    }
  },
  hideCalculatedFieldsDesigner: {
    event: applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_HIDE,
    changes: {
      viewState: true
    }
  },
  createCalcField: {
    event: applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_CREATE_CALCULATED_FIELD,
    changes: {
      schema: true,
      viewState: true
    }
  },
  updateCalcField: {
    event: applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_UPDATE_CALCULATED_FIELD,
    changes: {
      schema: {
        schema: true,
        viewState: true
      }
    }
  },
  removeCalcField: {
    event: applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_REMOVE_CALCULATED_FIELD,
    changes: {
      schema: {
        entityType: schemaEntitiesEnum.CALC_FIELD
      }
    }
  },
  // Advanced Options
  removeBundle: {
    event: applicationStateEventsEnum.OPTIONS_DESIGNER_REMOVE_BUNDLE,
    changes: {
      resourceProperties: true
    }
  },
  addBundles: {
    event: applicationStateEventsEnum.OPTIONS_DESIGNER_ADD_BUNDLES,
    changes: {
      resourceProperties: true
    }
  },
  replaceBundles: {
    event: applicationStateEventsEnum.OPTIONS_DESIGNER_REPLACE_BUNDLES,
    changes: {
      resourceProperties: true
    }
  },
  generateBundleKeys: {
    event: applicationStateEventsEnum.OPTIONS_DESIGNER_GENERATE_BUNDLE_KEYS,
    changes: {
      schema: true
    }
  },
  addSecurityFile: {
    event: applicationStateEventsEnum.OPTIONS_DESIGNER_ADD_SECURITY_FILE,
    changes: {
      resourceProperties: true
    }
  },
  replaceSecurityFile: {
    event: applicationStateEventsEnum.OPTIONS_DESIGNER_REPLACE_SECURITY_FILE,
    changes: {
      resourceProperties: true
    }
  },
  removeSecurityFile: {
    event: applicationStateEventsEnum.OPTIONS_DESIGNER_REMOVE_SECURITY_FILE,
    changes: {
      resourceProperties: true
    }
  },
  uploadSchema: {
    event: applicationStateEventsEnum.OPTIONS_DESIGNER_UPLOAD_SCHEMA,
    changes: {
      schema: true,
      viewState: true
    }
  }
};

});