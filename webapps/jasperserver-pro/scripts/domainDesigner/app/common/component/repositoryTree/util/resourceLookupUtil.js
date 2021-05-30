define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var repositoryResourceTypes = require("runtime_dependencies/bi-repository/src/bi/repository/enum/repositoryResourceTypes");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isFolder(resourceLookup) {
  return resourceLookup.resourceType === repositoryResourceTypes.FOLDER;
}

function isEmptyFolder(resourceLookup) {
  var links = resourceLookup._links;
  return isFolder(resourceLookup) && !links.content;
}

module.exports = {
  isEmptyFolder: isEmptyFolder,
  isFolder: isFolder
};

});