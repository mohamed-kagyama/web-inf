define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var artificialTreeResourceEntityUtil = require("../../../../layout/sidebarView/util/artificialTreeResourceEntityUtil");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isSatisfiedBy: function isSatisfiedBy(item) {
    var resource = item.resource,
        type = resource.type;
    return entityUtil.isCalcField(type) || entityUtil.isTableReference(type) || entityUtil.isJoinAlias(type) || artificialTreeResourceEntityUtil.isConstantGroup(resource) || entityUtil.isJoinTree(type);
  }
};

});