define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

var getResourceSourceNameOrNameUtil = require("../../../../../util/getResourceSourceNameOrNameUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function setResourceLabel(resource, label) {
  resource.label = label;
  delete resource.name;
  return resource;
}

var TreeItemLabelProcessor = function TreeItemLabelProcessor(options) {
  this.initialize(options);
};

_.extend(TreeItemLabelProcessor.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'getNameAsLabel', 'getSourceNameAsLabel');

    this.clientDataSourceGroupService = options.clientDataSourceGroupService;
  },
  getNameAsLabel: function getNameAsLabel(resource, options) {
    var label = resource.name;

    if (entityUtil.isDataSourceGroup(resource.type)) {
      label = this.clientDataSourceGroupService.getName(options.dataSourceGroup.toJSON());
    }

    return setResourceLabel(resource, label);
  },
  getSourceNameAsLabel: function getSourceNameAsLabel(resource, options) {
    var label = getResourceSourceNameOrNameUtil(resource);

    if (entityUtil.isDataSourceGroup(resource.type)) {
      label = this.clientDataSourceGroupService.getName(options.dataSourceGroup.toJSON());
    }

    return setResourceLabel(resource, label);
  }
});

module.exports = TreeItemLabelProcessor;

});