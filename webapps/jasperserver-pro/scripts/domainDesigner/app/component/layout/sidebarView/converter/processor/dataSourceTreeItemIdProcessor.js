define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var uriUtil = require("../../../../../util/uriUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function dataSourceTreeItemIdProcessor(resource, options) {
  var path = options.path,
      separator = uriUtil.getSeparator();
  resource.id = separator + path.join(separator);
  resource.levelNesting = path.length;
  return resource;
}

module.exports = dataSourceTreeItemIdProcessor;

});