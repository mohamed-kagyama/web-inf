define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../model/schema/util/entityUtil");

var schemaModelUtil = require("../../../model/schema/util/schemaModelUtil");

var schemaEntitiesEnum = require("../../../model/schema/enum/schemaEntitiesEnum");

var dispatcherActionUtil = require("../../component/dependenciesInspector/convertor/util/dispatcherActionUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PATH_SEPARATOR = '.';

function ClientDomainSchemaPathGenerationService(options) {
  _.bindAll(this, 'getEntityParentPath', 'getEntityPath');

  this.dataStore = options.dataStore;
}

_.extend(ClientDomainSchemaPathGenerationService.prototype, {
  getEntityParentPath: function getEntityParentPath(entity) {
    var parents = this._getParents(entity);

    return this._buildPath(parents);
  },
  getEntityPath: function getEntityPath(entity) {
    var entities = [];

    var entityFromDataStore = this._getEntityFromDataStore(entity);

    var parents = this._getParents(entityFromDataStore);

    entities = entities.concat([entityFromDataStore]).concat(parents);
    return this._buildPath(entities);
  },
  _getEntityFromDataStore: function _getEntityFromDataStore(entity) {
    var entityWithName;
    var collections = this.dataStore.getCollections();

    var type = this._getType(entity);

    if (type === schemaEntitiesEnum.PRESENTATION_FIELD) {
      entityWithName = schemaModelUtil.getPresentationSetOrFieldById(entity.id, collections);
    } else {
      entityWithName = schemaModelUtil.getResourceByIdAndType(entity.id, type, collections);
    }

    return entityWithName;
  },
  _getType: function _getType(entity) {
    var type = entity.entityType;

    if (!type) {
      type = entityUtil.getEntityName(entity);
    }

    return type;
  },
  _getParents: function _getParents(entity) {
    var parents = [];
    var collections = this.dataStore.getCollections();

    var type = this._getType(entity);

    if (type === schemaEntitiesEnum.PRESENTATION_FIELD) {
      parents = this._getPresentationParents(entity);
    } else {
      parents = schemaModelUtil.getResourceParentsByIdAndType(entity.id, type, collections);
    }

    return parents;
  },
  _getPresentationParents: function _getPresentationParents(entity) {
    var collections = this.dataStore.getCollections();

    if (!entityUtil.isPresentationField(entity)) {
      entity = schemaModelUtil.getPresentationSetOrFieldById(entity.id, collections);
    }

    return schemaModelUtil.getPresentationParents(entity, collections);
  },
  _buildPath: function _buildPath(entities) {
    var path;

    if (entities.length > 0) {
      entities.reverse();
      path = entities.map(function (entity) {
        return entity.name;
      }).join(PATH_SEPARATOR);
    }

    return path;
  }
});

module.exports = ClientDomainSchemaPathGenerationService;

});