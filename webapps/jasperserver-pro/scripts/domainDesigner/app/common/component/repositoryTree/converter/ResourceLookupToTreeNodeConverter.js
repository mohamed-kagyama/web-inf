define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var resourceTypeToIconNameEnum = require("./enum/resourceTypeToIconNameEnum");

var resourceLookupUtil = require("../util/resourceLookupUtil");

var tooltipPlacements = require("../../enum/placementsEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

function getIconName(resourceLookup) {
  var resourceType;

  if (resourceLookup.resourceType === 'file' && resourceLookup.fileType) {
    resourceType = resourceLookup.fileType;
  } else {
    resourceType = resourceLookup.resourceType;
  }

  return resourceTypeToIconNameEnum[resourceType];
}

function getProperties(resourceLookup) {
  return _.omit(_.cloneDeep(resourceLookup), '_links');
}

function getChildren(resourceLookup) {
  if (resourceLookupUtil.isFolder(resourceLookup)) {
    return [];
  }
}

function isSelectable(resourcesTypeToSelect, resourceLookup) {
  var isSelectable = false,
      resourceType;

  if (!_.isEmpty(resourcesTypeToSelect)) {
    resourceType = resourceLookup.resourceType;
    isSelectable = resourcesTypeToSelect.some(function (typeToSelect) {
      return resourceType === typeToSelect;
    });
  }

  return isSelectable;
}

function getTooltipOptions(resourceLookup) {
  return {
    placement: tooltipPlacements.BOTTOM_LEFT,
    content: {
      items: [{
        label: i18nMessage('domain.designer.resource.tooltip.path'),
        text: resourceLookup.uri
      }, {
        label: i18nMessage('domain.designer.resource.tooltip.description'),
        text: resourceLookup.description
      }]
    }
  };
}

function ResourceLookupToTreeNodeConverter(options) {
  options = options || {};

  _.bindAll(this, 'convert');

  this.resourceTypesToSelect = options.resourceTypesToSelect || [];
}

_.extend(ResourceLookupToTreeNodeConverter.prototype, {
  convert: function convert(resourceLookup) {
    var treeNode = {
      id: resourceLookup.uri,
      label: resourceLookup.label,
      icon: getIconName(resourceLookup),
      invalid: false,
      properties: getProperties(resourceLookup),
      visible: false
    };

    if (resourceLookupUtil.isFolder(resourceLookup)) {
      _.extend(treeNode, {
        children: getChildren(resourceLookup),
        open: false
      });
    } else {
      _.extend(treeNode, {
        tooltip: getTooltipOptions(resourceLookup)
      });
    }

    if (isSelectable(this.resourceTypesToSelect, resourceLookup)) {
      _.extend(treeNode, {
        isSelectable: true
      });
    }

    return treeNode;
  }
});

module.exports = ResourceLookupToTreeNodeConverter;

});