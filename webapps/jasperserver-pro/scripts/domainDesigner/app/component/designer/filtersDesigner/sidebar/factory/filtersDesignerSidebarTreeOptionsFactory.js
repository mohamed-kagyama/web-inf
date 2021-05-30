define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ContextMenuTreePlugin = require("../../../../layout/sidebarView/tree/plugin/ContextMenuTreePlugin");

var TooltipPlugin = require("../../../../layout/sidebarView/tree/plugin/TooltipPlugin");

var filtersDesignerSidebarTreeItemsTemplate = require("text!../../template/filtersDesignerSidebarTreeTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getTreeOptions(options) {
  var listItemHeight = options.listItemHeight,
      dataProvider = options.dataProvider,
      sidebarTooltipOptionsFactory = options.sidebarTooltipOptionsFactory,
      filtersDesignerSidebarContextMenuEventHandlers = options.filtersDesignerSidebarContextMenuEventHandlers,
      filtersDesignerSidebarContextMenuOptionsProvider = options.filtersDesignerSidebarContextMenuOptionsProvider,
      filtersDesignerSidebarTreeContextMenuVisibilitySpecification = options.filtersDesignerSidebarTreeContextMenuVisibilitySpecification;
  return {
    listItemHeight: listItemHeight,
    itemsTemplate: filtersDesignerSidebarTreeItemsTemplate,
    dataProvider: dataProvider,
    plugins: [{
      constr: ContextMenuTreePlugin,
      options: {
        getContextMenuOptions: filtersDesignerSidebarContextMenuOptionsProvider.getMenuOptions,
        showContextMenuCondition: filtersDesignerSidebarTreeContextMenuVisibilitySpecification.isSatisfiedBy,
        contextMenuEvents: filtersDesignerSidebarContextMenuEventHandlers
      }
    }, {
      constr: TooltipPlugin,
      options: {
        getTooltipOptions: sidebarTooltipOptionsFactory.create
      }
    }]
  };
}

module.exports = {
  getTreeOptions: getTreeOptions
};

});