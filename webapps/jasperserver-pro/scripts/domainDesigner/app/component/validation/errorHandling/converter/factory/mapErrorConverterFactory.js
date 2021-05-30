define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var converter = options.converter;
    return {
      convert: function convert(errors, options) {
        return _.map(errors, function (error) {
          return converter.convert(error, options);
        });
      }
    };
  }
};

});