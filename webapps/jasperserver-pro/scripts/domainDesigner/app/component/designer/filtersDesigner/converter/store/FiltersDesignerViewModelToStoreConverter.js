define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var virtualDataUtil = require("../../../../../common/util/virtualDataUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerViewModelToStoreConverter = function FiltersDesignerViewModelToStoreConverter(options) {
  this.filtersDesignerViewStateModelService = options.filtersDesignerViewStateModelService;
};

_.extend(FiltersDesignerViewModelToStoreConverter.prototype, {
  convert: function convert(options) {
    var draftFilterState = this.filtersDesignerViewStateModelService.getDraftFilterState(),
        store = options.store,
        wasScrolledToBottom = store.get('wasScrolledToBottom') || false,
        scrollPos = _.isNumber(options.scrollPos) ? options.scrollPos : store.get('scrollPos'),
        canvasHeight = options.canvasHeight ? options.canvasHeight : store.get('canvasHeight'),
        collection = options.collection,
        isDraftFilterPresent = Boolean(draftFilterState && !_.isEmpty(draftFilterState));

    if (!isDraftFilterPresent) {
      wasScrolledToBottom = false;
    }

    var shouldScrollToBottom = isDraftFilterPresent && !draftFilterState.id && !wasScrolledToBottom;
    var totalHeight = virtualDataUtil.getTotalHeight(collection);

    if (shouldScrollToBottom) {
      scrollPos = Math.ceil(totalHeight - canvasHeight);
      wasScrolledToBottom = true;
    }

    var visibleDataOptions = virtualDataUtil.getVisibleDataOptions({
      collection: collection,
      totalHeight: totalHeight,
      scrollPos: scrollPos,
      canvasHeight: canvasHeight
    });
    return {
      filters: this._getVisibleFilters({
        filters: collection,
        visibleDataOptions: visibleDataOptions
      }),
      top: visibleDataOptions.top,
      height: visibleDataOptions.height,
      scrollPos: scrollPos,
      canvasHeight: canvasHeight,
      wasScrolledToBottom: wasScrolledToBottom,
      isDraftFilterPresent: isDraftFilterPresent
    };
  },
  _getVisibleFilters: function _getVisibleFilters(options) {
    var filters = options.filters,
        visibleDataOptions = options.visibleDataOptions;
    return filters.slice(visibleDataOptions.startPosition, visibleDataOptions.endPosition);
  }
});

module.exports = FiltersDesignerViewModelToStoreConverter;

});