define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var genericTypeToExpressionLiteralTypeEnum = require("../../../../model/enum/genericTypeToExpressionLiteralTypeEnum");

var fieldTypesToGenericTypesEnum = require("../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var AdhocQueryByFieldNameFactory = function AdhocQueryByFieldNameFactory(options) {
  this.initialize(options);
};

_.extend(AdhocQueryByFieldNameFactory.prototype, {
  initialize: function initialize(options) {
    this.filterExpressionFactoryByLiteralTypeMap = options.filterExpressionFactoryByLiteralTypeMap;
  },
  create: function create(options) {
    var fieldName = options.fieldName,
        fieldType = options.fieldType,
        searchKeyword = options.searchKeyword;
    var filter = {};

    if (searchKeyword) {
      var genericType = fieldTypesToGenericTypesEnum[fieldType],
          expressionLiteralType = genericTypeToExpressionLiteralTypeEnum[genericType],
          filterExpressionFactory = this.filterExpressionFactoryByLiteralTypeMap[expressionLiteralType],
          filterExpression;
      filterExpression = filterExpressionFactory.create({
        criteria: searchKeyword,
        fieldName: fieldName,
        expressionLiteralType: expressionLiteralType
      });
      filter = {
        where: {
          filterExpression: filterExpression
        }
      };
    }

    return _.extend({
      groupBy: [{
        group: {
          field: fieldName
        }
      }]
    }, filter);
  }
});

module.exports = AdhocQueryByFieldNameFactory;

});