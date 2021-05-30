define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var errorParametersKeysEnum = require("../../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(error) {
    var dataIslandNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.DATA_ISLAND_NAME),
        hierarchicalNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.HIERARCHICAL_NAME);

    if (hierarchicalNameProperty.value) {
      return [dataIslandNameProperty.value, hierarchicalNameProperty.value].join('.');
    }

    return dataIslandNameProperty.value;
  }
};

});