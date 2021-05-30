define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var extractPropertyByKeyUtil = require("../../util/extractPropertyByKeyUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var outputTemplate = _.template('"{{=value}}"');

module.exports = {
  create: function create(property) {
    return {
      convert: function convert(error) {
        var value;

        if (_.isNumber(property)) {
          value = error.parameters[property];
        } else {
          var propertyObject = extractPropertyByKeyUtil.extract(error.parameters, property);
          value = propertyObject && propertyObject.value;
        }

        return !_.isUndefined(value) ? outputTemplate({
          value: value
        }) : value;
      }
    };
  }
};

});