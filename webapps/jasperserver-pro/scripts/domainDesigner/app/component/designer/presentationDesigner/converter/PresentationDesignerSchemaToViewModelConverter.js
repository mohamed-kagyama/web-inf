define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var presentationDesignerDataIslandComponentsVisibilityUtil = require("../util/presentationDesignerDataIslandComponentsVisibilityUtil");

var presentationFieldsAggregationsEnum = require("../../../../model/enum/presentationFieldsAggregationsEnum");

var fieldTypesToGenericTypesEnum = require("../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

var genericTypeToMeasureOrDimensionEnum = require("../../../../model/enum/genericTypeToMeasureOrDimensionEnum");

var genericTypeToMasksEnum = require("../../../../model/enum/genericTypeToMasksEnum");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PresentationDesignerSchemaToViewModelConverter = function PresentationDesignerSchemaToViewModelConverter(options) {
  this.settings = options.settings;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.presentationDesignerViewStateModelService = options.presentationDesignerViewStateModelService;
  this.presentationDesignerDropZoneActivatorFactory = options.presentationDesignerDropZoneActivatorFactory;
};

_.extend(PresentationDesignerSchemaToViewModelConverter.prototype, {
  convert: function convert(state) {
    return this._convertDataIslands(state);
  },
  _convertDataIslands: function _convertDataIslands(state) {
    var collections = state.dataStore,
        dataIslands = collections.dataIslands,
        self = this,
        lastRow,
        lastDataIslandIndex;
    var searchKeyword = this.presentationDesignerViewStateModelService.getPresentationDesignerCanvasSearchKeyword(),
        cellsWidth = this.presentationDesignerViewStateModelService.getCellsWidth(),
        columnSet = this.presentationDesignerViewStateModelService.getPresentationDesignerColumnSet();
    var models = dataIslands.reduce(function (memo, dataIsland, index) {
      var result = self._convertDataIsland({
        dataIsland: dataIsland,
        index: index,
        searchKeyword: searchKeyword,
        cellsWidth: cellsWidth,
        columnSet: columnSet,
        collections: collections
      });

      memo = memo.concat(result);
      lastDataIslandIndex = index;
      return memo;
    }, []);

    var lastItem = _.last(models);

    if (lastItem) {
      lastItem.dropZoneActivators.bottom = null;
      lastRow = this._getLastRow(lastItem, lastDataIslandIndex);
    }

    return models.concat(lastRow || []);
  },
  _getHeight: function _getHeight(isPropertiesEditorExpanded) {
    return isPropertiesEditorExpanded ? this.settings.height.EXPANDED_ITEM : this.settings.height.COLLAPSED_ITEM;
  },
  _convertDataIsland: function _convertDataIsland(options) {
    var dataIsland = options.dataIsland,
        dataIslandId = dataIsland.getId(),
        searchKeyword = options.searchKeyword,
        cellsWidth = options.cellsWidth,
        columnSet = options.columnSet,
        collections = options.collections;
    var result = [];
    var nestingLevel = 1;
    var isSelected = this.presentationDesignerViewStateModelService.isPresentationItemSelected({
      id: dataIsland.getId()
    });
    var isExpanded = this.presentationDesignerViewStateModelService.isDataIslandExpanded(dataIsland.getId());
    var isPropertiesEditorExpanded = this.presentationDesignerViewStateModelService.isDataIslandPropertiesEditorExpanded(dataIsland.getId());

    var dataIslandJSON = _.extend({
      index: options.index,
      modelType: schemaEntitiesEnum.DATA_ISLAND,
      isExpanded: isExpanded,
      isPropertiesEditorExpanded: isPropertiesEditorExpanded,
      columnSet: columnSet,
      nestingLevel: nestingLevel,
      isSelected: isSelected,
      parentId: '',
      dataIslandId: '',
      height: this._getHeight(isPropertiesEditorExpanded)
    }, dataIsland.toJSON(), cellsWidth);

    var isParentVisible = presentationDesignerDataIslandComponentsVisibilityUtil.isDataIslandVisible(searchKeyword, dataIslandJSON);
    dataIslandJSON.dropZoneActivators = this.presentationDesignerDropZoneActivatorFactory.create(dataIslandJSON);

    var children = this._convertPresentationItemChildren({
      children: dataIsland.getChildren(),
      nestingLevel: nestingLevel + 1,
      searchKeyword: searchKeyword,
      isParentVisible: isParentVisible,
      parentId: dataIslandId,
      isParentExpanded: dataIslandJSON.isExpanded,
      dataIslandId: dataIslandId,
      cellsWidth: cellsWidth,
      columnSet: columnSet,
      collections: collections
    });

    var isVisible = isParentVisible || _.size(children) > 0;

    if (isVisible) {
      result.push(dataIslandJSON);
    }

    if (isExpanded) {
      result = result.concat(children);
    }

    return result;
  },
  _convertPresentationItemChildren: function _convertPresentationItemChildren(options) {
    var children = options.children,
        self = this;
    var baseConvertOptions = {
      nestingLevel: options.nestingLevel,
      searchKeyword: options.searchKeyword,
      isParentVisible: options.isParentVisible,
      parentId: options.parentId,
      dataIslandId: options.dataIslandId,
      cellsWidth: options.cellsWidth,
      columnSet: options.columnSet,
      collections: options.collections
    };
    return children.reduce(function (memo, child, index) {
      var result = [];

      if (entityUtil.isPresentationSet(child)) {
        result = self._convertPresentationSet(_.extend(baseConvertOptions, {
          index: index,
          presentationSet: child
        }));
      } else if (entityUtil.isPresentationField(child)) {
        result = self._convertPresentationField(_.extend(baseConvertOptions, {
          index: index,
          presentationField: child
        }));
      }

      memo = memo.concat(result);
      return memo;
    }, []);
  },
  _convertPresentationSet: function _convertPresentationSet(options) {
    var presentationSet = options.presentationSet,
        nestingLevel = options.nestingLevel,
        searchKeyword = options.searchKeyword,
        isParentVisible = options.isParentVisible,
        parentId = options.parentId,
        dataIslandId = options.dataIslandId,
        collections = options.collections,
        cellsWidth = options.cellsWidth,
        columnSet = options.columnSet;
    var result = [];
    var isSelected = this.presentationDesignerViewStateModelService.isPresentationItemSelected({
      id: presentationSet.getId()
    });
    var isExpanded = this.presentationDesignerViewStateModelService.isPresentationSetExpanded(presentationSet.getId());
    var isPropertiesEditorExpanded = this.presentationDesignerViewStateModelService.isPresentationSetPropertiesEditorExpanded(presentationSet.getId());

    var presentationSetJSON = _.extend({
      index: options.index,
      nestingLevel: nestingLevel,
      parentId: parentId,
      modelType: schemaEntitiesEnum.PRESENTATION_SET,
      dataIslandId: dataIslandId,
      isExpanded: isExpanded,
      isPropertiesEditorExpanded: isPropertiesEditorExpanded,
      columnSet: columnSet,
      isSelected: isSelected,
      height: this._getHeight(isPropertiesEditorExpanded)
    }, presentationSet.toJSON(), cellsWidth);

    isParentVisible = isParentVisible || presentationDesignerDataIslandComponentsVisibilityUtil.isPresentationSetVisible(searchKeyword, presentationSetJSON);
    presentationSetJSON.dropZoneActivators = this.presentationDesignerDropZoneActivatorFactory.create(presentationSetJSON);

    var children = this._convertPresentationItemChildren({
      children: presentationSet.getChildren(),
      nestingLevel: nestingLevel + 1,
      searchKeyword: searchKeyword,
      isParentVisible: isParentVisible,
      parentId: presentationSetJSON.id,
      isParentExpanded: presentationSetJSON.isExpanded,
      dataIslandId: dataIslandId,
      cellsWidth: cellsWidth,
      columnSet: columnSet,
      collections: collections
    });

    var isVisible = isParentVisible || _.size(children) > 0;

    if (isVisible) {
      result.push(presentationSetJSON);
    }

    if (isExpanded) {
      result = result.concat(children);
    }

    return result;
  },
  _convertPresentationField: function _convertPresentationField(options) {
    var collections = options.collections,
        nestingLevel = options.nestingLevel,
        presentationField = options.presentationField,
        field = collections.fields.byId(presentationField.getFieldId()),
        valueType = field.type,
        genericValueType = fieldTypesToGenericTypesEnum[valueType],
        searchKeyword = options.searchKeyword,
        isParentVisible = options.isParentVisible,
        parentId = options.parentId,
        dataIslandId = options.dataIslandId,
        cellsWidth = options.cellsWidth,
        masksForGenericType = genericTypeToMasksEnum[genericValueType];

    var basePresentationFieldJSON = _.defaults(presentationField.toJSON(), {
      aggregation: presentationFieldsAggregationsEnum[genericValueType].defaults.value,
      kind: genericTypeToMeasureOrDimensionEnum[genericValueType]
    });

    if (masksForGenericType) {
      basePresentationFieldJSON = _.defaults(basePresentationFieldJSON, {
        mask: masksForGenericType.defaults.value
      });
    }

    var isPropertiesEditorExpanded = this.presentationDesignerViewStateModelService.isPresentationFieldPropertiesEditorExpanded(presentationField.getId());

    var presentationFieldJSON = _.extend({
      nestingLevel: nestingLevel,
      index: options.index,
      parentId: parentId,
      modelType: schemaEntitiesEnum.PRESENTATION_FIELD,
      dataIslandId: dataIslandId,
      valueType: genericValueType,
      isPropertiesEditorExpanded: isPropertiesEditorExpanded,
      columnSet: this.presentationDesignerViewStateModelService.getPresentationDesignerColumnSet(),
      height: this._getHeight(isPropertiesEditorExpanded)
    }, basePresentationFieldJSON, cellsWidth);

    presentationFieldJSON.isSelected = this.presentationDesignerViewStateModelService.isPresentationItemSelected(presentationFieldJSON);
    var isVisible = isParentVisible || presentationDesignerDataIslandComponentsVisibilityUtil.isPresentationFieldVisible(searchKeyword, presentationFieldJSON);
    presentationFieldJSON.dropZoneActivators = this.presentationDesignerDropZoneActivatorFactory.create(presentationFieldJSON);
    return isVisible ? [presentationFieldJSON] : [];
  },
  _getLastRow: function _getLastRow(lastItem, lastDataIslandIndex) {
    var ownerId = lastItem.id,
        isOwnerDataIsland = !lastItem.dataIslandId,
        isOwnerConstantDataIsland = isOwnerDataIsland && this.clientDomainSchemaService.isConstantDataIsland(ownerId);
    return {
      lastItemIndex: lastItem.index + 1,
      lastDataIslandIndex: lastDataIslandIndex + 1,
      isOwnerLeaf: entityUtil.isPresentationField(lastItem.modelType),
      isOwnerExpanded: Boolean(lastItem.isExpanded),
      isOwnerDataIsland: isOwnerDataIsland,
      isOwnerConstantDataIsland: isOwnerConstantDataIsland,
      ownerId: ownerId,
      parentId: lastItem.parentId || ownerId,
      dataIslandId: lastItem.dataIslandId || ownerId,
      isLastRow: true,
      height: this.settings.height.LAST_ROW,
      padding: this.settings.height.LAST_ROW_PADDING
    };
  }
});

module.exports = PresentationDesignerSchemaToViewModelConverter;

});