define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  initialize: function initialize() {
    this.measures = {};
    this.multiAxisItems = {};
  },
  reset: function reset(values, options) {
    return Backbone.Collection.prototype.reset.call(this, _.map(values, function (value) {
      if (!value.member && !value.level && !value.bottomN && !value.topN) {
        return {
          level: value
        };
      }

      return value;
    }), options);
  },
  toJSON: function toJSON(multiLevel) {
    if (this.length) {
      if (multiLevel) {
        return this.reduce(function (memo, model) {
          if (model.has('level') && !model.get('level').aggregation) {
            memo.push(_.clone(model.get('level')));
          }

          return memo;
        }, []);
      } else {
        var measures = this.measures,
            multiAxisItems = this.multiAxisItems;
        return _.filter(Backbone.Collection.prototype.toJSON.apply(this, arguments), function (item) {
          return !item.level || item.level.aggregation || !(measures[item.level.fieldRef] || !multiAxisItems[item.level.fieldRef]);
        });
      }
    }
  }
});

});