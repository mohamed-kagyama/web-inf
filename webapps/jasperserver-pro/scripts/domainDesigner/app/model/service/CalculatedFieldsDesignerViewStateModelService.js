define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var canvasViewDesignersEnum = require("../enum/canvasViewDesignersEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CALCULATED_FIELDS_DESIGNER = canvasViewDesignersEnum.CALCULATED_FIELDS_DESIGNER;

var CalculatedFieldsDesignerViewStateModelService = function CalculatedFieldsDesignerViewStateModelService(options) {
  this.initialize(options);
};

_.extend(CalculatedFieldsDesignerViewStateModelService.prototype, {
  initialize: function initialize(options) {
    this.viewStateModel = options.viewStateModel;
  },
  isDesignerVisible: function isDesignerVisible() {
    return this.viewStateModel.getDesignerSpecificRuntimeProperty(CALCULATED_FIELDS_DESIGNER, 'visible');
  },
  getContext: function getContext() {
    var context = this.viewStateModel.getDesignerSpecificRuntimeProperty(CALCULATED_FIELDS_DESIGNER, 'context');
    return _.cloneDeep(context);
  }
});

module.exports = CalculatedFieldsDesignerViewStateModelService;

});