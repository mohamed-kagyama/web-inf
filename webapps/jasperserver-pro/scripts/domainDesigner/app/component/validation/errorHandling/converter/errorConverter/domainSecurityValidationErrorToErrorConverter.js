define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// import errorParametersKeysEnum from "../../enum/errorParametersKeysEnum";
// import extractPropertyByKeyUtil from "../../util/extractPropertyByKeyUtil";
module.exports = {
  convert: function convert(errors) {
    return _.map(errors, function (error) {
      var msg = '';
      error.properties.forEach(function (value) {
        return msg += value.value;
      });
      return msg;
    });
  }
};

});