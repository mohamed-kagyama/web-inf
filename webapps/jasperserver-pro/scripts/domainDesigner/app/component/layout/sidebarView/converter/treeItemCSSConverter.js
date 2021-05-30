define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var iconNameToTreeItemMapping = require("../../../enum/iconNameToTreeItemMapping");

var profileAttributeUtil = require("../../../../../model/util/profileAttributeUtil");

var artificialTreeResourceTypesEnum = require("../enum/artificialTreeResourceTypesEnum");

var entityUtil = require("../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (item, options) {
  var resource = item.resource;
  var type = resource.type;

  if (entityUtil.isJoinAlias(type) || entityUtil.isTableReference(type)) {
    type = entityUtil.getEntityName(options.table);
  } else if (entityUtil.isDataSourceGroup(type)) {
    var isProfileAttribute = profileAttributeUtil.containsProfileAttribute(item.sourceName);

    if (isProfileAttribute) {
      type = artificialTreeResourceTypesEnum.PROFILE_ATTRIBUTE_DATA_SOURCE_GROUP;
    }
  }

  item.iconName = iconNameToTreeItemMapping[type];

  if (entityUtil.isCalcField(type)) {
    item.labelClass = 'jr-uBold';
    var calcFieldsUsedInOtherCalcFields = options.calcFieldsUsedInOtherCalcFields;

    if (calcFieldsUsedInOtherCalcFields[resource.resourceId]) {
      item.labelClass = 'jr-uBolditalic';
    }
  }

  return item;
};

});