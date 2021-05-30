define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ListWithSelectionComponent = require("runtime_dependencies/js-sdk/src/components/scalableList/view/ListWithSelection");

var nativeMultiSelectionTrait = require("runtime_dependencies/js-sdk/src/components/scalableList/trait/nativeMultiSelectionTrait");

var setValueWithoutRerenderTrait = require("../../../layout/sidebarView/tree/trait/setValueWithoutRerenderTrait");

var initializeTreePluginsUtil = require("../../../../common/util/initializeTreePluginsUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ListWithSelection = ListWithSelectionComponent.extend(nativeMultiSelectionTrait).extend(setValueWithoutRerenderTrait);
module.exports = {
  create: function create(options) {
    var tree = new ListWithSelection(options);
    initializeTreePluginsUtil.initTreePlugins(tree, options.plugins);
    return tree;
  }
};

});