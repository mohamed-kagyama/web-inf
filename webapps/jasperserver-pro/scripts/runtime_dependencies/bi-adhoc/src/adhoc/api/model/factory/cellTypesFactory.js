define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (type) {
  var prefix = 'jr-mDatatable-cell-';

  switch (type) {
    case 'bigDecimal':
    case 'byte':
    case 'short':
    case 'float':
    case 'integer':
    case 'long':
    case 'double':
    case 'decimal':
      return prefix + 'number';

    case 'date':
    case 'time':
    case 'timestamp':
      return prefix + 'date';

    default:
      return prefix + 'text';
  }
};

});