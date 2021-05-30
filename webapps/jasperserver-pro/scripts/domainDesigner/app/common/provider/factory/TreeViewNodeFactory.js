define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function TreeViewNodeFactory(options) {
  this.options = options;
}

TreeViewNodeFactory.prototype.create = function (options) {
  return _.defaults(options, this.options);
};

module.exports = TreeViewNodeFactory;

});