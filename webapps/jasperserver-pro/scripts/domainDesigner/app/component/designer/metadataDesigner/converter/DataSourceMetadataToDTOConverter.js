define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var dataSourceMetadataTypesEnum = require("../../../../../model/schema/enum/dataSourceMetadataTypesEnum");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var resourceNameSpecialCharactersUtil = require("../../../../model/util/resourceNameSpecialCharactersUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var fieldAllowedTypes = _.values(dataSourceMetadataTypesEnum);

var DataSourceMetadataToDTOConverter = function DataSourceMetadataToDTOConverter(options) {
  this.initialize(options);
};

_.extend(DataSourceMetadataToDTOConverter.prototype, {
  initialize: function initialize(options) {
    this.schemasNameGenerator = options.schemasNameGenerator;
    this.tableReferenceNameGenerator = options.tableReferenceNameGenerator;
    this.fieldsNameGenerator = options.fieldsNameGenerator;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  toSchemasDTO: function toSchemasDTO(options) {
    this.schemasNameGenerator.reset();
    var self = this,
        parentId = options.parentId,
        dataSourceId = options.dataSourceId,
        schemas = options.resources;
    return _.reduce(schemas, function (memo, schema) {
      if (schema) {
        schema = schema.group;
        var schemaDTO = {
          name: schema.name,
          parentId: parentId,
          dataSourceId: dataSourceId
        };

        if (resourceNameSpecialCharactersUtil.isResourceNameContainsSpecialCharacters(schema.name)) {
          schemaDTO.sourceName = schema.name;
          schemaDTO.name = self._generateSchemaName(schema.name, memo.namesInUse);
          memo.namesInUse.push(schemaDTO.name);
        }

        memo.schemas.push(schemaDTO);
      }

      return memo;
    }, {
      schemas: [],
      namesInUse: []
    }).schemas;
  },
  toTablesAndReferencesDTO: function toTablesAndReferencesDTO(options) {
    this.tableReferenceNameGenerator.reset();
    var tables = options.resources;
    return _.reduce(tables, function (memo, table) {
      if (table) {
        table = table.group;

        var tableDTO = this._tableToDTO(table, options),
            reference = this._getTableReferenceDTO(tableDTO.name, memo.namesInUse);

        memo.tablesAndReferences.push({
          table: tableDTO,
          reference: reference
        });
        memo.namesInUse.push(reference.name);
      }

      return memo;
    }, {
      tablesAndReferences: [],
      namesInUse: []
    }, this).tablesAndReferences;
  },
  toTableChildrenDTO: function toTableChildrenDTO(children) {
    return _.reduce(children, function (memo, child) {
      var childDTO;

      if (child.group) {
        childDTO = this._toTableGroupDTO(child.group);
      } else if (child.element) {
        childDTO = this._toFieldDTO(child.element, memo.namesInUse);
      }

      if (childDTO) {
        memo.children.push(childDTO);
        memo.namesInUse.push(childDTO.name);
      }

      return memo;
    }, {
      children: [],
      namesInUse: []
    }, this).children;
  },
  _tableToDTO: function _tableToDTO(table, options) {
    return {
      parentId: options.parentId,
      dataSourceId: options.dataSourceId,
      name: table.name,
      children: this.toTableChildrenDTO(table.elements)
    };
  },
  _getTableReferenceDTO: function _getTableReferenceDTO(tableName, namesInUse) {
    var tableReferenceName = tableName,
        tableReference = {
      name: tableReferenceName
    };
    tableReference.name = this._generateTableReferenceName(tableReferenceName, namesInUse);
    return tableReference;
  },
  _toTableGroupDTO: function _toTableGroupDTO(tableGroup) {
    return {
      name: tableGroup.name,
      entityType: schemaEntitiesEnum.TABLE_GROUP,
      children: this.toTableChildrenDTO(tableGroup.elements)
    };
  },
  _toFieldDTO: function _toFieldDTO(field, namesInUse) {
    this.fieldsNameGenerator.reset();

    if (_.indexOf(fieldAllowedTypes, field.type) < 0) {
      return;
    }

    var fieldDTO = {
      name: field.name,
      type: field.type,
      entityType: schemaEntitiesEnum.FIELD
    };

    if (resourceNameSpecialCharactersUtil.isResourceNameContainsSpecialCharacters(field.name)) {
      fieldDTO.sourceName = field.name;
      fieldDTO.name = this._generateFieldName(field.name, namesInUse);
    }

    return fieldDTO;
  },
  _generateSchemaName: function _generateSchemaName(originalSchemaName, namesInUse) {
    var self = this,
        schemaName = resourceNameSpecialCharactersUtil.replaceResourceNameSpecialCharacters(originalSchemaName);
    return this.schemasNameGenerator.generate(schemaName, function (name) {
      return _.indexOf(namesInUse, name) > -1 || self.clientDomainSchemaService.getDataSourceGroupByName(name);
    });
  },
  _generateTableReferenceName: function _generateTableReferenceName(originalTableName, namesInUse) {
    var self = this,
        tableReferenceName = resourceNameSpecialCharactersUtil.replaceResourceNameSpecialCharacters(originalTableName);
    return this.tableReferenceNameGenerator.generate(tableReferenceName, function (name) {
      return _.indexOf(namesInUse, name) > -1 || self.clientDomainSchemaService.getTableReferenceByName(name);
    });
  },
  _generateFieldName: function _generateFieldName(originalFieldName, namesInUse) {
    var self = this,
        fieldName = resourceNameSpecialCharactersUtil.replaceResourceNameSpecialCharacters(originalFieldName);
    return this.fieldsNameGenerator.generate(fieldName, function (name) {
      return _.indexOf(namesInUse, name) > -1 || self.clientDomainSchemaService.getFieldByName(name);
    });
  }
});

module.exports = DataSourceMetadataToDTOConverter;

});