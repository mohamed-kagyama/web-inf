define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CalcFieldContextFactory = function CalcFieldContextFactory(options) {
  this.initialize(options);
};

_.extend(CalcFieldContextFactory.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
  },
  create: function create(item) {
    var type = item.type;
    var context = {};

    if (entityUtil.isJoinTree(type)) {
      context.sourceId = item.resourceId;
      context.sourceType = schemaEntitiesEnum.JOIN_TREE;
    } else if (entityUtil.isJoinAlias(type)) {
      context.sourceId = item.tableReferenceId;
      context.sourceType = schemaEntitiesEnum.TABLE_REFERENCE;
    } else if (entityUtil.isTableReference(type)) {
      context.sourceId = item.resourceId;
      context.sourceType = schemaEntitiesEnum.TABLE_REFERENCE;
    } else if (entityUtil.isCalcField(type)) {
      context = {
        sourceId: item.calcFieldSourceId,
        sourceType: item.calcFieldSourceType,
        calcFieldId: item.resourceId
      };
    } else {
      context = {
        sourceName: this.clientDomainSchemaCalcFieldsService.getDefaultConstantGroupName(),
        sourceType: schemaEntitiesEnum.CONSTANT_GROUP
      };
    }

    return context;
  }
});

module.exports = CalcFieldContextFactory;

});