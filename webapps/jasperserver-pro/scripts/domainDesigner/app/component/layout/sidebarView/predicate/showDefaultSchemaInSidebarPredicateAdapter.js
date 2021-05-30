define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = showDefaultSchemaPredicateAdapter;

function showDefaultSchemaPredicateAdapter(predicate) {
  return function (options) {
    return predicate(options.resource);
  };
}

});