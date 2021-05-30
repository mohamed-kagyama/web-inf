define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../model/schema/enum/schemaEntitiesEnum");

var filterOperandTypesEnum = require("../../../model/schema/enum/filterOperandTypesEnum");

var entityUtil = require("../../../model/schema/util/entityUtil");

var pathUtil = require("../../util/pathUtil");

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FilterExpressionsSerializer = function FilterExpressionsSerializer(options) {
  this.initialize(options);
};

_.extend(FilterExpressionsSerializer.prototype, {
  initialize: function initialize(options) {
    this.complexFilterSerializer = options.complexFilterSerializer;
    this.filterSerializer = options.filterSerializer;
    this.filtersConcatenator = options.filtersConcatenator;
    this.filterExpressionAdapter = options.filterExpressionAdapter;
  },
  serializeTableReferenceFilters: function serializeTableReferenceFilters(tableReference, collections) {
    var options = {
      collections: collections
    };

    var tableReferenceFiltersMapper = _.bind(this._tableReferenceFiltersMapper, this, options);

    var filters = tableReference.getFilters().map(tableReferenceFiltersMapper);
    return this._serializeFilters(filters);
  },
  _tableReferenceFiltersMapper: function _tableReferenceFiltersMapper(options, filter) {
    var filterJSON = filter.toJSON(),
        fieldReferences = filter.getFieldReferences(),
        expression = filterJSON.expression;
    options = _.extend({
      fieldReferences: fieldReferences
    }, options);

    if (entityUtil.isComplexFilter(filter)) {
      return this._getComplexFilterJSON(filter);
    }

    var leftOperand = this._getTableReferenceFilterOperand(expression.left, options),
        rightOperand = this._getTableReferenceFilterOperand(expression.right, options);

    rightOperand = this._addFieldTypeToRightOperand(rightOperand, leftOperand.fieldType);
    return {
      left: leftOperand,
      operator: expression.operator,
      right: rightOperand
    };
  },
  _getTableReferenceFilterOperand: function _getTableReferenceFilterOperand(operand, options) {
    var field,
        source,
        fieldReference,
        collections = options.collections,
        fieldReferences = options.fieldReferences,
        fieldReferenceId = operand.fieldReferenceId,
        operandObj = _.extend({}, operand);

    if (filterOperandTypesEnum.VARIABLE === operand.type) {
      field = this._getFieldByFieldReferenceId(fieldReferenceId, {
        collections: collections,
        fieldReferences: fieldReferences
      });
      fieldReference = fieldReferences.findWhere({
        id: fieldReferenceId
      });
      source = schemaModelUtil.getResourceByIdAndType(fieldReference.getSourceId(), fieldReference.getSourceType(), collections);
      operandObj = {
        type: filterOperandTypesEnum.VARIABLE,
        fieldType: field.getType(),
        name: this._getTableReferenceFilterOperandVariableName(source, field)
      };
    }

    return operandObj;
  },
  _getTableReferenceFilterOperandVariableName: function _getTableReferenceFilterOperandVariableName(source, field) {
    if (entityUtil.isConstantGroup(source)) {
      return this._getVariableNameWithSourcePrefix(source.getName(), field.getName());
    }

    return field.getName();
  },
  serializeJoinTreeFilters: function serializeJoinTreeFilters(joinTree, collections) {
    var options = {
      collections: collections
    };

    var joinTreeFiltersMapper = _.bind(this._joinTreeFiltersMapper, this, options);

    var filters = joinTree.getFilters().map(joinTreeFiltersMapper);
    return this._serializeFilters(filters);
  },
  _joinTreeFiltersMapper: function _joinTreeFiltersMapper(options, filter) {
    var filterJSON = filter.toJSON(),
        fieldReferences = filter.getFieldReferences(),
        expression = filterJSON.expression;
    options = _.extend({
      fieldReferences: fieldReferences
    }, options);

    if (entityUtil.isComplexFilter(filter)) {
      return this._getComplexFilterJSON(filter);
    }

    var leftOperand = this._getJoinTreeFilterOperand(expression.left, options),
        rightOperand = this._getJoinTreeFilterOperand(expression.right, options);

    rightOperand = this._addFieldTypeToRightOperand(rightOperand, leftOperand.fieldType);
    return {
      left: leftOperand,
      operator: expression.operator,
      right: rightOperand
    };
  },
  _getComplexFilterJSON: function _getComplexFilterJSON(filter) {
    var filterJSON = filter.toJSON();
    return _.extend({}, filterJSON, {
      type: schemaEntitiesEnum.COMPLEX_FILTER
    });
  },
  _getJoinTreeFilterOperand: function _getJoinTreeFilterOperand(operand, options) {
    var field,
        source,
        fieldReference,
        fieldReferences = options.fieldReferences,
        fieldReferenceId = operand.fieldReferenceId,
        collections = options.collections,
        operandObj = _.extend({}, operand);

    if (filterOperandTypesEnum.VARIABLE === operand.type) {
      fieldReference = fieldReferences.findWhere({
        id: fieldReferenceId
      });
      field = this._getFieldByFieldReferenceId(fieldReferenceId, {
        collections: collections,
        fieldReferences: fieldReferences
      });
      source = schemaModelUtil.getResourceByIdAndType(fieldReference.getSourceId(), fieldReference.getSourceType(), collections);
      operandObj = {
        type: filterOperandTypesEnum.VARIABLE,
        fieldType: field.getType(),
        name: this._getJoinsFilterOperandVariableName(source, field)
      };
    }

    return operandObj;
  },
  _getFieldByFieldReferenceId: function _getFieldByFieldReferenceId(fieldReferenceId, options) {
    var fieldReferences = options.fieldReferences,
        collections = options.collections;
    var fieldReference = fieldReferences.findWhere({
      id: fieldReferenceId
    });
    return collections.fields.byId(fieldReference.getFieldId());
  },
  _getJoinsFilterOperandVariableName: function _getJoinsFilterOperandVariableName(source, field) {
    if (entityUtil.isJoinTree(source)) {
      return field.getName();
    }

    return this._getVariableNameWithSourcePrefix(source.getName(), field.getName());
  },
  _getVariableNameWithSourcePrefix: function _getVariableNameWithSourcePrefix(sourceName, fieldName) {
    return pathUtil.join([sourceName, fieldName], '\\', '.');
  },
  _addFieldTypeToRightOperand: function _addFieldTypeToRightOperand(rightOperand, fieldType) {
    if (!rightOperand.fieldType) {
      return _.extend({}, rightOperand, {
        fieldType: fieldType
      });
    }

    return rightOperand;
  },
  _serializeFilters: function _serializeFilters(filters) {
    filters = _.reduce(filters, function (memo, filter) {
      var filterObject;

      if (entityUtil.isComplexFilter(filter.type)) {
        filterObject = this.complexFilterSerializer.convert(filter);
      } else {
        filterObject = this.filterSerializer.convert(filter);
      }

      filterObject && memo.push(filterObject);
      return memo;
    }, [], this);
    return this.filterExpressionAdapter.getExpression(this.filtersConcatenator.concatenateFilters(filters));
  }
});

module.exports = FilterExpressionsSerializer;

});