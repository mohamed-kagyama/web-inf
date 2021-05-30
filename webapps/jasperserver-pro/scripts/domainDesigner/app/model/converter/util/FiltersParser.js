define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var expressionVariables = require('../../expression/expressionVariables');

var pathUtil = require("../../../util/pathUtil");

var calcFieldsEnum = require("../../enum/calcFieldsEnum");

var filterOperandTypesEnum = require("../../../../model/schema/enum/filterOperandTypesEnum");

var schemaModelUtil = require("../../../../model/schema/util/schemaModelUtil");

var entityUtil = require("../../../../model/schema/util/entityUtil");

var filterParserUtil = require("../../expression/filterParserUtil/filterParserUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var collectExpressionVariables = expressionVariables.collect;

var FiltersParser = function FiltersParser(options) {
  this.entityFactory = options.entityFactory;
};

_.extend(FiltersParser.prototype, {
  parseFilterExpression: function parseFilterExpression(options) {
    var filterExpression = options.filterExpression,
        parent = options.parent,
        collections = options.collections;

    if (!filterExpression) {
      return;
    }

    var parsedFilterExpressions = filterParserUtil.parseFilter(filterExpression) || [];

    this._createFilterExpressions({
      parsedFilterExpressions: parsedFilterExpressions,
      parent: parent,
      collections: collections
    });
  },
  _createFilterExpressions: function _createFilterExpressions(options) {
    var collections = options.collections,
        parent = options.parent,
        parsedFilterExpressions = options.parsedFilterExpressions;

    _.each(parsedFilterExpressions, function (parsedFilterExpression) {
      var filterExpressionJSON, filterExpressionEntity;

      if (entityUtil.isComplexFilter(parsedFilterExpression.type)) {
        filterExpressionJSON = this._getComplexFilterExpressionJSON({
          parsedFilterExpression: parsedFilterExpression,
          collections: collections,
          parent: parent
        });
        filterExpressionEntity = this.entityFactory.createComplexFilter(filterExpressionJSON);
      } else {
        filterExpressionJSON = this._getFilterExpressionJSON({
          parsedFilterExpression: parsedFilterExpression,
          collections: collections,
          parent: parent
        });
        filterExpressionEntity = this.entityFactory.createFilterExpression(filterExpressionJSON);
      }

      collections.filters.add(filterExpressionEntity);
      parent.addFilter(filterExpressionEntity);
    }, this);
  },
  _getComplexFilterExpressionJSON: function _getComplexFilterExpressionJSON(options) {
    var parent = options.parent,
        expression = options.parsedFilterExpression.expression;
    return {
      sourceId: parent.getId(),
      sourceType: entityUtil.getEntityName(parent),
      expression: expression,
      fieldReferences: this._createFieldReferencesForComplexFilterExpression(expression, {
        parent: options.parent,
        collections: options.collections
      })
    };
  },
  _createFieldReferencesForComplexFilterExpression: function _createFieldReferencesForComplexFilterExpression(expression, options) {
    var parent = options.parent,
        collections = options.collections,
        expressionVariables = collectExpressionVariables(expression);
    return this._createFieldReferencesByExpressionVariables(expressionVariables, {
      parent: parent,
      collections: collections
    });
  },
  _createFieldReferencesByExpressionVariables: function _createFieldReferencesByExpressionVariables(expressionVariables, options) {
    var parent = options.parent,
        collections = options.collections;
    return _.map(expressionVariables, function (fieldName) {
      var field = this._getFieldUsedInExpression({
        fieldName: fieldName,
        collections: collections,
        parent: parent
      });

      var source = this._getFieldSourceUsedInExpression({
        parent: parent,
        collections: collections,
        field: field
      });

      return this.entityFactory.createFieldReference({
        fieldId: field.getId(),
        fieldType: entityUtil.getEntityName(field),
        sourceId: source.getId(),
        sourceType: entityUtil.getEntityName(source)
      });
    }, this);
  },
  _getFilterExpressionJSON: function _getFilterExpressionJSON(options) {
    var parent = options.parent;

    var fieldReferences = this._createFieldReferencesForFilterExpression(options);

    var filterExpressionJSON = {
      sourceId: parent.getId(),
      sourceType: entityUtil.getEntityName(parent),
      expression: {
        left: {},
        operator: options.parsedFilterExpression.operator,
        right: {}
      },
      fieldReferences: fieldReferences
    };
    options = _.extend({}, options, {
      fieldReferences: fieldReferences
    });
    filterExpressionJSON.expression.left = this._getFilterExpressionLeftOperand(options);
    filterExpressionJSON.expression.right = this._getFilterExpressionRightOperand(options);
    return filterExpressionJSON;
  },
  _createFieldReferencesForFilterExpression: function _createFieldReferencesForFilterExpression(options) {
    var parent = options.parent,
        collections = options.collections,
        leftOperand = options.parsedFilterExpression.left,
        rightOperand = options.parsedFilterExpression.right;
    var expressionVariables = [];

    if (leftOperand.type === filterOperandTypesEnum.VARIABLE) {
      expressionVariables.push(leftOperand.name);
    }

    if (rightOperand.type === filterOperandTypesEnum.VARIABLE) {
      expressionVariables.push(rightOperand.name);
    }

    return this._createFieldReferencesByExpressionVariables(expressionVariables, {
      parent: parent,
      collections: collections
    });
  },
  _getFilterExpressionLeftOperand: function _getFilterExpressionLeftOperand(options) {
    var fieldReferences = options.fieldReferences,
        parsedFilterExpressionLeftOperand = options.parsedFilterExpression.left;
    return this._getFilterExpressionOperand({
      fieldReference: _.first(fieldReferences),
      parsedFilterExpressionOperand: parsedFilterExpressionLeftOperand
    });
  },
  _getFilterExpressionRightOperand: function _getFilterExpressionRightOperand(options) {
    var fieldReferences = options.fieldReferences,
        parsedFilterExpressionRightOperand = options.parsedFilterExpression.right;
    return this._getFilterExpressionOperand({
      fieldReference: _.last(fieldReferences),
      parsedFilterExpressionOperand: parsedFilterExpressionRightOperand
    });
  },
  _getFilterExpressionOperand: function _getFilterExpressionOperand(options) {
    var operand,
        fieldReference = options.fieldReference,
        parsedFilterExpressionOperand = options.parsedFilterExpressionOperand;

    if (parsedFilterExpressionOperand.type === filterOperandTypesEnum.LITERAL) {
      operand = {
        type: filterOperandTypesEnum.LITERAL,
        value: parsedFilterExpressionOperand.value
      };
    } else if (parsedFilterExpressionOperand.type === filterOperandTypesEnum.VARIABLE) {
      operand = {
        type: filterOperandTypesEnum.VARIABLE,
        fieldReferenceId: fieldReference.getId()
      };
    } else if (parsedFilterExpressionOperand.type === filterOperandTypesEnum.RANGE) {
      operand = {
        type: filterOperandTypesEnum.RANGE,
        start: parsedFilterExpressionOperand.start,
        end: parsedFilterExpressionOperand.end
      };
    } else if (parsedFilterExpressionOperand.type === filterOperandTypesEnum.LIST) {
      operand = {
        type: filterOperandTypesEnum.LIST,
        items: parsedFilterExpressionOperand.items
      };

      if (parsedFilterExpressionOperand.isAll) {
        operand = _.extend({}, operand, {
          isAll: parsedFilterExpressionOperand.isAll
        });
      }
    }

    return operand;
  },
  _getFieldUsedInExpression: function _getFieldUsedInExpression(options) {
    var fieldName = options.fieldName,
        collections = options.collections,
        parent = options.parent;

    if (this._isConstantGroupField(fieldName)) {
      return this._getFieldByNameInConstantGroupsScope({
        fieldName: fieldName,
        collections: collections
      });
    } else if (entityUtil.isJoinTree(parent)) {
      return this._getFieldByNameInJoinTreeScope({
        fieldName: fieldName,
        collections: collections,
        joinTree: parent
      });
    } else {
      return this._getFieldByNameInTableReferenceScope({
        fieldName: fieldName,
        collections: collections,
        tableReference: parent
      });
    }
  },
  _isConstantGroupField: function _isConstantGroupField(fieldName) {
    var fieldNameComponents = this._splitFieldNameBySeparator(fieldName);

    return fieldNameComponents.length > 1 && fieldNameComponents[0] === calcFieldsEnum.DEFAULT_CONSTANT_GROUP_NAME;
  },
  _getFieldByNameInConstantGroupsScope: function _getFieldByNameInConstantGroupsScope(options) {
    var fieldName = options.fieldName,
        collections = options.collections,
        fieldNameComponents = this._splitFieldNameBySeparator(fieldName),
        constantGroup = collections.constantGroups.findWhere({
      name: fieldNameComponents[0]
    });

    return constantGroup.getCalcFields().findWhere({
      name: fieldNameComponents[1]
    });
  },
  _getFieldByNameInTableReferenceScope: function _getFieldByNameInTableReferenceScope(options) {
    var tableReference = options.tableReference,
        fieldName = options.fieldName,
        collections = options.collections;
    var fields = schemaModelUtil.getTableFieldsByTableReference(tableReference, collections).concat(tableReference.getCalcFields().toArray());
    return this._findFieldByName(fieldName, fields);
  },
  _getFieldByNameInJoinTreeScope: function _getFieldByNameInJoinTreeScope(options) {
    var fieldName = options.fieldName,
        joinTree = options.joinTree,
        collections = options.collections,
        fields;

    var fieldNameComponents = this._splitFieldNameBySeparator(fieldName),
        isCrossCalcField = fieldNameComponents.length === 1;

    if (isCrossCalcField) {
      return joinTree.getCalcFields().findWhere({
        name: fieldNameComponents[0]
      });
    }

    var joinAlias = joinTree.getJoinAliases().findWhere({
      name: fieldNameComponents[0]
    });
    fields = schemaModelUtil.getCalcFieldsByJoinAlias(joinAlias, collections).concat(schemaModelUtil.getTableFieldsByJoinAlias(joinAlias, collections));
    return this._findFieldByName(fieldNameComponents[1], fields);
  },
  _splitFieldNameBySeparator: function _splitFieldNameBySeparator(fieldName) {
    return pathUtil.split(fieldName, '\\', '.');
  },
  _getFieldSourceUsedInExpression: function _getFieldSourceUsedInExpression(options) {
    var parent = options.parent,
        collections = options.collections,
        field = options.field,
        isCalcField = entityUtil.isCalcField(field),
        isConstantGroupCalcField = isCalcField && entityUtil.isConstantGroup(field.getSourceType()),
        isCrossTableCalcField = isCalcField && entityUtil.isJoinTree(field.getSourceType());
    var source = parent;

    if (isConstantGroupCalcField) {
      return collections.constantGroups.byId(field.getSourceId());
    } else if (entityUtil.isJoinTree(parent) && !isCrossTableCalcField) {
      source = parent.getJoinAliases().find(function (joinAlias) {
        var fieldSourceByJoinAlias, fieldSourceId;

        if (isCalcField) {
          fieldSourceByJoinAlias = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections);
          fieldSourceId = field.getSourceId();
        } else {
          fieldSourceByJoinAlias = schemaModelUtil.getTableByJoinAlias(joinAlias, collections);
          fieldSourceId = field.getTableId();
        }

        return fieldSourceByJoinAlias.getId() === fieldSourceId;
      });
    }

    return source;
  },
  _findFieldByName: function _findFieldByName(name, fields) {
    return _.find(fields, function (field) {
      return field.getName() === name;
    });
  }
});

module.exports = FiltersParser;

});