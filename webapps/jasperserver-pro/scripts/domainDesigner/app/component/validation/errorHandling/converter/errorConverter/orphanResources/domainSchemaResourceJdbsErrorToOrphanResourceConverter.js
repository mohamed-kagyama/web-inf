define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../../../model/schema/enum/schemaEntitiesEnum");

var errorParametersKeysEnum = require("../../../enum/errorParametersKeysEnum");

var extractPropertyByKeyUtil = require("../../../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(error) {
    return extractPropertyByKeyUtil.extract(error.parameters, errorParametersKeysEnum.ELEMENT_NAME).value;
  }
};

});