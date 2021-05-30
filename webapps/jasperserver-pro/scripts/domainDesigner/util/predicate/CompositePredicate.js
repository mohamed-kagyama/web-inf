define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var CompositePredicate = function CompositePredicate(predicates) {
  _.bindAll(this, 'match');

  this.predicates = predicates ? _.isArray(predicates) ? predicates : [predicates] : [];
};

_.extend(CompositePredicate.prototype, {
  match: function match() {
    var args = Array.prototype.slice.call(arguments, 0);

    var result = _.find(this.predicates, function (predicate) {
      return !this._matchPredicate(predicate, args);
    }, this);

    return _.isUndefined(result);
  },
  _matchPredicate: function _matchPredicate(predicate, args) {
    if (_.isUndefined(predicate)) {
      return true;
    } else if (_.isFunction(predicate)) {
      return predicate.apply(null, args);
    } else {
      return predicate;
    }
  }
});

module.exports = CompositePredicate;

});