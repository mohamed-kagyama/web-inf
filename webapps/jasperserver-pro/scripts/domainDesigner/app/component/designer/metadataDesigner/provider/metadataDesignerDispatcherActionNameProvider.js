define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var resourcesEventsEnum = {};
resourcesEventsEnum[schemaEntitiesEnum.DATA_SOURCE_GROUP] = {
  add: applicationStateEventsEnum.METADATA_DESIGNER_ADD_DATA_SOURCE_GROUPS,
  remove: applicationStateEventsEnum.METADATA_DESIGNER_REMOVE_DATA_SOURCE_GROUPS
};
resourcesEventsEnum[schemaEntitiesEnum.TABLE] = {
  add: applicationStateEventsEnum.METADATA_DESIGNER_ADD_TABLES_WITH_TABLE_REFERENCES,
  remove: applicationStateEventsEnum.METADATA_DESIGNER_REMOVE_TABLES
};

function getAddEventByResourceType(type) {
  return resourcesEventsEnum[type].add;
}

function getRemoveEventByResourceType(type) {
  return resourcesEventsEnum[type].remove;
}

module.exports = {
  getAddEventByResourceType: getAddEventByResourceType,
  getRemoveEventByResourceType: getRemoveEventByResourceType
};

});