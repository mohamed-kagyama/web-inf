define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var profileAttributeUtil = require("../../../model/util/profileAttributeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ProfileAttributeBasedSchemaSpecification = function ProfileAttributeBasedSchemaSpecification(options) {
  this.initialize(options);
};

_.extend(ProfileAttributeBasedSchemaSpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  isSatisfiedBy: function isSatisfiedBy(name) {
    var dataSourceGroup = this.clientDomainSchemaService.getDataSourceGroupByName(name);
    return dataSourceGroup && dataSourceGroup.sourceName && profileAttributeUtil.containsProfileAttribute(dataSourceGroup.sourceName);
  }
});

module.exports = ProfileAttributeBasedSchemaSpecification;

});