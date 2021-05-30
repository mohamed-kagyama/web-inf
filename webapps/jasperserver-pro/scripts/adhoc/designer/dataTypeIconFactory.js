define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var iconTypesMap = require('../enum/dataTypeIconEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getIconClassByType(type) {
  var javaType = type;

  var iconType = _.findKey(iconTypesMap, function (iconType) {
    return _.contains(iconType, javaType);
  });

  return iconType || '';
}

module.exports = {
  getIconClassByType: getIconClassByType
};

});