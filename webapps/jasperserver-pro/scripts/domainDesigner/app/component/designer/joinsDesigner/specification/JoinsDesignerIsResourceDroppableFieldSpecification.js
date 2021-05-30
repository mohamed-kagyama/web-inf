define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerIsResourceDroppableFieldSpecification = function JoinsDesignerIsResourceDroppableFieldSpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerIsResourceDroppableFieldSpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
  },
  isSatisfiedBy: function isSatisfiedBy(resource) {
    var resourceId = resource.id,
        resourceType = resource.type;
    return entityUtil.isCalcField(resourceType) ? !this.clientDomainSchemaCalcFieldsService.isConstantCalcField(resourceId) : entityUtil.isField(resourceType);
  }
});

module.exports = JoinsDesignerIsResourceDroppableFieldSpecification;

});