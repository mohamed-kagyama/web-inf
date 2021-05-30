define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var operandSideEnum = require("../../enum/operandSideEnum");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

var filterOperandTypesEnum = require("../../../../../../model/schema/enum/filterOperandTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerOnEditFilterConverter = function FiltersDesignerOnEditFilterConverter(options) {
  this.initialize(options);
};

function getFieldReferenceById(fieldReferences, fieldReferenceId) {
  return _.find(fieldReferences, function (fieldReference) {
    return fieldReference.id === fieldReferenceId;
  });
}

_.extend(FiltersDesignerOnEditFilterConverter.prototype, {
  initialize: function initialize(options) {
    this.onEditDraftFilterOperandSourceProvider = options.onEditDraftFilterOperandSourceProvider;
    this.filtersDesignerDraftFilterRightOperandConverter = options.filtersDesignerDraftFilterRightOperandConverter;
    this.filtersDesignerDraftFilterFactory = options.filtersDesignerDraftFilterFactory;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  convert: function convert(filterJSON) {
    var self = this,
        draftFilter = this._getDraftFilterFactoryOptions(filterJSON),
        newFilterOptions = {
      rightOperandType: draftFilter.expression.right.type,
      operator: draftFilter.expression.operator
    };

    return this.filtersDesignerDraftFilterFactory.create(draftFilter, newFilterOptions).then(function (draftFilter) {
      //In domain model we should store operand source as TABLE_REFERENCE
      //but if operand is a field from joined table we should update it's source to JOIN_TREE
      //for UI purposes (so D&D specifications will work ok)
      draftFilter = self._updateOperandsSource(draftFilter);
      return _.extend({}, draftFilter, {
        sourceId: null,
        sourceType: null
      });
    });
  },
  _updateOperandsSource: function _updateOperandsSource(draftFilter) {
    draftFilter = this._updateOperandSource({
      draftFilter: draftFilter,
      operandSide: operandSideEnum.LEFT
    });
    draftFilter = this._updateOperandSource({
      draftFilter: draftFilter,
      operandSide: operandSideEnum.RIGHT
    });
    return draftFilter;
  },
  _updateOperandSource: function _updateOperandSource(options) {
    var draftFilter = options.draftFilter,
        operandSide = options.operandSide,
        draftFilterClone = _.cloneDeep(draftFilter),
        operand = draftFilter.expression[operandSide];

    var operandSource = this.onEditDraftFilterOperandSourceProvider.getSource(draftFilter, operandSide);

    if (filterOperandTypeUtil.isVariable(operand.type) && !entityUtil.isConstantGroup(operand.sourceType)) {
      var newOperandValue = {};
      newOperandValue[operandSide] = _.extend({}, operand, operandSource);
      draftFilterClone.expression = _.extend({}, draftFilter.expression, newOperandValue);
    }

    return draftFilterClone;
  },
  _getDraftFilterFactoryOptions: function _getDraftFilterFactoryOptions(filterJSON) {
    var leftFieldReferenceId = filterJSON.expression.left.fieldReferenceId,
        rightFieldReferenceId = filterJSON.expression.right.fieldReferenceId;
    var leftFieldReference = getFieldReferenceById(filterJSON.fieldReferences, leftFieldReferenceId);
    var dataType = this.clientDomainSchemaService.getGenericFiledTypeById(leftFieldReference.fieldId);

    var leftOperand = this._getVariableOperand(filterJSON.fieldReferences, filterJSON.expression.left);

    var draftFilterFactoryOptions = {
      dataType: dataType,
      expression: {
        left: leftOperand,
        operator: filterJSON.expression.operator
      },
      sourceId: filterJSON.sourceId,
      sourceType: filterJSON.sourceType,
      id: filterJSON.id
    };
    var rightOperand;

    if (rightFieldReferenceId) {
      rightOperand = this._getVariableOperand(filterJSON.fieldReferences, filterJSON.expression.right);
    } else {
      rightOperand = filterJSON.expression.right;
    }

    var formattedRightOperand = this.filtersDesignerDraftFilterRightOperandConverter.convert(rightOperand, {
      dataType: dataType
    });
    draftFilterFactoryOptions.expression.right = formattedRightOperand || rightOperand;
    return draftFilterFactoryOptions;
  },
  _getVariableOperand: function _getVariableOperand(fieldReferences, operand) {
    var fieldReference = getFieldReferenceById(fieldReferences, operand.fieldReferenceId);
    return _.extend({}, _.omit(fieldReference, 'id'), {
      type: filterOperandTypesEnum.VARIABLE
    });
  }
});

module.exports = FiltersDesignerOnEditFilterConverter;

});