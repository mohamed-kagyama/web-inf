define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (element, options) {
  var type = element.type;

  if (entityUtil.isField(type) || entityUtil.isTableGroup(type)) {
    if (options.tableReference) {
      element.parentTableReferenceId = options.tableReference.getId();
      element.parentTableReferenceName = options.tableReference.getName();
    }
  }

  return element;
};

});