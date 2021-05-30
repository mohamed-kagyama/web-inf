define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dateTimeSettings = require("settings!dateTimeSettings");

var dataSourceMetadataTypesEnum = require("../../../model/schema/enum/dataSourceMetadataTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  isTimezoneFormattingShouldBeAppliedForDate: function isTimezoneFormattingShouldBeAppliedForDate() {
    return dateTimeSettings.timezoneFormatting[dataSourceMetadataTypesEnum.Date];
  },
  isTimezoneFormattingShouldBeAppliedForTime: function isTimezoneFormattingShouldBeAppliedForTime() {
    return dateTimeSettings.timezoneFormatting[dataSourceMetadataTypesEnum.Time];
  },
  isTimezoneFormattingShouldBeAppliedForTimestamp: function isTimezoneFormattingShouldBeAppliedForTimestamp() {
    return dateTimeSettings.timezoneFormatting[dataSourceMetadataTypesEnum.Timestamp];
  }
};

});