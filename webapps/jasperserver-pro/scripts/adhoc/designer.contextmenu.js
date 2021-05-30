define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var adhocDesigner = require('./designer');

var actionModel = require("runtime_dependencies/jrs-ui/src/actionModel/actionModel.modelGenerator");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
adhocDesigner.showDynamicMenu = function (event, contextLevel, coordinates, updateContextActionModel) {
  //in case we are dealing with multi-select get last item
  var position = window.selObjects.length;

  if (position > 0) {
    var selected = window.selObjects[position - 1];
    if (selected && selected.menuLevel) selected.menuLevel = contextLevel;
  }

  actionModel.showDynamicMenu(contextLevel, event, null, coordinates, window.localContext.state.actionmodel, updateContextActionModel);
};

adhocDesigner.contextMenuHandler = function (event) {
  var matched = null;
  var node = event.memo.node;
  var evt = event.memo.targetEvent;
  window.localContext.contextMenuHandler && window.localContext.contextMenuHandler(evt);
};

module.exports = adhocDesigner;

});