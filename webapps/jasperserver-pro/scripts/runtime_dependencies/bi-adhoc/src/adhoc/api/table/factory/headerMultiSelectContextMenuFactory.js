define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ContextMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = _.memoize(function (id, tableView) {
  var columns = tableView.dataModel.metadata().view().measures(),
      selected = tableView.table.getSelection(),
      maxIndex = _.reduce(selected, function (memo, sel) {
    return Math.max(memo, columns.index({
      id: sel.id
    }));
  }, 0),
      minIndex = _.reduce(selected, function (memo, sel) {
    return Math.min(memo, columns.index({
      id: sel.id
    }));
  }, columns.length - 1),
      menuOptions = [{
    label: 'Move Left',
    action: tableView.moveColumnLeft,
    test: function test() {
      return minIndex > 0;
    }
  }, {
    label: 'Move Right',
    action: 'move:right',
    test: function test() {
      return maxIndex < columns.length - 1;
    }
  }];

  return new ContextMenu(menuOptions);
});

});