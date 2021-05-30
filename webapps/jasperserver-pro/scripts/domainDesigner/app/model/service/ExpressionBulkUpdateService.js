define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var pathUtil = require("../../util/pathUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var dataSourceMetadataTypesEnum = require("../../../model/schema/enum/dataSourceMetadataTypesEnum");

var expressionVariables = require("../expression/expressionVariables");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ExpressionBulkUpdateService = function ExpressionBulkUpdateService(options) {
  this.initialize(options);
};

_.extend(ExpressionBulkUpdateService.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.validationService = options.validationService;
  },
  getUpdatedExpressions: function getUpdatedExpressions(options) {
    var allDependenciesWithExpressions = this._getAllDependenciesWithExpressions(options);

    if (allDependenciesWithExpressions.length === 0) {
      return $.Deferred().resolve([]);
    } else {
      return this._getUpdatedDependentExpressions(_.extend({}, options, {
        allDependenciesWithExpressions: allDependenciesWithExpressions
      }));
    }
  },
  _getAllDependenciesWithExpressions: function _getAllDependenciesWithExpressions(options) {
    var resourceId = options.resourceId,
        resourceType = options.resourceType,
        sourceId = options.sourceId;

    if (entityUtil.isCalcField(resourceType)) {
      return this.clientDomainSchemaService.getAllDependenciesWithExpressionsForField(resourceId, sourceId);
    } else if (entityUtil.isTableReference(resourceType)) {
      return this.clientDomainSchemaService.getAllDependenciesWithExpressionsForTableReference(resourceId);
    }
  },
  _getUpdatedDependentExpressions: function _getUpdatedDependentExpressions(options) {
    var expressions = this._convertDependenciesToServiceFormat(options),
        self = this;

    return this.validationService.validateDOMElCollection(expressions).then(function (result) {
      var resources = self._convertValidationResultToResourcesWhichShouldBeUpdated(result, options.allDependenciesWithExpressions);

      return $.Deferred().resolve(resources);
    });
  },
  _convertValidationResultToResourcesWhichShouldBeUpdated: function _convertValidationResultToResourcesWhichShouldBeUpdated(result, allDependenciesWithExpressions) {
    return result.expressionContexts.map(function (expressionContext, index) {
      var dependency = allDependenciesWithExpressions[index];
      return _.extend(_.omit(dependency, ['variables']), {
        expression: expressionContext.expression
      });
    });
  },
  _convertDependenciesToServiceFormat: function _convertDependenciesToServiceFormat(options) {
    var allDependenciesWithExpressions = options.allDependenciesWithExpressions;

    var mapper = _.bind(this._convertDependencyToServiceFormat, this, options);

    return allDependenciesWithExpressions.map(mapper);
  },
  _convertDependencyToServiceFormat: function _convertDependencyToServiceFormat(options, resource) {
    var expressionVariableRenamer = this._getExpressionVariableRenamer(options, resource);

    var allVariablesReducer = this._getAllVariablesReducer(options, resource);

    var entityType = resource.entityType,
        expressionObject = expressionVariables.updateVariableName(resource.expression.object, expressionVariableRenamer),
        variables = _.reduce(resource.variables, allVariablesReducer, []);

    var validationContext = {
      expression: {
        object: expressionObject
      },
      variables: variables
    };

    if (entityUtil.isComplexJoin(entityType)) {
      validationContext.resultType = dataSourceMetadataTypesEnum.Boolean;
    }

    return validationContext;
  },
  _getExpressionVariableRenamer: function _getExpressionVariableRenamer(options, resource) {
    var resourceType = options.resourceType;
    options = _.extend({
      variables: resource.variables
    }, options);

    if (entityUtil.isCalcField(resourceType)) {
      return _.bind(this._renameFieldPartInExpressionVariable, this, options);
    } else if (entityUtil.isTableReference(resourceType)) {
      return _.bind(this._renameTablePartInExpressionVariable, this, options);
    }
  },
  _getAllVariablesReducer: function _getAllVariablesReducer(options) {
    var resourceType = options.resourceType;

    if (entityUtil.isCalcField(resourceType)) {
      return _.bind(this._allVariablesFieldPartReducer, this, options);
    } else if (entityUtil.isTableReference(resourceType)) {
      return _.bind(this._allVariablesTablePartReducer, this, options);
    }
  },
  _allVariablesTablePartReducer: function _allVariablesTablePartReducer(options, memo, variable) {
    var newName = options.newName,
        originalName = options.originalName;
    var name;

    if (this._isVariableWithSameTableReferenceName(originalName, variable)) {
      name = pathUtil.join([newName, variable.fieldName], '\\', '.');
    } else {
      name = variable.name;
    }

    memo.push({
      name: name,
      type: variable.type
    });
    return memo;
  },
  _allVariablesFieldPartReducer: function _allVariablesFieldPartReducer(options, memo, variable) {
    var name = this._getVariableName(options, variable);

    memo.push({
      name: name,
      type: variable.type
    });
    return memo;
  },
  _renameTablePartInExpressionVariable: function _renameTablePartInExpressionVariable(options, variableName) {
    var originalName = options.originalName,
        newName = options.newName,
        variables = options.variables;
    var variable = variables[variableName];

    if (this._isVariableWithSameTableReferenceName(originalName, variable)) {
      return pathUtil.join([newName, variable.fieldName], '\\', '.');
    } else {
      return variableName;
    }
  },
  _renameFieldPartInExpressionVariable: function _renameFieldPartInExpressionVariable(options, variableName) {
    var variables = options.variables,
        variable = variables[variableName];
    return this._getVariableName(options, variable);
  },
  _getVariableName: function _getVariableName(options, variable) {
    var newName = options.newName,
        resourceId = options.resourceId;

    if (this._isVariableWithSameFieldId(resourceId, variable)) {
      if (variable.fieldOnlyVariable) {
        return newName;
      } else {
        return pathUtil.join([variable.sourceName, newName], '\\', '.');
      }
    }

    return variable.name;
  },
  _isVariableWithSameTableReferenceName: function _isVariableWithSameTableReferenceName(originalTableReferenceName, variable) {
    var tableReferenceName = variable.tableReferenceName || variable.sourceName;
    return tableReferenceName === originalTableReferenceName && !variable.fieldOnlyVariable;
  },
  _isVariableWithSameFieldId: function _isVariableWithSameFieldId(resourceId, variable) {
    return resourceId === variable.id;
  }
});

module.exports = ExpressionBulkUpdateService;

});