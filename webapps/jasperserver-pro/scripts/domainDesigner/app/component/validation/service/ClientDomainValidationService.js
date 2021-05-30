define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../model/schema/util/entityUtil");

var getResourceSourceNameOrNameUtil = require("../../../util/getResourceSourceNameOrNameUtil");

var specialSchemaNamesEnum = require('../../../../model/schema/enum/specialSchemaNamesEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SCHEMALESS_NAME_SUBSTITUTION = specialSchemaNamesEnum.SCHEMALESS_NAME_SUBSTITUTION;
var RESOURCE_PROPERTIES_TO_OMIT = ['permissionMask', 'updateDate', 'creationDate'];

var ClientDomainValidationService = function ClientDomainValidationService(options) {
  this.initialize(options);
};

_.extend(ClientDomainValidationService.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.viewStateModel = options.viewStateModel;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
    this.schemaResourcesNamesAreEqualSpecification = options.schemaResourcesNamesAreEqualSpecification;
    this.designerViewStateByDomainProvider = options.designerViewStateByDomainProvider;
  },
  isDataSourceSet: function isDataSourceSet() {
    var dataSourceName = this.clientResourcePropertiesService.getDataSourceName(),
        dataSourceUri = dataSourceName && this.clientResourcePropertiesService.getDataSourceUri(dataSourceName);
    return Boolean(dataSourceUri);
  },
  serializeToSaveSchema: function serializeToSaveSchema(useContentInsteadOfResourceReferenceForSubResources) {
    var resourcePropertiesJSON = _.omit(this.clientResourcePropertiesService.serialize(useContentInsteadOfResourceReferenceForSubResources), RESOURCE_PROPERTIES_TO_OMIT),
        domainJSON = this.clientDomainSchemaService.serializeWithDataAdapter();

    return _.extend({}, resourcePropertiesJSON, domainJSON);
  },
  serializeToServerSchema: function serializeToServerSchema() {
    var domain = this.clientDomainSchemaService.serializeWithDataAdapter(),
        dataSourceName = this.clientResourcePropertiesService.getDataSourceName(),
        dataSourceUri = this.clientResourcePropertiesService.getDataSourceUri(dataSourceName);

    _.extend(domain, {
      label: this.clientResourcePropertiesService.getDomainLabel(),
      dataSource: {
        dataSourceReference: {
          uri: dataSourceUri
        }
      }
    });

    return domain;
  },
  serialize: function serialize() {
    return this.clientDomainSchemaService.serialize();
  },
  getDesignerStateAfterValidation: function getDesignerStateAfterValidation(options) {
    options = options || {};

    var collections = this.dataStore.getCollections(),
        dataSourceType = this._getDataSourceType();

    options = _.extend({
      dataSourceType: dataSourceType
    }, options);
    return {
      schema: this.clientDomainSchemaService.serialize(),
      resourceProperties: this.clientResourcePropertiesService.serializeToClientModel(),
      viewState: this.designerViewStateByDomainProvider.getViewState(collections, options)
    };
  },
  getDesignerStateAfterSave: function getDesignerStateAfterSave() {
    return {
      schema: this.clientDomainSchemaService.serialize(),
      resourceProperties: this.clientResourcePropertiesService.serializeToClientModel(),
      viewState: this.viewStateModel.toJSON()
    };
  },
  getDataSource: function getDataSource() {
    return {
      name: this._getDataSourceName(),
      type: this._getDataSourceType(),
      uri: this._getDataSourceUri()
    };
  },
  isAllDataIslandsHaveSources: function isAllDataIslandsHaveSources() {
    return this.clientDomainSchemaService.isAllDataIslandsHaveSources();
  },
  getAllSchemasSourceNamesOrNames: function getAllSchemasSourceNamesOrNames() {
    return this.dataStore.getCollection('dataSourceGroups').map(function (dataSourceGroup) {
      return dataSourceGroup.sourceName || dataSourceGroup.name;
    });
  },
  getAllTablesWithPath: function getAllTablesWithPath(options) {
    var self = this,
        isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = options.isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute;
    return this.dataStore.getCollection('tables').chain().filter(function (table) {
      return entityUtil.isGenericTable(table);
    }).map(function (table) {
      var isTableUnderDataSourceGroup = table.dataSourceId !== table.parentId,
          parent,
          parentName,
          parentId = null,
          tablePath;

      if (isTableUnderDataSourceGroup && !isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
        parentId = table.parentId;
        parent = parentId && self.dataStore.getCollection('dataSourceGroups').byId(parentId);
      }

      if (parent) {
        parentName = parent.sourceName || parent.name;
        tablePath = [parentName, table.name];
      } else {
        tablePath = [table.name];
      }

      return {
        tableId: table.id,
        tablePath: tablePath
      };
    }).toArray();
  },
  filterOnlyTablesWithNewFields: function filterOnlyTablesWithNewFields(data, resources) {
    var self = this;
    data = _.isArray(data) ? data : [data];
    return _.reduce(data, function (memo, tableElement, i) {
      tableElement = tableElement.group;
      var resource = resources[i],
          table = this.dataStore.getCollection('tables').byId(resource.tableId),
          tableId = table.getId(),
          fieldElements = tableElement.elements || [];
      var fieldsToAdd = fieldElements.filter(function (fieldElement) {
        fieldElement = fieldElement.element;
        return !table.getChildren().some(function (child) {
          if (entityUtil.isField(child)) {
            var name = getResourceSourceNameOrNameUtil(child.toJSON()),
                fieldElementName = getResourceSourceNameOrNameUtil(fieldElement);
            return self.schemaResourcesNamesAreEqualSpecification.isSatisfiedBy(name, fieldElementName);
          }
        });
      });
      memo.push({
        parentId: tableId,
        fields: fieldsToAdd
      });
      return memo;
    }, [], this);
  },
  tryAutoresolveSchemas: function tryAutoresolveSchemas(options) {
    var existingSchemas = options.existingSchemas || [],
        availableSchemas = options.availableSchemas || [];
    var oneSchemaToSchemaLessDataSource = existingSchemas.length === 1 && availableSchemas.length === 0;
    var schemaLessToOneSchemaDataSource = existingSchemas.length === 0 && availableSchemas.length === 1; // only one case can surprise here - when different db but schema names the same
    // only one case can surprise here - when different db but schema names the same

    var oneSchemaToOneSchemaWithTheSameNames = existingSchemas.length === 1 && availableSchemas.length === 1 && existingSchemas[0] === availableSchemas[0];

    if (oneSchemaToSchemaLessDataSource) {
      return [[existingSchemas[0], SCHEMALESS_NAME_SUBSTITUTION]];
    }

    if (schemaLessToOneSchemaDataSource) {
      return [[SCHEMALESS_NAME_SUBSTITUTION, availableSchemas[0]]];
    } // only one case can surprise here - when different db but schema names the same
    // only one case can surprise here - when different db but schema names the same


    if (oneSchemaToOneSchemaWithTheSameNames) {
      return [[existingSchemas[0], availableSchemas[0]]];
    }

    return false;
  },
  _getDataSourceName: function _getDataSourceName() {
    return this.clientResourcePropertiesService.getDataSourceName();
  },
  _getDataSourceUri: function _getDataSourceUri() {
    var dataSourceName = this._getDataSourceName();

    return this.clientResourcePropertiesService.getDataSourceUri(dataSourceName);
  },
  _getDataSourceType: function _getDataSourceType() {
    var dataSourceName = this._getDataSourceName(),
        dataSource = this.viewStateModel.getDataSource(dataSourceName);

    return dataSource && dataSource.type;
  }
});

module.exports = ClientDomainValidationService;

});