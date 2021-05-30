define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var GenericMapBasedConverter = function GenericMapBasedConverter(options) {
  _.bindAll(this, 'convert');

  this.converterMap = options.converterMap;
};

_.extend(GenericMapBasedConverter.prototype, {
  convert: function convert(resource, options) {
    var type = entityUtil.getEntityName(resource) || resource.type;
    return this.converterMap[type](resource, options);
  }
});

module.exports = GenericMapBasedConverter;

});