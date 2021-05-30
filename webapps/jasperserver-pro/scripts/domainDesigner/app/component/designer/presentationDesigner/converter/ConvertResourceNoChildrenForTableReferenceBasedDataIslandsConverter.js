define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ConvertResourceNoChildrenForTableReferenceBasedDataIslandsConverter = function ConvertResourceNoChildrenForTableReferenceBasedDataIslandsConverter(options) {
  this.initialize(options);
};

_.extend(ConvertResourceNoChildrenForTableReferenceBasedDataIslandsConverter.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'convert');

    this.resourceConverter = options.resourceConverter;
  },
  convert: function convert(resource, options) {
    if (entityUtil.isDataSource(resource)) {
      return options.properties.elements;
    } else {
      return this.resourceConverter.convert(resource, options);
    }
  }
});

module.exports = ConvertResourceNoChildrenForTableReferenceBasedDataIslandsConverter;

});