define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var tooltipTypesEnum = require("../../../../../common/component/enum/messageTypesEnum");

var tooltipPlacements = require("../../../../../common/component/enum/placementsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var MetadataDesignerSidebarTooltipOptionsFactory = function MetadataDesignerSidebarTooltipOptionsFactory(options) {
  this.initialize(options);
};

_.extend(MetadataDesignerSidebarTooltipOptionsFactory.prototype, {
  initialize: function initialize(options) {
    this.tooltipOffset = options.tooltipOffset;

    _.bindAll(this, 'create');
  },
  create: function create(item, element) {
    var tooltipOptions = {};

    if (item.isEmptyDataSourceGroup) {
      tooltipOptions.content = {
        text: i18nMessage('domain.designer.metadataDesigner.sidebar.tooltip.emptySchemasMessage')
      };
      tooltipOptions.offset = {
        top: this.tooltipOffset
      };
      tooltipOptions.bindToTarget = true;
      tooltipOptions.type = tooltipTypesEnum.ATTENTION;
      tooltipOptions.placement = tooltipPlacements.BOTTOM_RIGHT;
      tooltipOptions.target = element.querySelector('.jr-jEmptyDataSourceGroup');
    }

    return tooltipOptions;
  }
});

module.exports = MetadataDesignerSidebarTooltipOptionsFactory;

});