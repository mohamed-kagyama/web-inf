define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var dataSourceTypeEnum = require("../../../../model/enum/dataSourceTypeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var MetadataDesignerMetadataResourcesTooltipOptionsFactory = function MetadataDesignerMetadataResourcesTooltipOptionsFactory(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerMetadataResourcesTooltipOptionsFactory.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'create');

    this.metadataDesignerViewStateModelService = options.metadataDesignerViewStateModelService;
    this.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider = options.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider;
  },
  create: function create(item, element) {
    var content = {
      text: item.label
    },
        currentSidebarResource = this.metadataDesignerViewStateModelService.getCurrentSidebarResource();
    var dataSourceType = this.metadataDesignerCurrentDataSourceTypeBySidebarResourceProvider.getDataSourceType(currentSidebarResource);

    if (entityUtil.isDataSource(currentSidebarResource.type)) {
      if (dataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITH_SCHEMAS) {
        content.label = i18nMessage('domain.designer.metadataDesignerView.manage.schemas.tooltip.label');
      } else if (dataSourceType === dataSourceTypeEnum.DATA_SOURCE_WITHOUT_SCHEMAS) {
        content.label = i18nMessage('domain.designer.metadataDesignerView.manage.tables.tooltip.label');
      }
    } else if (entityUtil.isDataSourceGroup(currentSidebarResource.type)) {
      content.label = i18nMessage('domain.designer.metadataDesignerView.manage.tables.tooltip.label');
    }

    return {
      content: content,
      target: element.querySelector('.jr-jTooltipTarget'),
      type: ''
    };
  }
});

module.exports = MetadataDesignerMetadataResourcesTooltipOptionsFactory;

});