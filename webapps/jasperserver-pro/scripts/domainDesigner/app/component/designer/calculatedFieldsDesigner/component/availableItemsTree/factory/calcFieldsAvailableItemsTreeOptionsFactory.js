define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var calcFieldsAvailableItemsTreeTemplate = require("text!../template/calcFieldsAvailableItemsTreeTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getTreeOptions(options) {
  return {
    itemsTemplate: calcFieldsAvailableItemsTreeTemplate,
    listItemHeight: options.listItemHeight,
    dataProvider: options.dataProvider,
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