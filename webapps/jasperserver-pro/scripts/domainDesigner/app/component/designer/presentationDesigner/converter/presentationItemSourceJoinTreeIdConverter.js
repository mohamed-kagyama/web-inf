define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  convert: function convert(presentationItem, options) {
    var joinTree = options.joinTree,
        joinTreeId = joinTree.getId();
    var path = options.path,
        pathLength = path.length,
        nestingLevel = options.nestingLevel;
    var firstChild = pathLength === nestingLevel + 1,
        isRootLevel = nestingLevel === 1,
        isSameLevelResource = pathLength === nestingLevel;

    if (isSameLevelResource || isRootLevel && firstChild) {
      presentationItem.sourceJoinTreeId = joinTreeId;
    }

    return presentationItem;
  }
};

});