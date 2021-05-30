define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var ChartTypeCollection = require('../collection/ChartTypeCollection');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Model.extend({
  defaults: {
    id: undefined,
    name: undefined,
    bundleName: undefined,
    chartTypes: []
  },
  initialize: function initialize() {
    this.chartTypesCollection = new ChartTypeCollection(this.get('chartTypes'));
  },
  toJSON: function toJSON() {
    var json = Backbone.Model.prototype.toJSON.call(this);
    json.chartTypes = this.chartTypesCollection.toJSON();
    return json;
  }
});

});