define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var pathUtil = require("../../../../util/pathUtil");

var joinsEnum = require("../../../../model/enum/joinsEnum");

var domainSettings = require("settings!domainSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var defaultJoinWeight = domainSettings.defaultJoinWeight;

var ForeignKeyMetadataConverter = function ForeignKeyMetadataConverter(options) {
  this.defaultWeight = options.defaultWeight || defaultJoinWeight;
  this.clientDomainSchemaMetadataService = options.clientDomainSchemaMetadataService;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec = options.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec;
};

_.extend(ForeignKeyMetadataConverter.prototype, {
  convert: function convert(options) {
    var parentId = options.parentId,
        dataSourceId = options.dataSourceId,
        tables = options.resources;
    return this._tablesToFieldsDTO({
      tables: tables,
      parentId: parentId,
      dataSourceId: dataSourceId
    });
  },
  _tablesToFieldsDTO: function _tablesToFieldsDTO(options) {
    var tables = options.tables,
        parentId = options.parentId,
        dataSourceId = options.dataSourceId;
    return _.reduce(tables, function (memo, table) {
      table = table.group;
      return memo.concat(this._tableToFieldsDTO({
        table: table,
        parentId: parentId,
        dataSourceId: dataSourceId
      }));
    }, [], this);
  },
  _tableToFieldsDTO: function _tableToFieldsDTO(options) {
    var table = options.table,
        parentId = options.parentId,
        dataSourceId = options.dataSourceId;

    var name = table.name,
        fields = this._getAllFields(table),
        tableGroups = this._getAllTableGroups(table),
        tableJSON = this.clientDomainSchemaService.getTableByNameAndParent(name, parentId),
        id = tableJSON.id;

    return this._toFieldsDTO({
      fields: fields,
      parentId: id,
      tableId: id,
      dataSourceId: dataSourceId
    }).concat(this._tableGroupsToFieldsDTO({
      tableGroups: tableGroups,
      parentId: id,
      tableId: id,
      dataSourceId: dataSourceId
    }));
  },
  _tableGroupsToFieldsDTO: function _tableGroupsToFieldsDTO(options) {
    var tableGroups = options.tableGroups,
        parentId = options.parentId,
        tableId = options.tableId,
        dataSourceId = options.dataSourceId;
    return _.reduce(tableGroups, function (memo, tableGroup) {
      return memo.concat(this._tableGroupToFieldsDTO({
        tableGroup: tableGroup,
        parentId: parentId,
        tableId: tableId,
        dataSourceId: dataSourceId
      }));
    }, [], this);
  },
  _tableGroupToFieldsDTO: function _tableGroupToFieldsDTO(options) {
    var tableGroup = options.tableGroup,
        parentId = options.parentId,
        tableId = options.tableId,
        dataSourceId = options.dataSourceId;

    var name = tableGroup.name,
        fields = this._getAllFields(tableGroup),
        tableGroups = this._getAllTableGroups(tableGroup),
        tableGroupJSON = this.clientDomainSchemaService.getTableGroupByNameAndParent(name, parentId),
        id = tableGroupJSON.id;

    return this._toFieldsDTO({
      fields: fields,
      parentId: id,
      tableId: tableId,
      dataSourceId: dataSourceId
    }).concat(this._tableGroupsToFieldsDTO({
      tableGroups: tableGroups,
      parentId: id,
      tableId: tableId,
      dataSourceId: dataSourceId
    }));
  },
  _toFieldsDTO: function _toFieldsDTO(options) {
    var fields = options.fields,
        parentId = options.parentId,
        tableId = options.tableId,
        dataSourceId = options.dataSourceId;
    return _.chain(fields).filter(this._filterOurFieldsWhichHasNoForeignKeys).map(function (field) {
      return this._toFieldDTO({
        field: field,
        parentId: parentId,
        tableId: tableId,
        dataSourceId: dataSourceId
      });
    }, this).filter(this._filterOurFieldsWhichAreAbsentInSchema).value();
  },
  _toFieldDTO: function _toFieldDTO(options) {
    var field = options.field,
        parentId = options.parentId,
        tableId = options.tableId,
        dataSourceId = options.dataSourceId,
        fieldDTO;
    var name = field.name,
        fieldJSON = this.clientDomainSchemaService.getFieldByNameAndParent(name, parentId);

    if (!fieldJSON) {
      return fieldDTO;
    }

    var id = fieldJSON.id,
        referencedField = this._getReferencedField(field.referenceTo, dataSourceId);

    if (!referencedField) {
      return fieldDTO;
    }

    fieldDTO = _.extend({
      dataSourceId: dataSourceId,
      leftTableId: tableId,
      leftFieldId: id,
      rightFieldId: referencedField.id,
      rightTableId: referencedField.tableId,
      weight: this.defaultWeight,
      operator: joinsEnum.joinOperators.equals.name,
      type: joinsEnum.joinTypes.inner.name
    });
    return fieldDTO;
  },
  _filterOurFieldsWhichAreAbsentInSchema: function _filterOurFieldsWhichAreAbsentInSchema(field) {
    return !_.isUndefined(field);
  },
  _filterOurFieldsWhichHasNoForeignKeys: function _filterOurFieldsWhichHasNoForeignKeys(field) {
    return Boolean(field.referenceTo);
  },
  _getAllFields: function _getAllFields(resource) {
    return _.chain(resource.elements).filter(function (child) {
      return child.element;
    }).map(function (field) {
      return field.element;
    }).value();
  },
  _getAllTableGroups: function _getAllTableGroups(resource) {
    return _.chain(resource.elements).filter(function (child) {
      return child.group;
    }).map(function (field) {
      return field.group;
    }).value();
  },
  _getReferencedField: function _getReferencedField(referenceTo, dataSourceId) {
    var referenceComponents = pathUtil.split(referenceTo, '\\', '.');
    var isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute = this.schemaLessDataSourceWithEmptyResolvedSchemaAttributeSpec.isSatisfied();
    return this.clientDomainSchemaMetadataService.getFieldByDataSourceIdAndParentNames(dataSourceId, referenceComponents, isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute);
  }
});

module.exports = ForeignKeyMetadataConverter;

});