define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var ContextMenu = require("runtime_dependencies/js-sdk/src/common/component/menu/ContextMenu");

var cascadingMenuTrait = require("runtime_dependencies/js-sdk/src/common/component/menu/cascadingMenuTrait");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CascadingContextMenu = ContextMenu.extend(cascadingMenuTrait);
module.exports = _.memoize(function (id, tableView) {
  var columns = tableView.dataModel.metadata().view().measures(),
      index = columns.index({
    id: id
  }),
      column = columns[index],
      menuOptions = [{
    label: 'Use for Sorting...'
  }, {
    label: 'Remove Summary'
  }, {
    label: 'Change Function',
    children: [{
      label: 'Distinct Count'
    }, {
      label: 'Count All'
    }]
  }, {
    label: 'Change Data Format',
    test: function test() {
      return column.isMeasure;
    },
    children: [{
      label: '-1,234.56'
    }, {
      label: '-1235'
    }, {
      label: '($1,234.56)'
    }, {
      label: '($1,235)'
    }]
  }, {
    label: 'Move Left',
    action: tableView.moveColumnLeft,
    test: function test() {
      return index > 0;
    }
  }, {
    label: 'Move Right',
    action: 'move:right',
    test: function test() {
      return index < columns.length - 1;
    }
  }];
  return new CascadingContextMenu(menuOptions);
});

});