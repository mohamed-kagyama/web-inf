define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var uriUtil = require("../../../../../../util/uriUtil");

var schemaEntitiesEnum = require("../../../../../../../model/schema/enum/schemaEntitiesEnum");

var draggableOriginEnum = require("../../../draggable/enum/draggableOriginEnum");

var dropZonePositionEnum = require("../../../enum/dropZonePositionEnum");

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationCanvasDroppableItemsService = function PresentationCanvasDroppableItemsService(options) {
  this.initialize(options);
};

_.extend(PresentationCanvasDroppableItemsService.prototype, {
  initialize: function initialize(options) {
    this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
    this.clientDomainSchemaService = options.clientDomainSchemaService;
  },
  isParentBeingDroppedIntoChild: function isParentBeingDroppedIntoChild(items, dropZoneActivatorParentId) {
    var self = this;
    return _.some(items, function (item) {
      var itemId = item.id,
          itemIsDroppedIntoItsOwnDropZone = dropZoneActivatorParentId === itemId;

      if (entityUtil.isPresentationSet(item.type)) {
        return itemIsDroppedIntoItsOwnDropZone || self.clientDomainSchemaService.isPresentationItemHasTransitiveParent(dropZoneActivatorParentId, itemId);
      }
    }, this);
  },
  isConstantGroupCalcFieldsAreDropped: function isConstantGroupCalcFieldsAreDropped(items) {
    return _.every(items, function (item) {
      return entityUtil.isCalcField(item.type) && entityUtil.isConstantGroup(item.sourceType);
    });
  },
  areResourcesReferencedByDataIsland: function areResourcesReferencedByDataIsland(items) {
    var dataIslands = this.clientDomainSchemaService.getDataIslands().reduce(function (memo, dataIsland) {
      memo[dataIsland.sourceId] = true;
      return memo;
    }, {});
    return _.every(items, function (item) {
      var dataIslandSourceId = item.dataIslandSourceId;

      if (dataIslandSourceId) {
        return dataIslands[dataIslandSourceId];
      }
    }, this);
  },
  areResourcesLocatedUnderAJoinTree: function areResourcesLocatedUnderAJoinTree(items) {
    return _.every(items, function (item) {
      return item.isJoinTreeItem;
    }, this);
  },
  isDataIslandsBeingDropped: function isDataIslandsBeingDropped(items) {
    return _.every(items, function (item) {
      return entityUtil.isDataIsland(item.type);
    });
  },
  isJoinTreesBeingDropped: function isJoinTreesBeingDropped(items) {
    return _.every(items, function (item) {
      return entityUtil.isJoinTree(item.type);
    });
  },
  isTableReferencesBeingDropped: function isTableReferencesBeingDropped(items) {
    return _.every(items, function (item) {
      return entityUtil.isTableReference(item.type);
    });
  },
  isItemsBeingDroppedFromCanvas: function isItemsBeingDroppedFromCanvas(items) {
    var draggableOrigin = this._getDraggableOrigin(items);

    return draggableOrigin === draggableOriginEnum.CANVAS;
  },
  isItemsBeingDroppedFromSidebar: function isItemsBeingDroppedFromSidebar(items) {
    var draggableOrigin = this._getDraggableOrigin(items);

    return draggableOrigin === draggableOriginEnum.SIDEBAR;
  },
  isResourcesAreAcceptedByDropZone: function isResourcesAreAcceptedByDropZone(items, accepts) {
    accepts = _.reduce(accepts, function (memo, accept) {
      memo[accept] = true;
      return memo;
    }, {});
    return _.every(items, function (item) {
      return accepts[item.type];
    });
  },
  isDropZoneAcceptsDataIslands: function isDropZoneAcceptsDataIslands(accepts) {
    return accepts.indexOf(schemaEntitiesEnum.DATA_ISLAND) > -1;
  },
  isDropZoneAcceptsSetsAndFields: function isDropZoneAcceptsSetsAndFields(accepts) {
    return accepts.indexOf(schemaEntitiesEnum.PRESENTATION_SET) > -1 && accepts.indexOf(schemaEntitiesEnum.PRESENTATION_FIELD) > -1;
  },
  isMiddleDropZone: function isMiddleDropZone(dropZoneActivator) {
    return dropZoneActivator.which === dropZonePositionEnum.MIDDLE;
  },
  isItemsAreFromSameDataIslandAsDropZone: function isItemsAreFromSameDataIslandAsDropZone(items, dropZoneModel) {
    var itemsDataIslandId = this._getItemsDataIslandId(items);

    return dropZoneModel.dataIslandId === itemsDataIslandId;
  },
  isItemsFromTheSameSourceAsDropZoneDataIsland: function isItemsFromTheSameSourceAsDropZoneDataIsland(items, dropZoneModel) {
    var itemsDataIslandId = this._getItemsDataIslandIdByItemsSource(items);

    return dropZoneModel.dataIslandId === itemsDataIslandId;
  },
  isItemsHaveTheSameSourceAsDataIsland: function isItemsHaveTheSameSourceAsDataIsland(items, dataIslandId) {
    var dataIsland = this.clientDomainSchemaService.getDataIslandById(dataIslandId);
    return _.every(items, function (item) {
      return item.sourceId === dataIsland.sourceId && item.sourceType === dataIsland.sourceType;
    });
  },
  isItemsHaveTheSameSource: function isItemsHaveTheSameSource(items) {
    var sourceIds = _.map(items, function (item) {
      return item.sourceId;
    });

    return _.uniq(sourceIds).length === 1;
  },
  getItemsDataIslandIds: function getItemsDataIslandIds(items) {
    return _.uniq(_.map(items, function (item) {
      return item.dataIslandId;
    }));
  },
  getItemsDataIslandSourceId: function getItemsDataIslandSourceId(items) {
    return _.uniq(_.map(items, function (item) {
      return item.dataIslandSourceId;
    }));
  },
  getResourceIdsInItemsPaths: function getResourceIdsInItemsPaths(items) {
    return _.reduce(items, function (memo, item) {
      var path = item.path,
          splitPath = uriUtil.splitUri(path);

      _.each(splitPath, function (pathFragment) {
        memo[pathFragment] = true;
      });

      return memo;
    }, {});
  },
  getItemsNestingLevel: function getItemsNestingLevel(items) {
    var firstItem = _.first(items);

    return uriUtil.splitUri(firstItem.path).length;
  },
  getItemsConstantGroupId: function getItemsConstantGroupId(items) {
    return _.first(items).calcFieldSourceId;
  },
  _getDraggableOrigin: function _getDraggableOrigin(items) {
    items = _.isArray(items) ? items : [items];
    return _.first(items).origin;
  },
  _getItemsDataIslandId: function _getItemsDataIslandId(items) {
    var firstItem = _.first(items) || {};
    return firstItem.dataIslandId;
  },
  _getItemsDataIslandIdByItemsSource: function _getItemsDataIslandIdByItemsSource(items) {
    var firstItem = _.first(items) || {};

    var dataIsland = _.find(this.clientDomainSchemaService.getDataIslands(), function (dataIsland) {
      return dataIsland.sourceId === firstItem.dataIslandSourceId;
    });

    return dataIsland && dataIsland.id;
  }
});

module.exports = PresentationCanvasDroppableItemsService;

});