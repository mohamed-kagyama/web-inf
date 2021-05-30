define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DraftFilterStateFactory = function DraftFilterStateFactory(options) {
  this.states = options.states;
};

_.extend(DraftFilterStateFactory.prototype, {
  enter: function enter(stateName, context) {
    this.states[stateName].enter(context, this);
  }
});

module.exports = DraftFilterStateFactory;

});