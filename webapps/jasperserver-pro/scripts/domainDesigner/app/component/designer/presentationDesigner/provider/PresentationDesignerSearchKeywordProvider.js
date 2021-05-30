define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSearchKeywordProvider = function PresentationDesignerSearchKeywordProvider(options) {
  this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
};

PresentationDesignerSearchKeywordProvider.prototype.get = function () {
  return this.presentationDesignerViewStateModelService.getPresentationDesignerCanvasSearchKeyword();
};

module.exports = PresentationDesignerSearchKeywordProvider;

});