define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var dashboardSettings = require('../dashboardSettings');

var DashboardFoundationModel = require('../model/DashboardFoundationModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  model: DashboardFoundationModel,
  addDefaultFoundation: function addDefaultFoundation() {
    return this.add(new DashboardFoundationModel({
      id: dashboardSettings.DEFAULT_FOUNDATION_ID,
      components: dashboardSettings.DEFAULT_FOUNDATION_COMPONENTS_ID,
      layout: dashboardSettings.DEFAULT_FOUNDATION_LAYOUT_ID,
      wiring: dashboardSettings.DEFAULT_FOUNDATION_WIRING_ID
    }));
  },
  getDefaultFoundation: function getDefaultFoundation() {
    return this.get(dashboardSettings.DEFAULT_FOUNDATION_ID);
  }
});

});