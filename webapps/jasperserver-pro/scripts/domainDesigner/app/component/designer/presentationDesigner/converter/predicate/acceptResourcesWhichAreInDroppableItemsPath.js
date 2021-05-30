define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (options) {
  var path = options.path,
      pathLength = path.length,
      resourceId = options.resource.id,
      nestingLevel = options.nestingLevel,
      resourcesIds = options.resourceIdsInItemsPaths;
  var isRootLevel = nestingLevel === 1,
      isResourceInPath = nestingLevel >= pathLength,
      isChildResource = pathLength > nestingLevel;

  if (isRootLevel) {
    return true;
  } else if (isResourceInPath) {
    return resourcesIds[resourceId];
  } else if (isChildResource) {
    return true;
  }
};

});