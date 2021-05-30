define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CalcFieldsDesignerSearchKeywordProvider = function CalcFieldsDesignerSearchKeywordProvider(options) {
  this.initialize(options);
};

_.extend(CalcFieldsDesignerSearchKeywordProvider.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    _.bindAll(this, 'get');

    this.store = options.store;
  },
  get: function get() {
    return this.store.get('searchKeyword');
  }
});

module.exports = CalcFieldsDesignerSearchKeywordProvider;

});