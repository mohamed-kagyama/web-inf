define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/resourcesListVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var tree = options.tree;
    return {
      template: template,
      mixins: options.mixins,
      mounted: function mounted() {
        this._destroyDroppable && this._destroyDroppable();
        this._destroyDraggable && this._destroyDraggable();
        tree.setElement(this.$el);
        this._initializeDroppable && this._initializeDroppable();
        this._initializeDraggable && this._initializeDraggable();
      }
    };
  }
};

});