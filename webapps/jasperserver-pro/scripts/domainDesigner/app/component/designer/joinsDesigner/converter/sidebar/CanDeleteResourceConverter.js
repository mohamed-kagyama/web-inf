define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CanDeleteResourceConverter = function CanDeleteResourceConverter(options) {
  this.initialize(options);
};

_.extend(CanDeleteResourceConverter.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'process');

    this.domainSchemaSpecification = options.domainSchemaSpecification;
  },
  process: function process(element, options) {
    var tableReferenceId;

    if (entityUtil.isTableReference(element.type)) {
      tableReferenceId = element.resourceId;
    } else if (entityUtil.isJoinAlias(element.type)) {
      tableReferenceId = options.tableReference.getId();
    }

    if (tableReferenceId) {
      element.canDeleteTableReference = this.domainSchemaSpecification.canRemoveTableReference(tableReferenceId);
    }

    return element;
  }
});

module.exports = CanDeleteResourceConverter;

});