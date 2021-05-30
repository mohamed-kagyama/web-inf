define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require("../../../../../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getConfig(options) {
  var config = {};
  var converters = [options.onShowListValuesConverter];
  config[genericTypesEnum.INTEGER] = converters;
  config[genericTypesEnum.DECIMAL] = converters;
  config[genericTypesEnum.BOOLEAN] = converters;
  config[genericTypesEnum.DATE] = converters;
  config[genericTypesEnum.TIME] = converters;
  config[genericTypesEnum.TIMESTAMP] = converters;
  return config;
}

module.exports = {
  create: function create(options) {
    options = options || {};
    return getConfig(options);
  }
};

});