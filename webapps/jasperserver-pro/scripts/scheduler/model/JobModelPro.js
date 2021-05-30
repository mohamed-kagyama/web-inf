define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var jQuery = require('jquery');

var JobModel = require("runtime_dependencies/jrs-ui/src/scheduler/model/JobModel");

var dashboardSettings = require("runtime_dependencies/bi-dashboard/src/dashboard/dashboardSettings");

var resourceType = require('../enum/scheduledResourceTypeEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = JobModel.extend({
  loadParameters: function loadParameters() {
    this.update('source', {
      parameters: {
        parameterValues: {}
      }
    });
  },
  validate: function validate(model, options) {
    var results = JobModel.prototype.validate.apply(this, arguments);

    if (this.resourceType === resourceType.DASHBOARD) {
      var width = model.source.referenceWidth,
          height = model.source.referenceHeight,
          errorCode,
          errorArguments;

      if (!width) {
        errorCode = 'dashboard.error.dashboard.width.required';
      } else if (!height) {
        errorCode = 'dashboard.error.dashboard.height.required';
      } else if (!jQuery.isNumeric(width)) {
        errorCode = 'dashboard.error.dashboard.width.integer';
      } else if (!jQuery.isNumeric(height)) {
        errorCode = 'dashboard.error.dashboard.height.integer';
      } else if (width < dashboardSettings.DASHBOARD_MIN_WIDTH || width > dashboardSettings.DASHBOARD_MAX_WIDTH) {
        errorCode = 'dashboard.error.dashboard.width.range';
        errorArguments = [dashboardSettings.DASHBOARD_MIN_WIDTH, dashboardSettings.DASHBOARD_MAX_WIDTH];
      } else if (height < dashboardSettings.DASHBOARD_MIN_HEIGHT || height > dashboardSettings.DASHBOARD_MAX_HEIGHT) {
        errorCode = 'dashboard.error.dashboard.height.range';
        errorArguments = [dashboardSettings.DASHBOARD_MIN_HEIGHT, dashboardSettings.DASHBOARD_MAX_HEIGHT];
      }

      if (errorCode) {
        results.push({
          field: 'outputSize',
          errorCode: errorCode,
          errorArguments: errorArguments
        });
      }
    }

    if (results.length) this.trigger('invalid', results);else this.trigger('valid', []);
    return results;
  }
});

});