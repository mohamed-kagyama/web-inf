define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter = function PresentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter(options) {
  this.initialize(options);
};

_.extend(PresentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.resourceIdentifierGenerator = options.resourceIdentifierGenerator;
    this.domainSchemaSpecification = options.domainSchemaSpecification;
  },
  convert: function convert(presentationItemsGroupedByEntity) {
    return _.map(presentationItemsGroupedByEntity, function (element) {
      this.resourceIdentifierGenerator.reset();
      return {
        name: this._getDataIslandName(element),
        sourceId: element.sourceId,
        sourceType: element.sourceType,
        children: element.presentationItems
      };
    }, this);
  },
  _getDataIslandName: function _getDataIslandName(element) {
    var self = this;
    var entity = this.clientDomainSchemaService.getEntityByIdAndType(element.sourceId, element.sourceType);
    return this.resourceIdentifierGenerator.generate(entity.name, function (name) {
      return !self.domainSchemaSpecification.canUseDataIslandName(name);
    });
  }
});

module.exports = PresentationItemsGroupedByEntityToDataIslandsWithPresentationItemsConverter;

});