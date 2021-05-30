define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function unwrap(data, options) {
  var unwrappedData = [];

  if (!data) {
    return unwrappedData;
  }

  if (options.metadataResourcePath.length) {
    unwrappedData = _.reduce(data, function (memo, entry) {
      memo = memo.concat(entry.group.elements || []);
      return memo;
    }, []);
  } else {
    unwrappedData = data;
  }

  return unwrappedData || [];
}

module.exports = {
  unwrap: unwrap
};

});