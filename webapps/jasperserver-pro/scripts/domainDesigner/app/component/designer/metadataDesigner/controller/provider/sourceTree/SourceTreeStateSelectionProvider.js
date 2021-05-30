define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../../../../../../model/enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var SourceTreeStateSelectionProvider = function SourceTreeStateSelectionProvider(options) {
  this.initialize(options);
};

_.extend(SourceTreeStateSelectionProvider.prototype, {
  initialize: function initialize(options) {
    this.model = options.model;
  },
  get: function get(state) {
    var currentMetadataResourceId = this.model.get('currentMetadataResourceId'),
        selection = state.viewState.getDesignerSpecificProperty(canvasViewDesignersEnum.METADATA_DESIGNER, 'selection');
    return selection.sourceTree[currentMetadataResourceId] || [];
  }
});

module.exports = SourceTreeStateSelectionProvider;

});