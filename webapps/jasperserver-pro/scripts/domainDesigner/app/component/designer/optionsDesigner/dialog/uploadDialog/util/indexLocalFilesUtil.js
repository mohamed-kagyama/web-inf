define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  indexFiles: function indexFiles(files) {
    return _.map(files, function (file, index) {
      return _.extend({}, file, {
        index: index
      });
    });
  }
};

});