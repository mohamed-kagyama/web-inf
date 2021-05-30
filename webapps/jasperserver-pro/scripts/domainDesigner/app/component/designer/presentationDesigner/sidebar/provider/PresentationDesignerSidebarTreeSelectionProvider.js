define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSidebarTreeSelectionProvider = function PresentationDesignerSidebarTreeSelectionProvider(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerSidebarTreeSelectionProvider.prototype, {
  initialize: function initialize(options) {
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  },
  get: function get() {
    var items = this.presentationDesignerViewStateModelService.getPresentationSidebarSelectedItems();
    return _.map(items, function (item) {
      return item.id;
    });
  }
});

module.exports = PresentationDesignerSidebarTreeSelectionProvider;

});