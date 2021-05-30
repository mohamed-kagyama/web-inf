define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerVisibleDataToVisibleDataWithDropZonesConverter = function PresentationDesignerVisibleDataToVisibleDataWithDropZonesConverter(options) {
  this.initialize(options);
};

_.extend(PresentationDesignerVisibleDataToVisibleDataWithDropZonesConverter.prototype, {
  initialize: function initialize(options) {
    this.presentationDesignerDropZoneFactory = options.presentationDesignerDropZoneFactory;
  },
  convert: function convert(options) {
    var models = options.models;
    return _.extend({}, options, {
      models: this._insertDropZones(models)
    });
  },
  _insertDropZones: function _insertDropZones(models) {
    return _.reduce(models, function (memo, model) {
      var dropZoneActivators = model.dropZoneActivators,
          ownerId,
          topDropZoneActivator,
          bottomDropZoneActivator,
          topDropZone,
          bottomDropZone;

      if (dropZoneActivators) {
        ownerId = dropZoneActivators.ownerId;

        if (dropZoneActivators.top) {
          topDropZoneActivator = _.extend({
            ownerId: ownerId
          }, dropZoneActivators.top);
          topDropZone = this.presentationDesignerDropZoneFactory.create(topDropZoneActivator);
          memo.push(topDropZone);
        }

        memo.push(model);

        if (dropZoneActivators.bottom) {
          bottomDropZoneActivator = _.extend({
            ownerId: ownerId
          }, dropZoneActivators.bottom);
          bottomDropZone = this.presentationDesignerDropZoneFactory.create(bottomDropZoneActivator);
          memo.push(bottomDropZone);
        }
      } else {
        memo.push(model);
      }

      return memo;
    }, [], this);
  }
});

module.exports = PresentationDesignerVisibleDataToVisibleDataWithDropZonesConverter;

});