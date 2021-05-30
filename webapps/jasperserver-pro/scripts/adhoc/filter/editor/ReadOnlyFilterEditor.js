define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var FilterEditor = require('./FilterEditor');

var _ = require('underscore');

var readOnlyFilterTemplate = require("text!./template/readOnlyFilterTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = FilterEditor.extend({
  template: _.template(readOnlyFilterTemplate),
  resizeTitle: function resizeTitle() {},
  render: function render() {
    return this;
  }
});

});