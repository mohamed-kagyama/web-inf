define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  validate: function validate(adHocModel, options, settings) {
    if (options.params) {
      var parametersModel = adHocModel.dataSet.query.parameters,
          keys = _.keys(options.params);

      for (var i = 0; i < keys.length; i++) {
        if (!Object.hasOwnProperty.call(parametersModel.attributes, keys[i])) {
          return {
            message: 'Unknown parameter: ' + keys[i],
            errorCode: 'parameter.unknown',
            parameters: [keys[i], _.keys(parametersModel.attributes)]
          };
        }
      }
    }
  }
};

});