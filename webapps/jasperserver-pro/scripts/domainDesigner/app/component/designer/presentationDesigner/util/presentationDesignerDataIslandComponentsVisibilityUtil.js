define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var collectionComponentsVisibilityUtil = require("../../../../util/designer/collectionComponentsVisibilityUtil");

var presentationFieldsMeasureOrDimensionEnum = require("../../../../model/enum/presentationFieldsMeasureOrDimensionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var matchSearchKeyword = collectionComponentsVisibilityUtil.matchSearchKeyword;
var isOneOfTheNodesVisible = collectionComponentsVisibilityUtil.isOneOfTheNodesVisible;

function isDataIslandVisible(searchKeyword, dataIslandJson) {
  return matchSearchKeyword([dataIslandJson.name || '', dataIslandJson.label || '', dataIslandJson.labelId || '', dataIslandJson.description || '', dataIslandJson.descriptionId || ''], searchKeyword);
}

function isDataIslandOrOneOfItsNodesVisible(searchKeyword, dataIslandJson) {
  return isDataIslandVisible(searchKeyword, dataIslandJson) || isOneOfTheNodesVisible(dataIslandJson.nodes);
}

function isPresentationSetVisible(searchKeyword, presentationSetJson) {
  return matchSearchKeyword([presentationSetJson.name || '', presentationSetJson.label || '', presentationSetJson.labelId || '', presentationSetJson.description || '', presentationSetJson.descriptionId || ''], searchKeyword);
}

function isPresentationSetVisibleOrOneOfItsNodesVisible(searchKeyword, presentationSetJson) {
  return isPresentationSetVisible(searchKeyword, presentationSetJson) || isOneOfTheNodesVisible(presentationSetJson.nodes);
}

function isPresentationFieldVisible(searchKeyword, presentationFieldJson) {
  var localizedKind = presentationFieldsMeasureOrDimensionEnum[presentationFieldJson.kind];
  return matchSearchKeyword([presentationFieldJson.name || '', presentationFieldJson.label || '', presentationFieldJson.labelId || '', presentationFieldJson.description || '', presentationFieldJson.descriptionId || '', presentationFieldJson.mask || '', localizedKind || '', presentationFieldJson.aggregation || ''], searchKeyword);
}

module.exports = {
  isDataIslandVisible: isDataIslandVisible,
  isDataIslandOrOneOfItsNodesVisible: isDataIslandOrOneOfItsNodesVisible,
  isPresentationSetVisible: isPresentationSetVisible,
  isPresentationSetVisibleOrOneOfItsNodesVisible: isPresentationSetVisibleOrOneOfItsNodesVisible,
  isPresentationFieldVisible: isPresentationFieldVisible
};

});