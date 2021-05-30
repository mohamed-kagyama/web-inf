define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var EventBus = function EventBus() {};

EventBus.prototype = Object.create(Backbone.Events);
module.exports = {
  create: function create() {
    return new EventBus();
  }
};

});