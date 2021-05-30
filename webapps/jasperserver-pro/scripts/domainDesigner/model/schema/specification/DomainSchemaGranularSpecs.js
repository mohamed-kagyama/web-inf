define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var allCollectionsMixin = require("../mixin/allCollectionsMixin");

var entityUtil = require('../util/entityUtil');

var schemaModelUtil = require("../util/schemaModelUtil");

var validationRegExpEnum = require("../enum/validationRegExpEnum");

var fieldTypeToFieldTypeCategoryEnum = require("../enum/fieldTypeToFieldTypeCategoryEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DomainSchemaGranularSpecs = function DomainSchemaGranularSpecs(options) {
  _.bindAll(this, 'presentationItemNameShouldBeUniqueThroughAllPresentationItemNames', 'calcFieldNameShouldBeUniqueThroughOtherFieldNamesOnSameLevel');

  this._initialize(options);
};

_.extend(DomainSchemaGranularSpecs.prototype, {
  _initialize: function _initialize(options) {
    this.dataStore = options.dataStore;
    this.mixInAllCollections(this.dataStore);
  },
  resourceNameShouldNotContainForbiddenCharacters: function resourceNameShouldNotContainForbiddenCharacters(name) {
    return !validationRegExpEnum.RESOURCE_ID_BLACKLIST_REGEX_PATTERN.test(name);
  },
  canNotRemoveTheVeryLastTableReferenceForSpecificTable: function canNotRemoveTheVeryLastTableReferenceForSpecificTable(tableReferenceId) {
    var table = this.tableReferences.byId(tableReferenceId),
        tableId = table && table.getTableId();
    return this.tableReferences.where({
      tableId: tableId
    }).length > 1;
  },
  tableReferenceNameShouldBeUniqueAcrossAllTableReferences: function tableReferenceNameShouldBeUniqueAcrossAllTableReferences(id, name) {
    // For now domain schema API only allows global unique table reference names
    return !this.tableReferences.some(function (otherTableReference) {
      return otherTableReference.getId() !== id && otherTableReference.getName() === name;
    });
  },
  derivedTableNameShouldBeUniqueAmongTables: function derivedTableNameShouldBeUniqueAmongTables(tableId, name, dataSourceId) {
    var dataSource = this.dataSources.byId(dataSourceId);
    return !dataSource.getChildren().some(function (table) {
      var sameTableId = !tableId || table.id !== tableId;
      return table.name === name && sameTableId;
    });
  },
  derivedTableNameShouldBeUniqueAmongAllTableReferences: function derivedTableNameShouldBeUniqueAmongAllTableReferences(tableId, name) {
    var tableReferenceId = tableId ? this.tableReferences.findWhere({
      tableId: tableId
    }).getId() : null;
    return this.tableReferenceNameShouldBeUniqueAcrossAllTableReferences(tableReferenceId, name);
  },
  dataSourceGroupNameShouldBeUniqueOnSameLevel: function dataSourceGroupNameShouldBeUniqueOnSameLevel(options) {
    var name = options.name,
        id = options.id,
        parentId = options.parentId;
    var dataSourceGroup, parentDataSourceGroup;

    if (id && !parentId) {
      dataSourceGroup = this._getDataSourceGroupById(id);
      parentId = dataSourceGroup ? dataSourceGroup.getParentId() : null;
    }

    if (!parentId) {
      return true;
    }

    parentDataSourceGroup = this._getDataSourceGroupOrDataSourceById(parentId);
    return !parentDataSourceGroup.getChildren().some(function (resource) {
      if (resource.getName() === name) {
        return resource.getId() !== id;
      } else {
        return false;
      }
    });
  },
  joinExpressionShouldUseDifferentLeftAndRightTableReferences: function joinExpressionShouldUseDifferentLeftAndRightTableReferences(options) {
    var leftTableReferenceId = options.leftTableReferenceId,
        rightTableReferenceId = options.rightTableReferenceId;
    return leftTableReferenceId !== rightTableReferenceId;
  },
  joinExpressionShouldUseUniqueCombinationOfLeftTableAndFieldAndRightTableAndField: function joinExpressionShouldUseUniqueCombinationOfLeftTableAndFieldAndRightTableAndField(options) {
    var leftJoinAlias = this.joinAliases.byField('tableReferenceId', options.leftTableReferenceId),
        rightJoinAlias = this.joinAliases.byField('tableReferenceId', options.rightTableReferenceId);

    var findPredicate = _.partial(this._sameJoinExpressionAlreadyExistsPredicate, _.extend({
      leftJoinAliasId: leftJoinAlias ? leftJoinAlias.getId() : null,
      rightJoinAliasId: rightJoinAlias ? rightJoinAlias.getId() : null
    }, options));

    var isJoinExpressionAlreadyExists = this.joinExpressions.chain().filter(this._excludeConstantJoinExpressionPredicate).find(findPredicate);
    return !isJoinExpressionAlreadyExists;
  },
  joinTreeNameShouldBeUniqueThroughAllJoinTreeNames: function joinTreeNameShouldBeUniqueThroughAllJoinTreeNames(name, id) {
    return !this.joinTrees.some(function (joinTree) {
      if (joinTree.getName() === name) {
        return id ? id !== joinTree.getId() : true;
      }

      return false;
    });
  },
  newPresentationItemNamesShouldBeUniqueBetweenThemselves: function newPresentationItemNamesShouldBeUniqueBetweenThemselves(names) {
    var usedNames = {};
    return !_.some(names, function (name) {
      if (usedNames[name]) {
        return true;
      } else {
        usedNames[name] = true;
      }
    });
  },
  presentationItemNameShouldBeUniqueThroughAllPresentationItemNames: function presentationItemNameShouldBeUniqueThroughAllPresentationItemNames(options) {
    var id = options.id,
        name = options.name,
        existingPresentationItemsByNameMap = options.existingPresentationItemsByNameMap;
    var presentationItem;

    if (existingPresentationItemsByNameMap) {
      presentationItem = existingPresentationItemsByNameMap[name];
    } else {
      presentationItem = this.presentationSets.byField('name', name) || this.presentationFields.byField('name', name);
    }

    if (presentationItem) {
      if (id) {
        return presentationItem.id === id;
      }

      return false;
    }

    return true;
  },
  dataIslandNameShouldBeUniqueThroughAllDataIslandNames: function dataIslandNameShouldBeUniqueThroughAllDataIslandNames(name, id) {
    return !this.dataIslands.some(function (dataIsland) {
      if (dataIsland.getName() === name) {
        return id ? id !== dataIsland.getId() : true;
      }

      return false;
    });
  },
  calcFieldNameShouldBeUniqueThroughOtherFieldNamesOnSameLevel: function calcFieldNameShouldBeUniqueThroughOtherFieldNamesOnSameLevel(options, calcFieldName) {
    var field = this._findFieldByNameInCalcFieldParent(options, calcFieldName),
        id = options.calcFieldId;

    if (!field) {
      return true;
    } else if (id) {
      return field.getId() === id;
    } else {
      return false;
    }
  },
  calcFieldNameCanNotBeEmpty: function calcFieldNameCanNotBeEmpty(calcFieldName) {
    calcFieldName = calcFieldName ? calcFieldName.replace(/\s+/g, '') : calcFieldName;
    return Boolean(calcFieldName);
  },
  calcFieldDataTypeCanNotBeChangedIfThereAreDependentFilters: function calcFieldDataTypeCanNotBeChangedIfThereAreDependentFilters(calcFieldId, newType) {
    var calcField = this.fields.byId(calcFieldId),
        oldType = calcField.type,
        result = false;

    var calcFieldTypeHasChanged = this._fieldTypeHasChanged(newType, oldType);

    if (calcFieldTypeHasChanged) {
      result = this.filters.some(function findDependentFilterExpression(filter) {
        return filter.fieldReferences.some(function (fieldReference) {
          return fieldReference.fieldId === calcFieldId;
        });
      });
    }

    return result;
  },
  derivedTableFieldDataTypeCanNotBeChangedIfThereAreDependentFilters: function derivedTableFieldDataTypeCanNotBeChangedIfThereAreDependentFilters(tableReferenceId, newFields) {
    var fields = this.fields.where({
      tableId: tableReferenceId
    });
    var fieldNameForFieldMap = fields.reduce(function (map, field) {
      map[field.name] = field;
      return map;
    }, {});
    var foundUsage = false;

    for (var i = 0; i < newFields.length && !foundUsage; i++) {
      var newField = newFields[i];
      var field = fieldNameForFieldMap[newField.name];

      if (!field) {
        continue;
      }

      if (!this._fieldTypeHasChanged(field.type, newField.type)) {
        continue;
      }

      foundUsage = this.filters.some(function findDependentFilterExpression(filter) {
        return filter.fieldReferences.some(function (fieldReference) {
          return fieldReference.fieldId === field.id;
        });
      });
    }

    return foundUsage;
  },
  joinAliasNameShouldBeRenamedIfItIsTheSameAsTableReferenceName: function joinAliasNameShouldBeRenamedIfItIsTheSameAsTableReferenceName(tableReferenceName, joinAliasName) {
    return tableReferenceName === joinAliasName;
  },
  // Private methods
  _fieldTypeHasChanged: function _fieldTypeHasChanged(newType, oldType) {
    var genericNewType = fieldTypeToFieldTypeCategoryEnum[newType],
        genericOldType = fieldTypeToFieldTypeCategoryEnum[oldType];
    return genericNewType !== genericOldType;
  },
  _excludeConstantJoinExpressionPredicate: function _excludeConstantJoinExpressionPredicate(joinExpression) {
    if (!entityUtil.isConstantJoinExpression(joinExpression)) {
      return true;
    }
  },
  _sameJoinExpressionAlreadyExistsPredicate: function _sameJoinExpressionAlreadyExistsPredicate(options, joinExpression) {
    var leftJoinAliasId = options.leftJoinAliasId,
        rightJoinAliasId = options.rightJoinAliasId;

    if (leftJoinAliasId && rightJoinAliasId) {
      var isLeftJoinAliasesEqual = joinExpression.getLeftJoinAliasId() === leftJoinAliasId,
          isRightJoinAliasesEqual = joinExpression.getRightJoinAliasId() === rightJoinAliasId,
          isLeftJoinAliasEqualToRight = joinExpression.getLeftJoinAliasId() === rightJoinAliasId,
          isRightJoinAliasEqualToLeft = joinExpression.getRightJoinAliasId() === leftJoinAliasId;
      var isLeftFieldsAreEqual = joinExpression.getLeftFieldId() === options.leftTableFieldId,
          isRightFieldsAreEqual = joinExpression.getRightFieldId() === options.rightTableFieldId,
          isLeftFieldEqualToRight = joinExpression.getLeftFieldId() === options.rightTableFieldId,
          isRightFieldEqualToLeft = joinExpression.getRightFieldId() === options.leftTableFieldId;
      var directEquality = isLeftJoinAliasesEqual && isRightJoinAliasesEqual && isLeftFieldsAreEqual && isRightFieldsAreEqual,
          crossEquality = isLeftJoinAliasEqualToRight && isRightJoinAliasEqualToLeft && isLeftFieldEqualToRight && isRightFieldEqualToLeft;
      return directEquality || crossEquality;
    }
  },
  _getDataSourceGroupById: function _getDataSourceGroupById(id) {
    return this.dataSourceGroups.byId(id);
  },
  _getDataSourceGroupOrDataSourceById: function _getDataSourceGroupOrDataSourceById(id) {
    return schemaModelUtil.getDataSourceGroupOrDataSource(id, {
      dataSources: this.dataSources,
      dataSourceGroups: this.dataSourceGroups
    });
  },
  _findFieldByNameInCalcFieldParent: function _findFieldByNameInCalcFieldParent(options, name) {
    var lookUpCollection = [],
        sourceId = options.sourceId,
        sourceType = options.sourceType,
        sourceName = options.sourceName,
        collections = this.dataStore.getCollections();

    if (entityUtil.isConstantGroup(sourceType)) {
      var constantGroup;

      if (sourceName) {
        constantGroup = this.constantGroups.byField('name', sourceName);
      } else if (sourceId) {
        constantGroup = this.constantGroups.byId(sourceId);
      }

      lookUpCollection = constantGroup ? constantGroup.getCalcFields().toArray() : [];
    } else if (entityUtil.isTableReference(sourceType)) {
      var tableReference = this.tableReferences.byId(sourceId),
          tableFields = schemaModelUtil.getTableFieldsByTableReference(tableReference, collections);
      lookUpCollection = tableFields.concat(tableReference.getCalcFields().toArray());
    } else if (entityUtil.isJoinTree(sourceType)) {
      lookUpCollection = this.joinTrees.byId(sourceId).getCalcFields().toArray();
    }

    return _.find(lookUpCollection, function (field) {
      return field.getName() === name;
    });
  }
});

_.extend(DomainSchemaGranularSpecs.prototype, allCollectionsMixin);

module.exports = DomainSchemaGranularSpecs;

});