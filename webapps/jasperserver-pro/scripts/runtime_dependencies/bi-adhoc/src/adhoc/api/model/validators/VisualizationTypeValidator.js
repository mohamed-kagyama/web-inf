define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  validate: function validate(adHocModel, options, settings) {
    if (options.canvas && options.canvas.type) {
      var enabled = adHocModel.dataSet.query.getAllowedTypesList();

      if (!_.contains(enabled, options.canvas.type)) {
        return {
          message: 'The specified visualization type is invalid.',
          errorCode: 'visualization.type.invalid',
          parameters: [options.canvas.type]
        };
      }
    }
  }
};

});