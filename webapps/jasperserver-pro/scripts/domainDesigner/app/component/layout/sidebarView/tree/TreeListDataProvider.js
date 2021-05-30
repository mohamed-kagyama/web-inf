define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var uriUtil = require("../../../../util/uriUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TreeListDataProvider = function TreeListDataProvider(options) {
  this.initialize(options);
};

_.extend(TreeListDataProvider.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'getData');

    this.cachedList = [];
    this.nestedTreeModel = options.nestedTreeModel;
    this.schemaToNestedTreeModelConverter = options.schemaToNestedTreeModelConverter;
  },
  setState: function setState(options) {
    this.dataStore = options.dataStore;
    this.setNeedToConvert(true);
  },
  getData: function getData(options) {
    var data;
    data = this._getTreeModelElementsAsAList(options);
    return {
      items: data.slice(options.offset, options.offset + options.limit),
      total: data.length
    };
  },
  setNeedToConvert: function setNeedToConvert(needToConvert) {
    this.needToConvertSchema = needToConvert;
  },
  _convertSchemaToTreeStructureIfNecessary: function _convertSchemaToTreeStructureIfNecessary() {
    var treeModelStructure;
    treeModelStructure = this.schemaToNestedTreeModelConverter.convert({
      schema: this.dataStore
    });
    this.nestedTreeModel.reset(treeModelStructure);
    this.setNeedToConvert(false);
  },
  _getTreeModelElementsAsAList: function _getTreeModelElementsAsAList() {
    if (!this.needToConvertSchema) {
      return this.cachedList;
    }

    this._convertSchemaToTreeStructureIfNecessary();

    var pathSeparator = uriUtil.getSeparator();
    var list = this.nestedTreeModel.visit([], {
      accept: function accept(node, nodePath, memo) {
        var nodeAbsoluteUri = pathSeparator + nodePath.join(pathSeparator),
            nodeParentUri = pathSeparator + nodePath.slice(0, nodePath.length - 1).join(pathSeparator);

        if (node.expanded && memo.paths[nodeParentUri]) {
          memo.paths[nodeAbsoluteUri] = true;
        }

        return memo.paths[nodeParentUri];
      },
      visit: function visit(node, nodePath, memo) {
        memo.list.push(_.omit(node, 'elements'));
      }
    }, {
      list: [],
      paths: {
        '/': true
      }
    }).list;
    this.cachedList = list;
    return list;
  }
});

module.exports = TreeListDataProvider;

});