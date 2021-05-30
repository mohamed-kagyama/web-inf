define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TreeItemSelectionProcessor = function TreeItemSelectionProcessor(options) {
  this.initialize(options);
};

_.extend(TreeItemSelectionProcessor.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'process');

    this.isItemSelected = options.isItemSelected;
  },
  process: function process(item) {
    item.addToSelection = this.isItemSelected(item.resource);
    return item;
  }
});

module.exports = TreeItemSelectionProcessor;

});