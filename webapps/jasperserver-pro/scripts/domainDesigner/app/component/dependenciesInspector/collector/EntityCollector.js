define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../model/schema/enum/schemaEntitiesEnum");

var schemaCollectionsEnum = require("../../../../model/schema/enum/schemaCollectionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EntityCollector = function EntityCollector(options) {
  this.initialize(options);
};

_.extend(EntityCollector.prototype, {
  initialize: function initialize(options) {
    options = options || {};

    _.bindAll(this, 'collectAffectedEntities');

    this.dataStore = options.dataStore;
    this.dependenciesTrackingStore = options.dependenciesTrackingStore;
    this.applicationMutations = options.applicationMutations;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  collectAffectedEntities: function collectAffectedEntities(actionName, args) {
    args = _.isArray(args) ? args : [args];

    this._copyDataStoreToDependenciesTrackingStore();

    this.applicationMutations[actionName].apply(this.applicationMutations, args);
    return this._collectRemovedAndAffectedEntities();
  },
  _copyDataStoreToDependenciesTrackingStore: function _copyDataStoreToDependenciesTrackingStore() {
    this.dependenciesTrackingStore.deserialize(this.dataStore.serialize());
  },
  _collectRemovedAndAffectedEntities: function _collectRemovedAndAffectedEntities() {
    var entities = this._collectRemovedEntities(),
        affectedEntities = this._collectAffectedEntities();

    return {
      removedEntities: entities,
      affectedEntities: affectedEntities
    };
  },
  _collectRemovedEntities: function _collectRemovedEntities() {
    var self = this,
        dataStoreCollections = this.dataStore.getCollections(),
        dependenciesTrackingStoreCollections = this.dependenciesTrackingStore.getCollections();

    var removedEntitiesCollection = _.reduce(schemaEntitiesEnum, function (memo, entityName) {
      memo[entityName] = [];
      return memo;
    }, {});

    _.each(schemaCollectionsEnum, function (collectionName) {
      var resourcesMap = dependenciesTrackingStoreCollections[collectionName].reduce(function (memo, entity) {
        memo[entity.id] = true;
        return memo;
      }, {});
      dataStoreCollections[collectionName].each(function (entity) {
        var entityName;

        if (!resourcesMap[entity.id]) {
          entityName = entityUtil.getEntityName(entity);
          removedEntitiesCollection[entityName].push(self._getSerializedEntity(entity));
        }
      });
    });

    return removedEntitiesCollection;
  },
  _collectAffectedEntities: function _collectAffectedEntities() {
    var affectedJoinTrees = this.dependenciesTrackingStore.getCollection('joinTrees'),
        originalJoinTrees = this.dataStore.getCollection('joinTrees');
    affectedJoinTrees = affectedJoinTrees.reduce(function (memo, affectedJoinTree) {
      var originalJoinTree;

      if (this.clientDomainSchemaService.isJoinTreeConsistsOfASingleComponent(affectedJoinTree)) {
        originalJoinTree = originalJoinTrees.byId(affectedJoinTree.id);
        var originalJoinTreeAliases = originalJoinTree.getJoinAliases(),
            affectedJoinTreeAliases = affectedJoinTree.getJoinAliases(),
            originalJoinTreeJoins = originalJoinTree.getJoins(),
            affectedJoinTreeJoins = affectedJoinTree.getJoins();

        var joinExpressionsQuantityReducer = function joinExpressionsQuantityReducer(memo, join) {
          if (entityUtil.isJoin(join)) {
            memo = memo + join.getJoinExpressions().size();
          } else if (entityUtil.isComplexJoin(join)) {
            memo = memo + 1;
          }

          return memo;
        };

        var originalJoinTreeJoinExpressionsQuantity = originalJoinTreeJoins.reduce(joinExpressionsQuantityReducer, 0),
            affectedJoinTreeJoinExpressionsQuantity = affectedJoinTreeJoins.reduce(joinExpressionsQuantityReducer, 0);

        if (originalJoinTreeAliases.size() === affectedJoinTreeAliases.size() && originalJoinTreeJoins.size() === affectedJoinTreeJoins.size() && originalJoinTreeJoinExpressionsQuantity === affectedJoinTreeJoinExpressionsQuantity) {
          return memo;
        }
      }

      return memo.concat(this._getSerializedEntity(affectedJoinTree));
    }, [], this);
    var affectedEntities = {};
    affectedEntities[schemaEntitiesEnum.JOIN_TREE] = affectedJoinTrees;
    return affectedEntities;
  },
  _getSerializedEntity: function _getSerializedEntity(entity) {
    var entityJSON = _.extend({}, entity.toJSON(), {
      entityType: entityUtil.getEntityName(entity)
    });

    if (entityUtil.isFilterExpression(entity)) {
      entityJSON = _.extend({}, entityJSON, {
        fieldReferences: entity.getFieldReferences().map(function (fieldReference) {
          return {
            id: fieldReference.id,
            sourceId: fieldReference.sourceId,
            sourceType: fieldReference.sourceType,
            fieldId: fieldReference.fieldId,
            fieldType: fieldReference.fieldType
          };
        })
      });
    }

    return entityJSON;
  }
});

module.exports = EntityCollector;

});