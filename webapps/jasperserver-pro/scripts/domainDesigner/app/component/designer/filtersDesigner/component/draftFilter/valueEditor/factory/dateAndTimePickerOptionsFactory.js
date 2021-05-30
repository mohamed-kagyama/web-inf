define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require("../../../../../../../../model/schema/enum/genericTypesEnum");

var dateTimeSettings = require("settings!dateTimeSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var filterDataType = options.dataType;
    var dateAndTimePickerOptions = {
      el: '.jr-jDateTimeInput',
      showOn: '',
      onSelect: options.onSelect,
      trigger: '.jr-jDateTimePickerTrigger'
    };

    if (filterDataType === genericTypesEnum.TIME) {
      dateAndTimePickerOptions.timeFormat = dateTimeSettings.timepicker.timeFormat;
    } else if (filterDataType === genericTypesEnum.TIMESTAMP) {
      dateAndTimePickerOptions.dateFormat = dateTimeSettings.datepicker.dateFormat;
      dateAndTimePickerOptions.timeFormat = dateTimeSettings.timepicker.timeFormat;
    } else if (filterDataType === genericTypesEnum.DATE) {
      dateAndTimePickerOptions.dateFormat = dateTimeSettings.datepicker.dateFormat;
    }

    return dateAndTimePickerOptions;
  }
};

});