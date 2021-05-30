define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSidebarTreeContextMenuVisibilitySpecification = function PresentationDesignerSidebarTreeContextMenuVisibilitySpecification(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSidebarTreeContextMenuVisibilitySpecification.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'isSatisfiedBy');

    this.nestedTreeModel = options.nestedTreeModel;
  },
  isSatisfiedBy: function isSatisfiedBy(item) {
    item = this.nestedTreeModel.getNode(item.id);
    var type = item.type,
        sourceType = item.resource.sourceType;
    var isConstantGroup = entityUtil.isConstantGroup(type),
        isCalcFieldUnderConstantGroup = entityUtil.isCalcField(type) && entityUtil.isConstantGroup(sourceType);
    return isConstantGroup || isCalcFieldUnderConstantGroup;
  }
});

module.exports = PresentationDesignerSidebarTreeContextMenuVisibilitySpecification;

});