define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function calcFieldConverter(field, options) {
  var fieldJSON = field.toJSON();
  return _.extend({
    name: fieldJSON.name,
    label: fieldJSON.name,
    sourceId: options.constantGroupId,
    sourceType: schemaEntitiesEnum.CONSTANT_GROUP,
    fieldId: fieldJSON.id,
    fieldType: entityUtil.getEntityName(field),
    entityType: schemaEntitiesEnum.PRESENTATION_FIELD
  });
}

function constantGroupConverter(constantGroup, options) {
  var constantGroupId = options.constantGroupId,
      constantDataIslandName = options.constantDataIslandName,
      constantDataIslandLabel = options.constantDataIslandLabel;
  return _.extend({
    name: constantDataIslandName,
    label: constantDataIslandLabel,
    sourceType: schemaEntitiesEnum.CONSTANT_GROUP,
    sourceId: constantGroupId
  }, options.properties);
}

module.exports = {
  convertCalcField: calcFieldConverter,
  convertConstantGroup: constantGroupConverter
};

});