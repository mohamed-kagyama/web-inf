define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var template = _.template('{{-operator}}:{{-rightOperand}}');

module.exports = {
  convert: function convert(options) {
    var operator = options.operator,
        rightOperand = options.rightOperand;
    return template({
      operator: operator,
      rightOperand: rightOperand
    });
  },
  parse: function parse(value) {
    var parsedValue = value.split(':');
    return {
      operator: parsedValue[0],
      rightOperand: parsedValue[1]
    };
  }
};

});