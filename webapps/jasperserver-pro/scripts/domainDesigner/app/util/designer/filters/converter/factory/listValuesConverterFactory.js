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
      convert: function convert(items, options) {
        items = _.isArray(items) ? items : [items];
        return _.map(items, function (item) {
          return converter.convert(item, options);
        });
      }
    };
  }
};

});