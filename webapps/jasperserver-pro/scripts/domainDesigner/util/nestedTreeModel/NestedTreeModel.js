define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var UseAttributeIdGenerationStrategy = require('./UseAttributeIdGenerationStrategy');

var pathUtil = require("../../app/util/pathUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function NestedTreeModel(attributes, options) {
  this.initialize(attributes, options);
}

_.extend(NestedTreeModel.prototype, Backbone.Events, {
  initialize: function initialize(attributes, options) {
    options = options || {};
    this._idGenerationStrategy = options.idGenerationStrategy || NestedTreeModel.idGenerationStrategy;
    this._nodeIdAttribute = options.nodeIdAttribute || NestedTreeModel.nodeIdAttribute;
    this._nodeIdGenerator = options._nodeIdGenerator;
    this._childrenAttribute = options.childrenAttribute || NestedTreeModel.childrenAttribute;
    this._pathSeparator = options.pathSeparator || NestedTreeModel.pathSeparator;
    this._pathSeparatorEscapeSymbol = options.pathSeparatorEscapeSymbol || NestedTreeModel.pathSeparatorEscapeSymbol;
    this.clear({
      silent: true
    });

    if (attributes) {
      attributes = _.isArray(attributes) ? attributes : [attributes];
      this.reset(attributes, {
        silent: true
      });
    }
  },
  clear: function clear(options) {
    options = options || {}; // root property keeps our model
    // root property keeps our model

    this._root = {};
    this._root[this._childrenAttribute] = [];
    this._root[this._nodeIdAttribute] = 'root'; // map property is used for fast access to nested child nodes.
    // lets support our mode is the following (including the root node):
    //
    // {
    //    name: "root",
    //    elements: [{
    //      name: "subNode",
    //      elements: [...]
    //    }]
    // }
    //
    // in this case this._map will have the following structure:
    //
    // this._map = {
    //    root: {
    //      ref: {}  // this is reference to this._root
    //      nodes: {
    //          subNode: {
    //              ref: {}   // reference to a node with id "subNode" in this._root
    //              nodes: {} //contains key-value structure for all children of subNode
    //                        //where key is a node id and value has the same structure as
    //                        //root, or subNode elements in map.
    //          }
    //      }
    //    }
    // }
    //
    // so when we want to get subNode we can do this easily:
    //
    // var subNode = this._map["root"].nodes["subNode"].ref;
    //
    // we do not have to search this node by index in parent node's elements array
    // map property is used for fast access to nested child nodes.
    // lets support our mode is the following (including the root node):
    //
    // {
    //    name: "root",
    //    elements: [{
    //      name: "subNode",
    //      elements: [...]
    //    }]
    // }
    //
    // in this case this._map will have the following structure:
    //
    // this._map = {
    //    root: {
    //      ref: {}  // this is reference to this._root
    //      nodes: {
    //          subNode: {
    //              ref: {}   // reference to a node with id "subNode" in this._root
    //              nodes: {} //contains key-value structure for all children of subNode
    //                        //where key is a node id and value has the same structure as
    //                        //root, or subNode elements in map.
    //          }
    //      }
    //    }
    // }
    //
    // so when we want to get subNode we can do this easily:
    //
    // var subNode = this._map["root"].nodes["subNode"].ref;
    //
    // we do not have to search this node by index in parent node's elements array

    this._map = {
      root: {
        ref: this._root,
        nodes: {}
      }
    };
    this._idGenerationStrategy.reset && this._idGenerationStrategy.reset();

    if (!options.silent) {
      this.trigger('change');
    }
  },

  /**
     * Returns node by given path from a tree model hierarchy
     * Path could be either array or a string of node id's joined by
     * id separator.
     *
     * For example:
     *  model json (nodeIdAttribute: "id", childrenAttribute: "nodes"):
     *
     *  {
     *      id: "a",
     *      nodes: [
     *        {
     *          id: "b"
     *        }
     *      ]
     *  }
     *
     *  this.getNode(["a", "b"]) == {id: "b"}
     *  this.getNode("a.b") == {id: "b"} // pathSeparator: "."
     *  this.getNode("/a/b") == {id: "b"} // pathSeparator: "/"
     *
     * @param path
     * @returns {*} node by given path
     */
  getNode: function getNode(path) {
    var mapNode = this._getMapNode(path);

    if (mapNode) {
      // if path is "" then return children for the root node
      // otherwise return node by itself
      // because we do not expose internal root node
      return mapNode.ref === this._root ? mapNode.ref[this._childrenAttribute] : mapNode.ref;
    }
  },

  /**
     * Returns children nodes of a given node.
     *
     * For example:
     *  model json (nodeIdAttribute: "id", childrenAttribute: "nodes", pathSeparator: "."):
     *
     *  {
     *      id: "a",
     *      nodes: [
     *        {
     *          id: "b"
     *        }
     *      ]
     *  }
     *
     *  this.getChildren("a") == [{id: "b"}]
     *
     * @param parent path to a parent node. Could be either array or a string. See this.node
     * @returns {*} children nodes of a given parent node
     */
  getChildren: function getChildren(parent) {
    parent = this._getNode(parent);
    return parent && parent[this._childrenAttribute];
  },

  /**
     * Returns an array with parent path.
     *
     * @param path path to a node which could be either a string or an array
     * @returns {*} array with path to parent node
     */
  getParentNodePath: function getParentNodePath(path) {
    path = _.clone(this._convertPathToArray(path));

    if (path.length > 0) {
      path.pop();
      return path;
    } else {
      // The root node does not have parent
      return null;
    }
  },

  /**
     * Update any properties of the existing node
     * @param path path to the node. see this.node
     * @param nodeData new node properties.
     * @param options additional options. See Backbone.Model.prototype.set
     *          options.at - index of the node in parent elements array
     *          options.updateProperties - if set to true then elements array of nodeData
     *                                  will be ignored. this options allows fast update of
     *                                  node elements
     */
  updateNode: function updateNode(path, nodeData, options) {
    options = options || {};
    path = this._normalizePath(path);

    if (!path.length) {
      throw new Error('Cannot update root node. Use reset instead.');
    }

    var parent = this.getParentNodePath(path),
        nodeIndex,
        parentMapNode = this._getMapNode(parent),
        mapNode = this._getMapNode(path),
        nodeId = nodeData[this._nodeIdAttribute],
        oldNodeId,
        node = this._getNode(path),
        internalPath,
        idAttrObject = {};

    if (node) {
      internalPath = this._convertPathToInternal(path);
      oldNodeId = node[this._nodeIdAttribute];

      if (options.updateProperties) {
        this._set(internalPath, _.extend(node, _.omit(nodeData, [this._childrenAttribute])));

        if (nodeId && oldNodeId !== nodeId) {
          // If node id was changed we have to update reference to it in our internal map
          delete parentMapNode.nodes[oldNodeId];
          parentMapNode.nodes[nodeId] = mapNode;
        }
      } else {
        nodeIndex = _.indexOf(this.getChildren(parent), node);
        idAttrObject[this._nodeIdAttribute] = oldNodeId;
        this.removeNode(path, {
          silent: true
        });
        this.addNode(parent, _.extend(idAttrObject, nodeData), _.extend({
          at: nodeIndex
        }, options, {
          silent: true
        }));
      }

      if (!options.silent) {
        var joinedPath = this._join(path); // get fresh node from parent references map
        // get fresh node from parent references map


        node = parentMapNode.nodes[nodeId || oldNodeId].ref;

        if (path.length) {
          this.trigger('update:' + joinedPath, node);
        }

        this.trigger('update', joinedPath, node);

        this._bubbleTrigger(path, 'change');
      }
    }
  },

  /**
     * Set whole node(s) at once including it's children hierarchy.
     * Node will be inserted in the root.
     * Effectively this is equivalent of a reset operation
     * This is the most powerful but also the most
     * complex and slow operation.
     *
     * In almost all cases it's always better to use more granular operations like:
     * updateChildren, addNode, removeChild etc.
     *
     * @param node
     * @param options
     */
  reset: function reset(node, options) {
    options = options || {};
    node = node || {};
    this._idGenerationStrategy.reset && this._idGenerationStrategy.reset();

    var rootMapNode = this._getMapNode([]),
        rootNode = this._getNode([]);

    node = _.isArray(node) ? node : [node];

    this._setChildren([], rootNode, node);

    rootMapNode.nodes = {};

    this._buildChildrenMapNode(rootMapNode, rootNode[this._childrenAttribute]);

    if (!options.silent) {
      this.trigger('reset');
      this.trigger('change');
    }
  },

  /**
     * Remove given node
     * @param path
     * @param options
     */
  removeNode: function removeNode(path, options) {
    options = options || {};
    path = this._normalizePath(path);

    if (!path.length) {
      throw new Error('Cannot remove root level.');
    }

    var node = this._getNode(path),
        parentPath = this.getParentNodePath(path),
        parentChildren = this.getChildren(parentPath),
        index;

    if (!node) {
      return;
    }

    index = _.indexOf(parentChildren, node);

    if (index >= 0) {
      parentChildren.splice(index, 1);

      var mapNode = this._getMapNode(parentPath);

      delete mapNode.nodes[node[this._nodeIdAttribute]];

      if (!options.silent) {
        var joinedPath = this._join(path);

        this.trigger('remove:' + joinedPath, node);
        this.trigger('remove', joinedPath, node);

        this._bubbleTrigger(parentPath, 'change');
      }
    }
  },
  removeNodes: function removeNodes(parent, nodeIds, options) {
    options = options || {};
    parent = this._normalizePath(parent);
    var pathes = [],
        nodes = [];

    if (_.indexOf(nodeIds, '') !== -1) {
      throw new Error('Cannot remove root level.');
    }

    _.each(nodeIds, function (nodeId) {
      var path = parent.concat([nodeId]),
          node = this._getNode(path);

      if (node) {
        nodes.push(node);
        pathes.push(this._join(path));
      }

      this.removeNode(path, {
        silent: true
      });
    }, this);

    if (!options.silent && nodes.length) {
      this.trigger('remove', pathes, nodes);

      this._bubbleTrigger(parent, 'change');
    }
  },

  /**
     * Add a new child to the parent node.
     *
     * @param parent path to the parent node
     * @param node child node to be added
     * @param options regular Backbone set options which may contain the following property:
     *          at: <number>  - index at which new child will be inserted. By default it's
     *          inserted at the end
     */
  addNode: function addNode(parent, node, options) {
    options = options || {};
    parent = this._normalizePath(parent);

    var parentMapNode,
        mapNode,
        parentNode = this._getNode(parent),
        nodeId = this._getNodeId(node, parent),
        joinedPath,
        idAttributeObject = {};

    if (parentNode) {
      parentMapNode = this._getMapNode(parent);

      if (!nodeId) {
        throw new Error('Id should be not a falsy value');
      } else if (parentMapNode.nodes && parentMapNode.nodes[nodeId]) {
        throw new Error('Node already exists: ' + this._join(parent.concat([nodeId])));
      }

      idAttributeObject[this._nodeIdAttribute] = nodeId;
      node = _.extend({}, idAttributeObject, node);

      var index = this._add(this._convertPathToInternal(parent), node, options);

      mapNode = {
        ref: node
      };

      if (node[this._childrenAttribute]) {
        this._setChildren(parent.concat(nodeId), node, node[this._childrenAttribute]);

        this._buildChildrenMapNode(mapNode, node[this._childrenAttribute]);
      }

      if (!parentMapNode.nodes) {
        parentMapNode.nodes = {};
      }

      parentMapNode.nodes[nodeId] = mapNode;

      if (!options.silent) {
        joinedPath = this._join(parent);

        if (parent.length) {
          this.trigger('add:' + joinedPath, node, index);
        }

        this.trigger('add', joinedPath, node, index);

        this._bubbleTrigger(parent, 'change');
      }
    }
  },
  addNodes: function addNodes(parent, nodes, options) {
    options = options || {};
    parent = this._normalizePath(parent);

    var parentMapNode,
        index,
        parentNodesQuantity,
        parentNode = this._getNode(parent);

    if (parentNode) {
      parentNodesQuantity = parentNode[this._childrenAttribute] ? parentNode[this._childrenAttribute].length : 0;
      index = _.isNumber(options.at) ? options.at > parentNodesQuantity ? parentNodesQuantity : options.at : parentNodesQuantity;
      parentMapNode = this._getMapNode(parent);

      _.each(nodes, function (node) {
        var nodeId = this._getNodeId(node, parent);

        if (!nodeId) {
          throw new Error('Id should be not a falsy value');
        } else if (parentMapNode.nodes && parentMapNode.nodes[nodeId]) {
          throw new Error('Node already exists: ' + this._join(parent.concat([nodeId])));
        }

        node[this._nodeIdAttribute] = nodeId;
      }, this);

      _.each(nodes, function (node, index) {
        var nodeOptions = {
          silent: true
        };

        if (_.isNumber(options.at)) {
          nodeOptions.at = options.at + index;
        }

        this.addNode(parent, node, nodeOptions);
      }, this);

      if (!options.silent) {
        var joinedPath = this._join(parent);

        if (parent.length) {
          this.trigger('add:' + joinedPath, nodes, index);
        }

        this.trigger('add', joinedPath, nodes, index);

        this._bubbleTrigger(parent, 'change');
      }
    }
  },

  /**
     * Visit subtree of the nested tree model which is accepted by visitor.accept method
     *
     * @param path path to start node
     * @param visitor is an object with accept and visit methods.
     *          accept method returns true if this node is accepted for visiting
     *          visit method actually does business logic based no passed node and it's path
     * @param memo object which will be passed to accept and visit methods of the visitor and then returned.
     *      it is a user's responsibility about how to use it and how to initialize it.
     */
  visit: function visit(path, visitor, memo) {
    var nodes;
    path = path || [];
    path = this._convertPathToArray(path);
    nodes = arguments[3] || this.getNode(path);
    nodes = _.isArray(nodes) ? nodes : nodes[this._childrenAttribute];

    _.each(nodes, function (node) {
      var nodePath = path.concat([node[this._nodeIdAttribute]]),
          children = node[this._childrenAttribute];

      if (visitor.accept(node, nodePath, memo)) {
        visitor.visit(node, nodePath, memo);
        children && this.visit(nodePath, visitor, memo, children);
      }
    }, this);

    return memo;
  },
  filter: function filter(path, filterCondition) {
    var model = new NestedTreeModel([], {
      idGenerationStrategy: this._idGenerationStrategy,
      nodeIdAttribute: this._nodeIdAttribute,
      nodeIdGenerator: this._nodeIdGenerator,
      childrenAttribute: this._childrenAttribute,
      pathSeparator: this._pathSeparator,
      pathSeparatorEscapeSymbol: this._pathSeparatorEscapeSymbol
    }),
        self = this;
    var visitor = {
      accept: function accept(node, nodePath, memo) {
        // filter condition should not know about the memo
        return filterCondition(node, nodePath);
      },
      visit: function visit(node, nodePath, model) {
        var modelPath = nodePath.slice(path.length, nodePath.length - 1);
        node = _.omit(node, self._childrenAttribute);
        model.addNode(modelPath, node);
      }
    };
    return this.visit(path, visitor, model).toJSON();
  },
  traverse: function traverse(path, callback, memo) {
    var visitor = {
      accept: function accept() {
        return true;
      },
      visit: callback
    };
    return this.visit(path, visitor, memo);
  },
  find: function find(path, callback, nodes) {
    var nodePath, children, node, result, found, i;
    path = path || [];
    path = _.isArray(path) ? path : pathUtil.split(path, this._pathSeparatorEscapeSymbol, this._pathSeparator);
    nodes = nodes || this.getNode(path);
    nodes = _.isArray(nodes) ? nodes : nodes[this._childrenAttribute];

    for (i = 0; i < nodes.length; i++) {
      node = nodes[i];
      nodePath = path.concat([node[this._nodeIdAttribute]]);
      children = node[this._childrenAttribute];
      found = callback && callback(node, nodePath);

      if (found) {
        result = node;
      } else if (children) {
        result = this.find(nodePath, callback, children);
      }

      if (result) {
        return result;
      }
    }
  },
  // private methods
  _getNode: function _getNode(path) {
    var mapNode = this._getMapNode(path);

    return mapNode && mapNode.ref;
  },
  _getMapNode: function _getMapNode(path) {
    return this._get(this._convertPathToInternal(path));
  },
  _add: function _add(path, node, options) {
    options = options || {};

    var index,
        mapNode = this._get(path),
        parentNode = mapNode && mapNode.ref,
        parentNodeElements;

    if (parentNode) {
      parentNodeElements = parentNode[this._childrenAttribute];

      if (!parentNodeElements) {
        parentNodeElements = [];
        parentNode[this._childrenAttribute] = parentNodeElements;
      }

      if (_.isNumber(options.at)) {
        parentNodeElements.splice(options.at, 0, node);
        index = options.at > parentNodeElements.length ? parentNodeElements.length - 1 : options.at;
      } else {
        parentNodeElements.push(node);
        index = parentNodeElements.length - 1;
      }
    }

    return index;
  },
  _get: function _get(path) {
    var pathFragment,
        node = this._map;

    for (var i = 0; i < path.length; i++) {
      pathFragment = path[i];

      if (!node[pathFragment]) {
        return null;
      }

      node = node[pathFragment];
    }

    return node;
  },
  _set: function _set(path, child) {
    var mapNode = this._get(path),
        node = mapNode && mapNode.ref;

    if (node) {
      path.pop();
      path.pop();

      var parentNode = this._get(path).ref,
          index = _.indexOf(parentNode[this._childrenAttribute], node);

      if (index >= 0) {
        parentNode[this._childrenAttribute][index] = child;
      }
    }
  },
  _setChildren: function _setChildren(path, node, children) {
    if (node) {
      children = _.map(children, function (child) {
        child = _.clone(child);

        var nodeId = this._getNodeId(child, path),
            nodeIdObject = {};

        nodeIdObject[this._nodeIdAttribute] = nodeId;

        if (child[this._childrenAttribute]) {
          this._setChildren(path.concat([nodeId]), child, child[this._childrenAttribute]);
        }

        return _.extend({}, nodeIdObject, child);
      }, this);
      node[this._childrenAttribute] = children;
      return node;
    }
  },
  _bubbleTrigger: function _bubbleTrigger(path, event) {
    var pathClone = _.clone(path);

    var length = pathClone.length;

    for (var i = 0; i < length; i++) {
      this.trigger(event + ':' + this._join(pathClone));
      pathClone.pop();
    }

    this.trigger(event, this._join(path));
  },
  _getNodeId: function _getNodeId(node, parentPath) {
    var nodeId = node[this._nodeIdAttribute];

    if (_.isUndefined(node[this._nodeIdAttribute])) {
      nodeId = this._idGenerationStrategy.getId(node, this._nodeIdAttribute, parentPath);
    }

    return nodeId;
  },
  _buildChildrenMapNode: function _buildChildrenMapNode(parentMapNode, children) {
    if (!parentMapNode.nodes) {
      parentMapNode.nodes = {};
    }

    _.each(children, function (child) {
      var mapElement = {
        ref: child
      };

      if (child[this._childrenAttribute]) {
        this._buildChildrenMapNode(mapElement, child[this._childrenAttribute]);
      }

      parentMapNode.nodes[child[this._nodeIdAttribute]] = mapElement;
    }, this);
  },
  _convertPathToInternal: function _convertPathToInternal(path) {
    path = _.clone(this._convertPathToArray(path));
    var separatorsCount = path.length - 1,
        currentPathIndex = 1;

    for (var i = 0; i < separatorsCount; i++) {
      path.splice(currentPathIndex, 0, 'nodes');
      currentPathIndex += 2;
    }

    if (path.length > 0) {
      path.unshift('nodes');
    }

    path.unshift('root');
    return path;
  },
  _join: function _join(path) {
    return pathUtil.join(path, this._pathSeparatorEscapeSymbol, this._pathSeparator);
  },
  _normalizePath: function _normalizePath(path) {
    return this._convertPathToArray(path);
  },
  _convertPathToArray: function _convertPathToArray(path) {
    if (_.isArray(path)) {
      // It's already an array no need to convert
      return path;
    }

    if (_.isString(path)) {
      if (path.indexOf(this._pathSeparator) === 0) {
        path = path.substr(this._pathSeparator.length);
      } // Split the following path: "a.b.c" -> ["a", "b", "c"];
      // Split the following path: "a.b.c" -> ["a", "b", "c"];


      return pathUtil.split(path, this._pathSeparatorEscapeSymbol, this._pathSeparator, true);
    } else {
      throw new Error('Path should be either a string or an array');
    }
  },
  toJSON: function toJSON() {
    return _.cloneDeep(this.getChildren([]));
  }
});

_.extend(NestedTreeModel, {
  idGenerationStrategy: new UseAttributeIdGenerationStrategy(),
  nodeIdAttribute: 'id',
  childrenAttribute: 'elements',
  pathSeparator: '.',
  pathSeparatorEscapeSymbol: '\\'
});

module.exports = NestedTreeModel;

});