define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var GoToPreviousLocationState = function GoToPreviousLocationState(options) {
  this.initialize(options);
};

_.extend(GoToPreviousLocationState.prototype, {
  initialize: function initialize(options) {
    this.goToPreviousLocation = options.goToPreviousLocation;
  },
  enter: function enter(context) {
    this.goToPreviousLocation();
  }
});

module.exports = GoToPreviousLocationState;

});