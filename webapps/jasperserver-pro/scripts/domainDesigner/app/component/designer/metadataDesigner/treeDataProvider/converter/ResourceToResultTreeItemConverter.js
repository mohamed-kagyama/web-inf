define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var profileAttributeUtil = require("../../../../../../model/util/profileAttributeUtil");

var artificialTreeResourceTypesEnum = require("../../../../layout/sidebarView/enum/artificialTreeResourceTypesEnum");

var getResourceSourceNameOrNameUtil = require("../../../../../util/getResourceSourceNameOrNameUtil");

var iconNameToItemTypeMapping = require("../../../../enum/iconNameToTreeItemMapping");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResourceToResultTreeItemConverter = function ResourceToResultTreeItemConverter(options) {
  this.initialize(options);
};

_.extend(ResourceToResultTreeItemConverter.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'convert');

    this.clientDataSourceGroupService = options.clientDataSourceGroupService;
    this.treeViewNodeFactory = options.treeViewNodeFactory;
  },
  convert: function convert(resourceJson, options) {
    options = options || {};
    var selection = options.selection || {},
        isItemSelected = selection[resourceJson.name];
    var treeViewNodeFactoryOptions = {
      label: this._getLabel(resourceJson),
      value: resourceJson.name,
      addToSelection: Boolean(isItemSelected),
      iconName: this._getIconName(resourceJson)
    }; // we should add cssClass only if it's really present in json
    // we should add cssClass only if it's really present in json

    _.extend(treeViewNodeFactoryOptions, _.pick(resourceJson, 'cssClass'));

    return this.treeViewNodeFactory.create(treeViewNodeFactoryOptions);
  },
  _getIconName: function _getIconName(resourceJson) {
    var type = resourceJson.type;

    if (entityUtil.isDataSourceGroup(resourceJson.type)) {
      var isProfileAttribute = profileAttributeUtil.containsProfileAttribute(resourceJson.sourceName);

      if (isProfileAttribute) {
        type = artificialTreeResourceTypesEnum.PROFILE_ATTRIBUTE_DATA_SOURCE_GROUP;
      }
    }

    return iconNameToItemTypeMapping[type];
  },
  _getLabel: function _getLabel(resourceJson) {
    if (entityUtil.isDataSourceGroup(resourceJson.type)) {
      return this.clientDataSourceGroupService.getName(resourceJson);
    }

    return getResourceSourceNameOrNameUtil(resourceJson);
  }
});

module.exports = ResourceToResultTreeItemConverter;

});