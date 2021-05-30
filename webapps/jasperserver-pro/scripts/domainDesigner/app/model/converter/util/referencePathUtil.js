define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var pathUtil = require("../../../util/pathUtil");

var schemaModelUtil = require("../../../../model/schema/util/schemaModelUtil");

var entityUtil = require("../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getJoinAliasReferencePath(joinAlias, collections) {
  var tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections),
      table = schemaModelUtil.getTableByTableReference(tableReference, collections);
  var tableParents = schemaModelUtil.getResourceParents(table, collections).map(function (resource) {
    return resource.getName();
  });
  var referencePath = [tableReference.getName()].concat(tableParents).reverse();
  return pathUtil.join(referencePath, '\\', '.');
}

function getPresentationFieldReferencePath(presentationField, collections) {
  var referencePathComponents = getPresentationFieldReferenceParents(presentationField, collections);
  return pathUtil.join(referencePathComponents, '\\', '.');
}

function getPresentationFieldReferenceParents(presentationField, collections) {
  var fieldId = presentationField.getFieldId(),
      fieldType = presentationField.getFieldType(),
      sourceId = presentationField.getSourceId(),
      sourceType = presentationField.getSourceType(),
      field,
      tableReference,
      table,
      referencePathComponents = [];

  if (entityUtil.isConstantGroup(sourceType)) {
    // Constant field. path should be like constant_fields_level.constant_name
    var constantGroup = collections.constantGroups.byId(sourceId);
    field = constantGroup.getCalcFields().byId(fieldId);
    referencePathComponents = [constantGroup.getName(), field.getName()];
  } else if (entityUtil.isTableReference(sourceType)) {
    // path should be DataSource.schema.tableReference.field
    tableReference = collections.tableReferences.byId(sourceId);
    table = collections.tables.byId(tableReference.getTableId());

    if (entityUtil.isCalcField(fieldType)) {
      // calc field for table reference based data island
      field = tableReference.getCalcFields().byId(fieldId);
      referencePathComponents = schemaModelUtil.getResourceParents(table, collections).map(function (resource) {
        return resource.getName();
      });
      referencePathComponents.reverse();
      referencePathComponents.push(tableReference.getName(), field.getName());
    } else {
      // regular field for table reference based data island
      field = _.findWhere(schemaModelUtil.getAllTableFields(table), {
        id: fieldId
      });
      referencePathComponents = schemaModelUtil.getResourceParents(field, collections).map(function (resource) {
        if (resource.getId() === table.getId()) {
          return tableReference.getName();
        } else {
          return resource.getName();
        }
      });
      referencePathComponents.reverse();
      referencePathComponents.push(field.getName());
    }
  } else {
    var dataIsland = collections.dataIslands.byId(presentationField.getDataIslandId()),
        dataIslandSource = schemaModelUtil.getDataIslandSource(dataIsland, collections);

    if (entityUtil.isJoinTree(sourceType)) {
      // cross table calc field. path should be Join_Tree_1.calc_field_name
      field = dataIslandSource.getCalcFields().byId(fieldId);
      referencePathComponents = [dataIslandSource.getName(), field.getName()];
    } else if (entityUtil.isJoinAlias(sourceType)) {
      // path should be Join_Tree_1.alias_name.field
      var joinAlias = dataIslandSource.getJoinAliases().byId(sourceId);
      tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections);

      if (entityUtil.isCalcField(fieldType)) {
        // calc field for table reference based data island
        field = tableReference.getCalcFields().byId(fieldId);
      } else {
        // regular field for table reference based data island
        table = collections.tables.byId(tableReference.getTableId());
        field = _.findWhere(schemaModelUtil.getAllTableFields(table), {
          id: fieldId
        });
      }

      referencePathComponents = [dataIslandSource.getName(), joinAlias.getName(), field.getName()];
    }
  }

  return referencePathComponents;
}

function getPresentationFieldHierarchicalName(presentationField, collections) {
  var parents = schemaModelUtil.getPresentationParents(presentationField, collections); // reverse to get correct order
  // reverse to get correct order

  parents.reverse(); // remove data island
  // remove data island

  parents.splice(0, 1); // add field
  // add field

  parents.push(presentationField);
  parents = _.map(parents, function (item) {
    return item.getName();
  });
  return pathUtil.join(parents, '\\', '.');
}

function getDataIslandResourcePath(dataIsland, options) {
  var sourcePath = '',
      collections = options.collections,
      sourceEntity,
      sourceId = dataIsland.getSourceId(),
      sourceType = dataIsland.getSourceType(),
      sourceEntityParents = [],
      sourceEntityParentsNames,
      sourcePathFragments;
  sourceEntity = schemaModelUtil.getResourceByIdAndType(sourceId, sourceType, collections);

  if (entityUtil.isJoinTree(sourceType) || entityUtil.isConstantGroup(sourceType)) {
    sourcePath = sourceEntity.getName();
  } else if (entityUtil.isTableReference(sourceType)) {
    sourceEntityParents = schemaModelUtil.getResourceParentsByIdAndType(sourceEntity.getTableId(), schemaEntitiesEnum.TABLE, collections);
    sourceEntityParentsNames = _.map(sourceEntityParents, function (entity) {
      return entity.getName();
    });
    sourcePathFragments = sourceEntityParentsNames.reverse().concat(sourceEntity.getName());
    sourcePath = pathUtil.join(sourcePathFragments, '\\', '.');
  }

  return sourcePath;
}

module.exports = {
  getJoinAliasReferencePath: getJoinAliasReferencePath,
  getPresentationFieldReferencePath: getPresentationFieldReferencePath,
  getPresentationFieldHierarchicalName: getPresentationFieldHierarchicalName,
  getDataIslandResourcePath: getDataIslandResourcePath
};

});