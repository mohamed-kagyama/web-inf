define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../../model/enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var designerName = canvasViewDesignersEnum.FILTERS_DESIGNER;

function getSearchKeyword(state) {
  var searchKeywordProperty = state.viewState.getSearchKeyword(designerName);
  return searchKeywordProperty.canvas;
}

module.exports = {
  getSearchKeyword: getSearchKeyword
};

});