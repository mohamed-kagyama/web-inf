define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var joinsEnum = require("../../../../model/enum/joinsEnum");

var joinWeightsEnum = require("../enum/joinWeightsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {
      join: {},
      joinConstructor: {}
    };
    return {
      name: options.name || '',
      index: options.index || 0,
      isExpanded: _.isUndefined(options.isExpanded) ? true : options.isExpanded,
      includeAllDataIslandJoins: options.includeAllDataIslandJoins || false,
      suppressCircularJoins: options.suppressCircularJoins || false,
      join: {
        leftSide: options.join.leftSide || '',
        isExpanded: _.isUndefined(options.join.isExpanded) ? true : options.join.isExpanded,
        type: options.join.type || joinsEnum.joinTypes.inner.name,
        weight: options.join.weight || joinWeightsEnum.defaultOption.value
      },
      joinConstructor: options.joinConstructor
    };
  }
};

});