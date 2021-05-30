define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require("../../../../../../../model/schema/enum/genericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getConfig(options) {
  var config = {};
  var nullToNullLabelConverter = options.nullToNullLabelConverter,
      identityConverter = options.identityConverter,
      numberToStringConverter = options.numberToStringConverter;
  config[genericTypesEnum.STRING] = [nullToNullLabelConverter, identityConverter];
  config[genericTypesEnum.INTEGER] = [nullToNullLabelConverter, numberToStringConverter];
  config[genericTypesEnum.DECIMAL] = [nullToNullLabelConverter, numberToStringConverter];
  return config;
}

module.exports = {
  create: function create(options) {
    options = options || {};
    return getConfig(options);
  }
};

});