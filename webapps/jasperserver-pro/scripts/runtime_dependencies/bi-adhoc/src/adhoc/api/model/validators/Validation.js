define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var VisualizationTypeValidator = require('./VisualizationTypeValidator');

var ParameterNameValidator = require('./ParameterNameValidator');

var ParameterValueValidator = require('./ParameterValueValidator');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var validators = [VisualizationTypeValidator, ParameterNameValidator, ParameterValueValidator];

module.exports = function (adHocModel) {
  return {
    validate: function validate(options, settings) {
      var index = 0,
          res;

      while (!res && index < validators.length) {
        res = validators[index++].validate(adHocModel, options, settings);
      }

      return res;
    }
  };
};

});