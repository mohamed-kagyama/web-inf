define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(basicValueConverter) {
    return {
      convert: function convert(operand, options) {
        var value = basicValueConverter.convert(operand.value, options);

        if (!_.isUndefined(value)) {
          return _.extend({}, operand, {
            value: value
          });
        }
      }
    };
  }
};

});