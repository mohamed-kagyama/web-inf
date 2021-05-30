define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require("jquery");

var DefaultSettingService = require("./defaultSettingService");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var JRDataSettingService = {
  perform: function perform(highchartsOptions, data) {
    var service = this; // chart properties
    // chart properties

    service.setProperties(highchartsOptions, data.properties); // axis categories
    // axis categories

    data.xCategories && DefaultSettingService.setProperty(highchartsOptions, "xAxis.categories", data.xCategories);
    data.yCategories && DefaultSettingService.setProperty(highchartsOptions, "yAxis.categories", data.yCategories); // series
    // series

    highchartsOptions.series = [];
    $.each(data.series, function (i, dataSeries) {
      var series = {};
      service.copyObject(series, dataSeries, ["name", "_jrid"]);
      service.setProperties(series, dataSeries.properties); // data points
      // data points

      series.data = [];
      $.each(dataSeries.data, function (i, dataPoint) {
        var point = {};
        service.copyObject(point, dataPoint, ["name", "x", "y", "z", "value", "id", "parent", "fullName", "colorValue"]);
        service.setProperties(point, dataPoint.properties);
        series.data.push(point);
      });
      highchartsOptions.series.push(series);
    });
  },
  copyObject: function copyObject(target, source, names) {
    $.each(names, function (i, name) {
      if (source[name] !== undefined) {
        target[name] = source[name];
      }
    });
  },
  setProperties: function setProperties(obj, properties) {
    properties && $.each(properties, function (i, property) {
      DefaultSettingService.setProperty(obj, property.prop, property.val, property.isFunction);
    });
  }
};
module.exports = JRDataSettingService;

});