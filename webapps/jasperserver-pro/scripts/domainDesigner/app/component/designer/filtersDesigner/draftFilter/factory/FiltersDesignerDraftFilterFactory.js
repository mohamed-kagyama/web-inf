define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var draftFilterStateEnum = require("../enum/draftFilterStateEnum");

var $ = require('jquery');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerDraftFilterFactory = function FiltersDesignerDraftFilterFactory(options) {
  this.stateFactory = options.stateFactory;
};

_.extend(FiltersDesignerDraftFilterFactory.prototype, {
  create: function create(draftFilter, newFilterOptions) {
    var deferred = $.Deferred();
    this.stateFactory.enter(draftFilterStateEnum.INITIAL_STATE, {
      currentFilter: draftFilter,
      newFilterOptions: newFilterOptions,
      deferred: deferred
    });
    return deferred.promise();
  }
});

module.exports = FiltersDesignerDraftFilterFactory;

});