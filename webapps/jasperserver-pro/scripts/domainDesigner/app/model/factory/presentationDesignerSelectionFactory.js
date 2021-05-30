define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getInitialSelectionObject() {
  return {
    parentId: null,
    items: {}
  };
}

function getNewSelectionObject(items, parentId) {
  var newSelection = getInitialSelectionObject();

  _.each(items, function (item) {
    newSelection.items[item.id] = item;
  });

  newSelection.parentId = parentId;
  return newSelection;
}

function toggleSelectionObject(options) {
  var selection = options.selection;

  _.each(options.items, function (item) {
    var isItemAddedToSelection = options.isItemSelected(item);

    if (isItemAddedToSelection) {
      delete selection.items[item.id];
    } else {
      selection.items[item.id] = item;
    }
  }, this);

  if (_.isEmpty(selection.items)) {
    selection = getInitialSelectionObject();
  } else {
    selection.parentId = options.parentId;
  }

  return selection;
}

module.exports = {
  create: function create(options) {
    options = options || {};
    var newSelection,
        items = options.items,
        parentId = options.parentId || null,
        selection = options.selection,
        isItemSelected = options.isItemSelected;
    items = _.isArray(items) ? items : [items];

    if (options.toggle) {
      newSelection = toggleSelectionObject({
        selection: selection,
        items: items,
        isItemSelected: isItemSelected,
        parentId: parentId
      });
    } else {
      newSelection = getNewSelectionObject(items, parentId);
    }

    return newSelection;
  }
};

});