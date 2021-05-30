define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var FilterEditor = require('./FilterEditor');

var _ = require('underscore');

var olapFilterEditorTemplate = require("text!./template/olapFilterEditorTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = FilterEditor.extend({
  template: _.template(olapFilterEditorTemplate),
  isOlap: true,
  initialize: function initialize() {
    FilterEditor.prototype.initialize.apply(this, arguments); // letters are not used in OLAP, so redrawing makes no sense
    // letters are not used in OLAP, so redrawing makes no sense

    this.stopListening(this.model, 'change:filterLetter', this.redrawFilterTitle);
  }
});

});