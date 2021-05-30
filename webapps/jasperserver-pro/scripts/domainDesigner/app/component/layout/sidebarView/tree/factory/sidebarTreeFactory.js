define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ListWithSelectionComponent = require("runtime_dependencies/js-sdk/src/components/scalableList/view/ListWithSelection");

var ListWithSelectionAsObjectHashModel = require("runtime_dependencies/js-sdk/src/components/scalableList/model/ListWithSelectionAsObjectHashModel");

var setValueWithoutRerenderTrait = require("../trait/setValueWithoutRerenderTrait");

var treeItemsTemplate = require("text!../../template/treeItemsTemplate.htm");

var initializeTreePluginsUtil = require("../../../../../common/util/initializeTreePluginsUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ListWithSelection = ListWithSelectionComponent.extend(setValueWithoutRerenderTrait).extend({
  ListModel: ListWithSelectionAsObjectHashModel
});

function getTreeOptions(options) {
  var dataProvider = options.dataProvider;
  return {
    itemsTemplate: options.itemsTemplate || treeItemsTemplate,
    listItemHeight: options.listItemHeight || 10,
    lazy: true,
    selection: options.selection || {
      allowed: false,
      multiple: false
    },
    getData: dataProvider
  };
}

module.exports = {
  create: function create(options) {
    var treeOptions = getTreeOptions(options),
        Tree = options.Tree || ListWithSelection;
    var tree = new Tree(treeOptions);
    initializeTreePluginsUtil.initTreePlugins(tree, options.plugins);
    return tree;
  }
};

});