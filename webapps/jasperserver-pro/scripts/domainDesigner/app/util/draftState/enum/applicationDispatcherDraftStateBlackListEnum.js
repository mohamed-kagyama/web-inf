define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draftStateTypesEnum = require("../../../model/enum/draftStateTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var allDraftStates = _.values(draftStateTypesEnum);

module.exports = {
  clearDraftState: allDraftStates,
  expandSidebarNode: allDraftStates,
  collapseSidebarNode: allDraftStates,
  // Filters designer
  setFiltersDesignerSidebarSearchKeyword: [draftStateTypesEnum.DRAFT_FILTER],
  cancelDraftFilter: [draftStateTypesEnum.DRAFT_FILTER],
  setFiltersDesignerCurrentResource: [draftStateTypesEnum.DRAFT_FILTER],
  addFilter: [draftStateTypesEnum.DRAFT_FILTER],
  updateFilter: [draftStateTypesEnum.DRAFT_FILTER],
  setDraftFilter: [draftStateTypesEnum.DRAFT_FILTER],
  // Joins designer
  setJoinsDesignerCurrentResource: [draftStateTypesEnum.JOIN_CONSTRUCTOR, draftStateTypesEnum.DRAFT_JOIN_TREE],
  setJoinsDesignerSidebarSearchKeyword: [draftStateTypesEnum.JOIN_CONSTRUCTOR, draftStateTypesEnum.DRAFT_JOIN_TREE],
  setJoinsDesignerSearchKeyword: [draftStateTypesEnum.JOIN_CONSTRUCTOR, draftStateTypesEnum.DRAFT_JOIN_TREE],
  toggleJoinTree: [draftStateTypesEnum.JOIN_CONSTRUCTOR, draftStateTypesEnum.DRAFT_JOIN_TREE],
  toggleJoin: [draftStateTypesEnum.JOIN_CONSTRUCTOR, draftStateTypesEnum.DRAFT_JOIN_TREE],
  setJoinsDesignerJoinConstructorState: [draftStateTypesEnum.JOIN_CONSTRUCTOR],
  setJoinsDesignerDraftJoinTreeState: [draftStateTypesEnum.DRAFT_JOIN_TREE],
  createJoinTreeWithJoinExpression: [draftStateTypesEnum.DRAFT_JOIN_TREE],
  createJoinExpression: [draftStateTypesEnum.JOIN_CONSTRUCTOR]
};

});