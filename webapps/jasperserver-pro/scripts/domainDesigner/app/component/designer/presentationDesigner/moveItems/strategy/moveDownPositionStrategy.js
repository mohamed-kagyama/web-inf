define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getPosition(amountOfEntities, positionsOfSelectedItems) {
  for (var i = positionsOfSelectedItems.length - 1; i >= 0; i--) {
    if (positionsOfSelectedItems[i] < amountOfEntities - 1) {
      // because of the nature of how Array.prototype.splice works, we need to
      // increase it not by 1 but by 2
      positionsOfSelectedItems[i] += 2;
    }
  }

  return positionsOfSelectedItems;
}

module.exports = {
  getPosition: getPosition
};

});