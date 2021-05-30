define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseFiltersController = require('./BaseFiltersController');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OlapFiltersController = BaseFiltersController.extend({
  isOlap: true,
  initialize: function initialize() {
    BaseFiltersController.prototype.initialize.apply(this, arguments);
    this.listenTo(this.collection, 'change:value', this.updateFilter);
  },
  addFilter: function addFilter(fields) {
    var level = fields[0];
    return this.service.addOlapFilter(level.dimensionId, level.name).done(_.bind(function (response) {
      this.collection.set(response.existingFilters);
      this.onStateUpdate(response);
    }, this));
  },
  updateFilter: function updateFilter(filterModel) {
    if (filterModel.isValid(true)) {
      return this.service.update(filterModel.get('id'), filterModel.toExpression()).done(_.bind(function (response) {
        var self = this;

        _.each(response.existingFilters, function (rawFilterModel) {
          // we will try to update all models except for original one
          if (rawFilterModel.id !== filterModel.get('id')) {
            var model = self.collection.get(rawFilterModel.id); // expressionType is set on client-side and server response does not contain it
            // so we set it as it was previous to prevent unnecessary "change:expressionType" event
            // expressionType is set on client-side and server response does not contain it
            // so we set it as it was previous to prevent unnecessary "change:expressionType" event

            rawFilterModel.expressionType = model.get('expressionType'); // and now we update model
            // and now we update model

            model.set(rawFilterModel);
            model.removeAvailableData();

            var filterEditor = self._getFilterEditorByModel(model);

            filterEditor && filterEditor.render();
          }
        });

        this.onStateUpdate(response);
      }, this));
    }
  }
}); // workaround for non-AMD modules

window.OlapFiltersController = OlapFiltersController;
module.exports = OlapFiltersController;

});