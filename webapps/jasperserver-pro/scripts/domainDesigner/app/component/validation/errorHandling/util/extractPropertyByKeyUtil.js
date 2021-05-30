define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  extract: function extract(properties, key) {
    var extractedProperties = _.filter(properties, function (property) {
      return property.key === key;
    });

    if (extractedProperties.length === 1) {
      return _.first(extractedProperties);
    }

    return extractedProperties;
  }
};

});