define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var dropZonePositionEnum = require("../../../enum/dropZonePositionEnum");

var dropZonesAcceptTypesEnum = require("../enum/dropZonesAcceptTypesEnum");

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function getDataIslandDropZoneActivator(dataIslandJSON) {
  var dropZoneActivators = {
    ownerId: dataIslandJSON.id,
    dataIslandId: dataIslandJSON.id,
    top: {
      index: dataIslandJSON.index,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_AND_DATA_ISLANDS,
      which: dropZonePositionEnum.TOP
    }
  };

  if (dataIslandJSON.isExpanded) {
    dropZoneActivators.bottom = {
      index: 0,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_SETS_AND_ITEMS,
      parentId: dataIslandJSON.id,
      which: dropZonePositionEnum.BOTTOM
    };
  } else {
    dropZoneActivators.bottom = {
      index: dataIslandJSON.index + 1,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_AND_DATA_ISLANDS,
      which: dropZonePositionEnum.BOTTOM
    };
  }

  return dropZoneActivators;
}

function getSetDropZoneActivator(presentationSetJSON) {
  var dropZoneActivators = {
    ownerId: presentationSetJSON.id,
    dataIslandId: presentationSetJSON.dataIslandId,
    top: {
      index: presentationSetJSON.index,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_SETS_AND_ITEMS,
      parentId: presentationSetJSON.parentId,
      which: dropZonePositionEnum.TOP
    }
  };

  if (presentationSetJSON.isExpanded) {
    dropZoneActivators.bottom = {
      index: 0,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_SETS_AND_ITEMS,
      parentId: presentationSetJSON.id,
      which: dropZonePositionEnum.BOTTOM
    };
  } else {
    dropZoneActivators.bottom = {
      index: presentationSetJSON.index + 1,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_SETS_AND_ITEMS,
      parentId: presentationSetJSON.parentId,
      which: dropZonePositionEnum.BOTTOM
    };
  }

  return dropZoneActivators;
}

function getFieldDropZoneActivator(presentationFieldJSON) {
  return {
    ownerId: presentationFieldJSON.id,
    dataIslandId: presentationFieldJSON.dataIslandId,
    top: {
      index: presentationFieldJSON.index,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_SETS_AND_ITEMS,
      parentId: presentationFieldJSON.parentId,
      which: dropZonePositionEnum.TOP
    },
    bottom: {
      index: presentationFieldJSON.index + 1,
      accepts: dropZonesAcceptTypesEnum.SIDEBAR_RESOURCES_SETS_AND_ITEMS,
      parentId: presentationFieldJSON.parentId,
      which: dropZonePositionEnum.BOTTOM
    }
  };
}

module.exports = {
  create: function create(resource) {
    var modelType = resource.modelType;

    if (entityUtil.isDataIsland(modelType)) {
      return getDataIslandDropZoneActivator(resource);
    } else if (entityUtil.isPresentationSet(modelType)) {
      return getSetDropZoneActivator(resource);
    } else if (entityUtil.isPresentationField(modelType)) {
      return getFieldDropZoneActivator(resource);
    }
  }
};

});