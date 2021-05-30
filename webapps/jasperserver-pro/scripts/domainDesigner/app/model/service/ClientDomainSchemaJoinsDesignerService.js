define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../model/schema/enum/schemaEntitiesEnum");

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

var allCollectionsMixin = require("../../../model/schema/mixin/allCollectionsMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JOIN_TREE_NAME_TEMPLATE = _.template('JoinTree_{{=suffix}}');

var ClientDomainSchemaJoinsDesignerService = function ClientDomainSchemaJoinsDesignerService(options) {
  this.initialize(options);
};

_.extend(ClientDomainSchemaJoinsDesignerService.prototype, allCollectionsMixin, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.joinTreeNameSuffixGenerator = options.joinTreeNameSuffixGenerator;
    this.mixInAllCollections(this.dataStore);
  },
  getAlwaysIncludeTableByJoinAliasId: function getAlwaysIncludeTableByJoinAliasId(joinAliasId) {
    var collections = this.dataStore.getCollections(),
        joinAlias = collections.joinAliases.byId(joinAliasId);
    return joinAlias && joinAlias.alwaysIncludeTable;
  },
  getOptionsForAlwaysIncludedTableEnabledSpec: function getOptionsForAlwaysIncludedTableEnabledSpec(options) {
    if (!options.joinTreeId || !entityUtil.isJoinAlias(options.type)) {
      return null;
    }

    var joinTree = schemaModelUtil.getResourceByIdAndType(options.joinTreeId, schemaEntitiesEnum.JOIN_TREE, this.dataStore.getCollections());
    return {
      suppressCircularJoin: joinTree.getSuppressCircularJoins(),
      includeAllDataIslandJoins: joinTree.getIncludeAllDataIslandJoins()
    };
  },
  getFieldsForTablesInJoin: function getFieldsForTablesInJoin(joinId) {
    var collections = this.dataStore.getCollections();
    var join = this.joins.byId(joinId),
        leftJoinAlias = this.joinAliases.byId(join.getLeftJoinAliasId()),
        rightJoinAlias = this.joinAliases.byId(join.getRightJoinAliasId());
    return this._getFieldsConstantJoin({
      collections: collections,
      leftJoinAlias: leftJoinAlias,
      rightJoinAlias: rightJoinAlias
    });
  },
  generateJoins: function generateJoins(joinsInfo) {
    var dataSourceId = _.first(joinsInfo).dataSourceId;

    var joinsInfoByJoinTree = this._groupJoinsInfoByJoinTree(joinsInfo);

    return {
      dataSourceId: dataSourceId,
      joinsInfo: this._generateJoinTrees(joinsInfoByJoinTree)
    };
  },
  generateJoinTreeName: function generateJoinTreeName() {
    return this._generateJoinTreeName();
  },
  _generateJoinTrees: function _generateJoinTrees(joinsInfoByJoinTree) {
    return _.map(joinsInfoByJoinTree, function (joins) {
      return _.extend({
        name: this._generateJoinTreeName(),
        joins: joins
      }, this._getJoinTreeDefaults());
    }, this);
  },
  _getJoinTreeDefaults: function _getJoinTreeDefaults() {
    return {
      includeAllDataIslandJoins: false,
      suppressCircularJoins: false
    };
  },
  _groupJoinsInfoByJoinTree: function _groupJoinsInfoByJoinTree(joinsInfo) {
    var i,
        joinInfo,
        joinTreeId,
        joinTrees = {},
        leftTableId,
        rightTableId,
        leftTableJoinTreeId,
        rightTableJoinTreeId,
        tableToJoinTreeMap = {},
        nextJoinTreeIndex = 1;

    for (i = 0; i < joinsInfo.length; i++) {
      joinInfo = joinsInfo[i];
      joinTreeId = undefined;
      leftTableId = joinInfo.leftTableId;
      rightTableId = joinInfo.rightTableId;
      leftTableJoinTreeId = tableToJoinTreeMap[leftTableId];
      rightTableJoinTreeId = tableToJoinTreeMap[rightTableId];

      if (leftTableJoinTreeId && rightTableJoinTreeId && leftTableJoinTreeId !== rightTableJoinTreeId) {
        // We are in situation similar to this one:
        // table A - table B => joinTree 1
        // table B - table C => joinTree 1
        // table C - table D => joinTree 1
        //
        // table K - table L => joinTree 2
        // table L - table M => joinTree 2
        // table M - table N => joinTree 2
        //
        // table D - table N => joinTree ????
        //
        // So we are going to join joinTree 1 and 2 into 1
        _.each(Object.keys(tableToJoinTreeMap), function (keyValue) {
          if (tableToJoinTreeMap[keyValue] === leftTableJoinTreeId) {
            tableToJoinTreeMap[keyValue] = rightTableJoinTreeId;
          }
        });

        joinTrees[rightTableJoinTreeId] = joinTrees[rightTableJoinTreeId].concat(joinTrees[leftTableJoinTreeId]);
        delete joinTrees[leftTableJoinTreeId];
        joinTreeId = rightTableJoinTreeId;
      } else if (leftTableJoinTreeId || rightTableJoinTreeId) {
        joinTreeId = tableToJoinTreeMap[leftTableId] || tableToJoinTreeMap[rightTableId];
      } else if (!leftTableJoinTreeId && !rightTableJoinTreeId) {
        joinTreeId = nextJoinTreeIndex++;
      }

      tableToJoinTreeMap[leftTableId] = joinTreeId;
      tableToJoinTreeMap[rightTableId] = joinTreeId;

      if (!joinTrees[joinTreeId]) {
        joinTrees[joinTreeId] = [];
      }

      joinTrees[joinTreeId].push(joinInfo);
    }

    return joinTrees;
  },
  _generateJoinTreeName: function _generateJoinTreeName() {
    var self = this;
    return this._generateName(this._getJoinTreeNameByTemplate, this.joinTreeNameSuffixGenerator, function (name) {
      return self.joinTrees.byField('name', name) || self.dataSources.byField('name', name);
    });
  },
  _generateName: function _generateName(template, generator, exists) {
    var name = template(generator.next());

    while (exists(name)) {
      name = template(generator.next());
    }

    return name;
  },
  _getJoinTreeNameByTemplate: function _getJoinTreeNameByTemplate(suffix) {
    return JOIN_TREE_NAME_TEMPLATE({
      suffix: suffix
    });
  },
  _getFieldsConstantJoin: function _getFieldsConstantJoin(options) {
    var collections = options.collections,
        leftJoinAlias = options.leftJoinAlias,
        rightJoinAlias = options.rightJoinAlias,
        leftTableFields = schemaModelUtil.getTableFieldsByJoinAlias(leftJoinAlias, collections),
        rightTableFields = schemaModelUtil.getTableFieldsByJoinAlias(rightJoinAlias, collections),
        leftTableCalcFields = schemaModelUtil.getCalcFieldsByJoinAlias(leftJoinAlias, collections),
        rightTableCalcFields = schemaModelUtil.getCalcFieldsByJoinAlias(rightJoinAlias, collections);

    var leftFieldsJSON = this._getFieldsJSON(leftTableFields, leftJoinAlias);

    var rightFieldsJSON = this._getFieldsJSON(rightTableFields, rightJoinAlias);

    var leftCalcFieldsJSON = this._getFieldsJSON(leftTableCalcFields, leftJoinAlias);

    var rightCalcFieldsJSON = this._getFieldsJSON(rightTableCalcFields, rightJoinAlias);

    return leftFieldsJSON.concat(rightFieldsJSON).concat(leftCalcFieldsJSON).concat(rightCalcFieldsJSON);
  },
  _getFieldsJSON: function _getFieldsJSON(tableFields, joinAlias) {
    return tableFields.map(function (field) {
      var fieldJSON = field.toJSON();
      fieldJSON.joinAlias = joinAlias.getName();
      fieldJSON.joinAliasId = joinAlias.getId();
      return fieldJSON;
    });
  }
});

module.exports = ClientDomainSchemaJoinsDesignerService;

});