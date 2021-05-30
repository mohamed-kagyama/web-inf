define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../model/schema/enum/schemaEntitiesEnum");

var allCollectionsMixin = require("../../../model/schema/mixin/allCollectionsMixin");

var calcFieldsEnum = require("../enum/calcFieldsEnum");

var pathUtil = require("../../util/pathUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientDomainSchemaCalcFieldsService = function ClientDomainSchemaCalcFieldsService(options) {
  this.initialize(options);
};

_.extend(ClientDomainSchemaCalcFieldsService.prototype, allCollectionsMixin, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.domainSchemaService = options.domainSchemaService;
    this.mixInAllCollections(this.dataStore);
  },
  getCalculatedFieldJSON: function getCalculatedFieldJSON(fieldId) {
    var field = this.fields.byId(fieldId);
    return field && field.toJSON();
  },
  generateCalcFieldName: function generateCalcFieldName(options) {
    return this.domainSchemaService.generateCalcFieldName(options);
  },
  getCalcFieldsUsedInOtherCalcFields: function getCalcFieldsUsedInOtherCalcFields() {
    return this.fields.reduce(function (memo, field) {
      if (entityUtil.isCalcField(field)) {
        var calcField = field;
        memo = field.getFieldReferences().reduce(function (memo, fieldReference) {
          var fieldId = fieldReference.getFieldId(),
              fieldType = fieldReference.getFieldType(),
              calcFields = memo[fieldId];

          if (entityUtil.isCalcField(fieldType)) {
            if (!calcFields) {
              calcFields = [];
              memo[fieldId] = calcFields;
            }

            calcFields.push(calcField.getId());
          }

          return memo;
        }, memo);
      }

      return memo;
    }, {});
  },
  getCalcFieldValidationContext: function getCalcFieldValidationContext(options) {
    options = options || {};
    var sourceType = options.sourceType;

    if (entityUtil.isConstantGroup(sourceType)) {
      return this._getConstantCalcFieldValidationContext(options);
    } else if (entityUtil.isTableReference(sourceType)) {
      return this._getSingleTableCalcFieldValidationContext(options);
    } else if (entityUtil.isJoinTree(sourceType)) {
      return this._getCrossTableCalcFieldValidationContext(options);
    } else {
      throw new Error('Unknown validation context parent type');
    }
  },
  isCalcFieldUsedInComplexJoin: function isCalcFieldUsedInComplexJoin(calcFieldId) {
    return this.joins.some(function (join) {
      if (entityUtil.isComplexJoin(join)) {
        return join.getFieldReferences().find(function (fieldReference) {
          return fieldReference.getFieldId() === calcFieldId;
        });
      }
    });
  },
  isCalcFieldUsedInJoinExpression: function isCalcFieldUsedInJoinExpression(fieldId) {
    return this.joinExpressions.some(function (joinExpression) {
      return joinExpression.leftFieldId === fieldId || joinExpression.rightFieldId === fieldId || joinExpression.fieldId === fieldId;
    });
  },
  isConstantCalcField: function isConstantCalcField(calcFieldId) {
    var calcField = this.fields.byId(calcFieldId);

    if (!entityUtil.isCalcField(calcField)) {
      return false;
    }

    var fieldsUsedByCalcFields = calcField.getFieldReferences().map(function (fieldReference) {
      return fieldReference.getFieldId();
    });
    return this.isFieldsUsedByCalcFieldAreConstants(fieldsUsedByCalcFields);
  },
  isGlobalConstantCalcField: function isGlobalConstantCalcField(fieldId) {
    var field = this.fields.byId(fieldId);
    return entityUtil.isCalcField(field) && entityUtil.isConstantGroup(field.getSourceType());
  },
  isFieldsUsedByCalcFieldAreConstants: function isFieldsUsedByCalcFieldAreConstants(fields) {
    fields = _.isArray(fields) ? fields : [fields];
    fields = _.map(fields, function (field) {
      return _.isNumber(field) ? this.fields.byId(field) : field;
    }, this);
    var isAnyGenericFields = fields.some(function (field) {
      return entityUtil.isGenericField(field);
    }, this);

    if (isAnyGenericFields) {
      return false;
    }

    return fields.every(function (field) {
      return this.isFieldsUsedByCalcFieldAreConstants(field.getFieldReferences().map(function (fieldReference) {
        return fieldReference.getFieldId();
      }));
    }, this);
  },
  getDefaultConstantGroupName: function getDefaultConstantGroupName() {
    return calcFieldsEnum.DEFAULT_CONSTANT_GROUP_NAME;
  },
  getAllSlaveFields: function getAllSlaveFields(calcFieldId) {
    if (!calcFieldId) {
      return [];
    }

    var calcFieldsWithDependencies = this.fields.reduce(function (memo, field) {
      if (entityUtil.isCalcField(field)) {
        var calcField = field;
        memo = calcField.getFieldReferences().reduce(function (memo, fieldReference) {
          var calcFields = memo[calcField.getId()];

          if (!calcFields) {
            calcFields = [];
            memo[calcField.getId()] = calcFields;
          }

          calcFields.push(fieldReference);
          return memo;
        }, memo);
      }

      return memo;
    }, {});
    return _.uniq(this._getAllSlaveFieldsRecursive(calcFieldId, calcFieldsWithDependencies));
  },
  _getSingleTableCalcFieldValidationContext: function _getSingleTableCalcFieldValidationContext(options) {
    var sourceId = options.sourceId,
        calcFieldId = options.calcFieldId,
        tableReference = this.tableReferences.byId(sourceId),
        table = this.tables.byId(tableReference.getTableId()),
        regularFields = schemaModelUtil.getAllTableFields(table),
        calcFields = tableReference.getCalcFields();

    var allMasterCalcFields = this._getAllMasterCalcFields(calcFieldId);

    calcFields = this._groupCollectionByCircularReferences(calcFields, allMasterCalcFields);

    var emptyPrefixMapper = _.partial(this._calcFieldVariableContextMapper, '', tableReference);

    var allowed = [this._getConstantCalcFieldValidationContextForSingleAndCrossTableContexts(), regularFields.map(emptyPrefixMapper), calcFields.allowed.map(emptyPrefixMapper)];
    var forbidden = [calcFields.forbidden.map(emptyPrefixMapper)];
    return {
      allowed: _.flatten(allowed),
      forbidden: _.flatten(forbidden)
    };
  },
  _getTableCalcFieldValidationContextForCrossTable: function _getTableCalcFieldValidationContextForCrossTable(tableReferenceId) {
    var tableReference = this.tableReferences.byId(tableReferenceId),
        table = this.tables.byId(tableReference.getTableId()),
        regularFields = schemaModelUtil.getAllTableFields(table),
        calcFields = tableReference.getCalcFields(),
        tableReferenceNamePrefixMapper = _.partial(this._calcFieldVariableContextMapper, tableReference.getName(), tableReference);

    return _.flatten([regularFields.map(tableReferenceNamePrefixMapper), calcFields.map(tableReferenceNamePrefixMapper)]);
  },
  _getCrossTableCalcFieldValidationContext: function _getCrossTableCalcFieldValidationContext(options) {
    var sourceId = options.sourceId,
        calcFieldId = options.calcFieldId,
        joinTree = this.joinTrees.byId(sourceId),
        calcFields = joinTree.getCalcFields(),
        self = this;

    var allMasterCalcFields = this._getAllMasterCalcFields(calcFieldId);

    calcFields = this._groupCollectionByCircularReferences(calcFields, allMasterCalcFields);
    var allowed = [this._getConstantCalcFieldValidationContextForSingleAndCrossTableContexts()];
    allowed = joinTree.getJoinAliases().reduce(function (memo, joinAlias) {
      var tableReference = self.tableReferences.byId(joinAlias.getTableReferenceId()),
          table = self.tables.byId(tableReference.getTableId()),
          regularFields = schemaModelUtil.getAllTableFields(table),
          calcFields = tableReference.getCalcFields(),
          tableReferenceNamePrefixMapper = _.partial(self._calcFieldVariableContextMapper, joinAlias.getName(), joinAlias);

      var context = _.flatten([regularFields.map(tableReferenceNamePrefixMapper), calcFields.map(tableReferenceNamePrefixMapper)]);

      memo.push(context);
      return memo;
    }, allowed);

    var emptyPrefixMapper = _.partial(this._calcFieldVariableContextMapper, '', joinTree);

    allowed = allowed.concat([calcFields.allowed.map(emptyPrefixMapper)]);
    var forbidden = [calcFields.forbidden.map(emptyPrefixMapper)];
    return {
      allowed: _.flatten(allowed),
      forbidden: _.flatten(forbidden)
    };
  },
  _getConstantCalcFieldValidationContextForSingleAndCrossTableContexts: function _getConstantCalcFieldValidationContextForSingleAndCrossTableContexts() {
    var self = this;
    return this.constantGroups.reduce(function (memo, constantGroup) {
      var mapper = _.partial(self._calcFieldVariableContextMapper, constantGroup.getName(), constantGroup);

      return memo.concat(constantGroup.getCalcFields().map(mapper));
    }, []);
  },
  _getConstantCalcFieldValidationContext: function _getConstantCalcFieldValidationContext(options) {
    var calcFieldId = options.calcFieldId,
        sourceId = options.sourceId,
        sourceName = options.sourceName,
        constantGroup;

    if (sourceId) {
      constantGroup = this.constantGroups.byId(sourceId);
    } else if (sourceName) {
      constantGroup = this.constantGroups.byField('name', sourceName);
    } else {
      throw new Error('Could not determine constant group');
    }

    var allMasterCalcFields = this._getAllMasterCalcFields(calcFieldId);

    var allConstants = this.constantGroups.reduce(function (memo, constantGroup) {
      return memo.concat(constantGroup.getCalcFields().toArray());
    }, []);

    var constantGroups = this._groupCollectionByCircularReferences(allConstants, allMasterCalcFields);

    var reducer = _.bind(this._constantCalcFieldsReducer, this, constantGroup);

    return {
      allowed: constantGroups.allowed.reduce(reducer, []),
      forbidden: constantGroups.forbidden.reduce(reducer, [])
    };
  },
  _constantCalcFieldsReducer: function _constantCalcFieldsReducer(constantGroup, memo, calcField) {
    var source = this.constantGroups.byId(calcField.getSourceId());

    if (source.getId() === constantGroup.getId()) {
      memo.push(this._calcFieldVariableContextMapper('', source, calcField));
    }

    memo.push(this._calcFieldVariableContextMapper(source.getName(), source, calcField));
    return memo;
  },
  _calcFieldVariableContextMapper: function _calcFieldVariableContextMapper(prefix, source, field) {
    return {
      name: prefix ? pathUtil.join([prefix, field.getName()], '\\', '.') : field.getName(),
      type: field.getType(),
      fieldId: field.getId(),
      fieldType: entityUtil.getEntityName(field),
      sourceId: source.getId(),
      sourceType: entityUtil.getEntityName(source)
    };
  },
  _groupCollectionByCircularReferences: function _groupCollectionByCircularReferences(collection, allDependentCalcFields) {
    var result = {
      allowed: collection || [],
      forbidden: []
    };

    if (allDependentCalcFields.length > 0) {
      allDependentCalcFields = _.groupBy(allDependentCalcFields);
      result = {
        allowed: this._filterFieldsCollectionByCircularReferencePredicate({
          collection: collection,
          allDependentCalcFields: allDependentCalcFields,
          inverse: false
        }),
        forbidden: this._filterFieldsCollectionByCircularReferencePredicate({
          collection: collection,
          allDependentCalcFields: allDependentCalcFields,
          inverse: true
        })
      };
    }

    return result;
  },
  _filterFieldsCollectionByCircularReferencePredicate: function _filterFieldsCollectionByCircularReferencePredicate(options) {
    var collection = options.collection,
        inverse = options.inverse,
        allDependentCalcFields = options.allDependentCalcFields;

    var predicate = _.partial(this._calcFieldCircularReferenceContextPredicate, allDependentCalcFields, inverse);

    return collection ? collection.filter(predicate) : [];
  },
  _calcFieldCircularReferenceContextPredicate: function _calcFieldCircularReferenceContextPredicate(allDependentCalcFields, inverse, field) {
    var result = _.isUndefined(allDependentCalcFields[field.getId()]);

    return inverse ? !result : result;
  },
  _getAllMasterCalcFields: function _getAllMasterCalcFields(fieldId) {
    if (!fieldId) {
      return [];
    }

    var allCalcFieldsUsedInOtherCalcFields = this.getCalcFieldsUsedInOtherCalcFields(),
        allMasterCalcFieldsAsArray = this._getAllMasterCalcFieldsRecursive(fieldId, allCalcFieldsUsedInOtherCalcFields),
        allMasterCalcFieldsWithCalcFieldAsArray = [fieldId].concat(allMasterCalcFieldsAsArray);

    return _.uniq(allMasterCalcFieldsWithCalcFieldAsArray);
  },
  _getAllMasterCalcFieldsRecursive: function _getAllMasterCalcFieldsRecursive(calcFieldId, allCalcFieldsUsedInOtherCalcFields) {
    var masterCalcFields = allCalcFieldsUsedInOtherCalcFields[calcFieldId] || [];
    return _.reduce(masterCalcFields, function (memo, masterCalcFieldId) {
      memo.push(masterCalcFieldId);
      return memo.concat(this._getAllMasterCalcFieldsRecursive(masterCalcFieldId, allCalcFieldsUsedInOtherCalcFields));
    }, [], this);
  },
  _getAllSlaveFieldsRecursive: function _getAllSlaveFieldsRecursive(calcFieldId, calcFieldsWithDependencies) {
    var dependencies = calcFieldsWithDependencies[calcFieldId] || [];
    return _.reduce(dependencies, function (memo, dependency) {
      if (entityUtil.isCalcField(dependency.getFieldType())) {
        memo = memo.concat(this._getAllSlaveFieldsRecursive(dependency.getFieldId(), calcFieldsWithDependencies));
      }

      memo.push(dependency.getFieldId());
      return memo;
    }, [], this);
  }
});

module.exports = ClientDomainSchemaCalcFieldsService;

});