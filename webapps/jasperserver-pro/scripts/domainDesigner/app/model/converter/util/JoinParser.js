define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var joinParserUtil = require("../../expression/joinParserUtil/joinParserUtil");

var joinExpressionUtil = require("../../expression/joinExpressionUtil");

var schemaEntitiesEnum = require("../../../../model/schema/enum/schemaEntitiesEnum");

var entityUtil = require("../../../../model/schema/util/entityUtil");

var schemaModelUtil = require("../../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function JoinParser(options) {
  this.entityFactory = options.entityFactory;
}

_.extend(JoinParser.prototype, {
  parseJoin: function parseJoin(options) {
    var joinJson = options.joinJson,
        joinTree = options.joinTree,
        collections = options.collections;
    var leftJoinAlias = joinTree.getJoinAliases().by({
      name: joinJson.left
    });
    var rightJoinAlias = joinTree.getJoinAliases().by({
      name: joinJson.right
    });
    var joinType = schemaEntitiesEnum.JOIN,
        expressions,
        join;

    try {
      expressions = joinParserUtil.parseJoin(joinJson.expression.object); // If at least one of expressions is invalid
      // we assume we can not parse whole join expression
      // If at least one of expressions is invalid
      // we assume we can not parse whole join expression

      _.each(expressions, function (expression) {
        this._checkJoinExpression({
          leftJoinAlias: leftJoinAlias,
          rightJoinAlias: rightJoinAlias,
          expressionJson: expression
        });
      }, this);
    } catch (e) {
      joinType = schemaEntitiesEnum.COMPLEX_JOIN;
    }

    if (joinType === schemaEntitiesEnum.JOIN) {
      join = this._createJoin({
        joinTree: joinTree,
        joinJson: joinJson,
        leftJoinAlias: leftJoinAlias,
        rightJoinAlias: rightJoinAlias,
        expressions: expressions,
        collections: collections
      });
    } else {
      join = this._createComplexJoin({
        joinTree: joinTree,
        joinJson: joinJson,
        leftJoinAlias: leftJoinAlias,
        rightJoinAlias: rightJoinAlias,
        collections: collections
      });
    }

    collections.joins.add(join);
    return join;
  },
  _createJoin: function _createJoin(options) {
    var joinTree = options.joinTree,
        joinJson = options.joinJson,
        leftJoinAlias = options.leftJoinAlias,
        rightJoinAlias = options.rightJoinAlias,
        expressions = options.expressions,
        collections = options.collections;
    var join = this.entityFactory.createJoin({
      joinTreeId: joinTree.getId(),
      weight: joinJson.weight,
      type: joinJson.type,
      leftJoinAliasId: leftJoinAlias.getId(),
      rightJoinAliasId: rightJoinAlias.getId()
    });

    var joinExpressions = _.map(expressions, function (expressionJson) {
      var expression;

      if (this._isConstantJoinExpression(expressionJson)) {
        expression = this._parseConstantJoinExpression({
          join: join,
          leftJoinAlias: leftJoinAlias,
          rightJoinAlias: rightJoinAlias,
          expression: expressionJson,
          collections: collections
        });
      } else {
        expression = this._parseJoinExpression({
          join: join,
          leftJoinAlias: leftJoinAlias,
          rightJoinAlias: rightJoinAlias,
          expression: expressionJson,
          collections: collections
        });
      }

      return expression;
    }, this);

    join.setJoinExpressions(joinExpressions);
    return join;
  },
  _createComplexJoin: function _createComplexJoin(options) {
    var joinTree = options.joinTree,
        joinJson = options.joinJson,
        leftJoinAlias = options.leftJoinAlias,
        rightJoinAlias = options.rightJoinAlias,
        collections = options.collections,
        self = this;
    var variables = joinExpressionUtil.collectJoinVariables(joinJson.expression.object);

    var fieldReferences = _.reduce(variables, function (memo, usedFieldNames, variable) {
      var joinAlias = joinTree.getJoinAliases().byField('name', variable),
          constantGroup = collections.constantGroups.byField('name', variable),
          fieldReferences = [];

      if (joinAlias) {
        var tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections),
            table = schemaModelUtil.getTableByTableReference(tableReference, collections);

        var allFieldAndCalcFields = _.indexBy(schemaModelUtil.getAllTableFields(table).concat(tableReference.getCalcFields().toArray()), 'name');

        fieldReferences = _.map(usedFieldNames, function (fieldName) {
          var field = allFieldAndCalcFields[fieldName];
          return self.entityFactory.createFieldReference({
            sourceId: joinAlias.getId(),
            sourceType: entityUtil.getEntityName(joinAlias),
            fieldId: field.getId(),
            fieldType: entityUtil.getEntityName(field)
          });
        });
      } else if (constantGroup) {
        fieldReferences = _.map(usedFieldNames, function (fieldName) {
          var field = constantGroup.getCalcFields().byField('name', fieldName);
          return self.entityFactory.createFieldReference({
            sourceId: constantGroup.getId(),
            sourceType: entityUtil.getEntityName(constantGroup),
            fieldId: field.getId(),
            fieldType: entityUtil.getEntityName(field)
          });
        });
      } else {
        throw new Error('Unknown join alias: ' + variable);
      }

      return memo.concat(fieldReferences);
    }, []);

    return this.entityFactory.createComplexJoin({
      joinTreeId: joinTree.getId(),
      weight: joinJson.weight,
      type: joinJson.type,
      leftJoinAliasId: leftJoinAlias.getId(),
      rightJoinAliasId: rightJoinAlias.getId(),
      expression: joinJson.expression,
      fieldReferences: fieldReferences
    });
  },
  _parseConstantJoinExpression: function _parseConstantJoinExpression(options) {
    var join = options.join,
        expression = options.expression,
        collections = options.collections,
        leftJoinAlias = options.leftJoinAlias,
        rightJoinAlias = options.rightJoinAlias,
        expressionAlias = expression.leftAlias,
        expressionField = expression.leftField,
        expressionValue = expression.rightValue,
        expressionOperator = expression.operator,
        joinAlias;

    if (leftJoinAlias.getName() === expressionAlias) {
      joinAlias = leftJoinAlias;
    } else if (rightJoinAlias.getName() === expressionAlias) {
      joinAlias = rightJoinAlias;
    }

    var tableReference = collections.tableReferences.byId(joinAlias.getTableReferenceId());
    var table = collections.tables.byId(tableReference.getTableId());
    var allTableFields = schemaModelUtil.getAllTableFields(table, collections).concat(tableReference.getCalcFields().toArray());

    var field = _.findWhere(allTableFields, {
      name: expressionField
    });

    var constantJoinExpression = this.entityFactory.createConstantJoinExpression({
      joinId: join.getId(),
      fieldId: field.getId(),
      joinAliasId: joinAlias.getId(),
      value: expressionValue,
      operator: expressionOperator
    });
    collections.joinExpressions.add(constantJoinExpression);
    return constantJoinExpression;
  },
  _parseJoinExpression: function _parseJoinExpression(options) {
    var join = options.join,
        leftJoinAlias = options.leftJoinAlias,
        rightJoinAlias = options.rightJoinAlias,
        expression = options.expression,
        collections = options.collections;
    var originalLeft = leftJoinAlias;

    if (leftJoinAlias.getName() !== expression.leftAlias) {
      leftJoinAlias = rightJoinAlias;
      rightJoinAlias = originalLeft;
    }

    var leftTableReference = collections.tableReferences.byId(leftJoinAlias.getTableReferenceId()),
        rightTableReference = collections.tableReferences.byId(rightJoinAlias.getTableReferenceId());
    var leftTable = collections.tables.byId(leftTableReference.getTableId()),
        rightTable = collections.tables.byId(rightTableReference.getTableId());
    var leftAvailableFields = schemaModelUtil.getAllTableFields(leftTable).concat(leftTableReference.getCalcFields().toArray());
    var rightAvailableFields = schemaModelUtil.getAllTableFields(rightTable).concat(rightTableReference.getCalcFields().toArray());

    var leftField = _.findWhere(leftAvailableFields, {
      name: expression.leftField
    });

    var rightField = _.findWhere(rightAvailableFields, {
      name: expression.rightField
    });

    var joinExpression = this.entityFactory.createJoinExpression({
      joinId: join.getId(),
      operator: expression.operator,
      leftJoinAliasId: leftJoinAlias.getId(),
      rightJoinAliasId: rightJoinAlias.getId(),
      leftFieldId: leftField.getId(),
      rightFieldId: rightField.getId()
    });
    collections.joinExpressions.add(joinExpression);
    return joinExpression;
  },
  _checkJoinExpression: function _checkJoinExpression(options) {
    var leftJoinAlias = options.leftJoinAlias,
        rightJoinAlias = options.rightJoinAlias,
        expression = options.expressionJson;

    if (this._isConstantJoinExpression(expression)) {
      if (leftJoinAlias.getName() !== expression.leftAlias && rightJoinAlias.getName() !== expression.leftAlias) {
        throw new Error('Invalid join expression');
      }
    } else {
      var originalLeft = leftJoinAlias;

      if (leftJoinAlias.getName() !== expression.leftAlias) {
        leftJoinAlias = rightJoinAlias;
        rightJoinAlias = originalLeft;
      }

      if (leftJoinAlias.getName() !== expression.leftAlias || rightJoinAlias.getName() !== expression.rightAlias) {
        throw new Error('Invalid join expression');
      }
    }
  },
  _isConstantJoinExpression: function _isConstantJoinExpression(expressionJson) {
    return !_.isUndefined(expressionJson.rightValue);
  }
});

module.exports = JoinParser;

});