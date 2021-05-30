define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SchemaIsIntegralAndCompleteSpecification = function SchemaIsIntegralAndCompleteSpecification(options) {
  this.initialize(options);
};

_.extend(SchemaIsIntegralAndCompleteSpecification.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'isSatisfied');

    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  isSatisfied: function isSatisfied() {
    var isFieldsPresent = Boolean(this.clientDomainSchemaService.getFieldsSize()),
        isJoinTreesPresent = Boolean(this.clientDomainSchemaService.getJoinTreesSize()),
        isAllJoinTreesConsistOfASingleComponent = this.clientDomainSchemaService.isJoinTreesConsistOfASingleComponent();
    return isFieldsPresent && (!isJoinTreesPresent || isAllJoinTreesConsistOfASingleComponent);
  }
});

module.exports = SchemaIsIntegralAndCompleteSpecification;

});