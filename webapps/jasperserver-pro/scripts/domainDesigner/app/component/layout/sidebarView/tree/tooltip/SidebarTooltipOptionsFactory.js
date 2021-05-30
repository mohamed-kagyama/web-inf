define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var entityTypeToTooltipOptionsMap = {};

entityTypeToTooltipOptionsMap[schemaEntitiesEnum.TABLE_REFERENCE] = function (item, options) {
  var table = options.clientDomainSchemaService.getTableByTableReferenceId(item.resourceId);

  if (options.clientDomainSchemaService.isDerivedTable(table.id)) {
    return false;
  }

  return {
    text: table.name || item.label,
    label: i18nMessage('domain.designer.presentationDesigner.sidebar.tooltip.tableLabel')
  };
};

entityTypeToTooltipOptionsMap[schemaEntitiesEnum.DATA_SOURCE] = function (item, options) {
  var dataSourceUri = options.clientResourcePropertiesService.getDataSourceUri(item.label);
  return {
    text: dataSourceUri || item.label,
    label: i18nMessage('domain.designer.resource.tooltip.path')
  };
};

entityTypeToTooltipOptionsMap[schemaEntitiesEnum.JOIN_ALIAS] = function (item, options) {
  var table = options.clientDomainSchemaService.getTableByJoinAliasId(item.resourceId);

  if (options.clientDomainSchemaService.isDerivedTable(table.id)) {
    return false;
  }

  return {
    text: table.name || item.label,
    label: i18nMessage('domain.designer.presentationDesigner.sidebar.tooltip.tableLabel')
  };
};

entityTypeToTooltipOptionsMap[schemaEntitiesEnum.FIELD] = function (item, options) {
  var field = options.clientDomainSchemaService.getFieldById(item.resourceId),
      fieldName = field.sourceName || field.name;

  if (options.clientDomainSchemaService.isFieldChildOfDerivedTable(field.id)) {
    return false;
  }

  return {
    text: fieldName || item.label,
    label: i18nMessage('domain.designer.presentationDesigner.sidebar.tooltip.fieldLabel')
  };
};

var SidebarTooltipOptionsFactory = function SidebarTooltipOptionsFactory(options) {
  this.initialize(options);
};

_.extend(SidebarTooltipOptionsFactory.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;

    _.bindAll(this, 'create');
  },
  create: function create(item, element) {
    var options = {
      clientDomainSchemaService: this.clientDomainSchemaService,
      clientResourcePropertiesService: this.clientResourcePropertiesService
    },
        contentFn = entityTypeToTooltipOptionsMap[item.type],
        content = contentFn && contentFn(item, options);
    return {
      content: content,
      target: element.querySelector('.jr-jTooltipTarget'),
      type: ''
    };
  }
});

module.exports = SidebarTooltipOptionsFactory;

});