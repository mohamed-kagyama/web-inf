define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getInstanceId(id, idGenerator) {
  if (_.isNumber(id)) {
    if (idGenerator.get() <= id) {
      idGenerator.reset(id + 1);
    }

    return id;
  } else {
    return idGenerator.next();
  }
}

function capitalize(str) {
  return str.substr(0, 1).toUpperCase() + str.substr(1);
}

function setCollection(entityNamePlural, Collection, collection, indexConfig) {
  var options = {};

  if (indexConfig) {
    options.indexConfig = indexConfig;
  }

  this[entityNamePlural] = new Collection(collection, options);
}

function getEntityFromCollection(entityNamePlural, id) {
  return this[entityNamePlural].byId(id);
}

function addEntityToCollection(entityNamePlural, entity, index) {
  this[entityNamePlural].add(entity, index);
}

function removeEntityFromCollection(entityNamePlural, entityNamePluralCapitalized, id) {
  var index = this[entityNamePlural].indexOf({
    id: id
  }),
      removeEntitiesAt = 'remove' + entityNamePluralCapitalized + 'At';

  if (index >= 0) {
    this[removeEntitiesAt](index);
  }
}

function removeEntitiesAt(entityNamePlural, index, count) {
  this[entityNamePlural].remove(index, count);
}

function getEntity(entityName) {
  return this[entityName];
}

function setEntity(entityName, entity) {
  this[entityName] = entity;
}

function setId(id) {
  var idGenerator = getEntityConfig(this).idGenerator;
  this.id = getInstanceId(id, idGenerator);
}

function getCollectionMethodNames(entityName, entityNamePlural) {
  var entityNameCapitalized = capitalize(entityName),
      entityNamePluralCapitalized = capitalize(entityNamePlural);
  var getCollectionMethod = 'get' + entityNamePluralCapitalized,
      setCollectionMethod = 'set' + entityNamePluralCapitalized,
      getEntityMethod = 'get' + entityNameCapitalized,
      addEntityMethod = 'add' + entityNameCapitalized,
      addEntitiesMethod = 'add' + entityNamePluralCapitalized,
      removeEntityMethod = 'remove' + entityNameCapitalized,
      removeEntitiesAtMethod = 'remove' + entityNamePluralCapitalized + 'At';
  return {
    getCollectionMethod: getCollectionMethod,
    setCollectionMethod: setCollectionMethod,
    getEntityMethod: getEntityMethod,
    addEntityMethod: addEntityMethod,
    addEntitiesMethod: addEntitiesMethod,
    removeEntityMethod: removeEntityMethod,
    removeEntitiesAtMethod: removeEntitiesAtMethod
  };
}

function mixInCollection(collectionConfig, Collection, Clazz) {
  // getItems
  Clazz.prototype[collectionConfig.getCollectionMethod] = _.partial(getEntity, collectionConfig.name); //setItems
  //setItems

  Clazz.prototype[collectionConfig.setCollectionMethod] = _.partial(setCollection, collectionConfig.name, Collection); // getItem
  // getItem

  Clazz.prototype[collectionConfig.getEntityMethod] = _.partial(getEntityFromCollection, collectionConfig.name); // addItem
  // addItem

  Clazz.prototype[collectionConfig.addEntityMethod] = _.partial(addEntityToCollection, collectionConfig.name); // addItems
  // addItems

  Clazz.prototype[collectionConfig.addEntitiesMethod] = _.partial(addEntityToCollection, collectionConfig.name); // removeItem
  // removeItem

  Clazz.prototype[collectionConfig.removeEntityMethod] = _.partial(removeEntityFromCollection, collectionConfig.name, collectionConfig.nameCapitalized); // removeItemsAt
  // removeItemsAt

  Clazz.prototype[collectionConfig.removeEntitiesAtMethod] = _.partial(removeEntitiesAt, collectionConfig.name);
}

function getEntityMethodNames(entityConfig) {
  var entityName = entityConfig.name,
      entityNameCapitalized = capitalize(entityName),
      getEntityMethod = 'get' + entityNameCapitalized,
      setEntityMethod = 'set' + entityNameCapitalized;
  return {
    getEntityMethod: getEntityMethod,
    setEntityMethod: setEntityMethod
  };
}

function mixInEntity(entityConfig, Clazz) {
  // getEntity
  Clazz.prototype[entityConfig.getEntityMethod] = _.partial(getEntity, entityConfig.name); // setEntity
  // setEntity

  Clazz.prototype[entityConfig.setEntityMethod] = _.partial(setEntity, entityConfig.name);
}

function mixInInitialize(Clazz, entityConfig, Collection) {
  Clazz.prototype.initialize = function (options) {
    options = options || {};
    var id = _.isNumber(this.id) ? this.id : options.id,
        self = this,
        entities = entityConfig.entities,
        collections = entityConfig.collections,
        collectionConfig,
        entityName,
        i;
    setId.call(this, id);

    for (i = 0; i < collections.length; i++) {
      collectionConfig = collections[i];
      var collectionName = collectionConfig.name,
          indexConfig = collectionConfig.indexConfig;
      setCollection.call(self, collectionName, Collection, options[collectionName], indexConfig);
    }

    for (i = 0; i < entities.length; i++) {
      entityName = entities[i].name;
      setEntity.call(self, entityName, options[entityName]);
    }

    this.update(options);
  };
}

function mixInToJson(Clazz, properties) {
  properties = properties || [];

  Clazz.prototype.toJSON = function () {
    var propertyConfig,
        value,
        json = {
      id: getEntity.call(this, 'id')
    };

    for (var i = 0; i < properties.length; i++) {
      propertyConfig = properties[i];

      if (propertyConfig.toJSON) {
        value = getEntity.call(this, propertyConfig.name);

        if (!_.isUndefined(value)) {
          json[propertyConfig.name] = _.cloneDeep(value);
        }
      }

      if (propertyConfig.name === 'id' && propertyConfig.toJSON === false) {
        delete json[propertyConfig.name];
      }
    }

    return json;
  };
}

function mixInId(Clazz) {
  Clazz.prototype.setId = setId;
  Clazz.prototype.getId = _.partial(getEntity, 'id');
}

function mixInUpdate(Clazz, properties) {
  properties = properties || [];

  Clazz.prototype.update = function (json) {
    var propertyConfig;

    for (var i = 0; i < properties.length; i++) {
      propertyConfig = properties[i];

      if (_.has(json, propertyConfig.name)) {
        setEntity.call(this, propertyConfig.name, json[propertyConfig.name]);
      }
    }
  };
}

function getCollectionsConfig(collections) {
  return _.map(collections || [], function (collectionConfig) {
    var collectionName = collectionConfig.name,
        entityName = collectionConfig.entityName || collectionName.substring(0, collectionName.length - 1);

    var result = _.extend({
      entityName: entityName,
      nameCapitalized: capitalize(collectionName)
    }, collectionConfig, getCollectionMethodNames(entityName, collectionName));

    return _.defaults({}, collectionConfig, result);
  }, this);
}

function getEntitiesConfig(entities) {
  return _.map(entities || [], function (entityConfig) {
    return _.defaults({}, entityConfig, getEntityMethodNames(entityConfig));
  });
}

function getPropertiesConfig(properties) {
  return _.map(properties || [], function (propertyConfig) {
    return _.defaults({}, propertyConfig, getEntityMethodNames(propertyConfig));
  });
}

function extendEntityConfig(entityConfig, options) {
  entityConfig = entityConfig || {};
  return _.extend(entityConfig, {
    collections: getCollectionsConfig(entityConfig.collections),
    entities: getEntitiesConfig(entityConfig.entities),
    properties: getPropertiesConfig(entityConfig.properties),
    idGenerator: options.idGenerator
  });
}

function setEntityConfig(Clazz, entityConfig) {
  Clazz.prototype._entityConfig = entityConfig;
}

function getEntityConfig(entity) {
  return entity._entityConfig;
}

function renameFunction(fn, name) {
  //ES6 compatible browsers use static analysis to show function's name during
  //console.log, so we have to emulate this behaviour in order to give dynamic name to
  //our function for better logging purposes
  // defining function via Function constructor is the only way to
  // dynamically set name of the function
  var functionWithNewName = new Function('return function (call) { return function ' + name + ' () { return call(this, arguments) }; };')();
  return functionWithNewName(_.bind(fn.apply, fn));
}

function createClass(entityConfig, options) {
  entityConfig = _.cloneDeep(entityConfig);
  var Collection = options.Collection;
  var Entity = renameFunction(function (options) {
    this.initialize(options);
  }, entityConfig.name);
  entityConfig = extendEntityConfig(entityConfig, options);
  setEntityConfig(Entity, entityConfig);

  _.each(entityConfig.collections, function (collectionConfig) {
    mixInCollection(collectionConfig, Collection, Entity);
  }, this);

  _.each(entityConfig.entities, function (entityConfig) {
    mixInEntity(entityConfig, Entity);
  });

  _.each(entityConfig.properties, function (propertyConfig) {
    mixInEntity(propertyConfig, Entity);
  });

  mixInInitialize(Entity, entityConfig, Collection);
  mixInToJson(Entity, entityConfig.properties);
  mixInUpdate(Entity, entityConfig.properties);
  mixInId(Entity);
  return Entity;
}

module.exports = {
  createClass: createClass
};

});