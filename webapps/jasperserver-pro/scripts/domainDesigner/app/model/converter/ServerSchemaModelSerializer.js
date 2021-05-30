define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var joinExpressionUtil = require("../expression/joinExpressionUtil");

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

var entityUtil = require("../../../model/schema/util/entityUtil");

var resourceTypeEnum = require("../enum/resourceTypeEnum");

var resourcePropertiesEnum = require("../enum/resourcePropertiesEnum");

var dataSourceLevelEnum = require("../enum/dataSourceLevelEnum");

var dataSourceToServerLevelEnum = require("../enum/dataSourceToServerLevelEnum");

var referencePathUtil = require("./util/referencePathUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function ServerModelSchemaSerializer(options) {
  this.initialize(options);
}

_.extend(ServerModelSchemaSerializer.prototype, {
  initialize: function initialize(options) {
    this.filterExpressionsSerializer = options.filterExpressionsSerializer;
    this.calcFieldSerializer = options.calcFieldSerializer;
  },
  toJSON: function toJSON(collections) {
    return this.domainToJson(collections);
  },
  domainToJson: function domainToJson(collections) {
    return {
      schema: this.schemaToJson(collections)
    };
  },
  schemaToJson: function schemaToJson(collections) {
    var constantGroups = collections.constantGroups,
        dataSources = collections.dataSources,
        dataIslands = collections.dataIslands,
        joinTrees = collections.joinTrees,
        resources = [],
        self = this;
    var constantGroupsJson = constantGroups.map(function (constantGroup) {
      return self.constantGroupToJson({
        constantGroup: constantGroup,
        collections: collections
      });
    });
    var dataSourcesJson = dataSources.reduce(function (memo, dataSource) {
      if (!_.isEmpty(dataSource.getChildren().first())) {
        memo.push(self.dataSourceToJson({
          dataSource: dataSource,
          collections: collections
        }));
      }

      return memo;
    }, []);
    var joinTreesJson = joinTrees.map(function (joinTree) {
      return self.joinTreeToJson({
        joinTree: joinTree,
        collections: collections
      });
    });
    var dataIslandsJson = dataIslands.map(function (dataIsland) {
      return self.dataIslandToJson({
        dataIsland: dataIsland,
        collections: collections
      });
    });
    resources = resources.concat(constantGroupsJson, dataSourcesJson, joinTreesJson);
    return {
      resources: resources,
      presentation: dataIslandsJson
    };
  },
  constantGroupToJson: function constantGroupToJson(options) {
    var constantGroup = options.constantGroup,
        self = this;
    var constantsJson = constantGroup.getCalcFields().map(function (constant) {
      return self.constantToJson({
        constant: constant
      });
    });
    var constantGroupJson;
    constantGroupJson = {};
    constantGroupJson[resourceTypeEnum.resources.constantsGroups.GROUP] = {
      name: constantGroup.name,
      elements: constantsJson
    };
    return constantGroupJson;
  },
  constantToJson: function constantToJson(options) {
    var constant = options.constant;
    return this.calcFieldSerializer.serialize(constant);
  },
  dataSourceToJson: function dataSourceToJson(options) {
    var dataSource = options.dataSource,
        collections = options.collections;
    var elements = this.dataSourceResourcesChildrenToJson({
      resource: dataSource,
      collections: collections
    });
    return {
      group: {
        name: dataSource.name,
        elements: elements
      }
    };
  },
  dataSourceResourcesChildrenToJson: function dataSourceResourcesChildrenToJson(options) {
    var resource = options.resource,
        collections = options.collections,
        self = this;
    return resource.getChildren().reduce(function (memo, child) {
      var result = self.dataSourceResourceToJson({
        resource: child,
        collections: collections
      });
      memo = memo.concat(result);
      return memo;
    }, []);
  },
  dataSourceResourceToJson: function dataSourceResourceToJson(options) {
    var resource = options.resource;

    if (entityUtil.isDataSourceGroup(resource)) {
      return this.dataSourceGroupToJson(options);
    } else if (entityUtil.isTable(resource)) {
      return this.allTableReferencesByTableToJson(options);
    } else if (entityUtil.isTableGroup(resource)) {
      return this.tableGroupToJson(options);
    } else if (entityUtil.isGenericField(resource)) {
      return this.genericFieldToJson(options);
    }
  },
  dataSourceGroupToJson: function dataSourceGroupToJson(options) {
    var dataSourceGroup = options.resource,
        collections = options.collections;
    var elements = this.dataSourceResourcesChildrenToJson({
      resource: dataSourceGroup,
      collections: collections
    });
    var dataSourceGroupSourceName = dataSourceGroup.sourceName,
        dataSourceGroupName = dataSourceGroup.name;
    var dataSourceGroupJson = {
      group: {
        name: dataSourceGroupName,
        sourceName: dataSourceGroupSourceName,
        elements: elements
      }
    };

    if (_.isEmpty(elements)) {
      // Special case for server side:
      // if schema is empty we have to add kind: "schema" to be able to save or validate this domain
      dataSourceGroupJson.group[resourcePropertiesEnum.type] = dataSourceToServerLevelEnum[dataSourceLevelEnum.DATA_SOURCE_GROUP];
    }

    return dataSourceGroupJson;
  },
  allTableReferencesByTableToJson: function allTableReferencesByTableToJson(options) {
    var table = options.resource,
        collections = options.collections,
        self = this,
        tableReferences = schemaModelUtil.getAllTableReferencesByTable(table, collections);
    return tableReferences.map(function (tableReference) {
      return self.tableReferenceToJson({
        tableReference: tableReference,
        table: table,
        collections: collections
      });
    });
  },
  tableReferenceToJson: function tableReferenceToJson(options) {
    var table = options.table;

    if (entityUtil.isDerivedTable(table)) {
      return this.tableReferenceBasedOnDerivedTableToJson(options);
    } else {
      return this.tableReferenceBasedOnGenericTableToJson(options);
    }
  },
  tableReferenceBasedOnDerivedTableToJson: function tableReferenceBasedOnDerivedTableToJson(options) {
    var tableReference = options.tableReference,
        table = options.table,
        tableReferenceName = tableReference.name;
    var tableReferenceJson = {
      queryGroup: {
        name: tableReferenceName,
        elements: this.tableReferenceChildrenToJson(options),
        query: table.query
      }
    };
    var filterExpressionObject = this.tableReferenceFiltersToJson({
      tableReference: tableReference,
      collections: options.collections
    });

    if (filterExpressionObject) {
      tableReferenceJson.queryGroup.filterExpression = filterExpressionObject;
    }

    return tableReferenceJson;
  },
  tableReferenceBasedOnGenericTableToJson: function tableReferenceBasedOnGenericTableToJson(options) {
    var tableReference = options.tableReference,
        table = options.table,
        tableReferenceName = tableReference.name,
        tableName = table.name;
    var tableReferenceJson = {
      group: {
        name: tableReferenceName || tableName,
        elements: this.tableReferenceChildrenToJson(options)
      }
    };
    var filterExpressionObject = this.tableReferenceFiltersToJson({
      tableReference: tableReference,
      collections: options.collections
    });

    if (filterExpressionObject) {
      tableReferenceJson.group.filterExpression = filterExpressionObject;
    }

    if (tableReferenceName && tableReferenceName !== tableName) {
      tableReferenceJson.group.sourceName = tableName;
    }

    return tableReferenceJson;
  },
  tableReferenceFiltersToJson: function tableReferenceFiltersToJson(options) {
    var tableReference = options.tableReference,
        collections = options.collections;
    return this.filterExpressionsSerializer.serializeTableReferenceFilters(tableReference, collections);
  },
  tableReferenceChildrenToJson: function tableReferenceChildrenToJson(options) {
    var tableReference = options.tableReference,
        table = options.table,
        collections = options.collections;
    var fields = this.dataSourceResourcesChildrenToJson({
      resource: table,
      collections: collections
    });
    var calcFields = this.singleTableCalcFieldsToJson(tableReference);
    return fields.concat(calcFields);
  },
  singleTableCalcFieldsToJson: function singleTableCalcFieldsToJson(tableReference) {
    var self = this;
    return tableReference.getCalcFields().map(function (calcField) {
      return self.calcFieldToJson(calcField);
    });
  },
  tableGroupToJson: function tableGroupToJson(options) {
    var tableGroup = options.resource,
        collections = options.collections;
    var elements = this.dataSourceResourcesChildrenToJson({
      resource: tableGroup,
      collections: collections
    });
    var tableGroupJson = {
      group: {
        name: tableGroup.name,
        elements: elements
      }
    };
    return tableGroupJson;
  },
  genericFieldToJson: function genericFieldToJson(options) {
    var field = options.resource;
    var fieldJson = {
      element: {
        name: field.name,
        type: field.type,
        sourceName: field.sourceName
      }
    };
    return fieldJson;
  },
  calcFieldToJson: function calcFieldToJson(calcField) {
    return this.calcFieldSerializer.serialize(calcField);
  },
  joinTreeToJson: function joinTreeToJson(options) {
    var mandatoryTables = [],
        joinTree = options.joinTree,
        collections = options.collections,
        self = this;
    var joinAliasesJson = joinTree.getJoinAliases().map(function (joinAlias) {
      if (joinAlias.alwaysIncludeTable) {
        mandatoryTables.push(joinAlias.name);
      }

      return self.joinAliasToJson({
        joinAlias: joinAlias,
        collections: collections
      });
    });
    var calcFieldsJson = joinTree.getCalcFields().map(function (calcField) {
      return self.calcFieldToJson(calcField);
    });
    var joinsJson = joinTree.getJoins().map(function (join) {
      return self.joinToJson({
        join: join,
        collections: collections
      });
    });
    var joinTreeJson = {
      joinGroup: {
        name: joinTree.name,
        elements: joinAliasesJson.concat(calcFieldsJson),
        joinInfo: {
          includeAllDataIslandJoins: joinTree.includeAllDataIslandJoins,
          suppressCircularJoins: joinTree.suppressCircularJoins,
          joins: joinsJson
        }
      }
    };

    if (mandatoryTables.length) {
      joinTreeJson.joinGroup.joinInfo.mandatoryTables = mandatoryTables;
    }

    joinTreeJson = this.joinTreeFiltersToJson(joinTreeJson, {
      joinTree: joinTree,
      collections: collections
    });
    return joinTreeJson;
  },
  joinTreeFiltersToJson: function joinTreeFiltersToJson(joinTreeJson, options) {
    var joinTree = options.joinTree,
        collections = options.collections;
    var expression = this.filterExpressionsSerializer.serializeJoinTreeFilters(joinTree, collections);

    if (expression) {
      joinTreeJson.joinGroup.filterExpression = expression;
    }

    return joinTreeJson;
  },
  joinAliasToJson: function joinAliasToJson(options) {
    var joinAlias = options.joinAlias,
        collections = options.collections;
    var joinAliasJson = {
      reference: {
        name: joinAlias.name,
        referencePath: referencePathUtil.getJoinAliasReferencePath(joinAlias, collections)
      }
    };
    return joinAliasJson;
  },
  joinToJson: function joinToJson(options) {
    var join = options.join,
        collections = options.collections,
        joinAliases = collections.joinAliases,
        leftJoinAlias = joinAliases.byId(join.leftJoinAliasId),
        rightJoinAlias = joinAliases.byId(join.rightJoinAliasId);
    var expression = {
      string: ''
    };

    if (entityUtil.isJoin(join)) {
      expression.string = joinExpressionUtil.formatJoinExpressions(join.getJoinExpressions(), collections);
    } else if (entityUtil.isComplexJoin(join)) {
      expression.string = join.expression.string;
    }

    return {
      type: join.type,
      left: leftJoinAlias.name,
      right: rightJoinAlias.name,
      weight: join.weight,
      expression: expression
    };
  },
  dataIslandToJson: function dataIslandToJson(options) {
    var dataIsland = options.dataIsland,
        collections = options.collections,
        actualDataIsland = dataIsland,
        resourcePath;
    var elements = this.presentationItemsToJson({
      items: dataIsland.getChildren(),
      collections: collections
    }); // skip getting resource path for DI without source in case when we apply validation result and want to keep DI
    // skip getting resource path for DI without source in case when we apply validation result and want to keep DI

    if (actualDataIsland.sourceId) {
      resourcePath = referencePathUtil.getDataIslandResourcePath(actualDataIsland, options);
    }

    var dataIslandJSON = _.omit(dataIsland.toJSON(), ['id', 'sourceId', 'sourceType']);

    return _.extend({}, dataIslandJSON, {
      elements: elements,
      resourcePath: resourcePath
    });
  },
  presentationItemsToJson: function presentationItemsToJson(options) {
    var items = options.items,
        collections = options.collections,
        self = this;
    return items.map(function (child) {
      if (entityUtil.isPresentationSet(child)) {
        return self.presentationSetToJson({
          set: child,
          collections: collections
        });
      } else if (entityUtil.isPresentationField(child)) {
        return self.presentationFieldToJson({
          field: child,
          collections: collections
        });
      }
    });
  },
  presentationSetToJson: function presentationSetToJson(options) {
    var set = options.set,
        collections = options.collections;
    var elements = this.presentationItemsToJson({
      items: set.getChildren(),
      collections: collections
    });

    var setJson = _.omit(set.toJSON(), ['id']);

    return {
      group: _.extend(setJson, {
        elements: elements
      })
    };
  },
  presentationFieldToJson: function presentationFieldToJson(options) {
    var field = options.field,
        collections = options.collections,
        propertiesToOmit = ['id', 'fieldId', 'fieldType', 'sourceId', 'sourceType'];

    if (_.isEmpty(field.mask)) {
      propertiesToOmit.push('mask');
    }

    var fieldJSON = _.omit(field.toJSON(), propertiesToOmit);

    return {
      element: _.extend(fieldJSON, this.getPresentationFieldAdditionalProps(field, collections))
    };
  },
  getPresentationFieldAdditionalProps: function getPresentationFieldAdditionalProps(presentationField, collections) {
    var sourceFieldId = presentationField.fieldId,
        props = {};

    _.extend(props, {
      resourcePath: referencePathUtil.getPresentationFieldReferencePath(presentationField, collections),
      type: collections.fields.byId(sourceFieldId).type
    });

    _.extend(props, {
      hierarchicalName: referencePathUtil.getPresentationFieldHierarchicalName(presentationField, collections)
    });

    return props;
  }
});

module.exports = ServerModelSchemaSerializer;

});