define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var serverSchemaResourceTypeUtil = require("../../../../../model/util/serverSchemaResourceTypeUtil");

var iconNameToItemTypeMapping = require("../../../../enum/iconNameToTreeItemMapping");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ResourceToSourceTreeItemConverter = function ResourceToSourceTreeItemConverter(options) {
  this.initialize(options);
};

_.extend(ResourceToSourceTreeItemConverter.prototype, {
  initialize: function initialize(options) {
    _.bindAll(this, 'convert');

    this.treeViewNodeFactory = options.treeViewNodeFactory;
  },
  convert: function convert(serverResource, options) {
    options = options || {};
    var selection = options.selection || {};

    var resource = serverResource.group,
        treeNode,
        resourceName = resource.name,
        metadataResourceType = this._getMetadataResourceType(serverResource),
        isItemSelected = selection[resourceName];

    treeNode = this.treeViewNodeFactory.create({
      label: resourceName,
      value: resourceName,
      addToSelection: Boolean(isItemSelected),
      iconName: iconNameToItemTypeMapping[metadataResourceType],
      isInvalid: Boolean(isItemSelected && options.highlightInvalidResources)
    });
    return treeNode;
  },
  _getMetadataResourceType: function _getMetadataResourceType(resource) {
    return serverSchemaResourceTypeUtil.getMetadataResourceType(resource);
  }
});

module.exports = ResourceToSourceTreeItemConverter;

});