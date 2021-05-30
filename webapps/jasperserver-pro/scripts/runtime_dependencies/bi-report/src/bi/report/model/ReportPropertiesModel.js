define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function isFloatingHeaderEnabled(component) {
  var defaultJiveUi = this.get('defaultJiveUi'),
      property = 'floating' + component + 'HeadersEnabled',
      enabled = false;
  !_.isUndefined(defaultJiveUi) && !_.isUndefined(defaultJiveUi[property]) && (enabled = defaultJiveUi[property]);
  return enabled;
}

var ReportPropertiesModel = Backbone.Model.extend({
  defaults: {
    pages: 1,
    autoresize: true,
    chart: {},
    loadingOverlay: true
  },
  isDefaultJiveUiEnabled: function isDefaultJiveUiEnabled() {
    var defaultJiveUi = this.get('defaultJiveUi');
    return _.isUndefined(defaultJiveUi) || _.isUndefined(defaultJiveUi.enabled) || defaultJiveUi.enabled;
  },
  isFloatingTableHeaderEnabled: function isFloatingTableHeaderEnabled() {
    return isFloatingHeaderEnabled.call(this, 'Table');
  },
  isFloatingCrosstabHeaderEnabled: function isFloatingCrosstabHeaderEnabled() {
    return isFloatingHeaderEnabled.call(this, 'Crosstab');
  }
});
module.exports = ReportPropertiesModel;

});