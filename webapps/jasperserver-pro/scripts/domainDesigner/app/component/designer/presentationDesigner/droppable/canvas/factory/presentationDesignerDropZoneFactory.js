define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var index = options.index,
        which = options.which,
        ownerId = options.ownerId,
        parentId = options.parentId,
        accepts = options.accepts;
    return {
      ownerId: ownerId,
      parentId: parentId,
      which: which,
      index: index,
      accepts: accepts,
      isDropZone: true,
      isVisible: false
    };
  }
};

});