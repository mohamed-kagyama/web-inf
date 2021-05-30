define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SelectOptionsWithAdditionalPropsFactory = function SelectOptionsWithAdditionalPropsFactory(options) {
  this.initialize(options);
};

_.extend(SelectOptionsWithAdditionalPropsFactory.prototype, {
  initialize: function initialize(options) {
    this.className = options.className;
  },
  create: function create(options) {
    var operators = options.operators;
    return _.map(operators, function (operator) {
      return {
        label: operator.label,
        value: operator.name,
        className: this.className
      };
    }, this);
  }
});

module.exports = SelectOptionsWithAdditionalPropsFactory;

});