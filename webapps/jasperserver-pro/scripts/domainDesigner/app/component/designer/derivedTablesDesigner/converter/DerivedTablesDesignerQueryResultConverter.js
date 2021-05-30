define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var virtualDataUtil = require("../../../../common/util/virtualDataUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DerivedTablesDesignerQueryResultConverter = function DerivedTablesDesignerQueryResultConverter(options) {
  this.initialize(options);
};

_.extend(DerivedTablesDesignerQueryResultConverter.prototype, {
  initialize: function initialize(options) {
    this.fieldHeight = options.fieldHeight;
  },
  convert: function convert(options) {
    var scrollPos = options.scrollPos,
        queryResultSetHeight = options.queryResultSetHeight,
        collection = options.fields || [];
    collection = collection.map(function (field, index) {
      return _.extend({}, field, {
        index: index,
        height: this.fieldHeight
      });
    }, this);
    var visibleDataOptions = virtualDataUtil.getVisibleDataOptions({
      collection: collection,
      scrollPos: scrollPos,
      canvasHeight: queryResultSetHeight
    });
    return {
      visibleFields: this._getVisibleData({
        fields: collection,
        visibleDataOptions: visibleDataOptions
      }),
      top: visibleDataOptions.top,
      height: visibleDataOptions.height,
      scrollPos: scrollPos,
      queryResultSetHeight: queryResultSetHeight
    };
  },
  _getVisibleData: function _getVisibleData(options) {
    var fields = options.fields,
        visibleDataOptions = options.visibleDataOptions;
    return fields.slice(visibleDataOptions.startPosition, visibleDataOptions.endPosition);
  }
});

module.exports = DerivedTablesDesignerQueryResultConverter;

});