define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (options) {
  var path = options.path,
      pathLength = path.length,
      nestingLevel = options.nestingLevel;
  var isRootLevel = nestingLevel === 1,
      isParentResource = pathLength < nestingLevel,
      isChildResource = pathLength > nestingLevel,
      isSameLevelResource = pathLength === nestingLevel;

  if (isParentResource) {
    return false;
  }

  if (isRootLevel && isSameLevelResource) {
    return false;
  }

  return isRootLevel || isChildResource || isSameLevelResource;
};

});