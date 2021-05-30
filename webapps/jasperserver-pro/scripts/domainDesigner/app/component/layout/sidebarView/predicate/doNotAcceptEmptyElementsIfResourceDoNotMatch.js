define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (options) {
  var resource = options.resource,
      resourceJson = options.resourceJson,
      isResourceMatch = options.isResourceMatch;

  if (entityUtil.isField(resource)) {
    return isResourceMatch;
  } else {
    return isResourceMatch ? true : _.size(resourceJson.elements) > 0;
  }
};

});