define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Model.extend({
  defaults: {
    timestamp: undefined,
    state: undefined
  },
  initialize: function initialize(atts, options) {
    options || (options = {});
    this.set('timestamp', new Date().getTime());
    this.dashboardModel = options.dashboardModel;
  },
  applyState: function applyState() {
    this.dashboardModel.applyJsonState(this.get('state'));
  }
});

});