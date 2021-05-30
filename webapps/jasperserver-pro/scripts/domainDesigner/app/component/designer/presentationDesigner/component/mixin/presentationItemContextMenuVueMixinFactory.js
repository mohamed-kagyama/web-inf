define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var presentationItemsContextMenu = options.presentationItemsContextMenu,
        presentationDesignerEventBus = options.presentationDesignerEventBus;
    return {
      methods: {
        showContextMenu: function showContextMenu(item, $event) {
          var type = item.type;

          if (entityUtil.isDataIsland(type) || entityUtil.isPresentationSet(type)) {
            presentationDesignerEventBus.trigger('presentationItem:select', item);
            presentationItemsContextMenu.show({
              left: $event.pageX,
              top: $event.pageY
            });
          }
        }
      }
    };
  }
};

});