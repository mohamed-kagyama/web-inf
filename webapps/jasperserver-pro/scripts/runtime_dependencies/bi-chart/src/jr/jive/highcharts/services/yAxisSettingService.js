define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var DefaultSettingService = require("./defaultSettingService");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var YAxisService = {
  perform: function perform(highchartsOptions, serviceData) {
    var axis = this.getYAxis(highchartsOptions, serviceData.axisIndex);
    $.each(serviceData.props, function (i, option) {
      if (option) {
        DefaultSettingService.setProperty(axis, option.prop, option.val, option.isFunction);
      }
    });
  },
  getYAxis: function getYAxis(highchartsOptions, axisIndex) {
    var existingAxis = null;

    if (Object.prototype.toString.call(highchartsOptions.yAxis) === "[object Array]") {
      existingAxis = highchartsOptions.yAxis[axisIndex];
    } else if (axisIndex === 0) {
      existingAxis = highchartsOptions.yAxis;
    }

    if (existingAxis) {
      return existingAxis;
    }

    var newAxis = {};

    if (Object.prototype.toString.call(highchartsOptions.yAxis) === "[object Array]") {
      highchartsOptions.yAxis[axisIndex] = newAxis;
    } else if (axisIndex === 0) {
      highchartsOptions.yAxis = newAxis;
    } else {
      var axesArray = [];
      axesArray[0] = highchartsOptions.yAxis || {};
      axesArray[axisIndex] = newAxis;
      highchartsOptions.yAxis = axesArray;
    }

    return newAxis;
  }
};
module.exports = YAxisService;

});