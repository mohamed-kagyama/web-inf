define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var artificialTreeResourceEntityUtil = require("../../../../layout/sidebarView/util/artificialTreeResourceEntityUtil");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerSidebarTreeContextMenuVisibilitySpecification = function JoinsDesignerSidebarTreeContextMenuVisibilitySpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerSidebarTreeContextMenuVisibilitySpecification.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'isSatisfiedBy');
  },
  isSatisfiedBy: function isSatisfiedBy(item) {
    var resource = item.resource,
        type = resource.type;
    return entityUtil.isCalcField(type) || entityUtil.isTableReference(type) || entityUtil.isDataSource(type) || entityUtil.isJoinAlias(type) || artificialTreeResourceEntityUtil.isConstantGroup(resource) || entityUtil.isJoinTree(type);
  }
});

module.exports = JoinsDesignerSidebarTreeContextMenuVisibilitySpecification;

});