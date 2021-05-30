define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var valuePattern = '([\\d]+):([\\d]+)';

function parseField(value) {
  var valueRegex = new RegExp(valuePattern, 'g'),
      result = valueRegex.exec(value);
  return {
    fieldId: Number(result[2]),
    joinAliasId: Number(result[1])
  };
}

module.exports = {
  parseField: parseField
};

});