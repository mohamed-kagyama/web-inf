define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var filterTypeUtil = require("../../util/filterTypeUtil");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OnSaveDraftFilterSourceByExpressionProvider = function OnSaveDraftFilterSourceByExpressionProvider(options) {
  this.initialize(options);
};

_.extend(OnSaveDraftFilterSourceByExpressionProvider.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  getSource: function getSource(expression) {
    var left = expression.left,
        right = expression.right;

    if (filterTypeUtil.isFieldToFieldFilter(left.type, right.type)) {
      return this._getFieldToFieldFilterSource(left, right);
    } else {
      return this._getFieldToValueFilterSource(left);
    }
  },
  _getFieldToFieldFilterSource: function _getFieldToFieldFilterSource(left, right) {
    var source = {
      sourceType: schemaEntitiesEnum.JOIN_TREE
    },
        sourceOperand;

    if (isOneOfFieldsFromJoinTree(left, right)) {
      sourceOperand = entityUtil.isJoinTree(left.sourceType) ? left : right;
      source.sourceId = sourceOperand.sourceId;
    } else if (isBothFieldsFromDifferentJoinAliases(left, right)) {
      source.sourceId = this.clientDomainSchemaService.getJoinTreeIdByJoinAliasId(left.sourceId);
    } else if (isBothFieldsFromSameJoinAliases(left, right)) {
      source.sourceId = this.clientDomainSchemaService.getTableReferenceIdByJoinAliasId(left.sourceId);
    } else {
      sourceOperand = entityUtil.isConstantGroup(left.sourceType) ? right : left;
      source = this._getFieldToValueFilterSource(sourceOperand);
    }

    return source;
  },
  _getFieldToValueFilterSource: function _getFieldToValueFilterSource(left) {
    var source = {
      sourceType: schemaEntitiesEnum.TABLE_REFERENCE
    };

    if (entityUtil.isJoinTree(left.sourceType)) {
      source.sourceId = left.sourceId;
      source.sourceType = schemaEntitiesEnum.JOIN_TREE;
    } else if (entityUtil.isJoinAlias(left.sourceType)) {
      source.sourceId = this.clientDomainSchemaService.getTableReferenceIdByJoinAliasId(left.sourceId);
    } else if (entityUtil.isTableReference(left.sourceType)) {
      source.sourceId = left.sourceId;
    }

    return source;
  }
});

function isOneOfFieldsFromJoinTree(left, right) {
  return entityUtil.isJoinTree(left.sourceType) || entityUtil.isJoinTree(right.sourceType);
}

function isBothFieldsFromJoinAliases(left, right) {
  return entityUtil.isJoinAlias(left.sourceType) && entityUtil.isJoinAlias(right.sourceType);
}

function isBothFieldsFromDifferentJoinAliases(left, right) {
  return isBothFieldsFromJoinAliases(left, right) && left.sourceId !== right.sourceId;
}

function isBothFieldsFromSameJoinAliases(left, right) {
  return isBothFieldsFromJoinAliases(left, right) && left.sourceId !== right.sourceId;
}

module.exports = OnSaveDraftFilterSourceByExpressionProvider;

});