define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (resource, options) {
  if (entityUtil.isJoinTree(resource.type)) {
    resource.dataIslandSourceId = resource.resourceId;
  } else {
    resource.dataIslandSourceId = options.joinTree.id;
  }

  return resource;
};

});