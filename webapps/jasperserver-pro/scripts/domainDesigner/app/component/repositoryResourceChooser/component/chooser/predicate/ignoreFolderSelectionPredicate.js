define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (selection, nodes) {
  return _.some(nodes, function (node) {
    if (selection[node.id]) {
      return node.properties.resourceType === repositoryResourceTypes.FOLDER;
    }
  });
};

});