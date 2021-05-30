define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var XRegExp = require('xregexp');

var profileAttributesSettings = require("settings!profileAttributes");

var clientExpressionsEnum = require("../../app/model/enum/clientExpressionsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PROFILE_ATTRIBUTE_REGEXP = new XRegExp(profileAttributesSettings.attributeFunctionPattern);
var PROFILE_ATTRIBUTE_REGEXP_GLOBAL = new XRegExp(profileAttributesSettings.attributeFunctionPattern, "g");
var PROFILE_ATTRIBUTE_WITH_PLACEHOLDER_REGEXP = new XRegExp(profileAttributesSettings.attributePlaceholderGroupingPattern);
var PROFILE_ATTRIBUTE_WITH_PLACEHOLDER_ONLY_REGEXP = new XRegExp("^" + profileAttributesSettings.attributePlaceholderGroupingPattern + "$");
var PROFILE_ATTRIBUTE_PLACEHOLDER_REGEXP = /({)/g;
var functions = clientExpressionsEnum.functions;

function containsProfileAttribute(string) {
  return string && Boolean(string.match(PROFILE_ATTRIBUTE_REGEXP));
}

function containsProfileAttributeWithPlaceholdersOnly(string) {
  return string && Boolean(string.match(PROFILE_ATTRIBUTE_WITH_PLACEHOLDER_ONLY_REGEXP));
}

function containsProfileAttributeWithPlaceholders(string) {
  return string && Boolean(string.match(PROFILE_ATTRIBUTE_WITH_PLACEHOLDER_REGEXP));
}

function getProfileAttributes(string) {
  return string && string.match(PROFILE_ATTRIBUTE_REGEXP_GLOBAL);
}

function getProfileAttributePlaceHolders(string) {
  return string && string.match(PROFILE_ATTRIBUTE_PLACEHOLDER_REGEXP);
}

function createProfileAttributeFunctionWithArgs(args) {
  var fnName = functions.attribute.name;

  var argsString = _.map(args, function (arg) {
    return "'" + arg + "'";
  }).join(",");

  return fnName + "(" + argsString + ")";
}

function extractProfileAttributeArgs(profileAttribute) {
  var match = profileAttribute.match(PROFILE_ATTRIBUTE_REGEXP),
      args = [];

  if (match) {
    args.push(match[1]);

    if (match[2]) {
      args.push(match[3]);
    }
  }

  return args;
}

function removeProfileAttributePlaceholders(profileAttribute) {
  var args = extractProfileAttributeArgs(profileAttribute);
  return createProfileAttributeFunctionWithArgs(args);
}

module.exports = {
  containsProfileAttribute: containsProfileAttribute,
  containsProfileAttributeWithPlaceholders: containsProfileAttributeWithPlaceholders,
  containsProfileAttributeWithPlaceholdersOnly: containsProfileAttributeWithPlaceholdersOnly,
  removeProfileAttributePlaceholders: removeProfileAttributePlaceholders,
  getProfileAttributes: getProfileAttributes,
  getProfileAttributePlaceHolders: getProfileAttributePlaceHolders,
  createProfileAttributeFunctionWithArgs: createProfileAttributeFunctionWithArgs,
  extractProfileAttributeArgs: extractProfileAttributeArgs
};

});