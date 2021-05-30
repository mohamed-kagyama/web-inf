define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UseAttributeIdGenerationStrategy = function UseAttributeIdGenerationStrategy() {};

_.extend(UseAttributeIdGenerationStrategy.prototype, {
  getId: function getId(node, idAttribute, parentPath) {
    var id = node[idAttribute];

    if (_.isUndefined(id)) {
      throw new Error('[' + idAttribute + '] property of the node should be defined');
    }

    return id;
  }
});

module.exports = UseAttributeIdGenerationStrategy;

});