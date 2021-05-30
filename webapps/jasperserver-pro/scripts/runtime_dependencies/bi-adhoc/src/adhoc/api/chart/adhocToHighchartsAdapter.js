define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var moment = require("momentExtension");

var i18n = require("bundle!all");

var Highcharts = require('./adhocToHighchartsAdapter/Highcharts');

var dataMapper = require('./adhocToHighchartsAdapter/highchartsDataMapper');

var AdhocDataProcessor = require('./adhocToHighchartsAdapter/adhocDataProcessor');

var generalSettings = require("runtime_dependencies/js-sdk/src/jrs.configs");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/**
 * @author: Igor Nesterenko
 * @version: $Id$
 */

/**
 * This adapter makes adoption of Ad Hoc data, metadata and chart state to Highcharts options.
 */
var AdhocHighchartsAdapter = {
  /**
   * Generates Highcharts options based on query data and chart state. This method does not do rendering. It just
   * prepare the options for rendering.
   *
   * @param queryData the query data object.
   * @param chartState the chart state.
   * @param extraOptions the extra options.
   * @return {Object} the options object to be passed to Highcharts.Chart constructor.
   */
  generateOptions: function generateOptions(queryData, chartState, extraOptions) {
    // in the next block we have a non-standard structure: i18n with hard-coded language
    // It's done because of chart exporting tool, which uses this file and it doesn't have access to i18n
    // So by this we can be sure no label will be defected
    var i18nMonths = [i18n["months.label.january"] || "January", i18n["months.label.february"] || "February", i18n["months.label.march"] || "March", i18n["months.label.april"] || "April", i18n["months.label.may"] || "May", i18n["months.label.june"] || "June", i18n["months.label.july"] || "July", i18n["months.label.august"] || "August", i18n["months.label.september"] || "September", i18n["months.label.october"] || "October", i18n["months.label.november"] || "November", i18n["months.label.december"] || "December"];
    var i18nWeekdays = [i18n["week.days.label.sunday"] || "Sunday", i18n["week.days.label.monday"] || "Monday", i18n["week.days.label.tuesday"] || "Tuesday", i18n["week.days.label.wednesday"] || "Wednesday", i18n["week.days.label.thursday"] || "Thursday", i18n["week.days.label.friday"] || "Friday", i18n["week.days.label.saturday"] || "Saturday"]; // Please, read carefully text below before changing time options.
    // When HC works with time we need to maintain control over the timezone offset calculations.
    // Highcharts.Time allows us to do this by passing 3 parameters:
    //      'getTimezoneOffset'
    //      'timezone'
    //      'timezoneOffset'.
    // Parameter 'timezone' will be passed to momentJS library by HC.
    // Parameter 'timezoneOffset' will be used directly to calculate offset (`timezoneOffset * 60000`).
    // Parameter 'getTimezoneOffset' is function which will be called each time by HC.
    // If you take a look at timezoneOffsetFunction inside highcharts.js file you'll notice
    // that it checks for 'useUTC' variable, and if it set to 'false' HC will try to get
    // browser's timezone offset by calling next code:
    //      new Date(timestamp).getTimezoneOffset() * 60000;
    // It works (gives browser's timezone offset) because Date() always converts incoming time into
    // browser's timezone. But this is not what we want (user may select some other timezone),
    // and this is why you'll see how 'useUTC' parameter set to 'true'.
    // (HC should call this parameter 'dontUseBrowsersTimezone' instead of 'useUTC')
    // If you ask "Why not to use 'timezoneOffset' parameter if we have a static zone value?"
    // I'd say because timezone offsets were different for different period of time for timezones.
    // For instance, DST changes timezone offset, and some countries changed offset for their zones
    // back and forth in history.
    // If you ask "Why not to use 'timezone' parameter?"
    // I'd say good question, but in this case it would be exactly the same as we have, and since
    // we like to maintain control I prefer to define calculating offset in our code.
    // So, we define 'getTimezoneOffset' to let HC take our timezone off value.
    // Please, read carefully text above before changing time options.

    var timeOptions = {
      useUTC: true,
      getTimezoneOffset: function getTimezoneOffset(timestamp) {
        var timezoneOffset;
        timezoneOffset = -1 * moment.tz(timestamp, generalSettings.userTimezone).utcOffset();
        return timezoneOffset;
      }
    };
    Highcharts.setOptions({
      lang: {
        contextButtonTitle: i18n["highcharts.contextButtonTitle"] || "Chart context menu",
        decimalPoint: ".",
        downloadJPEG: i18n["highcharts.downloadJPEG"] || "Download JPEG image",
        downloadPDF: i18n["highcharts.downloadPDF"] || "Download PDF document",
        downloadPNG: i18n["highcharts.downloadPNG"] || "Download PNG image",
        downloadSVG: i18n["highcharts.downloadSVG"] || "Download SVG vector image",
        drillUpButton: i18n["highcharts.drillUpButton"] || "Back",
        drillUpText: (i18n["highcharts.drillUpText"] || "Back to") + " {series.name}",
        invalidDate: i18n["highcharts.invalidDate"] || "",
        loading: (i18n["highcharts.loading"] || "Loading") + "...",
        months: i18nMonths,
        noData: i18n["highcharts.noData"] || "No data to display",
        printChart: i18n["highcharts.printChart"] || "Print chart",
        resetZoom: i18n["highcharts.resetZoom"] || "Reset zoom",
        resetZoomTitle: i18n["highcharts.resetZoomTitle"] || "Reset zoom level 1:1",
        shortMonths: chartState.shortMonths,
        thousandsSep: ",",
        weekdays: i18nWeekdays
      },
      time: timeOptions
    });
    var dataProcessorRow = AdhocDataProcessor.levelsToLevelNumbers(chartState.rowsSelectedLevels, 0);
    var dataProcessorCol = AdhocDataProcessor.levelsToLevelNumbers(chartState.columnsSelectedLevels, 1);
    extraOptions.chartState = chartState;
    extraOptions.metadata = queryData.metadata;
    var highchartsOptions = dataMapper.getHighchartsOptions(chartState.chartType, dataProcessorRow, dataProcessorCol, extraOptions); // we also pass the same time options here because global time settings may be redefined
    // by someone

    highchartsOptions.time = highchartsOptions.time || {};

    _.extend(highchartsOptions.time, timeOptions);

    if (chartState.advancedProperties.length) {
      this._applyAdvancedProperties(highchartsOptions, chartState.advancedProperties);
    }

    return highchartsOptions;
  },
  _applyAdvancedProperties: function _applyAdvancedProperties(highchartsOptions, advancedProperties) {
    _.each(advancedProperties, function (property) {
      this._setAdvancedProperty(highchartsOptions, property);
    }, this);

    return highchartsOptions;
  },
  _setAdvancedProperty: function _setAdvancedProperty(options, property) {
    var partials = property.name.split('.'),
        tmp = {},
        last = partials.length - 1,
        result = tmp;

    _.each(partials, function (part, index) {
      if (index == last) {
        tmp[part] = this._parseAdvancedPropertyValue(property.value);
      } else {
        tmp[part] = {};
        tmp = tmp[part];
      }
    }, this); //if base property is array then apply advanced property to each item


    if (options[partials[0]] && options[partials[0]].length) {
      _(options[partials[0]]).each(function (item) {
        jQuery.extend(true, item, result[partials[0]]);
      });
    } else {
      jQuery.extend(true, options, result);
    }
  },
  _parseAdvancedPropertyValue: function _parseAdvancedPropertyValue(value) {
    var result;

    try {
      result = JSON.parse(value);
    } catch (e) {
      result = value;
    }

    return result;
  }
};
module.exports = AdhocHighchartsAdapter;

});