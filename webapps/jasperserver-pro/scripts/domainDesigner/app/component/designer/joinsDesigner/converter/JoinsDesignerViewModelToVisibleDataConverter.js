define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var virtualDataUtil = require("../../../../common/util/virtualDataUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerViewModelToVisibleDataConverter = function JoinsDesignerViewModelToVisibleDataConverter() {};

_.extend(JoinsDesignerViewModelToVisibleDataConverter.prototype, {
  convert: function convert(options) {
    var store = options.store,
        scrollPos = _.isNumber(options.scrollPos) ? options.scrollPos : store.get('scrollPos'),
        canvasHeight = options.canvasHeight ? options.canvasHeight : store.get('canvasHeight'),
        collection = options.collection;
    var visibleDataOptions = virtualDataUtil.getVisibleDataOptions({
      collection: collection,
      scrollPos: scrollPos,
      canvasHeight: canvasHeight
    });
    return {
      top: visibleDataOptions.top,
      models: this._getModels({
        collection: collection,
        visibleDataOptions: visibleDataOptions
      }),
      height: visibleDataOptions.height,
      scrollPos: scrollPos,
      canvasHeight: canvasHeight
    };
  },
  _getModels: function _getModels(options) {
    var collection = options.collection,
        visibleDataOptions = options.visibleDataOptions;
    return collection.slice(visibleDataOptions.startPosition, visibleDataOptions.endPosition);
  }
});

module.exports = JoinsDesignerViewModelToVisibleDataConverter;

});