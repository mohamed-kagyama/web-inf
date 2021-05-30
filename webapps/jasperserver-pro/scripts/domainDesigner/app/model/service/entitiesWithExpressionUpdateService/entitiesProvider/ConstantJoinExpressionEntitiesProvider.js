define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ConstantJoinExpressionEntitiesProvider = function ConstantJoinExpressionEntitiesProvider() {};

_.extend(ConstantJoinExpressionEntitiesProvider.prototype, {
  getEntities: function getEntities(collections) {
    return collections.joinExpressions.filter(entityUtil.isConstantJoinExpression);
  }
});

module.exports = ConstantJoinExpressionEntitiesProvider;

});