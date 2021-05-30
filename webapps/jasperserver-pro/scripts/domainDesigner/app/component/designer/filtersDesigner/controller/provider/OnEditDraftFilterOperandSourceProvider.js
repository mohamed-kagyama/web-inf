define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var filterTypeUtil = require("../../util/filterTypeUtil");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OnEditDraftFilterOperandSourceProvider = function OnEditDraftFilterOperandSourceProvider(options) {
  this.initialize(options);
};

_.extend(OnEditDraftFilterOperandSourceProvider.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  getSource: function getSource(draftFilter, side) {
    var expression = draftFilter.expression,
        left = expression.left,
        right = expression.right;

    if (filterTypeUtil.isFieldToFieldFilter(left.type, right.type)) {
      return this._getFieldToFieldFilterSource(draftFilter, side);
    } else {
      return this._getFieldToValueFilterSource(left);
    }
  },
  _getFieldToFieldFilterSource: function _getFieldToFieldFilterSource(draftFilter, side) {
    var expression = draftFilter.expression,
        operand = expression[side];

    if (entityUtil.isJoinTree(draftFilter.sourceType)) {
      return {
        sourceId: operand.sourceId,
        sourceType: operand.sourceType
      };
    } else {
      var variable = this._getAnyVariable(draftFilter);

      return this._getFieldToValueFilterSource(variable);
    }
  },
  _getAnyVariable: function _getAnyVariable(draftFilter) {
    var expression = draftFilter.expression,
        left = expression.left,
        right = expression.right;

    if (filterOperandTypeUtil.isVariable(left.type) && !entityUtil.isConstantGroup(left.sourceType)) {
      return left;
    } else {
      return right;
    }
  },
  _getFieldToValueFilterSource: function _getFieldToValueFilterSource(variableOperand) {
    var sourceId = variableOperand.sourceId,
        joinAliasId = this.clientDomainSchemaService.getJoinAliasIdByTableReferenceId(sourceId);

    if (joinAliasId) {
      return {
        sourceId: joinAliasId,
        sourceType: schemaEntitiesEnum.JOIN_ALIAS
      };
    }

    return {
      sourceId: variableOperand.sourceId,
      sourceType: variableOperand.sourceType
    };
  }
});

module.exports = OnEditDraftFilterOperandSourceProvider;

});