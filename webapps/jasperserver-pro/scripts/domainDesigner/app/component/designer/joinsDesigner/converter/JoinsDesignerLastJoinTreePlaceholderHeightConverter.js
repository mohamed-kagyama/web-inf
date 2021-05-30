define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JoinsDesignerLastJoinTreePlaceholderHeightConverter = function JoinsDesignerLastJoinTreePlaceholderHeightConverter() {};

_.extend(JoinsDesignerLastJoinTreePlaceholderHeightConverter.prototype, {
  convert: function convert(options) {
    var models = options.models.slice(0, options.models.length - 1),
        modelsHeight = this._getModelsHeight(models);

    var lastModel = _.last(options.models),
        isLastModelLastJoinTreePlaceholder = lastModel && lastModel.isLastJoinTreePlaceholder,
        isCanvasHeightGreaterThanModelsHeight = options.canvasHeight > modelsHeight;

    if (isLastModelLastJoinTreePlaceholder && isCanvasHeightGreaterThanModelsHeight) {
      lastModel = _.extend({}, lastModel, {
        height: options.canvasHeight - modelsHeight
      });
      options = _.extend({}, options, {
        models: models.concat(lastModel)
      });
    }

    return options;
  },
  _getModelsHeight: function _getModelsHeight(models) {
    return _.reduce(models, function (memo, model) {
      return memo + model.height;
    }, 0);
  }
});

module.exports = JoinsDesignerLastJoinTreePlaceholderHeightConverter;

});