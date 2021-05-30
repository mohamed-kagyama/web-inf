define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationItemUniqueNameConverter = function PresentationItemUniqueNameConverter(options) {
  this.initialize(options);
};

_.extend(PresentationItemUniqueNameConverter.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'convert');

    this.presentationItemDTOProcessor = options.presentationItemDTOProcessor;
    this.presentationItemDTONameGenerator = options.presentationItemDTONameGenerator;
  },
  convert: function convert(presentationItem) {
    this.presentationItemDTONameGenerator.resetNameSequenceNumber();
    var name = this.presentationItemDTONameGenerator.generate(presentationItem.name);
    return this.presentationItemDTOProcessor(presentationItem, name);
  }
});

module.exports = PresentationItemUniqueNameConverter;

});