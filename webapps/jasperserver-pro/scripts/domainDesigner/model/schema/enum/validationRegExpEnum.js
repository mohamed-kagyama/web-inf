define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domainDesignerSettings = require("settings!domainSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var schemaElementNameNotSupportedSymbols = new RegExp(domainDesignerSettings.schemaElementNameNotSupportedSymbolsRegexp);
module.exports = {
  RESOURCE_ID_BLACKLIST_REGEX_PATTERN: schemaElementNameNotSupportedSymbols,
  RESOURCE_ID_BLACKLIST_SYMBOLS: domainDesignerSettings.schemaElementNameNotSupportedSymbols.replace(/\\(?!\\)/g, "")
};

});