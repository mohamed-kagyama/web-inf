define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AutoIdGenerationStrategyBasedOnEntityId = function AutoIdGenerationStrategyBasedOnEntityId() {};

_.extend(AutoIdGenerationStrategyBasedOnEntityId.prototype, {
  getId: function getId(node) {
    return String(node.resourceId);
  }
});

module.exports = AutoIdGenerationStrategyBasedOnEntityId;

});