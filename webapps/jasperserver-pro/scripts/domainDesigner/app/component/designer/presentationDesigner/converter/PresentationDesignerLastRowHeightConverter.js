define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerLastRowHeightConverter = function PresentationDesignerLastRowHeightConverter() {};

_.extend(PresentationDesignerLastRowHeightConverter.prototype, {
  convert: function convert(options) {
    var height = options.height,
        canvasHeight = options.canvasHeight,
        models = options.models,
        modelsWithoutLastModel;

    var lastModel = _.last(models);

    if (lastModel && lastModel.isLastRow) {
      modelsWithoutLastModel = models.slice(0, models.length - 1);
      var isCanvasHeightGreaterThanModelsHeight = canvasHeight > height;

      if (isCanvasHeightGreaterThanModelsHeight) {
        height = height + lastModel.padding - lastModel.height;
        lastModel = _.extend({}, lastModel, {
          height: canvasHeight - height
        });
        models = modelsWithoutLastModel.concat(lastModel);
      }
    }

    return _.extend({}, options, {
      models: models
    });
  }
});

module.exports = PresentationDesignerLastRowHeightConverter;

});