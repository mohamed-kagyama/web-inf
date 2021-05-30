define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getSelectedFieldsAsArray: function getSelectedFieldsAsArray(options) {
    var fields = options.fields,
        selection = options.selection;
    return fields ? fields.filter(function (field) {
      return !_.isUndefined(selection.fields[field.name]);
    }) : [];
  }
};

});