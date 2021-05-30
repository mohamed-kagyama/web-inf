define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationRegExpEnum = require("../../model/schema/enum/validationRegExpEnum");

var domainDesignerSettings = require("settings!domainSettings");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var schemaElementNameNotSupportedSymbols = domainDesignerSettings.schemaElementNameNotSupportedSymbolsRegexp;
var schemaElementNameNotSupportedSymbolsRegexpGlobal = new RegExp(schemaElementNameNotSupportedSymbols, 'g');
module.exports = _.extend({
  RESOURCE_ID_BLACKLIST_REPLACE_REGEX_PATTERN: schemaElementNameNotSupportedSymbolsRegexpGlobal,
  BUNDLE_KEY_BLACKLIST_REGEX_PATTERN: /[-+='"!#$%^&,<> %:;?{}@()|\*\[\]\/\\]/,
  STARTS_FROM_A_NUMBER: /^[0-9]/,
  ESCAPE_JSON: /[\?]+/g
}, validationRegExpEnum);

});