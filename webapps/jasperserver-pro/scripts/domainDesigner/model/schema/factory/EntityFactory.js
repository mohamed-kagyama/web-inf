define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../enum/schemaEntitiesEnum");

var tableReferenceConfig = require('../entity/TableReference');

var constantGroupConfig = require('../entity/ConstantGroup');

var dataSourceConfig = require('../entity/DataSource');

var dataSourceGroupConfig = require('../entity/DataSourceGroup');

var tableConfig = require('../entity/Table');

var derivedTableConfig = require('../entity/DerivedTable');

var tableGroupConfig = require('../entity/TableGroup');

var fieldConfig = require('../entity/Field');

var fieldReferenceConfig = require('../entity/FieldReference');

var calcFieldConfig = require('../entity/CalcField');

var filterExpressionConfig = require('../entity/FilterExpression');

var complexFilterConfig = require('../entity/ComplexFilter');

var joinTreeConfig = require('../entity/JoinTree');

var joinConfig = require('../entity/Join');

var complexJoinConfig = require('../entity/ComplexJoin');

var joinAliasConfig = require('../entity/JoinAlias');

var joinExpressionConfig = require('../entity/JoinExpression');

var constantJoinExpressionConfig = require('../entity/ConstantJoinExpression');

var dataIslandConfig = require('../entity/DataIsland');

var presentationSetConfig = require('../entity/PresentationSet');

var presentationFieldConfig = require('../entity/PresentationField');

var entityClassFactory = require("../../util/entityClassFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EntityFactory = function EntityFactory(options) {
  this.entityClassFactory = options.entityClassFactory || entityClassFactory;
  this.entityClassRegistry = this._createEntityClassRegistry(options.idGenerator, options.Collection);
};

_.extend(EntityFactory.prototype, {
  _createEntityClassRegistry: function _createEntityClassRegistry(idGenerator, Collection) {
    var options = {
      idGenerator: idGenerator,
      Collection: Collection
    };
    var entityClassRegistry = {};
    entityClassRegistry[schemaEntitiesEnum.CONSTANT_GROUP] = entityClassFactory.createClass(constantGroupConfig, options);
    entityClassRegistry[schemaEntitiesEnum.DATA_SOURCE] = entityClassFactory.createClass(dataSourceConfig, options);
    entityClassRegistry[schemaEntitiesEnum.DATA_SOURCE_GROUP] = entityClassFactory.createClass(dataSourceGroupConfig, options);
    entityClassRegistry[schemaEntitiesEnum.TABLE] = entityClassFactory.createClass(tableConfig, options);
    entityClassRegistry[schemaEntitiesEnum.DERIVED_TABLE] = entityClassFactory.createClass(derivedTableConfig, options);
    entityClassRegistry[schemaEntitiesEnum.TABLE_GROUP] = entityClassFactory.createClass(tableGroupConfig, options);
    entityClassRegistry[schemaEntitiesEnum.FIELD] = entityClassFactory.createClass(fieldConfig, options);
    entityClassRegistry[schemaEntitiesEnum.FIELD_REFERENCE] = entityClassFactory.createClass(fieldReferenceConfig, options);
    entityClassRegistry[schemaEntitiesEnum.CALC_FIELD] = entityClassFactory.createClass(calcFieldConfig, options);
    entityClassRegistry[schemaEntitiesEnum.FILTER_EXPRESSION] = entityClassFactory.createClass(filterExpressionConfig, options);
    entityClassRegistry[schemaEntitiesEnum.COMPLEX_FILTER] = entityClassFactory.createClass(complexFilterConfig, options);
    entityClassRegistry[schemaEntitiesEnum.TABLE_REFERENCE] = entityClassFactory.createClass(tableReferenceConfig, options);
    entityClassRegistry[schemaEntitiesEnum.JOIN_TREE] = entityClassFactory.createClass(joinTreeConfig, options);
    entityClassRegistry[schemaEntitiesEnum.JOIN_ALIAS] = entityClassFactory.createClass(joinAliasConfig, options);
    entityClassRegistry[schemaEntitiesEnum.JOIN] = entityClassFactory.createClass(joinConfig, options);
    entityClassRegistry[schemaEntitiesEnum.COMPLEX_JOIN] = entityClassFactory.createClass(complexJoinConfig, options);
    entityClassRegistry[schemaEntitiesEnum.JOIN_EXPRESSION] = entityClassFactory.createClass(joinExpressionConfig, options);
    entityClassRegistry[schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION] = entityClassFactory.createClass(constantJoinExpressionConfig, options);
    entityClassRegistry[schemaEntitiesEnum.DATA_ISLAND] = entityClassFactory.createClass(dataIslandConfig, options);
    entityClassRegistry[schemaEntitiesEnum.PRESENTATION_SET] = entityClassFactory.createClass(presentationSetConfig, options);
    entityClassRegistry[schemaEntitiesEnum.PRESENTATION_FIELD] = entityClassFactory.createClass(presentationFieldConfig, options);
    return entityClassRegistry;
  },
  createTableReference: function createTableReference(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.TABLE_REFERENCE](json);
  },
  createConstantGroup: function createConstantGroup(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.CONSTANT_GROUP](json);
  },
  createDataSource: function createDataSource(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.DATA_SOURCE](json);
  },
  createDataSourceGroup: function createDataSourceGroup(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.DATA_SOURCE_GROUP](json);
  },
  createDerivedTable: function createDerivedTable(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.DERIVED_TABLE](json);
  },
  createGenericTable: function createGenericTable(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.TABLE](json);
  },
  createTableGroup: function createTableGroup(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.TABLE_GROUP](json);
  },
  createFieldReference: function createFieldReference(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.FIELD_REFERENCE](json);
  },
  createGenericField: function createGenericField(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.FIELD](json);
  },
  createCalcField: function createCalcField(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.CALC_FIELD](json);
  },
  createFilterExpression: function createFilterExpression(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.FILTER_EXPRESSION](json);
  },
  createComplexFilter: function createComplexFilter(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.COMPLEX_FILTER](json);
  },
  createJoinTree: function createJoinTree(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.JOIN_TREE](json);
  },
  createJoin: function createJoin(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.JOIN](json);
  },
  createComplexJoin: function createComplexJoin(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.COMPLEX_JOIN](json);
  },
  createJoinAlias: function createJoinAlias(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.JOIN_ALIAS](json);
  },
  createJoinExpression: function createJoinExpression(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.JOIN_EXPRESSION](json);
  },
  createConstantJoinExpression: function createConstantJoinExpression(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.CONSTANT_JOIN_EXPRESSION](json);
  },
  createDataIsland: function createDataIsland(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.DATA_ISLAND](json);
  },
  createPresentationSet: function createPresentationSet(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.PRESENTATION_SET](json);
  },
  createPresentationField: function createPresentationField(json) {
    return new this.entityClassRegistry[schemaEntitiesEnum.PRESENTATION_FIELD](json);
  }
});

module.exports = EntityFactory;

});