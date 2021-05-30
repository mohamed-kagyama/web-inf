define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isSatisfiedBy: function isSatisfiedBy(item) {
    var resourceType = item.resource.type;
    return entityUtil.isDataSource(resourceType) || entityUtil.isDerivedTable(resourceType) || entityUtil.isConstantGroup(resourceType) || entityUtil.isCalcField(resourceType);
  }
};

});