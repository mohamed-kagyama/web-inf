define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var fieldTypesToGenericTypesEnum = require("../../../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IsResourcesHaveTheSameTypeSpecification = function IsResourcesHaveTheSameTypeSpecification(options) {
  this.initialize(options);
};

_.extend(IsResourcesHaveTheSameTypeSpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    var filter = options.filter,
        dataType = filter.dataType,
        sidebarCurrentResource = options.sidebarCurrentResource;
    var field = this.clientDomainSchemaService.getFieldById(sidebarCurrentResource.resourceId),
        fieldType = fieldTypesToGenericTypesEnum[field.type];
    return fieldType === dataType;
  }
});

module.exports = IsResourcesHaveTheSameTypeSpecification;

});