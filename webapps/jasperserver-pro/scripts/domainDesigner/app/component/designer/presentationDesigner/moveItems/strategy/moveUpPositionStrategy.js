define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getPosition(amountOfEntities, positionsOfSelectedItems) {
  for (var i = 0; i < positionsOfSelectedItems.length; i++) {
    if (positionsOfSelectedItems[i] > i) {
      positionsOfSelectedItems[i]--;
    }
  }

  return positionsOfSelectedItems;
}

module.exports = {
  getPosition: getPosition
};

});