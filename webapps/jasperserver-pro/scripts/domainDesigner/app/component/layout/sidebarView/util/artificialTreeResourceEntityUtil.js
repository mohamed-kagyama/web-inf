define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var artificialTreeResourceTypesEnum = require("../enum/artificialTreeResourceTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isDerivedTableGroup(resource) {
  return resource.type === artificialTreeResourceTypesEnum.DERIVED_TABLE_GROUP;
}

function isConstantGroup(resource) {
  return resource.type === artificialTreeResourceTypesEnum.CONSTANT_GROUP;
}

module.exports = {
  isDerivedTableGroup: isDerivedTableGroup,
  isConstantGroup: isConstantGroup
};

});