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
    var joinGroupNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.JOIN_GROUP_NAME),
        joinElementNameProperty = extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.ELEMENT_NAME);
    return [joinGroupNameProperty.value, joinElementNameProperty.value].join('.');
  }
};

});