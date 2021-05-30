define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (array, predicate) {
  var result = -1;

  if (array && array.length > 0) {
    var length = array.length,
        startIndex = 0,
        endIndex = length - 1;

    while (startIndex <= endIndex) {
      var currentElementIndex = Math.floor((endIndex + startIndex) / 2),
          value = array[currentElementIndex];
      var predicateResult = predicate(value);

      if (predicateResult === 0) {
        result = currentElementIndex;
        break;
      } else if (predicateResult > 0) {
        startIndex = currentElementIndex + 1;
      } else if (predicateResult < 0) {
        endIndex = currentElementIndex - 1;
      }
    }
  }

  return result;
};

});