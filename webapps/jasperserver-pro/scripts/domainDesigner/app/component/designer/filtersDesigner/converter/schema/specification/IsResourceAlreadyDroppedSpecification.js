define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IsResourceAlreadyDroppedSpecification = function IsResourceAlreadyDroppedSpecification(options) {
  this.initialize(options);
};

_.extend(IsResourceAlreadyDroppedSpecification.prototype, {
  initialize: function initialize(options) {},
  isSatisfiedBy: function isSatisfiedBy(options) {
    var filter = options.filter,
        sidebarCurrentResource = options.sidebarCurrentResource,
        left = filter.expression.left,
        right = filter.expression.right,
        leftFieldId = left.fieldId,
        leftFieldSourceId = left.sourceId,
        rightFieldId = right.fieldId,
        rightFieldSourceId = right.sourceId,
        resourceId = sidebarCurrentResource.resourceId,
        resourceSourceId = sidebarCurrentResource.sourceId;
    var isFieldIdTheSame = resourceId === leftFieldId || resourceId === rightFieldId,
        isSourceIdTheSame = resourceSourceId === leftFieldSourceId || resourceSourceId === rightFieldSourceId;
    return isFieldIdTheSame && isSourceIdTheSame;
  }
});

module.exports = IsResourceAlreadyDroppedSpecification;

});