define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ContextMenuTreePlugin = require("../../../../layout/sidebarView/tree/plugin/ContextMenuTreePlugin");

var TooltipPlugin = require("../../../../layout/sidebarView/tree/plugin/TooltipPlugin");

var presentationDesignerSidebarTreeItemsTemplate = require("text!../template/presentationDesignerSidebarTreeTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getTreeOptions(options) {
  var dataProvider = options.dataProvider,
      listItemHeight = options.listItemHeight,
      sidebarTooltipOptionsFactory = options.sidebarTooltipOptionsFactory,
      presentationDesignerSidebarContextMenuOptionsProvider = options.presentationDesignerSidebarContextMenuOptionsProvider,
      sidebarTreeContextMenuVisibilitySpecification = options.sidebarTreeContextMenuVisibilitySpecification,
      presentationDesignerSidebarContextMenuEventHandlers = options.presentationDesignerSidebarContextMenuEventHandlers;
  return {
    selection: {
      allowed: {
        left: false,
        right: false
      }
    },
    plugins: [{
      constr: ContextMenuTreePlugin,
      options: {
        getContextMenuOptions: presentationDesignerSidebarContextMenuOptionsProvider.getMenuOptions,
        showContextMenuCondition: sidebarTreeContextMenuVisibilitySpecification.isSatisfiedBy,
        contextMenuEvents: presentationDesignerSidebarContextMenuEventHandlers
      }
    }, {
      constr: TooltipPlugin,
      options: {
        getTooltipOptions: sidebarTooltipOptionsFactory.create
      }
    }],
    listItemHeight: listItemHeight,
    itemsTemplate: presentationDesignerSidebarTreeItemsTemplate,
    dataProvider: dataProvider
  };
}

module.exports = {
  getTreeOptions: getTreeOptions
};

});