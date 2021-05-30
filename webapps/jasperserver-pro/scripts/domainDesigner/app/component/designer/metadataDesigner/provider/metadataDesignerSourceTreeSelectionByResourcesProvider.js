define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var profileAttributeUtil = require("../../../../../model/util/profileAttributeUtil");

var getResourceSourceNameOrNameUtil = require("../../../../util/getResourceSourceNameOrNameUtil");

var defaultSchemaNameEnum = require("../../../../model/enum/defaultSchemaNameEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function filterOutProfileAttributesAndDefaultSchema(resources) {
  return _.filter(resources, function (resource) {
    var name = getResourceSourceNameOrNameUtil(resource);
    return !profileAttributeUtil.containsProfileAttribute(name) && resource.name !== defaultSchemaNameEnum.DEFAULT_SCHEMA;
  });
}

function getSelection(resources) {
  resources = filterOutProfileAttributesAndDefaultSchema(resources);
  return resources.map(function (resource) {
    return resource.sourceName || resource.name;
  });
}

module.exports = {
  getSelection: getSelection
};

});