define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var AdHocQueryLevelModel = require('./AdHocQueryLevelModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  model: AdHocQueryLevelModel,
  initialize: function initialize(attrs, opts) {
    this.adHocModel = opts.adHocModel;
    this._master = opts.master;
  },
  multiAxisMap: function multiAxisMap(fn) {
    var hasMeasure = false,
        items = [].concat(this.models),
        existingItems = this._master ? this._master.models.concat(this.models) : this.models;

    for (var i = items.length - 1; i >= 0; i--) {
      if (items[i]) {
        if (items[i].isMeasure()) {
          if (hasMeasure) {
            items[i] = null;
          } else {
            hasMeasure = true;
          }
        } else {
          for (var j = existingItems.length - (items.length - i) - 1; items[i] && j > -1; j--) {
            if ((items[i].get('field') === existingItems[j].get('field') || items[i].get('dimension') === existingItems[j].get('dimension')) && items[i].get('functionName') === existingItems[j].get('functionName') && !items[i].isDateTime()) {
              items[i] = null;
            }
          }
        }
      }
    }

    return _.map(_.compact(items), fn);
  },
  hasMeasures: function hasMeasures() {
    return !!this.find(function (model) {
      return model.isMeasure();
    });
  },
  allHasSummaries: function allHasSummaries() {
    return !this.find(function (model) {
      return !model.get('includeAll');
    });
  },
  toQueryMultiaxisAxisItems: function toQueryMultiaxisAxisItems() {
    return this.multiAxisMap(function (level) {
      return level.toQueryMultiaxisAxisItem();
    });
  }
});

});