define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ContextMenuTreePlugin = require("../../../../layout/sidebarView/tree/plugin/ContextMenuTreePlugin");

var TooltipPlugin = require("../../../../layout/sidebarView/tree/plugin/TooltipPlugin");

var joinsDesignerSidebarBaseTemplate = require("text!../template/joinsDesignerSidebarBaseTemplate.htm");

var joinsDesignerSidebarTreeStyleTemplate = require("text!../template/joinsDesignerSidebarTreeStyleTemplate.htm");

var joinsDesignerSidebarTreeItemsTemplate = require("text!../template/joinsDesignerSidebarTreeItemsTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getTreeOptions(options) {
  var dataProvider = options.dataProvider,
      baseTemplate = options.baseTemplate || joinsDesignerSidebarBaseTemplate,
      itemsTemplate = options.itemsTemplate || joinsDesignerSidebarTreeItemsTemplate,
      styleTemplate = options.styleTemplate || joinsDesignerSidebarTreeStyleTemplate,
      ContextMenuTreePluginConstructor = options.ContextMenuTreePluginConstructor || ContextMenuTreePlugin,
      TooltipPluginConstructor = options.TooltipPluginConstructor || TooltipPlugin,
      joinsDesignerSidebarContextMenuEventHandlers = options.joinsDesignerSidebarContextMenuEventHandlers,
      joinsDesignerSidebarTreeContextMenuVisibilitySpecification = options.joinsDesignerSidebarTreeContextMenuVisibilitySpecification,
      joinsDesignerSidebarContextMenuOptionsProvider = options.joinsDesignerSidebarContextMenuOptionsProvider;
  return {
    listItemHeight: options.listItemHeight,
    itemsTemplate: _.template(baseTemplate, {
      dataName: options.dataName,
      itemsTemplate: itemsTemplate,
      styleTemplate: styleTemplate
    }),
    dataProvider: dataProvider,
    plugins: [{
      constr: ContextMenuTreePluginConstructor,
      options: {
        getContextMenuOptions: joinsDesignerSidebarContextMenuOptionsProvider.getMenuOptions,
        showContextMenuCondition: joinsDesignerSidebarTreeContextMenuVisibilitySpecification.isSatisfiedBy,
        contextMenuEvents: joinsDesignerSidebarContextMenuEventHandlers
      }
    }, {
      constr: TooltipPluginConstructor,
      options: {
        getTooltipOptions: options.sidebarTooltipOptionsFactory.create
      }
    }],
    selection: {
      allowed: {
        left: false,
        right: false
      }
    }
  };
}

module.exports = {
  getTreeOptions: getTreeOptions
};

});