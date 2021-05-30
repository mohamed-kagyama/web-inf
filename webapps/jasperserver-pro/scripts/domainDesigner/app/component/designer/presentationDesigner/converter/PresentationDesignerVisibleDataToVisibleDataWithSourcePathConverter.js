define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerVisibleDataToVisibleDataWithSourcePathConverter = function PresentationDesignerVisibleDataToVisibleDataWithSourcePathConverter(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerVisibleDataToVisibleDataWithSourcePathConverter.prototype, {
  initialize: function initialize(options) {
    this.presentationDesignerItemReferencePathProvider = options.presentationDesignerItemReferencePathProvider;
  },
  convert: function convert(visibleData, dataStore) {
    return _.extend({}, visibleData, {
      models: this._getModelsWithSourcePath(visibleData, dataStore)
    });
  },
  _getModelsWithSourcePath: function _getModelsWithSourcePath(visibleData, dataStore) {
    var models = visibleData.models;
    return _.reduce(models, function (memo, model) {
      var sourcePath;

      if (entityUtil.isPresentationField(model.modelType)) {
        sourcePath = this.presentationDesignerItemReferencePathProvider.getPresentationFieldReferencePath({
          dataIslandId: model.dataIslandId,
          fieldId: model.fieldId,
          fieldType: model.fieldType,
          sourceId: model.sourceId,
          sourceType: model.sourceType
        }, dataStore);
        model = _.extend({}, model, {
          sourcePath: sourcePath
        });
      }

      memo.push(model);
      return memo;
    }, [], this);
  }
});

module.exports = PresentationDesignerVisibleDataToVisibleDataWithSourcePathConverter;

});