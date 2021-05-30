define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var clientValidationRegExpEnum = require("../../enum/clientValidationRegExpEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DEFAULT_REPLACE_CHARACTER = '_';

function isResourceNameContainsSpecialCharacters(resourceName) {
  return resourceName.match(clientValidationRegExpEnum.RESOURCE_ID_BLACKLIST_REGEX_PATTERN);
}

function replaceResourceNameSpecialCharacters(resourceName) {
  return resourceName.replace(clientValidationRegExpEnum.RESOURCE_ID_BLACKLIST_REPLACE_REGEX_PATTERN, DEFAULT_REPLACE_CHARACTER);
}

module.exports = {
  isResourceNameContainsSpecialCharacters: isResourceNameContainsSpecialCharacters,
  replaceResourceNameSpecialCharacters: replaceResourceNameSpecialCharacters
};

});