define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("./entityUtil");

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

var getCollectionByEntityType = require("./getCollectionByEntityType");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getResourceByIdAndType(id, type, collections) {
  if (!id) {
    throw new Error('Id is not defined');
  } else if (!type) {
    throw new Error('Type is not defined');
  }

  var collection = getCollectionByEntityType(collections, type);

  if (_.isUndefined(collection)) {
    throw new Error('Resource type not supported: ' + type);
  } else {
    return collection.byId(id);
  }
}

function getDataSourceByChildResource(resource, collections) {
  var dataSources = collections.dataSources,
      dataSource;

  if (!_.isUndefined(resource)) {
    if (entityUtil.isDataSource(resource)) {
      dataSource = resource;
    } else if (entityUtil.isDataSourceGroup(resource) || entityUtil.isTable(resource) || entityUtil.isTableGroup(resource) || entityUtil.isField(resource)) {
      dataSource = dataSources.byId(resource.dataSourceId);
    }
  }

  return dataSource;
}

function getResourceParent(resource, collections) {
  var parent,
      parentId = resource.parentId;

  if (entityUtil.isField(resource) || entityUtil.isTableGroup(resource)) {
    parent = collections.tables.byId(parentId) || collections.tableGroups.byId(parentId);
  } else if (entityUtil.isTable(resource) || entityUtil.isDataSourceGroup(resource)) {
    parent = collections.dataSourceGroups.byId(parentId) || collections.dataSources.byId(parentId);
  }

  return parent;
}

function getResourceParents(resource, collections) {
  var parents = [];
  var parentId = resource.parentId;

  while (parentId) {
    resource = getResourceParent(resource, collections);
    parents.push(resource);
    parentId = resource.parentId;
  }

  return parents;
}

function getPresentationParents(presentationItem, collections) {
  var parents = [];
  var parent = presentationItem,
      parentId = presentationItem.parentId,
      dataIslandId = presentationItem.dataIslandId;

  while (parentId) {
    if (parentId === dataIslandId) {
      parent = collections.dataIslands.byId(dataIslandId);
    } else {
      parent = collections.presentationSets.byId(parentId);
    }

    parents.push(parent);
    parentId = parent.parentId;
    dataIslandId = presentationItem.dataIslandId;
  }

  return parents;
}

function getResourceParentsByIdAndType(id, type, collections) {
  var resource = getResourceByIdAndType(id, type, collections);
  return getResourceParents(resource, collections);
}

function getDataSourceGroupOrDataSource(dataSourceGroupId, collections) {
  var dataSource = collections.dataSources.byId(dataSourceGroupId),
      dataSourceGroup = dataSource;

  if (!dataSourceGroup) {
    dataSourceGroup = collections.dataSourceGroups.byId(dataSourceGroupId);
  }

  return dataSourceGroup;
}

function getTableGroupOrTable(tableGroupId, collections) {
  var table = collections.tables.byId(tableGroupId),
      tableGroup = table;

  if (!tableGroup) {
    tableGroup = collections.tableGroups.byId(tableGroupId);
  }

  return tableGroup;
}

function getDataIslandSource(dataIsland, collections) {
  var sourceId = dataIsland.sourceId,
      sourceType = dataIsland.sourceType,
      result;

  if (sourceId) {
    if (sourceType === schemaEntitiesEnum.TABLE_REFERENCE) {
      result = collections.tableReferences.byId(sourceId);
    } else if (sourceType === schemaEntitiesEnum.JOIN_TREE) {
      result = collections.joinTrees.byId(sourceId);
    } else if (sourceType === schemaEntitiesEnum.CONSTANT_GROUP) {
      result = collections.constantGroups.byId(sourceId);
    }
  }

  return result;
}

function getDataIslandSourceType(dataIsland, collections) {
  var dataIslandSource = getDataIslandSource(dataIsland, collections);

  if (dataIslandSource) {
    return entityUtil.getEntityName(dataIslandSource);
  }

  return null;
}

function getDataIslandsBySource(source, collections) {
  return collections.dataIslands.filter(function (dataIsland) {
    return dataIsland.sourceId === source.id;
  });
}

function getDataIslandsBySourceId(sourceId, collections) {
  return collections.dataIslands.filter(function (dataIsland) {
    return dataIsland.sourceId === sourceId;
  });
}

function getAllTableReferencesByTableId(tableId, collections) {
  var tableReferences = collections.tableReferences;
  return tableReferences.filter(function (tableReference) {
    return tableReference.tableId === tableId;
  });
}

function getAllTableReferencesByTable(table, collections) {
  var tableId = table.id;
  return getAllTableReferencesByTableId(tableId, collections);
}

function getTableByTableReference(tableReference, collections) {
  var tableId = tableReference.tableId;
  return collections.tables.byId(tableId);
}

function getTableReferenceByJoinAlias(joinAlias, collections) {
  var tableReferenceId = joinAlias.tableReferenceId;
  return collections.tableReferences.byId(tableReferenceId);
}

function getTableByJoinAlias(joinAlias, collections) {
  var tableReference = getTableReferenceByJoinAlias(joinAlias, collections);
  return getTableByTableReference(tableReference, collections);
}

function getAllTableFields(table) {
  return getAllFieldsFromParent(table);
}

function getAllFieldsFromParent(parent) {
  var children = parent.children;
  return children.reduce(function (memo, child) {
    if (entityUtil.isField(child)) {
      memo.push(child);
    } else if (entityUtil.isTableGroup(child)) {
      memo = memo.concat(getAllFieldsFromParent(child));
    }

    return memo;
  }, []);
}

function getTableFieldsByJoinAlias(joinAlias, collections) {
  var table = getTableByJoinAlias(joinAlias, collections);
  return getAllTableFields(table, collections);
}

function getTableFieldsByTableReference(tableReference, collections) {
  var table = getTableByTableReference(tableReference, collections);
  return getAllTableFields(table, collections);
}

function getCalcFieldsByJoinAlias(joinAlias, collections) {
  var tableReference = getTableReferenceByJoinAlias(joinAlias, collections);
  return tableReference.calcFields.toArray();
}

function getJoinAliasByTableReferenceId(tableReferenceId, collections) {
  return collections.joinAliases.findWhere({
    tableReferenceId: tableReferenceId
  });
}

function getAllJoinAliasesByTableReferenceId(tableReferenceId, collections) {
  return collections.joinAliases.filter(function (joinAlias) {
    return joinAlias.tableReferenceId === tableReferenceId;
  });
}

function getTableReferencesByTableId(tableId, collections) {
  return collections.tableReferences.filter(function (tableReference) {
    return tableReference.tableId === tableId;
  });
}

function getConstantJoinExpressionsByJoinId(joinId, collections) {
  return collections.joinExpressions.filter(function (joinExpression) {
    var isConstantJoinExpression = entityUtil.isConstantJoinExpression(joinExpression);

    if (isConstantJoinExpression && joinExpression.joinId === joinId) {
      return true;
    }
  });
}

function getDataIslandOrPresentationSetById(presentationItemId, collections) {
  return getDataIslandById(presentationItemId, collections) || getPresentationSetById(presentationItemId, collections);
}

function getPresentationSetOrFieldById(presentationItemId, collections) {
  return getPresentationSetById(presentationItemId, collections) || getPresentationFieldById(presentationItemId, collections);
}

function getPresentationSetById(presentationSetId, collections) {
  return collections.presentationSets.byId(presentationSetId);
}

function getPresentationFieldById(presentationFieldId, collections) {
  return collections.presentationFields.byId(presentationFieldId);
}

function getDataIslandById(dataIslandId, collections) {
  return collections.dataIslands.byId(dataIslandId);
}

function getSourceLessDataIslands(collections) {
  return collections.dataIslands.filter(function (dataIsland) {
    return _.isUndefined(dataIsland.sourceId) || _.isNull(dataIsland.sourceId);
  });
}

function getChildrenLessDataIslands(collections) {
  return collections.dataIslands.filter(function (dataIsland) {
    return dataIsland.children.size() === 0;
  });
}

function getDataIslandByPresentationItem(item, collections) {
  if (entityUtil.isDataIsland(item)) {
    return item;
  } else if (entityUtil.isPresentationSet(item) || entityUtil.isPresentationField(item)) {
    return getDataIslandById(item.dataIslandId, collections);
  }
}

function getResourceIndexInCollectionById(id, collection) {
  var resourceIndex;
  collection.find(function (child, index) {
    if (child.id === id) {
      resourceIndex = index;
      return child;
    }
  });
  return resourceIndex;
}

function getFieldByFieldReference(fieldReference, collections) {
  var fieldId = fieldReference.fieldId;
  return collections.fields.byId(fieldId);
}

function getSourceByFieldReference(fieldReference, collections) {
  var sourceType = fieldReference.sourceType,
      sourceId = fieldReference.sourceId;
  return getResourceByIdAndType(sourceId, sourceType, collections);
}

function getJoinTreeCalcFieldsByTableReferenceId(joinTree, tableReferenceId) {
  return joinTree.calcFields.chain().filter(function (calcField) {
    return calcField.fieldReferences.find(function (fieldReference) {
      return fieldReference.sourceId === tableReferenceId;
    });
  });
}

function defaultReduceCollectionByPropertyReducer(property, memo, entity) {
  memo[entity[property]] = entity;
  return memo;
}

function reduceCollectionByProperty(options) {
  var reducer = options.reducer,
      property = options.property,
      collection = options.collection;
  reducer = reducer || _.partial(defaultReduceCollectionByPropertyReducer, property);
  return collection.reduce(reducer, {});
}

module.exports = {
  reduceCollectionByProperty: reduceCollectionByProperty,
  getResourceByIdAndType: getResourceByIdAndType,
  getDataSourceByChildResource: getDataSourceByChildResource,
  getResourceParentsByIdAndType: getResourceParentsByIdAndType,
  getResourceParent: getResourceParent,
  getResourceParents: getResourceParents,
  getPresentationParents: getPresentationParents,
  getDataSourceGroupOrDataSource: getDataSourceGroupOrDataSource,
  getTableGroupOrTable: getTableGroupOrTable,
  getDataIslandSource: getDataIslandSource,
  getDataIslandSourceType: getDataIslandSourceType,
  getDataIslandsBySource: getDataIslandsBySource,
  getDataIslandsBySourceId: getDataIslandsBySourceId,
  getAllTableReferencesByTable: getAllTableReferencesByTable,
  getAllTableReferencesByTableId: getAllTableReferencesByTableId,
  getTableByTableReference: getTableByTableReference,
  getTableReferenceByJoinAlias: getTableReferenceByJoinAlias,
  getTableByJoinAlias: getTableByJoinAlias,
  getTableFieldsByJoinAlias: getTableFieldsByJoinAlias,
  getTableFieldsByTableReference: getTableFieldsByTableReference,
  getAllTableFields: getAllTableFields,
  getCalcFieldsByJoinAlias: getCalcFieldsByJoinAlias,
  getJoinAliasByTableReferenceId: getJoinAliasByTableReferenceId,
  getAllJoinAliasesByTableReferenceId: getAllJoinAliasesByTableReferenceId,
  getTableReferencesByTableId: getTableReferencesByTableId,
  getConstantJoinExpressionsByJoinId: getConstantJoinExpressionsByJoinId,
  getDataIslandById: getDataIslandById,
  getSourceLessDataIslands: getSourceLessDataIslands,
  getChildrenLessDataIslands: getChildrenLessDataIslands,
  getDataIslandOrPresentationSetById: getDataIslandOrPresentationSetById,
  getPresentationSetOrFieldById: getPresentationSetOrFieldById,
  getDataIslandByPresentationItem: getDataIslandByPresentationItem,
  getResourceIndexInCollectionById: getResourceIndexInCollectionById,
  getFieldByFieldReference: getFieldByFieldReference,
  getSourceByFieldReference: getSourceByFieldReference,
  getJoinTreeCalcFieldsByTableReferenceId: getJoinTreeCalcFieldsByTableReferenceId
};

});