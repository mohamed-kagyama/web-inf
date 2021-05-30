define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getElementDataAttributes(attrsList, $el) {
  return _.reduce(attrsList, function (memo, attr) {
    $el.removeData(attr);
    var value = $el.data(attr);

    if (!_.isUndefined(value) && value !== '') {
      memo[attr] = value;
    }

    return memo;
  }, {});
}

module.exports = {
  getElementDataAttributes: getElementDataAttributes
};

});