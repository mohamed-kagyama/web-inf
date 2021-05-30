define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require("../../../../../../../../model/schema/enum/genericTypesEnum");

var domainDesignerSettings = require("settings!domainSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getLabel: function getLabel(dataType, value) {
    var label = value;

    if (value === '' && dataType !== genericTypesEnum.STRING) {
      label = domainDesignerSettings.nullLabel;
    }

    return label;
  }
};

});