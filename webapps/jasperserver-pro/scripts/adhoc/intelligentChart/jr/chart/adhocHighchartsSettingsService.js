define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var generalSettings = require("runtime_dependencies/js-sdk/src/jrs.configs");

var $ = require('jquery');

var AdhocHighchartsAdapter = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter");

var AdhocDataProcessor = require("runtime_dependencies/bi-adhoc/src/adhoc/api/chart/adhocToHighchartsAdapter/adhocDataProcessor");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// this file may be executed in different environments: browser or rhino (phantomjs)
// in case if it's executed in non-browser env there is no session and thus xssNonce is not set
if (!generalSettings.xssNonce) {
  // xssNonce is necessary to bypass softHtmlEscaping.
  // since in non-browser env where we do not have session xss attack can not be success
  // it seems that we can avoid softHtmlEscape so probably this code could be removed
  generalSettings.xssNonce = "__XSS_NONCE_STUB__";
}

var AdhocHighchartsSettingService = {
  perform: function perform(highchartsOptions, serviceData) {
    var chartState = serviceData.chartState,
        extraOptions = serviceData.extraOptions;
    serviceData.reportLocale && (generalSettings.userLocale = serviceData.reportLocale);
    serviceData.reportTimezone && (generalSettings.userTimezone = serviceData.reportTimezone);

    if (serviceData.chartType) {
      chartState.chartType = serviceData.chartType;
    }

    if (extraOptions) {
      var chartContainer = $('#' + serviceData.chartContainerId);
      var table = chartContainer.parents('table.jrPage').first(); //keeping the jrPage test so that this only applies to HTML and not to rhino/phantom

      if (table.length) {
        //using the exact chart container dimensions is needed for gauges
        var width = chartContainer.width(),
            height = chartContainer.height();

        if (width > 0) {
          extraOptions.width = width;
        }

        if (height > 0) {
          extraOptions.height = height;
        }
      }
    }

    var clonedQueryData = JSON.parse(JSON.stringify(serviceData.queryData));
    var clonedChartState = JSON.parse(JSON.stringify(chartState));
    AdhocDataProcessor.load(clonedQueryData);
    AdhocDataProcessor.messages = extraOptions.messages;
    var hcOptions = AdhocHighchartsAdapter.generateOptions(clonedQueryData, clonedChartState, extraOptions);
    $.extend(true, highchartsOptions, hcOptions);
  }
};
module.exports = AdhocHighchartsSettingService;

});