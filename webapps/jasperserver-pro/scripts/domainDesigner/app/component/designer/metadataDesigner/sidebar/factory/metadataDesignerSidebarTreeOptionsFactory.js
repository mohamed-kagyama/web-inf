define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var metadataDesignerSidebarTreeTemplate = require("text!../../template/metadataDesignerSidebarTreeTemplate.htm");

var TooltipPlugin = require("../../../../layout/sidebarView/tree/plugin/TooltipPlugin");

var ContextMenuTreePlugin = require("../../../../layout/sidebarView/tree/plugin/ContextMenuTreePlugin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getTreeOptions(options) {
  var dataProvider = options.dataProvider,
      listItemHeight = options.listItemHeight,
      metadataDesignerSidebarTooltipOptionsFactory = options.metadataDesignerSidebarTooltipOptionsFactory,
      metadataDesignerSidebarContextMenuOptionsProvider = options.metadataDesignerSidebarContextMenuOptionsProvider,
      metadataDesignerSidebarContextMenuEventHandlers = options.metadataDesignerSidebarContextMenuEventHandlers,
      metadataDesignerSidebarTreeContextMenuVisibilitySpecification = options.metadataDesignerSidebarTreeContextMenuVisibilitySpecification;
  return {
    itemsTemplate: metadataDesignerSidebarTreeTemplate,
    listItemHeight: listItemHeight,
    dataProvider: dataProvider,
    selection: {
      allowed: {
        left: false,
        right: false
      }
    },
    plugins: [{
      constr: ContextMenuTreePlugin,
      options: {
        getContextMenuOptions: metadataDesignerSidebarContextMenuOptionsProvider.getMenuOptions,
        showContextMenuCondition: metadataDesignerSidebarTreeContextMenuVisibilitySpecification.isSatisfiedBy,
        contextMenuEvents: metadataDesignerSidebarContextMenuEventHandlers
      }
    }, {
      constr: TooltipPlugin,
      options: {
        getTooltipOptions: metadataDesignerSidebarTooltipOptionsFactory.create
      }
    }]
  };
}

module.exports = {
  getTreeOptions: getTreeOptions
};

});