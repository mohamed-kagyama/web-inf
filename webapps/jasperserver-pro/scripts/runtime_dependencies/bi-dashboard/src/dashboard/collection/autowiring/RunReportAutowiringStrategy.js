define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseAutowiringStrategy = require('./BaseAutowiringStrategy');

var dashboardWiringStandardIds = require('../../enum/dashboardWiringStandardIds');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseAutowiringStrategy.extend({
  autowire: function autowire(collection, component, metadata) {
    if (component.isVisualization() || component.isParametrized()) {
      var components = component.collection,
          dashboardProperties = components.getDashboardPropertiesComponent();
      collection.get(dashboardProperties.id + ':' + dashboardWiringStandardIds.INIT_SIGNAL).consumers.add({
        consumer: component.id + ':' + dashboardWiringStandardIds.REFRESH_SLOT
      });
      collection.get(dashboardProperties.id + ':' + dashboardWiringStandardIds.APPLY_SIGNAL).consumers.add({
        consumer: component.id + ':' + dashboardWiringStandardIds.APPLY_SLOT
      });
    }
  }
});

});