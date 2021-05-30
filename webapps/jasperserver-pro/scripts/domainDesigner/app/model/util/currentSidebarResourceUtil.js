define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientSchemaModelUtil = require("./clientSchemaModelUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function checkIfResourceShouldBeSelectedOnJoinsDesigner(options) {
  options = options || {
    currentSidebarResource: {}
  };
  var currentSidebarResource = options.currentSidebarResource,
      isResourceExists = checkIfResourceExists(options),
      isUnderJoinTree = currentSidebarResource.parentJoinTreeId && currentSidebarResource.resourceId !== currentSidebarResource.parentJoinTreeId,
      collections = options.collections,
      isParentResourceExists;

  if (isUnderJoinTree) {
    isParentResourceExists = clientSchemaModelUtil.getJoinAliasByTableReferenceId(currentSidebarResource.parentTableReferenceId, collections);
    return isResourceExists && isParentResourceExists;
  }

  return isResourceExists;
}

function checkIfResourceExists(options) {
  options = options || {
    currentSidebarResource: {}
  };
  var currentSidebarResource = options.currentSidebarResource,
      id = currentSidebarResource.resourceId,
      type = currentSidebarResource.type,
      collections = options.collections;
  return id && clientSchemaModelUtil.checkIfResourceExistsInSchemaByIdAndType(id, type, collections);
}

module.exports = {
  getJoinsDesignerCurrentSidebarResource: function getJoinsDesignerCurrentSidebarResource(options) {
    if (checkIfResourceShouldBeSelectedOnJoinsDesigner(options)) {
      return options.currentSidebarResource;
    }

    return {
      type: '',
      id: null,
      resourceId: null,
      parentTableReferenceId: null,
      parentJoinTreeId: null
    };
  },
  getMetadataDesignerCurrentSidebarResource: function getMetadataDesignerCurrentSidebarResource(options) {
    if (checkIfResourceExists(options)) {
      return options.currentSidebarResource;
    }

    return {
      type: '',
      id: null,
      resourceId: null
    };
  },
  getFiltersDesignerCurrentSidebarResource: function getFiltersDesignerCurrentSidebarResource(options) {
    if (checkIfResourceExists(options)) {
      return options.currentSidebarResource;
    }

    return {
      type: '',
      id: null,
      resourceId: null
    };
  },
  getPresentationItemsSidebarSelection: function getPresentationItemsSidebarSelection(options) {
    var selection = _.clone(options.currentSelection),
        collections = options.collections;

    selection.items = _.reduce(selection.items, function (memo, item, id) {
      if (clientSchemaModelUtil.checkIfResourceExistsInSchemaByIdAndType(item.resourceId, item.type, collections)) {
        memo[id] = item;
      }

      return memo;
    }, {});

    if (_.isEmpty(selection.items)) {
      selection.parentId = null;
    }

    return selection;
  }
};

});