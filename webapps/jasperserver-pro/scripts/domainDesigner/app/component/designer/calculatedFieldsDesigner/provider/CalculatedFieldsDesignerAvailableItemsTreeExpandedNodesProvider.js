define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CalculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider = function CalculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider(options) {
  this.initialize(options);
};

_.extend(CalculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'isNodeExpanded', 'isNodeCollapsed');

    this.store = options.store;
  },
  isNodeExpanded: function isNodeExpanded(id) {
    return this.store.get('availableValuesExpandedNodes')[id];
  },
  isNodeCollapsed: function isNodeCollapsed(id) {
    return this.store.get('availableValuesCollapsedNodes')[id];
  }
});

module.exports = CalculatedFieldsDesignerAvailableItemsTreeExpandedNodesProvider;

});