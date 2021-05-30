define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var artificialTreeResourceTypesEnum = require("../../enum/artificialTreeResourceTypesEnum");

var CompositePredicate = require("../../../../../../util/predicate/CompositePredicate");

var acceptOnlyDerivedTables = require("../../predicate/acceptOnlyDerivedTables");

var doNotAcceptDerivedTables = require("../../predicate/doNotAcceptDerivedTables");

var atLeastOneDerivedTableExists = require("../../predicate/atLeastOneDerivedTableExists");

var baseSidebarTreeConverter = require("../baseSidebarTreeConverter");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var DEFAULT_DERIVED_TABLE_GROUP = {
  id: artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP,
  name: i18nMessage('domain.designer.derivedTables.sidebar.derivedTablesGroup'),
  type: artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP
};

function convertDataSource(dataSource, options) {
  var childrenWithoutDerivedTables = convertDataSourceChildrenNoDerivedTables(dataSource, options),
      derivedTablesGroupInArray = convertDataSourceChildrenDerivedTablesOnly(dataSource, options);
  var allChildren = derivedTablesGroupInArray.concat(childrenWithoutDerivedTables);
  return options.convertResourceNoChildren(dataSource, _.extend({}, options, {
    properties: {
      elements: allChildren
    }
  }));
}

function convertDataSourceChildrenNoDerivedTables(dataSource, options) {
  var resourceMatch = options.resourceMatch,
      optionsWithoutResource = _.omit(options, 'resource'),
      children;

  if (options.isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute) {
    var dataSourceGroup = dataSource.getChildren().first();
    children = dataSourceGroup.getChildren();
  } else {
    children = dataSource.getChildren();
  }

  return baseSidebarTreeConverter.convertResources(children, _.extend({}, optionsWithoutResource, {
    dataSource: dataSource,
    resourceMatch: new CompositePredicate([doNotAcceptDerivedTables, resourceMatch]).match
  }));
}

function convertDataSourceChildrenDerivedTablesOnly(dataSource, options) {
  var resourceJsonMatch = options.resourceJsonMatch;
  var derivedTableGroupResource = createDerivedTableGroupResource(dataSource);
  var resources = [derivedTableGroupResource];
  var isAtLeastOneDerivedTableExists = dataSource.getChildren().find(function (child) {
    return entityUtil.isDerivedTable(child);
  });
  return baseSidebarTreeConverter.convertResources(resources, _.extend({}, options, {
    dataSource: dataSource,
    isAtLeastOneDerivedTableExists: isAtLeastOneDerivedTableExists,
    resourceJsonMatch: new CompositePredicate([resourceJsonMatch, atLeastOneDerivedTableExists]).match
  }));
}

function convertDerivedTableGroup(derivedTableGroup, options) {
  var resourceMatch = options.resourceMatch;
  return baseSidebarTreeConverter.convertResourceWithChildren(derivedTableGroup, _.extend({}, options, {
    derivedTableGroup: options.resource,
    children: derivedTableGroup.children,
    resourceMatch: new CompositePredicate([acceptOnlyDerivedTables, resourceMatch]).match
  }));
}

function convertDataSourceGroup(dataSourceGroup, options) {
  return baseSidebarTreeConverter.convertResourceWithChildren(dataSourceGroup, _.extend({}, options, {
    dataSourceGroup: dataSourceGroup,
    children: dataSourceGroup.getChildren()
  }));
}

function convertTable(table, options) {
  return baseSidebarTreeConverter.convertResourceWithChildren(table, _.extend({}, options, {
    table: table,
    children: table.getChildren()
  }));
}

function convertTableGroup(tableGroup, options) {
  return baseSidebarTreeConverter.convertResourceWithChildren(tableGroup, _.extend({}, options, {
    tableGroup: tableGroup,
    children: tableGroup.getChildren()
  }));
}

function convertField(field, options) {
  return options.convertResourceNoChildren(field, options);
}

function createDerivedTableGroupResource(dataSource) {
  return _.extend({}, DEFAULT_DERIVED_TABLE_GROUP, {
    children: dataSource.getChildren()
  });
}

var converterMap = {};
converterMap[schemaEntitiesEnum.DATA_SOURCE] = convertDataSource;
converterMap[schemaEntitiesEnum.DATA_SOURCE_GROUP] = convertDataSourceGroup;
converterMap[artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP] = convertDerivedTableGroup;
converterMap[schemaEntitiesEnum.DERIVED_TABLE] = convertTable;
converterMap[schemaEntitiesEnum.TABLE] = convertTable;
converterMap[schemaEntitiesEnum.TABLE_GROUP] = convertTableGroup;
converterMap[schemaEntitiesEnum.FIELD] = convertField;
converterMap[schemaEntitiesEnum.CALC_FIELD] = convertField;
module.exports = converterMap;

});