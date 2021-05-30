define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TreeItemIsDerivedTableProcessor = function TreeItemIsDerivedTableProcessor(options) {
  this.initialize(options);
};

_.extend(TreeItemIsDerivedTableProcessor.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'process');

    this.domainSchemaService = options.domainSchemaService;
  },
  process: function process(element, options) {
    var mayReferenceDerivedTable;
    mayReferenceDerivedTable = entityUtil.isDerivedTable(element.type) || entityUtil.isTableReference(element.type) || entityUtil.isJoinAlias(element.type);
    var isDerivedTable = mayReferenceDerivedTable && entityUtil.isDerivedTable(options.table);

    if (isDerivedTable) {
      element.isDerivedTable = true;
      element.derivedTableId = options.table.id;
      element.derivedTableParentId = options.table.parentId;
    }

    return element;
  }
});

module.exports = TreeItemIsDerivedTableProcessor;

});