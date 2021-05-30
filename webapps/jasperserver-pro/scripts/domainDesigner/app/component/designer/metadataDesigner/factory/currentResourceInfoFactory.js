define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var dataSourceTypeEnum = require("../../../../model/enum/dataSourceTypeEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var dataSourceLevel = schemaEntitiesEnum.DATA_SOURCE;
var schemaLevel = schemaEntitiesEnum.DATA_SOURCE_GROUP;
var datasourceWithSchemas = dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS;
var datasourceWithoutSchemas = dataSourceTypeEnum.DATA_SOURCE_WITHOUT_SCHEMAS;

function getDataObjectName(options) {
  var resourceName = options.resourceName || '',
      isDataSourceWithSchemas = options.dataSourceType === datasourceWithSchemas,
      isSchemaLevel = options.resourceType === schemaLevel;

  if (isSchemaLevel && isDataSourceWithSchemas && resourceName) {
    resourceName = resourceName + ' ' + i18nMessage('domain.designer.metadataDesignerView.manage.tables.suffix');
  }

  return resourceName;
}

function getInstructionObject(options) {
  var isSchemaLevel = options.resourceType === schemaLevel,
      isDataSourceLevel = options.resourceType === dataSourceLevel,
      isAnyTablesPresentInDomain = options.isAnyTablesPresentInDomain,
      isAnyDataSourceGroupsPresentInDomain = options.isAnyDataSourceGroupsPresentInDomain,
      isDataSourceWithoutSchemas = options.dataSourceType === datasourceWithoutSchemas;
  var instructionObject = {
    text: '',
    title: ''
  };
  var isSchemaLevelAndNoTablesAdded = isSchemaLevel && !isAnyTablesPresentInDomain,
      isDataSourceLevelAndNoSchemasAdded = isDataSourceLevel && !isDataSourceWithoutSchemas && !isAnyDataSourceGroupsPresentInDomain,
      isDataSourceWithoutSchemasLevelAndNoTablesAdded = isDataSourceLevel && isDataSourceWithoutSchemas && !isAnyTablesPresentInDomain;

  if (isSchemaLevelAndNoTablesAdded || isDataSourceWithoutSchemasLevelAndNoTablesAdded) {
    instructionObject.text = i18nMessage('domain.designer.metadataDesignerView.manage.tables.empty.text');
    instructionObject.title = i18nMessage('domain.designer.metadataDesignerView.manage.tables.empty.title');
  } else if (isDataSourceLevelAndNoSchemasAdded) {
    instructionObject.text = i18nMessage('domain.designer.metadataDesignerView.manage.schemas.empty.text');
    instructionObject.title = i18nMessage('domain.designer.metadataDesignerView.manage.schemas.empty.title');
  }

  return instructionObject;
}

var defaults = {
  manageResource: '',
  dataObjectName: '',
  availableResourcesTitle: '',
  selectedResourcesTitle: ''
};
var manageTablesInfoSchemaLevel = {
  manageResource: i18nMessage('domain.designer.metadataDesignerView.manage.tables'),
  availableResourcesTitle: i18nMessage('domain.designer.metadataDesignerView.manage.tables.availableResourcesTitle'),
  selectedResourcesTitle: i18nMessage('domain.designer.metadataDesignerView.manage.tables.selectedResourcesTitle')
};
var manageSchemasInfo = {
  manageResource: i18nMessage('domain.designer.metadataDesignerView.manage.schemas'),
  availableResourcesTitle: i18nMessage('domain.designer.metadataDesignerView.manage.schemas.availableResourcesTitle'),
  selectedResourcesTitle: i18nMessage('domain.designer.metadataDesignerView.manage.schemas.selectedResourcesTitle')
};
var currentLevelToInfoMap = {};
currentLevelToInfoMap[dataSourceLevel] = {};
currentLevelToInfoMap[dataSourceLevel][datasourceWithSchemas] = manageSchemasInfo;
currentLevelToInfoMap[dataSourceLevel][datasourceWithoutSchemas] = manageTablesInfoSchemaLevel;
currentLevelToInfoMap[schemaLevel] = {};
currentLevelToInfoMap[schemaLevel][datasourceWithSchemas] = manageTablesInfoSchemaLevel;

function create(options) {
  options = options || {};
  var resourceType = options.resourceType,
      dataSourceType = options.dataSourceType,
      currentLevel = currentLevelToInfoMap[resourceType];

  var info = _.clone(currentLevel && currentLevel[dataSourceType] || defaults);

  var dataObjectName = getDataObjectName(options),
      instructionObject = getInstructionObject(options);
  info = _.extend({}, info, {
    dataObjectName: dataObjectName,
    instructionText: instructionObject.text,
    instructionTitle: instructionObject.title
  });
  return info;
}

module.exports = {
  create: create
};

});