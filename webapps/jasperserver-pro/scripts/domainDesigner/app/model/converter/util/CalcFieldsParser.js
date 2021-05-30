define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var pathUtil = require("../../../util/pathUtil");

var expressionVariables = require('../../expression/expressionVariables');

var serverSchemaResourceTypeUtil = require("../../util/serverSchemaResourceTypeUtil");

var entityUtil = require("../../../../model/schema/util/entityUtil");

var CanNotParseDependenciesException = require("../exception/CanNotParseDependenciesException");

var CircularReferenceException = require("../exception/CircularReferenceException");

var IllegalCalcFieldUsageException = require("../exception/IllegalCalcFieldUsageException");

var schemaModelUtil = require("../../../../model/schema/util/schemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EMPTY_CALC_FIELD_SCOPE = '';
var collectExpressionVariables = expressionVariables.collect;

function CalcFieldsParser(options) {
  this.entityFactory = options.entityFactory;
}

_.extend(CalcFieldsParser.prototype, {
  parseConstantGroups: function parseConstantGroups(options) {
    var constantGroups = options.constantGroups,
        collections = options.collections,
        self = this;

    var allConstantGroups = this._getAllConstantGroups(constantGroups);

    var notParsedConstants = this._getNotParsedConstants(constantGroups);

    var notParsedConstantsSize = this._getNotParsedConstantsSize(notParsedConstants);

    while (notParsedConstantsSize > 0) {
      notParsedConstants = _.keys(notParsedConstants).reduce(function (memo, name) {
        var constantGroup = allConstantGroups[name],
            notParsedConstantsForCurrentGroup = notParsedConstants[name];

        if (notParsedConstantsForCurrentGroup.length > 0) {
          var scopedFieldsCollections = self._getScopedFieldsCollectionForConstantGroup(constantGroup, allConstantGroups),
              notParsed = [];

          try {
            self._parseCalcFields({
              collections: collections,
              scopedFieldsCollections: scopedFieldsCollections,
              calcFieldsJson: notParsedConstants[constantGroup.getName()],
              parent: constantGroup,
              parentCollection: constantGroup.getCalcFields()
            });
          } catch (e) {
            if (e instanceof CircularReferenceException) {
              notParsed = e.getNotParsedCalcFields();
            } else {
              throw e;
            }
          }

          memo[name] = notParsed;
        }

        return memo;
      }, notParsedConstants);

      var newSize = this._getNotParsedConstantsSize(notParsedConstants);

      if (newSize === notParsedConstantsSize) {
        // No calc fields was parsed during this iteration
        // this either means that calc fields are incorrect, or they
        // contains circular reference
        throw new CircularReferenceException('Circular reference found', notParsedConstants);
      }

      notParsedConstantsSize = newSize;
    }

    _.each(allConstantGroups, function (entry) {
      collections.constantGroups.add(entry);
    });
  },
  _getScopedFieldsCollectionForConstantGroup: function _getScopedFieldsCollectionForConstantGroup(currentConstantGroup, allConstantGroups) {
    return _.values(allConstantGroups).reduce(function (memo, constantGroup) {
      var scope = [{
        source: constantGroup,
        collection: constantGroup.getCalcFields()
      }];

      if (constantGroup === currentConstantGroup) {
        memo[EMPTY_CALC_FIELD_SCOPE] = scope;
      }

      memo[constantGroup.getName()] = scope;
      return memo;
    }, {});
  },
  _getAllConstantGroups: function _getAllConstantGroups(constantGroups) {
    var self = this;
    return constantGroups.reduce(function (memo, constantGroupJson) {
      var name = constantGroupJson.name;
      var constantGroup = self.entityFactory.createConstantGroup({
        name: name
      });
      memo[name] = constantGroup;
      return memo;
    }, {});
  },
  _getNotParsedConstants: function _getNotParsedConstants(constantGroups) {
    return constantGroups.reduce(function (memo, constantGroupJson) {
      memo[constantGroupJson.name] = _.clone(constantGroupJson.elements).map(function (notParsedCalcField) {
        return notParsedCalcField.element;
      });
      return memo;
    }, {});
  },
  _getNotParsedConstantsSize: function _getNotParsedConstantsSize(notParsedConstants) {
    return _.values(notParsedConstants).reduce(function (memo, value) {
      return memo + value.length;
    }, 0);
  },
  parseSingleTableCalcFields: function parseSingleTableCalcFields(options) {
    var table = options.table,
        tableReference = options.tableReference,
        collections = options.collections,
        elements = options.elements,
        calcFieldsCollection = tableReference.getCalcFields();

    var calcFields = this._filterSingleTableCalcFields(elements);

    if (_.size(calcFields) > 0) {
      var scopedFieldsCollections = this._getScopedCollectionsForSingleTableCalcFields({
        collections: collections,
        table: table,
        tableReference: tableReference,
        calcFieldsCollection: calcFieldsCollection
      });

      this._parseCalcFields({
        parent: tableReference,
        parentCollection: calcFieldsCollection,
        collections: collections,
        scopedFieldsCollections: scopedFieldsCollections,
        calcFieldsJson: calcFields
      });
    }
  },
  parseCrossTableCalcFields: function parseCrossTableCalcFields(options) {
    var collections = options.collections,
        joinTree = options.joinTree,
        crossTableCalcFields = joinTree.getCalcFields(),
        elements = options.elements;

    var calcFields = this._filterCrossTableCalcFields(elements);

    if (_.size(calcFields) > 0) {
      var scopedFieldsCollections = this._getScopedCollectionsForCrossTableCalcFields({
        collections: collections,
        joinTree: joinTree,
        crossTableCalcFields: crossTableCalcFields
      });

      this._parseCalcFields({
        parent: joinTree,
        parentCollection: crossTableCalcFields,
        collections: collections,
        scopedFieldsCollections: scopedFieldsCollections,
        calcFieldsJson: calcFields
      });
    }
  },
  _getScopedCollectionsForConstantGroup: function _getScopedCollectionsForConstantGroup(collections) {
    return collections.constantGroups.reduce(function (memo, constantGroup) {
      memo[constantGroup.getName()] = [{
        source: constantGroup,
        collection: constantGroup.getCalcFields()
      }];
      return memo;
    }, {});
  },
  _getScopedCollectionsForSingleTableCalcFields: function _getScopedCollectionsForSingleTableCalcFields(options) {
    var collections = options.collections,
        calcFieldsCollection = options.calcFieldsCollection,
        table = options.table,
        tableReference = options.tableReference,
        allTableFields = schemaModelUtil.getAllTableFields(table);

    var scopedFieldsCollections = this._getScopedCollectionsForConstantGroup(collections);

    var fieldsAndCalcFieldsForThisTableReference = [{
      source: tableReference,
      collection: allTableFields
    }, {
      source: tableReference,
      collection: calcFieldsCollection
    }];
    scopedFieldsCollections[EMPTY_CALC_FIELD_SCOPE] = fieldsAndCalcFieldsForThisTableReference;
    scopedFieldsCollections[tableReference.getName()] = fieldsAndCalcFieldsForThisTableReference;
    return scopedFieldsCollections;
  },
  _getScopedCollectionsForCrossTableCalcFields: function _getScopedCollectionsForCrossTableCalcFields(options) {
    var collections = options.collections,
        crossTableCalcFields = options.crossTableCalcFields,
        joinTree = options.joinTree;

    var scopedFieldsCollections = this._getScopedCollectionsForConstantGroup(collections);

    scopedFieldsCollections[EMPTY_CALC_FIELD_SCOPE] = [{
      source: joinTree,
      collection: crossTableCalcFields
    }];
    scopedFieldsCollections = joinTree.getJoinAliases().reduce(function (scopedFieldsCollections, joinAlias) {
      var tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections),
          calcFields = tableReference.getCalcFields(),
          table = schemaModelUtil.getTableByTableReference(tableReference, collections),
          genericFields = schemaModelUtil.getAllTableFields(table);
      scopedFieldsCollections[joinAlias.getName()] = [{
        source: joinAlias,
        collection: calcFields
      }, {
        source: joinAlias,
        collection: genericFields
      }];
      return scopedFieldsCollections;
    }, scopedFieldsCollections);
    return scopedFieldsCollections;
  },
  _parseCalcFields: function _parseCalcFields(options) {
    var collections = options.collections,
        parent = options.parent,
        parentCollection = options.parentCollection,
        scopedFieldsCollections = options.scopedFieldsCollections,
        notParsedCalcFields = options.calcFieldsJson,
        lastNotParsedCalcFieldsCount = notParsedCalcFields.length; // Constants could be in any order, thus sometimes we can not parse calc field
    // because it's dependencies are not yet parsed.
    // Constants could be in any order, thus sometimes we can not parse calc field
    // because it's dependencies are not yet parsed.

    while (lastNotParsedCalcFieldsCount > 0) {
      var reducer = _.partial(this._tryToParseCalcFieldAndReturnNotParsed, {
        collections: collections,
        scopedFieldsCollections: scopedFieldsCollections,
        parent: parent,
        parentCollection: parentCollection
      });

      notParsedCalcFields = _.reduce(notParsedCalcFields, reducer, [], this);
      var notParsedCount = notParsedCalcFields.length;

      if (notParsedCount === lastNotParsedCalcFieldsCount) {
        // No calc fields was parsed during this iteration
        // this either means that calc fields are incorrect, or they
        // contains circular reference
        throw new CircularReferenceException('Circular reference found', notParsedCalcFields);
      }

      lastNotParsedCalcFieldsCount = notParsedCount;
    }
  },
  _tryToParseCalcFieldAndReturnNotParsed: function _tryToParseCalcFieldAndReturnNotParsed(options, notParsedCalcFields, calcFieldJson) {
    var collections = options.collections,
        parent = options.parent,
        parentCollection = options.parentCollection,
        scopedFieldsCollections = options.scopedFieldsCollections;

    try {
      var calcField = this._parseCalcField({
        parent: parent,
        calcFieldJson: calcFieldJson,
        collections: collections,
        scopedFieldsCollections: scopedFieldsCollections
      });

      parentCollection.add(calcField);
    } catch (e) {
      if (e instanceof CanNotParseDependenciesException) {
        // Can not parse calc field at this moment because it's dependencies are not yer parsed
        notParsedCalcFields.push(calcFieldJson);
      } else {
        throw e;
      }
    }

    return notParsedCalcFields;
  },
  _parseCalcField: function _parseCalcField(options) {
    var calcFieldJson = options.calcFieldJson,
        parent = options.parent,
        collections = options.collections,
        scopedFieldsCollections = options.scopedFieldsCollections,
        expression = calcFieldJson.expression,
        expressionObject = expression.object;
    var calcFieldDependencyNames = collectExpressionVariables(expressionObject);

    var fieldReferences = this._createFieldReferencesByScopedName(calcFieldDependencyNames, scopedFieldsCollections);

    var calcField = this.entityFactory.createCalcField({
      name: calcFieldJson.name,
      type: calcFieldJson.type,
      sourceId: parent.getId(),
      sourceType: entityUtil.getEntityName(parent),
      expression: expression,
      fieldReferences: fieldReferences
    });
    collections.fields.add(calcField);
    return calcField;
  },
  _createFieldReferencesByScopedName: function _createFieldReferencesByScopedName(scopedFieldNames, scopedFieldsCollections) {
    return _.map(scopedFieldNames, function (fieldName) {
      var fieldNameComponents = this._splitFieldNameToComponents(fieldName);

      var prefixAndRawName = this._getScopePrefixAndRawFieldName(fieldNameComponents, fieldName);

      var scopePrefix = prefixAndRawName.scopePrefix;
      var rawFieldName = prefixAndRawName.rawFieldName;

      var fieldsCollections = this._getFieldsCollectionsForScope(scopedFieldsCollections, scopePrefix);

      return this._createFieldReferenceByName(fieldsCollections, rawFieldName);
    }, this);
  },
  _splitFieldNameToComponents: function _splitFieldNameToComponents(fieldName) {
    return pathUtil.split(fieldName, '\\', '.');
  },
  _getScopePrefixAndRawFieldName: function _getScopePrefixAndRawFieldName(fieldNameComponents, fieldName) {
    var scopePrefix, rawFieldName;

    if (fieldNameComponents.length === 1) {
      scopePrefix = EMPTY_CALC_FIELD_SCOPE;
      rawFieldName = _.first(fieldNameComponents);
    } else if (fieldNameComponents.length === 2) {
      scopePrefix = _.first(fieldNameComponents);
      rawFieldName = _.last(fieldNameComponents);
    } else {
      throw new Error('Expressions contains not supported variable name: ' + fieldName);
    }

    return {
      scopePrefix: scopePrefix,
      rawFieldName: rawFieldName
    };
  },
  _getFieldsCollectionsForScope: function _getFieldsCollectionsForScope(scopedFieldsCollections, scopePrefix) {
    var fieldsCollections = scopedFieldsCollections[scopePrefix];

    if (!fieldsCollections) {
      throw new IllegalCalcFieldUsageException('Can not use fields from ' + scopePrefix + ' in this calc field');
    }

    return fieldsCollections;
  },
  _createFieldReferenceByName: function _createFieldReferenceByName(fieldsCollections, fieldName) {
    var field = null,
        source = null;

    _.find(fieldsCollections, function (fieldsCollectionWithParent) {
      var fieldsCollection = fieldsCollectionWithParent.collection;
      source = fieldsCollectionWithParent.source;
      field = fieldsCollection.byField ? fieldsCollection.byField('name', fieldName) : _.findWhere(fieldsCollection, {
        name: fieldName
      });
      return field;
    });

    if (!field) {
      throw new CanNotParseDependenciesException('Field [' + fieldName + '] not found');
    } else {
      return this.entityFactory.createFieldReference({
        sourceId: source.getId(),
        sourceType: entityUtil.getEntityName(source),
        fieldId: field.getId(),
        fieldType: entityUtil.getEntityName(field)
      });
    }
  },
  _filterCrossTableCalcFields: function _filterCrossTableCalcFields(resources) {
    return this._filterCalcFields(resources);
  },
  _filterSingleTableCalcFields: function _filterSingleTableCalcFields(resources) {
    return this._filterCalcFields(resources);
  },
  _filterCalcFields: function _filterCalcFields(resources) {
    return _.reduce(resources, function (memo, group) {
      var resourceType = serverSchemaResourceTypeUtil.getResourceType(group),
          resourceJson = serverSchemaResourceTypeUtil.getResourceValue(group, resourceType); // Search only for calc fields which are immediately under parent
      // Search only for calc fields which are immediately under parent

      if (this._isCalcField(resourceType, resourceJson)) {
        memo.push(resourceJson);
      }

      return memo;
    }, [], this);
  },
  _isCalcField: function _isCalcField(resourceType, resourceJson) {
    return serverSchemaResourceTypeUtil.isResourceElement(resourceType) && resourceJson.expression;
  }
});

module.exports = CalcFieldsParser;

});