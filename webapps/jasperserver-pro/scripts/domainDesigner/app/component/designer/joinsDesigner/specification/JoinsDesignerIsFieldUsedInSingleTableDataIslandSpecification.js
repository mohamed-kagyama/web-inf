define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification = function JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification(options) {
  this.initialize(options);
};

_.extend(JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  isSatisfiedBy: function isSatisfiedBy(item) {
    var dataIslands = this.clientDomainSchemaService.getDataIslands();
    var tableReferenceId = item.resource.parentTableReferenceId;
    var isJoinAliasExists = this.clientDomainSchemaService.getJoinAliasIdByTableReferenceId(tableReferenceId);
    return !isJoinAliasExists && _.some(dataIslands, function (dataIsland) {
      return dataIsland.sourceId === tableReferenceId;
    });
  }
});

module.exports = JoinsDesignerIsFieldUsedInSingleTableDataIslandSpecification;

});