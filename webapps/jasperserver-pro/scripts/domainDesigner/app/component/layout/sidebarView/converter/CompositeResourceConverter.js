define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CompositeResourceConverter = function CompositeResourceConverter(converters) {
  _.bindAll(this, 'convert');

  this.converters = converters ? _.isArray(converters) ? converters : [converters] : [];
};

_.extend(CompositeResourceConverter.prototype, {
  convert: function convert(resource, options) {
    return _.reduce(this.converters, function (resource, converter) {
      return converter(resource, options);
    }, resource);
  }
});

module.exports = CompositeResourceConverter;

});