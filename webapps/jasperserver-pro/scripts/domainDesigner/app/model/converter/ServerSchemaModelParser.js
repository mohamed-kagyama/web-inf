define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var pathUtil = require("../../util/pathUtil");

var getResourceSourceNameOrNameUtil = require("../../util/getResourceSourceNameOrNameUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var serverSchemaResourceTypeUtil = require("../util/serverSchemaResourceTypeUtil");

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

var profileAttributeUtil = require("../../../model/util/profileAttributeUtil");

var resourceNameSpecialCharactersUtil = require("../util/resourceNameSpecialCharactersUtil");

var domainSchemaCollectionsFactory = require("../../../model/schema/factory/domainSchemaCollectionsFactory");

var resourceTypeEnum = require("../enum/resourceTypeEnum");

var resourcesOrderEnum = require("../enum/resourcesOrderEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function ServerSchemaModelParser(options) {
  this.initialize(options);
}

_.extend(ServerSchemaModelParser.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, '_parseGenericTable', '_parseDerivedTable');

    this.schemaNameGenerator = options.schemaNameGenerator;
    this.entityFactory = options.entityFactory;
    this.calcFieldsParser = options.calcFieldsParser;
    this.filtersParser = options.filtersParser;
    this.joinParser = options.joinParser;
  },
  parse: function parse(schema) {
    this.schemaNameGenerator.reset();
    var collections = domainSchemaCollectionsFactory.create();

    this._parseSchema({
      schema: schema,
      collections: collections
    });

    return collections;
  },
  _parseSchema: function _parseSchema(options) {
    var schema = options.schema,
        collections = options.collections;

    this._parseResources({
      resources: schema.resources,
      collections: collections
    });

    this._parsePresentation({
      presentation: schema.presentation,
      collections: collections
    });
  },
  _parseResources: function _parseResources(options) {
    var resources = options.resources,
        collections = options.collections;

    var splitResources = this._splitToConstantGroupsAndOtherResources(resources);

    var constantGroups = splitResources.constantGroups;

    var otherResources = this._sortSchemaResources(splitResources.resources); // need to parse all constant groups separately since they could have cross-dependencies
    // need to parse all constant groups separately since they could have cross-dependencies


    this._parseConstantGroups({
      constantGroups: constantGroups,
      collections: collections
    });

    _.each(otherResources, function (resource) {
      var resourceType = serverSchemaResourceTypeUtil.getResourceType(resource);

      if (serverSchemaResourceTypeUtil.isResourceGroup(resourceType)) {
        this._parseDataSource({
          dataSourceJson: serverSchemaResourceTypeUtil.getResourceValue(resource, resourceType),
          collections: collections
        });
      } else if (serverSchemaResourceTypeUtil.isJoinGroup(resourceType)) {
        this._parseJoinGroup({
          joinGroupJson: serverSchemaResourceTypeUtil.getResourceValue(resource, resourceType),
          collections: collections
        });
      }
    }, this);
  },
  _splitToConstantGroupsAndOtherResources: function _splitToConstantGroupsAndOtherResources(resources) {
    var memo = {
      constantGroups: [],
      resources: []
    };
    return _.reduce(resources, function (memo, resource) {
      var resourceType = serverSchemaResourceTypeUtil.getResourceType(resource);

      if (resourceType === resourceTypeEnum.resources.constantsGroups.GROUP) {
        memo.constantGroups.push(serverSchemaResourceTypeUtil.getResourceValue(resource, resourceType));
      } else {
        memo.resources.push(resource);
      }

      return memo;
    }, memo, this);
  },
  _sortSchemaResources: function _sortSchemaResources(resources) {
    return _.sortBy(resources, function (resource) {
      var resourceType = serverSchemaResourceTypeUtil.getResourceType(resource);
      return resourcesOrderEnum[resourceType];
    }, this);
  },
  _parseConstantGroups: function _parseConstantGroups(options) {
    this.calcFieldsParser.parseConstantGroups(options);
  },
  _parseDataSourceResource: function _parseDataSourceResource(options) {
    if (this._isDerivedTableReference(options)) {
      return this._parseDerivedTableAndCreateTableReference(options);
    } else if (this._isGenericTableReference(options)) {
      return this._parseTableReferenceAndGenericTable(options);
    } else if (this._isDataSourceGroup(options)) {
      return this._parseDataSourceGroup(options);
    } else if (this._isGenericField(options)) {
      return this._parseGenericField(options);
    }
  },
  _parseDataSourceResources: function _parseDataSourceResources(options) {
    var resources = options.resources,
        optionsWithoutResources = _.omit(options, 'resources');

    return _.reduce(resources, function (memo, resourceJson) {
      var resourceType = serverSchemaResourceTypeUtil.getResourceType(resourceJson),
          resourceValue = serverSchemaResourceTypeUtil.getResourceValue(resourceJson, resourceType),
          opts = _.extend({}, optionsWithoutResources, {
        resourceJson: resourceValue,
        resourceType: resourceType
      });

      var resource = this._parseDataSourceResource(opts);

      if (resource) {
        memo.push(resource);
      }

      return memo;
    }, [], this);
  },
  _parseDataSource: function _parseDataSource(options) {
    var dataSourceJson = options.dataSourceJson,
        collections = options.collections;
    var dataSource = this.entityFactory.createDataSource({
      name: dataSourceJson.name
    });
    dataSource.setChildren(this._parseDataSourceResources({
      resources: dataSourceJson.elements,
      parent: dataSource,
      dataSource: dataSource,
      collections: collections
    }));
    collections.dataSources.add(dataSource);
  },
  _parseDataSourceGroup: function _parseDataSourceGroup(options) {
    var dataSource = options.dataSource,
        dataSourceGroupJson = options.resourceJson,
        parent = options.parent,
        collections = options.collections;

    var nameAndSourceName = this._generateSchemaNameAndSourceName(dataSourceGroupJson, collections);

    var dataSourceGroup = this.entityFactory.createDataSourceGroup({
      sourceName: nameAndSourceName.sourceName,
      name: nameAndSourceName.name,
      parentId: parent.id,
      dataSourceId: dataSource.id
    });
    dataSourceGroup.setChildren(this._parseDataSourceResources({
      resources: dataSourceGroupJson.elements,
      parent: dataSourceGroup,
      dataSource: dataSource,
      collections: collections
    }));
    collections.dataSourceGroups.add(dataSourceGroup);
    return dataSourceGroup;
  },
  _generateSchemaNameAndSourceName: function _generateSchemaNameAndSourceName(dataSourceGroup, collections) {
    var schemaName, nameAndSourceName;

    if (profileAttributeUtil.containsProfileAttributeWithPlaceholdersOnly(dataSourceGroup.name)) {
      schemaName = resourceNameSpecialCharactersUtil.replaceResourceNameSpecialCharacters(dataSourceGroup.name);
      schemaName = this.schemaNameGenerator.generate(schemaName, function (name) {
        return collections.dataSourceGroups.byField('name', name);
      });
      nameAndSourceName = {
        name: schemaName,
        sourceName: dataSourceGroup.name
      };
    } else {
      nameAndSourceName = {
        name: dataSourceGroup.name,
        sourceName: dataSourceGroup.sourceName
      };
    }

    return nameAndSourceName;
  },
  _parseDerivedTableAndCreateTableReference: function _parseDerivedTableAndCreateTableReference(options) {
    return this._parseTableReferenceAndAnyTable(_.extend({
      parseTable: this._parseDerivedTable
    }, options));
  },
  _parseTableReferenceAndGenericTable: function _parseTableReferenceAndGenericTable(options) {
    var tableReferenceJson = options.resourceJson,
        collections = options.collections,
        existingTable = collections.tables.findWhere({
      'name': getResourceSourceNameOrNameUtil(tableReferenceJson),
      'parentId': options.parent.id
    });
    return this._parseTableReferenceAndAnyTable(_.extend({
      existingTable: existingTable,
      parseTable: this._parseGenericTable
    }, options));
  },
  _parseTableReferenceAndAnyTable: function _parseTableReferenceAndAnyTable(options) {
    var existingTable = options.existingTable,
        parseTable = options.parseTable,
        tableReferenceJson = options.resourceJson,
        parent = options.parent,
        dataSource = options.dataSource,
        collections = options.collections;
    var table = existingTable || parseTable({
      tableReferenceJson: tableReferenceJson,
      dataSource: dataSource,
      parent: parent,
      collections: collections
    });
    var tableReference = this.entityFactory.createTableReference({
      name: tableReferenceJson.name,
      tableId: table.id
    });
    this.calcFieldsParser.parseSingleTableCalcFields({
      elements: tableReferenceJson.elements,
      table: table,
      tableReference: tableReference,
      collections: collections
    });
    this.filtersParser.parseFilterExpression({
      filterExpression: tableReferenceJson.filterExpression,
      parent: tableReference,
      collections: collections
    });
    collections.tableReferences.add(tableReference);
    return !existingTable && table;
  },
  _parseDerivedTable: function _parseDerivedTable(options) {
    var tableReferenceJson = options.tableReferenceJson,
        parent = options.parent,
        dataSource = options.dataSource,
        collections = options.collections;
    var derivedTable = this.entityFactory.createDerivedTable({
      name: getResourceSourceNameOrNameUtil(tableReferenceJson),
      query: tableReferenceJson.query,
      parentId: parent.id,
      dataSourceId: dataSource.id
    });
    derivedTable.setChildren(this._parseDataSourceResources({
      resources: tableReferenceJson.elements,
      parent: derivedTable,
      table: derivedTable,
      dataSource: dataSource,
      collections: collections
    }));
    collections.tables.add(derivedTable);
    return derivedTable;
  },
  _parseGenericTable: function _parseGenericTable(options) {
    var tableReferenceJson = options.tableReferenceJson,
        parent = options.parent,
        dataSource = options.dataSource,
        collections = options.collections;
    var table = this.entityFactory.createGenericTable({
      name: getResourceSourceNameOrNameUtil(tableReferenceJson),
      parentId: parent.id,
      dataSourceId: dataSource.id
    });
    table.setChildren(this._parseDataSourceResources({
      resources: tableReferenceJson.elements,
      parent: table,
      table: table,
      dataSource: dataSource,
      collections: collections
    }));
    collections.tables.add(table);
    return table;
  },
  _parseGenericField: function _parseGenericField(options) {
    var fieldJson = options.resourceJson,
        parent = options.parent,
        table = options.table,
        dataSource = options.dataSource,
        collections = options.collections;
    var field = this.entityFactory.createGenericField({
      name: fieldJson.name,
      sourceName: fieldJson.sourceName,
      type: fieldJson.type,
      dataSourceId: dataSource.id,
      parentId: parent.id,
      tableId: table.id
    });
    collections.fields.add(field);
    return field;
  },
  _parseJoinGroup: function _parseJoinGroup(options) {
    var joinGroupJson = options.joinGroupJson,
        collections = options.collections;
    var joinTree = this.entityFactory.createJoinTree({
      name: joinGroupJson.name,
      includeAllDataIslandJoins: joinGroupJson.joinInfo.includeAllDataIslandJoins,
      suppressCircularJoins: joinGroupJson.joinInfo.suppressCircularJoins
    });

    var joinAliases = this._parseJoinAliases({
      collections: collections,
      joinTree: joinTree,
      elements: joinGroupJson.elements,
      mandatoryTables: joinGroupJson.joinInfo.mandatoryTables
    });

    joinTree.setJoinAliases(joinAliases);

    var joins = _.map(joinGroupJson.joinInfo.joins, function (join) {
      return this.joinParser.parseJoin({
        joinJson: join,
        joinTree: joinTree,
        collections: collections
      });
    }, this);

    joinTree.setJoins(joins);
    this.calcFieldsParser.parseCrossTableCalcFields({
      collections: collections,
      joinTree: joinTree,
      elements: joinGroupJson.elements
    });
    this.filtersParser.parseFilterExpression({
      filterExpression: joinGroupJson.filterExpression,
      parent: joinTree,
      collections: collections
    });
    collections.joinTrees.add(joinTree);
  },
  _parseJoinAliases: function _parseJoinAliases(options) {
    var collections = options.collections,
        joinTree = options.joinTree,
        elements = options.elements,
        mandatoryTables = options.mandatoryTables || [];
    return _.chain(elements).filter(function (group) {
      var resourceType = serverSchemaResourceTypeUtil.getResourceType(group);
      return serverSchemaResourceTypeUtil.isJoinAlias(resourceType);
    }, this).map(function (group) {
      var resourceType = serverSchemaResourceTypeUtil.getResourceType(group),
          resourceJson = serverSchemaResourceTypeUtil.getResourceValue(group, resourceType);

      if (_.indexOf(mandatoryTables, resourceJson.name) > -1) {
        resourceJson.alwaysIncludeTable = true;
      }

      return this._parseJoinAlias({
        joinAliasJson: resourceJson,
        joinTree: joinTree,
        collections: collections
      });
    }, this).value();
  },
  _parseJoinAlias: function _parseJoinAlias(options) {
    var joinAliasJson = options.joinAliasJson,
        collections = options.collections,
        joinTree = options.joinTree;

    var tableReferenceName = _.last(pathUtil.split(joinAliasJson.referencePath, '\\', '.'));

    var tableReference = collections.tableReferences.by({
      name: tableReferenceName
    });
    var joinAlias = this.entityFactory.createJoinAlias({
      name: joinAliasJson.name,
      alwaysIncludeTable: joinAliasJson.alwaysIncludeTable,
      joinTreeId: joinTree.id,
      tableReferenceId: tableReference.id
    });
    collections.joinAliases.add(joinAlias);
    return joinAlias;
  },
  _parsePresentation: function _parsePresentation(options) {
    var presentation = options.presentation,
        collections = options.collections,
        tableReferencesGroupedByParentId = this._groupTableReferencesByParentId(collections);

    _.each(presentation, function (dataIsland) {
      this._parseDataIsland({
        dataIslandJson: dataIsland,
        tableReferencesGroupedByParentId: tableReferencesGroupedByParentId,
        collections: collections
      });
    }, this);
  },
  _parseDataIsland: function _parseDataIsland(options) {
    var dataIslandJson = options.dataIslandJson,
        collections = options.collections,
        tableReferencesGroupedByParentId = options.tableReferencesGroupedByParentId;
    var resourcePath = dataIslandJson.resourcePath;

    var source = this._getDataIslandSourceByResourcePath({
      resourcePath: resourcePath,
      collections: collections,
      tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
    });

    var genericPresentationProps = this._getGenericPresentationItemProperties(dataIslandJson);

    var dataIsland = this.entityFactory.createDataIsland(genericPresentationProps);
    dataIsland.setSourceId(source.id);
    dataIsland.setSourceType(entityUtil.getEntityName(source));
    dataIsland.setChildren(this._parseDataIslandChildren({
      elements: dataIslandJson.elements,
      collections: collections,
      dataIsland: dataIsland,
      parent: dataIsland,
      tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
    }));
    collections.dataIslands.add(dataIsland);
  },
  _parsePresentationSet: function _parsePresentationSet(options) {
    var presentationSetJson = options.presentationSetJson,
        parent = options.parent,
        dataIsland = options.dataIsland,
        collections = options.collections,
        tableReferencesGroupedByParentId = options.tableReferencesGroupedByParentId;

    var genericPresentationProps = this._getGenericPresentationItemProperties(presentationSetJson);

    var presentationSet = this.entityFactory.createPresentationSet(_.extend(genericPresentationProps, {
      parentId: parent.id,
      dataIslandId: dataIsland.id
    }));
    presentationSet.setChildren(this._parseDataIslandChildren({
      elements: presentationSetJson.elements,
      collections: collections,
      dataIsland: dataIsland,
      parent: presentationSet,
      tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
    }));
    collections.presentationSets.add(presentationSet);
    return presentationSet;
  },
  _parseDataIslandChildren: function _parseDataIslandChildren(options) {
    var elements = options.elements,
        parent = options.parent,
        dataIsland = options.dataIsland,
        collections = options.collections,
        tableReferencesGroupedByParentId = options.tableReferencesGroupedByParentId;
    return _.reduce(elements, function (memo, element) {
      var elementType = serverSchemaResourceTypeUtil.getResourceType(element),
          result;
      element = serverSchemaResourceTypeUtil.getResourceValue(element, elementType);

      if (serverSchemaResourceTypeUtil.isPresentationGroup(elementType)) {
        result = this._parsePresentationSet({
          presentationSetJson: element,
          collections: collections,
          dataIsland: dataIsland,
          parent: parent,
          tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
        });
      } else if (serverSchemaResourceTypeUtil.isPresentationElement(elementType)) {
        result = this._parsePresentationField({
          presentationFieldJson: element,
          collections: collections,
          dataIsland: dataIsland,
          parent: parent,
          tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
        });
      }

      if (result) {
        memo.push(result);
      }

      return memo;
    }, [], this);
  },
  _parsePresentationField: function _parsePresentationField(options) {
    var presentationFieldJson = options.presentationFieldJson,
        parent = options.parent,
        dataIsland = options.dataIsland,
        collections = options.collections,
        tableReferencesGroupedByParentId = options.tableReferencesGroupedByParentId;

    var sources = this._getPresentationFieldSourcesByResourcePath({
      resourcePath: presentationFieldJson.resourcePath,
      collections: collections,
      tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
    });

    var field = sources.resource,
        source = sources.tableReference || sources.joinAlias || sources.joinTree || sources.source;

    var genericPresentationProps = this._getGenericPresentationItemProperties(presentationFieldJson);

    var presentationField = this.entityFactory.createPresentationField(_.extend(genericPresentationProps, {
      parentId: parent.id,
      dataIslandId: dataIsland.id,
      fieldId: field.id,
      fieldType: entityUtil.getEntityName(field),
      sourceId: source.id,
      sourceType: entityUtil.getEntityName(source)
    }, this._getSpecificPresentationFieldProperties(presentationFieldJson)));
    collections.presentationFields.add(presentationField);
    return presentationField;
  },
  // joins
  _getGenericPresentationItemProperties: function _getGenericPresentationItemProperties(presentationItem) {
    return _.pick(presentationItem, ['name', 'label', 'labelId', 'description', 'descriptionId']);
  },
  _getSpecificPresentationFieldProperties: function _getSpecificPresentationFieldProperties(presentationField) {
    return _.pick(presentationField, ['mask', 'aggregation', 'kind']);
  },
  _isGenericTableReference: function _isGenericTableReference(options) {
    var resourceJson = options.resourceJson,
        resourceType = options.resourceType,
        element = _.first(resourceJson.elements),
        isGenericTableReference = false;

    if (serverSchemaResourceTypeUtil.isResourceGroup(resourceType) && element) {
      var firstChildrenResourceType = serverSchemaResourceTypeUtil.getResourceType(element); // We assume that resource is table if it consists resource elements
      // We assume that resource is table if it consists resource elements

      isGenericTableReference = serverSchemaResourceTypeUtil.isResourceElement(firstChildrenResourceType);
    } else {
      isGenericTableReference = false;
    }

    return isGenericTableReference;
  },
  _isDerivedTableReference: function _isDerivedTableReference(options) {
    return serverSchemaResourceTypeUtil.isQueryGroup(options.resourceType);
  },
  _isDataSourceGroup: function _isDataSourceGroup(options) {
    var group = options.resourceJson,
        resourceType = options.resourceType,
        isDataSourceGroup = false;

    if (serverSchemaResourceTypeUtil.isResourceGroup(resourceType)) {
      var element = _.first(group.elements);

      if (element) {
        // If group contains children check that it contains groups
        isDataSourceGroup = serverSchemaResourceTypeUtil.isResourceGroup(serverSchemaResourceTypeUtil.getResourceType(element));
      } else {
        // If group does not contains eny element
        // we assume it's data source group
        isDataSourceGroup = true;
      }
    } else {
      isDataSourceGroup = false;
    }

    return isDataSourceGroup;
  },
  _isGenericField: function _isGenericField(options) {
    var resourceJson = options.resourceJson,
        resourceType = options.resourceType;
    return serverSchemaResourceTypeUtil.isResourceElement(resourceType) && !resourceJson.expression;
  },
  _getDataIslandSourceByResourcePath: function _getDataIslandSourceByResourcePath(options) {
    var resourcePath = options.resourcePath,
        collections = options.collections,
        tableReferencesGroupedByParentId = options.tableReferencesGroupedByParentId;

    var resourceWithParents = this._getResourceWithParentsByPath({
      resourcePath: resourcePath,
      collections: collections,
      tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
    });

    if (resourceWithParents) {
      return resourceWithParents.tableReference || resourceWithParents.joinTree || resourceWithParents.source;
    }
  },
  _getPresentationFieldSourcesByResourcePath: function _getPresentationFieldSourcesByResourcePath(options) {
    var resourcePath = options.resourcePath,
        collections = options.collections,
        tableReferencesGroupedByParentId = options.tableReferencesGroupedByParentId;

    var resourceWithParents = this._getResourceWithParentsByPath({
      resourcePath: resourcePath,
      collections: collections,
      tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
    });

    return resourceWithParents;
  },
  _getResourceWithParentsByPath: function _getResourceWithParentsByPath(options) {
    var resourcePath = options.resourcePath,
        collections = options.collections,
        tableReferencesGroupedByParentId = options.tableReferencesGroupedByParentId;
    var pathComponents = pathUtil.split(resourcePath, '\\', '.');

    var firstPathComponent = _.first(pathComponents);

    var constantGroup = collections.constantGroups.by({
      name: firstPathComponent
    });
    var dataSource = collections.dataSources.by({
      name: firstPathComponent
    });

    if (constantGroup) {
      return {
        resource: constantGroup.getCalcFields().by({
          name: _.last(pathComponents)
        }),
        source: constantGroup
      };
    } else if (dataSource) {
      return this._getResourceByDataSourcePath({
        path: pathComponents,
        collections: collections,
        tableReferencesGroupedByParentId: tableReferencesGroupedByParentId
      });
    } else {
      return this._getResourceByJoinTreePath({
        path: pathComponents,
        collections: collections
      });
    }
  },
  // Path example: joinTreeName.joinAliasName.fieldName
  _getResourceByJoinTreePath: function _getResourceByJoinTreePath(options) {
    var path = options.path,
        collections = options.collections;
    return _.reduce(path, function (memo, pathComponent) {
      var parent, resource;

      if (_.keys(memo).length === 0) {
        parent = collections.joinTrees.byField('name', pathComponent);
        memo.resource = parent;
        memo.joinTree = parent;
        memo.parents = [];
        return memo;
      }

      parent = memo.resource;

      if (parent) {
        if (entityUtil.isJoinTree(parent)) {
          var joinAlias = parent.getJoinAliases().byField('name', pathComponent),
              crossTableCalcField = parent.getCalcFields().byField('name', pathComponent);

          if (joinAlias) {
            memo.joinAlias = joinAlias;
            var tableReference = schemaModelUtil.getTableReferenceByJoinAlias(joinAlias, collections);
            resource = tableReference;
          } else if (crossTableCalcField) {
            resource = crossTableCalcField;
          }
        } else if (entityUtil.isTableReference(parent)) {
          var singleTableCalcField = parent.getCalcFields().byField('name', pathComponent);

          if (singleTableCalcField) {
            resource = singleTableCalcField;
          } else {
            var table = schemaModelUtil.getTableByTableReference(parent, collections);
            resource = table.getChildren().byField('name', pathComponent);
          }
        } else if (entityUtil.isTableGroup(parent)) {
          resource = parent.getChildren().byField('name', pathComponent);
        }

        memo.resource = resource;
      }

      return memo;
    }, {});
  },
  // Path example: dataSourceName.dataSourceGroupAlias.tableReferenceName.fieldName
  _getResourceByDataSourcePath: function _getResourceByDataSourcePath(options) {
    var path = options.path,
        collections = options.collections,
        tableReferencesGroupedByParentId = options.tableReferencesGroupedByParentId;
    return _.reduce(path, function (memo, pathComponent) {
      var parent, resource;

      if (_.keys(memo).length === 0) {
        parent = collections.dataSources.byField('name', pathComponent);
        memo.resource = parent;
        memo.parents = [];
        return memo;
      }

      parent = memo.resource;

      if (parent) {
        if (entityUtil.isDataSource(parent) || entityUtil.isDataSourceGroup(parent)) {
          var tableReferences = tableReferencesGroupedByParentId[parent.id] || [],
              tableReference = _.findWhere(tableReferences, {
            name: pathComponent
          }); // We will have to check for calc fields in table reference if any
          // once we will support calc fields
          // We will have to check for calc fields in table reference if any
          // once we will support calc fields


          if (tableReference) {
            resource = tableReference;
            memo.tableReference = tableReference;
          } else {
            resource = parent.getChildren().chain().filter(function (child) {
              return entityUtil.isDataSourceGroup(child);
            }).byField('name', pathComponent);
          }
        } else if (entityUtil.isTableReference(parent)) {
          var singleTableCalcField = parent.getCalcFields().byField('name', pathComponent);

          if (singleTableCalcField) {
            resource = singleTableCalcField;
          } else {
            var table = schemaModelUtil.getTableByTableReference(parent, collections);
            resource = table.getChildren().byField('name', pathComponent);
          }
        } else if (entityUtil.isTableGroup(parent)) {
          resource = parent.getChildren().byField('name', pathComponent);
        }

        memo.resource = resource;
      }

      return memo;
    }, {});
  },
  _groupTableReferencesByParentId: function _groupTableReferencesByParentId(collections) {
    var tableReferences = collections.tableReferences.toArray();
    return _.groupBy(tableReferences, function (tableReference) {
      var table = schemaModelUtil.getTableByTableReference(tableReference, collections);
      return table.parentId;
    });
  }
});

module.exports = ServerSchemaModelParser;

});