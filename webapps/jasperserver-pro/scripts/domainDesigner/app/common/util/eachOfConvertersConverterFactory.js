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
        var args = Array.prototype.slice.call(arguments, 0),
            result = args[0],
            restOfTheArgs = args.slice(1);
        converters = converters || [];

        _.each(converters, function (converter) {
          result = converter.convert.apply(converter, [result].concat(restOfTheArgs));
        });

        return result;
      }
    };
  }
};

});