define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationItemDTONameGenerator = function PresentationItemDTONameGenerator(options) {
  this.initialize(options);
};

_.extend(PresentationItemDTONameGenerator.prototype, {
  initialize: function initialize(options) {
    options = options || {};

    _.bindAll(this, '_exists');

    this.cache = {
      newItems: {}
    };
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.domainSchemaSpecification = options.domainSchemaSpecification;
    this.resourceIdentifierGenerator = options.resourceIdentifierGenerator;
  },
  generate: function generate(originalName) {
    if (!this.cache.addedItems) {
      this.cache.addedItems = this.clientDomainSchemaService.getPresentationSetsAndFieldsGroupedByProperty('name');
    }

    var name = this.resourceIdentifierGenerator.generate(originalName, this._exists);
    this.cache.newItems[name] = true;
    return name;
  },
  _exists: function _exists(name) {
    return !this.domainSchemaSpecification.canUsePresentationItemName({
      name: name,
      existingPresentationItemsByNameMap: this.cache.addedItems
    }) || this.cache.newItems[name];
  },
  reset: function reset() {
    this.resourceIdentifierGenerator && this.resourceIdentifierGenerator.reset();
    this.cache = {
      newItems: {}
    };
  },
  resetNameSequenceNumber: function resetNameSequenceNumber() {
    this.resourceIdentifierGenerator && this.resourceIdentifierGenerator.reset();
  }
});

module.exports = PresentationItemDTONameGenerator;

});