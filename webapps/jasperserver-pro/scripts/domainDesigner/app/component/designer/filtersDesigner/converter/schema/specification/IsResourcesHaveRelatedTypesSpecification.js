define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var genericTypesEnum = require("../../../../../../../model/schema/enum/genericTypesEnum");

var fieldTypesToGenericTypesEnum = require("../../../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var IsResourcesHaveRelatedTypesSpecification = function IsResourcesHaveRelatedTypesSpecification(options) {
  this.initialize(options);
};

_.extend(IsResourcesHaveRelatedTypesSpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  isSatisfiedBy: function isSatisfiedBy(options) {
    var filter = options.filter,
        dataType = filter.dataType,
        sidebarCurrentResource = options.sidebarCurrentResource;
    var field = this.clientDomainSchemaService.getFieldById(sidebarCurrentResource.resourceId),
        fieldType = fieldTypesToGenericTypesEnum[field.type];
    return this._isDateTimestampRelatedTypes(dataType, fieldType) || this._isIntegerDecimalRelatedTypes(dataType, fieldType);
  },
  _isDateTimestampRelatedTypes: function _isDateTimestampRelatedTypes(dataType, fieldType) {
    return dataType === genericTypesEnum.DATE && fieldType === genericTypesEnum.TIMESTAMP || dataType === genericTypesEnum.TIMESTAMP && fieldType === genericTypesEnum.DATE;
  },
  _isIntegerDecimalRelatedTypes: function _isIntegerDecimalRelatedTypes(dataType, fieldType) {
    return dataType === genericTypesEnum.INTEGER && fieldType === genericTypesEnum.DECIMAL || dataType === genericTypesEnum.DECIMAL && fieldType === genericTypesEnum.INTEGER;
  }
});

module.exports = IsResourcesHaveRelatedTypesSpecification;

});