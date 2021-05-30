define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var resourceTypeEnum = require("../../../../../model/enum/resourceTypeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (resource) {
  var elements = resource[resourceTypeEnum.resources.groups.GROUP].elements || [];
  return elements.length > 0;
};

});