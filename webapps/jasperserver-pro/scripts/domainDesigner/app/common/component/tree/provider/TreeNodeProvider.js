define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DEFAULT_ROOT_NODE = {
  id: -1,
  children: [],
  visible: false,
  selected: false
};

function TreeNodeProvider(options) {
  this.node = options.node || _.cloneDeep(DEFAULT_ROOT_NODE);
  this.parentDataProvider = options.parentDataProvider;
  this.selection = options.selection || {};
}

_.extend(TreeNodeProvider.prototype, {
  getData: function getData(treeNodeProps, options) {
    options = options || {};
    var self = this;
    return this._toggleAndLoadNewNodes(treeNodeProps, options).then(function (treeNode) {
      self._selectNodeIfSelectionAction(treeNode, options);
    }).then(function () {
      return self._getVisibleAndAllSelectedNodes();
    });
  },
  _toggleAndLoadNewNodes: function _toggleAndLoadNewNodes(treeNodeProps, options) {
    var self = this;

    var isToggleRequest = _.isBoolean(options.open);

    var toggledTreeNodeDfd = new $.Deferred();
    var treeNode;

    if (treeNodeProps) {
      treeNode = this._getNodeById(treeNodeProps.id);
    }

    var isDefaultRequestForRoot = !treeNode;

    if (isDefaultRequestForRoot) {
      var isResetRequest = this.node.children.length > 0;

      if (isResetRequest) {
        delete this.node;
        this.node = _.cloneDeep(DEFAULT_ROOT_NODE);
      }

      treeNode = this.node;

      if (treeNodeProps) {
        treeNode.properties = treeNodeProps;
      }
    }

    if (isToggleRequest || isDefaultRequestForRoot) {
      if (isDefaultRequestForRoot) {
        toggledTreeNodeDfd = this._loadChildren(treeNode, options);
      } else if (!_.isUndefined(options.open)) {
        if (options.open) {
          toggledTreeNodeDfd = this._loadChildren(treeNode, options);
        } else {
          toggledTreeNodeDfd.resolve(treeNode);
        }
      }

      toggledTreeNodeDfd.then(function (treeNode) {
        return self._toggleNode(treeNode);
      });
    } else {
      toggledTreeNodeDfd.resolve(treeNode);
    }

    return toggledTreeNodeDfd;
  },
  _loadChildren: function _loadChildren(treeItem, options) {
    var self = this;
    var result = new $.Deferred();
    var itemToLoadChildrenProperties;

    if (_.isEmpty(treeItem.children)) {
      if (treeItem.id === DEFAULT_ROOT_NODE.id) {
        itemToLoadChildrenProperties = this.node.properties;
      } else {
        itemToLoadChildrenProperties = treeItem.properties;
      }

      return this.parentDataProvider.getData(options, itemToLoadChildrenProperties).then(function (searchResult) {
        treeItem = self._addNewChildren(treeItem, searchResult.data);
        treeItem = self._showItem(treeItem);
        return treeItem;
      });
    } else {
      result.resolve(treeItem);
    }

    return result;
  },
  _addNewChildren: function _addNewChildren(treeItem, children) {
    var parentLevel = (_.isNumber(treeItem.level) ? treeItem.level : 0) + 1;
    var newChildren = children.map(function (child) {
      child.level = parentLevel;
      return child;
    });
    treeItem.children = treeItem.children.concat(newChildren);
    return treeItem;
  },
  _toggleNode: function _toggleNode(treeNode) {
    if (!this._isDefaultRootAlreadyExpanded(treeNode)) {
      treeNode.open = !treeNode.open;

      if (treeNode.open) {
        this._showItem(treeNode);
      } else {
        if (!_.isEmpty(treeNode.children)) {
          treeNode.children.forEach(this._hideItem, this);
        }
      }
    }
  },
  _isDefaultRootAlreadyExpanded: function _isDefaultRootAlreadyExpanded(treeNode) {
    if (treeNode.id === DEFAULT_ROOT_NODE.id && treeNode.visible) {
      return _.every(treeNode.children, function (child) {
        return child.visible;
      });
    }
  },
  _selectNodeIfSelectionAction: function _selectNodeIfSelectionAction(treeNode, options) {
    if (options.clearSelection) {
      this.selection = {};
    }

    var isSelectable = treeNode.isSelectable,
        select = options.select,
        multiple = options.multiple;

    if (select && isSelectable) {
      if (multiple) {
        this._toggleNodeSelection(treeNode);
      } else {
        this._selectNode(treeNode);
      }
    }
  },
  _toggleNodeSelection: function _toggleNodeSelection(treeNode) {
    if (this.selection[treeNode.id]) {
      delete this.selection[treeNode.id];
    } else {
      this.selection[treeNode.id] = true;
    }
  },
  _selectNode: function _selectNode(treeNode) {
    if (!this.selection[treeNode.id]) {
      this.selection = {};
      this.selection[treeNode.id] = true;
    }
  },
  _showItem: function _showItem(treeItem) {
    treeItem.visible = true;
    var isOpen = treeItem.open;

    if (isOpen && !_.isEmpty(treeItem.children)) {
      treeItem.children.forEach(this._showItem, this);
    }

    return treeItem;
  },
  _hideItem: function _hideItem(treeItem) {
    treeItem.visible = false;

    if (!_.isEmpty(treeItem.children)) {
      treeItem.children.forEach(this._hideItem, this);
    }

    return treeItem;
  },
  _getVisibleAndAllSelectedNodes: function _getVisibleAndAllSelectedNodes() {
    var nodes = convertNodesToList([this.node]);
    return {
      visibleNodes: omitNodesChildren(nodes),
      selection: _.clone(this.selection)
    };
  },
  _getNodeById: function _getNodeById(nodeId) {
    return getTreeNodeById(this.node, nodeId);
  }
});

function omitNodesChildren(nodes) {
  return _.map(nodes, function (node) {
    return _.omit(node, 'children');
  });
}

function convertNodesToList(nodes) {
  return nodes.reduce(function toList(memo, node) {
    if (node.id !== DEFAULT_ROOT_NODE.id) {
      memo.push(node);
    }

    if (node.children && node.children.length > 0) {
      var children = node.children.reduce(toList, []);
      memo = memo.concat(children);
    }

    return memo;
  }, []);
}

function getTreeNodeById(node, nodeId) {
  if (node.id === nodeId && node.id !== DEFAULT_ROOT_NODE.id) {
    return node;
  } else if (node.children) {
    for (var i = 0; i < node.children.length; i++) {
      var child = node.children[i];
      var foundChild = getTreeNodeById(child, nodeId);

      if (foundChild) {
        return foundChild;
      }
    }
  }
}

_.extend(TreeNodeProvider, {
  DEFAULT_ROOT_NODE: DEFAULT_ROOT_NODE
});

module.exports = TreeNodeProvider;

});