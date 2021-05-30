define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleCache = require("../../../util/cache/SimpleCache");

var profileAttributeUtil = require("../../../model/util/profileAttributeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ProfileAttributesCache = function ProfileAttributesCache(options) {
  SimpleCache.call(this, arguments);
};

_.extend(ProfileAttributesCache.prototype, SimpleCache.prototype, {
  get: function get(key) {
    var attribute = profileAttributeUtil.extractProfileAttributeArgs(key),
        attributeName = attribute[0],
        attributeLevel = attribute[1],
        args = [attributeName];

    if (attributeLevel) {
      attributeLevel = attributeLevel.toLowerCase();
      args.push(attributeLevel);
    }

    key = profileAttributeUtil.createProfileAttributeFunctionWithArgs(args);
    return this.cache[key];
  }
});

module.exports = ProfileAttributesCache;

});