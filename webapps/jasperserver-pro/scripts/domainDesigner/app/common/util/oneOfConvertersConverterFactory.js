define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(converters) {
    return {
      convert: function convert() {
        var result,
            args = Array.prototype.slice.call(arguments, 0);
        converters = converters || [];

        _.find(converters, function (converter) {
          result = converter.convert.apply(converter, args);
          return !_.isUndefined(result);
        });

        return result;
      }
    };
  }
};

});