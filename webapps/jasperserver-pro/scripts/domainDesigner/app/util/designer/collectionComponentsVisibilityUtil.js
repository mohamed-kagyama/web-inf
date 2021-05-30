define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function matchSearchKeyword(string, searchKeyword) {
  if (!searchKeyword) {
    return true;
  }

  if (_.isArray(string)) {
    return Boolean(_.find(string, function (string) {
      return matchSearchKeyword(string, searchKeyword);
    }));
  } else {
    return string.toLowerCase().indexOf(searchKeyword.toLowerCase()) >= 0;
  }
}

function isOneOfTheNodesVisible(nodes) {
  return Boolean(_.find(nodes, function (node) {
    return node.isVisible;
  }));
}

module.exports = {
  matchSearchKeyword: matchSearchKeyword,
  isOneOfTheNodesVisible: isOneOfTheNodesVisible
};

});