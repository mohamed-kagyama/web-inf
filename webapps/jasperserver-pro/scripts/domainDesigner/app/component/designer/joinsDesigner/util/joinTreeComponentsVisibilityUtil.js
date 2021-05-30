define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var joinsEnum = require("../../../../model/enum/joinsEnum");

var collectionComponentsVisibilityUtil = require("../../../../util/designer/collectionComponentsVisibilityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var matchSearchKeyword = collectionComponentsVisibilityUtil.matchSearchKeyword;

function isJoinTreeVisible(searchKeyword, joinTreeJson, options) {
  options = options || [];
  return matchSearchKeyword([joinTreeJson.name].concat(options), searchKeyword);
}

function isJoinVisible(searchKeyword, join, options) {
  options = options || [];
  var searchFields = [join.leftTableReference, join.rightTableReference, joinsEnum.joinTypes[join.type].label, String(join.weight)].concat(options);
  return matchSearchKeyword(searchFields, searchKeyword);
}

function isComplexJoinVisible(searchKeyword, complexJoin, options) {
  options = options || [];
  var searchFields = [complexJoin.leftTableReference, complexJoin.rightTableReference, joinsEnum.joinTypes[complexJoin.type].label, String(complexJoin.weight), complexJoin.expression].concat(options);
  return matchSearchKeyword(searchFields, searchKeyword);
}

function isJoinAliasVisible(searchKeyword, joinAlias, options) {
  options = options || [];
  return matchSearchKeyword([joinAlias.name].concat(options), searchKeyword);
}

function isJoinExpressionVisible(searchKeyword, joinExpression, options) {
  options = options || [];
  var searchFields = [joinExpression.leftField, joinExpression.rightField, joinExpression.leftJoinAlias, joinExpression.rightJoinAlias, joinsEnum.joinOperators[joinExpression.operator].label].concat(options);
  return matchSearchKeyword(searchFields, searchKeyword);
}

function isConstantJoinExpressionVisible(searchKeyword, constantJoinExpression, options) {
  options = options || [];
  var searchFields = [constantJoinExpression.field, constantJoinExpression.joinAlias, joinsEnum.joinOperators[constantJoinExpression.operator].label, constantJoinExpression.value].concat(options);
  return matchSearchKeyword(searchFields, searchKeyword);
}

module.exports = {
  isJoinTreeVisible: isJoinTreeVisible,
  isJoinVisible: isJoinVisible,
  isComplexJoinVisible: isComplexJoinVisible,
  isJoinAliasVisible: isJoinAliasVisible,
  isJoinExpressionVisible: isJoinExpressionVisible,
  isConstantJoinExpressionVisible: isConstantJoinExpressionVisible
};

});