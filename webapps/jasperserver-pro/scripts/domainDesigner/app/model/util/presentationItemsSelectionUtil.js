define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientSchemaModelUtil = require("./clientSchemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getPresentationItemsSelection: function getPresentationItemsSelection(options) {
    var selection = _.clone(options.currentSelection),
        collections = options.collections,
        itemsToRemove;

    itemsToRemove = _.reduce(selection.items, function (memo, item, id) {
      if (!clientSchemaModelUtil.checkIfResourceExistsInSchemaByIdAndType(Number(id), item.type, collections)) {
        memo.push(id);
      }

      return memo;
    }, []);
    selection.items = _.omit(selection.items, itemsToRemove);

    if (_.isEmpty(selection.items)) {
      selection.parentId = null;
    }

    return selection;
  }
};

});