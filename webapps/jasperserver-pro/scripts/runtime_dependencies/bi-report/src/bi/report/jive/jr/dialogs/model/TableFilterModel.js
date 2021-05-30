define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Epoxy = require('backbone.epoxy');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Epoxy.Model.extend({
  defaults: {
    operator: null,
    value: ""
  },
  computeds: {
    isMultiValueOperator: function isMultiValueOperator() {
      var op = this.get('operator');
      return op && op.toLowerCase().indexOf('between') !== -1 ? true : false;
    },
    isNotNullCheckOperator: function isNotNullCheckOperator() {
      var op = this.get('operator'),
          isNullCheck = op && op.toLowerCase().indexOf('null') !== -1 ? true : false;
      return !isNullCheck;
    }
  },
  initialize: function initialize() {
    this.on('change:operator', this._onOperatorChange);
    Epoxy.Model.prototype.initialize.apply(this, arguments);
  },
  reset: function reset() {
    this.clear({
      silent: false
    }).set(this.defaults);
    return this;
  },
  _onOperatorChange: function _onOperatorChange() {
    var currentValue = this.get('value'),
        operator = this.get('operator'),
        isMultiValue,
        isNullCheck;
    isMultiValue = operator && operator.toLowerCase().indexOf('between') !== -1;
    isNullCheck = operator && operator.toLowerCase().indexOf('null') !== -1;

    if (isMultiValue === true) {
      if (!_.isArray(currentValue)) {
        this.set({
          value: [currentValue]
        });
      }
    } else if (isMultiValue === false) {
      if (_.isArray(currentValue)) {
        this.set({
          value: currentValue[0]
        });
      }
    }

    if (isNullCheck) {
      this.set({
        value: ''
      });
    }
  },
  remove: function remove() {}
});

});