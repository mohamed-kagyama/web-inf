define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var fieldTypesToGenericTypesEnum = require("../../../model/schema/enum/fieldTypesToGenericTypesEnum");

var allCollectionsMixin = require("../../../model/schema/mixin/allCollectionsMixin");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientDomainSchemaFiltersService = function ClientDomainSchemaFiltersService(options) {
  this.initialize(options);
};

_.extend(ClientDomainSchemaFiltersService.prototype, {
  initialize: function initialize(options) {
    this.dataStore = options.dataStore;
    this.mixInAllCollections(this.dataStore);
  },
  getFilterById: function getFilterById(id) {
    var filter = this.filters.byId(id);

    if (!filter) {
      return;
    }

    var fieldReferences = filter.fieldReferences.map(function (fieldReference) {
      return _.extend(fieldReference.toJSON(), {
        id: fieldReference.getId()
      });
    });
    return _.extend({}, filter.toJSON(), {
      fieldReferences: fieldReferences,
      sourceId: filter.getSourceId(),
      sourceType: filter.getSourceType()
    });
  },
  getFilterDataType: function getFilterDataType(id) {
    var filter = this.filters.byId(id);
    var leftOperand = filter.getExpression().left,
        fieldReferenceId = leftOperand.fieldReferenceId;
    var fieldReference = filter.getFieldReferences().find(function (fieldReference) {
      return fieldReference.getId() === fieldReferenceId;
    });
    var field = this.fields.byId(fieldReference.getFieldId());
    return fieldTypesToGenericTypesEnum[field.getType()];
  }
});

_.extend(ClientDomainSchemaFiltersService.prototype, allCollectionsMixin);

module.exports = ClientDomainSchemaFiltersService;

});