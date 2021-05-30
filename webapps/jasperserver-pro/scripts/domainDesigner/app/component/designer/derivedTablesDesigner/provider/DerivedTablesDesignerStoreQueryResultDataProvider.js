define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DerivedTablesDesignerStoreQueryResultDataProvider = function DerivedTablesDesignerStoreQueryResultDataProvider(options) {
  this.derivedTablesDesignerQueryResultConverter = options.derivedTablesDesignerQueryResultConverter;
  this.derivedTablesDesignerStore = options.derivedTablesDesignerStore;
};

_.extend(DerivedTablesDesignerStoreQueryResultDataProvider.prototype, {
  getQueryResultStoreData: function getQueryResultStoreData(options) {
    var fields = options.fields,
        selectedFields = options.selectedFields,
        queryResultSetHeight = options.queryResultSetHeight;

    var fieldsIndices = _.reduce(fields, function (memo, field, index) {
      memo[field.name] = index;
      return memo;
    }, {}),
        firstField = _.first(selectedFields) || {};

    var queryResultStoreData = this.derivedTablesDesignerQueryResultConverter.convert({
      fields: fields,
      scrollPos: this.derivedTablesDesignerStore.get('scrollPos'),
      queryResultSetHeight: queryResultSetHeight || this.derivedTablesDesignerStore.get('queryResultSetHeight')
    });
    var selection = {
      rangeStart: _.isNumber(fieldsIndices[firstField.name]) ? fieldsIndices[firstField.name] : null,
      fields: selectedFields.reduce(function (memo, field) {
        memo[field.name] = fieldsIndices[field.name];
        return memo;
      }, {})
    };
    return _.extend({}, queryResultStoreData, {
      fields: fields,
      selection: selection
    });
  }
});

module.exports = DerivedTablesDesignerStoreQueryResultDataProvider;

});