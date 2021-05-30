define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(converter) {
    return {
      convert: function convert(operand) {
        var start = operand.start.value,
            end = operand.end.value;
        start = converter.convert(start);
        end = converter.convert(end);
        return _.extend({}, operand, {
          start: {
            value: start
          },
          end: {
            value: end
          }
        });
      }
    };
  }
};

});