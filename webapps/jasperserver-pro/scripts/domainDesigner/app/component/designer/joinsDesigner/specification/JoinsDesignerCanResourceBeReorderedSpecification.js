define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerCanResourceBeReorderedSpecification = function JoinsDesignerCanResourceBeReorderedSpecification(options) {};

_.extend(JoinsDesignerCanResourceBeReorderedSpecification.prototype, {
  isSatisfiedBy: function isSatisfiedBy(options) {
    var resource = options.resource,
        joinTreePlaceholder = options.joinTreePlaceholder;
    var resourceIndex = resource.index,
        resourceNextIndex = resourceIndex + 1,
        joinTreePlaceholderIndex = joinTreePlaceholder.index;

    if (resource.isDraftJoinTree) {
      return joinTreePlaceholderIndex !== resourceIndex;
    } else if (entityUtil.isJoinTree(resource.type)) {
      return joinTreePlaceholderIndex !== resourceIndex && resourceNextIndex !== joinTreePlaceholderIndex;
    } else {
      return false;
    }
  }
});

module.exports = JoinsDesignerCanResourceBeReorderedSpecification;

});