define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getActions(options) {
  var treeNodeProvider = options.treeNodeProvider,
      initialDataOptions = options.initialDataOptions || {};
  return {
    fetch: function fetch(options) {
      options = options || {};
      options = _.extend({}, initialDataOptions.options, options);
      return treeNodeProvider.getData(initialDataOptions.properties, options).then(function (treeNodesData) {
        return treeNodesData.visibleNodes;
      });
    },
    select: function select(treeNode, options) {
      options = _.extend({
        select: true
      }, options);

      if (treeNode.isSelectable) {
        return treeNodeProvider.getData(treeNode, options).then(function (treeNodesData) {
          return {
            visibleNodes: treeNodesData.visibleNodes,
            selection: treeNodesData.selection
          };
        });
      }

      return new $.Deferred().reject(treeNode);
    },
    toggle: function toggle(treeNode) {
      return treeNodeProvider.getData(treeNode, {
        open: !treeNode.open
      }).then(function (treeNodesData) {
        return {
          visibleNodes: treeNodesData.visibleNodes,
          selection: treeNodesData.selection
        };
      });
    }
  };
}

module.exports = {
  create: getActions
};

});