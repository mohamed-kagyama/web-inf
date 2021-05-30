define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../model/schema/util/entityUtil");

var defaultValueUtil = require("../util/defaultValueUtil");

var viewStateModelDefaultsEnum = require("../enum/viewStateModelDefaultsEnum");

var canvasViewDesignersEnum = require("../enum/canvasViewDesignersEnum");

var movePresentationItemsPositionEnum = require("../../component/designer/presentationDesigner/moveItems/enum/movePresentationItemsPositionEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var PRESENTATION_DESIGNER = canvasViewDesignersEnum.PRESENTATION_DESIGNER;

var PresentationDesignerViewStateModelService = function PresentationDesignerViewStateModelService(options) {
  _.bindAll(this, 'isPresentationSidebarItemSelected', '_isPresentationSidebarItemSelected', 'isPresentationItemSelected', '_isPresentationItemSelected');

  this.presentationItemsSelectionFactory = options.presentationItemsSelectionFactory;
  this.presentationSidebarSelectionFactory = options.presentationSidebarSelectionFactory;
  this.viewStateModel = options.viewStateModel;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
};

_.extend(PresentationDesignerViewStateModelService.prototype, {
  getPresentationDesignerDropZoneActivator: function getPresentationDesignerDropZoneActivator() {
    return _.cloneDeep(this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'dropZoneActivator'));
  },
  getPresentationSidebarSelectedItems: function getPresentationSidebarSelectedItems() {
    return this._getPresentationSidebarSelectedItems();
  },
  getPresentationSidebarSelectionParentId: function getPresentationSidebarSelectionParentId() {
    return this._getPresentationSidebarSelectionParentId();
  },
  getPresentationSidebarSelectionSize: function getPresentationSidebarSelectionSize() {
    var items = this._getPresentationSidebarSelectedItems();

    return items.length;
  },
  getPresentationSidebarRangeSelectionStartItem: function getPresentationSidebarRangeSelectionStartItem() {
    var items = this._getPresentationSidebarSelectedItems();

    return _.find(items, function (item) {
      return item.rangeSelectionStartItem;
    });
  },
  isPresentationSidebarItemSelected: function isPresentationSidebarItemSelected(item) {
    return this._isPresentationSidebarItemSelected(item);
  },
  isPresentationSidebarSelectionEmpty: function isPresentationSidebarSelectionEmpty() {
    return this._isPresentationSidebarSelectionEmpty();
  },
  canSelectPresentationSidebarItem: function canSelectPresentationSidebarItem(item) {
    return !this._isPresentationSidebarItemSelected(item) || this._isMoreThanOneItemInPresentationSidebarSelection();
  },
  canTogglePresentationSidebarSelection: function canTogglePresentationSidebarSelection(item) {
    return this._canTogglePresentationSidebarSelection(item);
  },
  getPresentationDesignerCanvasSearchKeyword: function getPresentationDesignerCanvasSearchKeyword() {
    var searchKeywordProperty = this.viewStateModel.getSearchKeyword(PRESENTATION_DESIGNER);
    return _.cloneDeep(searchKeywordProperty.canvas);
  },
  getSidebarSearchKeyword: function getSidebarSearchKeyword() {
    var sidebarSearchKeyword = this.viewStateModel.getSidebarSearchKeyword(PRESENTATION_DESIGNER);
    return _.cloneDeep(sidebarSearchKeyword);
  },
  getPresentationCanvasSelectedItems: function getPresentationCanvasSelectedItems() {
    return this._getPresentationCanvasSelectedItems();
  },
  getPresentationCanvasSelectionParentId: function getPresentationCanvasSelectionParentId() {
    return this._getPresentationCanvasSelectionParentId();
  },
  getPresentationItemsRangeSelectionStartItem: function getPresentationItemsRangeSelectionStartItem() {
    var items = this._getPresentationCanvasSelectedItems();

    return _.find(items, function (item) {
      return item.rangeSelectionStartItem;
    });
  },
  getPresentationItemsSelectionSize: function getPresentationItemsSelectionSize() {
    return this._getPresentationItemsSelectionSize();
  },
  canEnableAddPresentationSetButton: function canEnableAddPresentationSetButton() {
    var selectedItems = this._getPresentationCanvasSelectedItems(),
        item = selectedItems[0];

    if (this._getPresentationItemsSelectionSize() === 1) {
      return entityUtil.isDataIsland(item.type) || entityUtil.isPresentationSet(item.type);
    }

    return false;
  },
  getItemsCountOnSelectedLevel: function getItemsCountOnSelectedLevel() {
    return this._getItemsCountOnSelectedLevel();
  },
  getEnabledButtonsForPresentationMoving: function getEnabledButtonsForPresentationMoving() {
    var selectedItems = this._getPresentationCanvasSelectedItems(),
        itemsCountOnSelectedLevel = this._getItemsCountOnSelectedLevel(); // get positions of selected items
    // this will be an array with values as the positions of the selected items
    // get positions of selected items
    // this will be an array with values as the positions of the selected items


    var positionsOfSelectedItems = _.reduce(selectedItems, function (memo, selectedItem) {
      if (selectedItem) {
        memo.push(selectedItem.index);
      }

      return memo;
    }, []); // now, decide which buttons may be enabled
    // now, decide which buttons may be enabled


    var enabledButtons = {};
    var firstSelectedItemPosition = positionsOfSelectedItems[0];
    var lastSelectedItemPosition = positionsOfSelectedItems[positionsOfSelectedItems.length - 1];
    var topDirection = lastSelectedItemPosition > positionsOfSelectedItems.length - 1;
    enabledButtons[movePresentationItemsPositionEnum.MOVE_TOP] = topDirection;
    enabledButtons[movePresentationItemsPositionEnum.MOVE_UP] = topDirection;
    var bottomDirection = firstSelectedItemPosition < itemsCountOnSelectedLevel - positionsOfSelectedItems.length;
    enabledButtons[movePresentationItemsPositionEnum.MOVE_DOWN] = bottomDirection;
    enabledButtons[movePresentationItemsPositionEnum.MOVE_BOTTOM] = bottomDirection;
    return enabledButtons;
  },
  getNewPresentationSidebarSelection: function getNewPresentationSidebarSelection(items, options) {
    var selection = this._getPresentationSidebarSelection();

    options = _.extend({
      items: items,
      selection: selection,
      isItemSelected: this._isPresentationSidebarItemSelected
    }, options);
    return this.presentationSidebarSelectionFactory.create(options);
  },
  getNewPresentationItemsSelection: function getNewPresentationItemsSelection(items, options) {
    var selection = this._getPresentationItemsSelection();

    options = _.extend({
      items: items,
      selection: selection,
      isItemSelected: this._isPresentationItemSelected
    }, options);
    return this.presentationItemsSelectionFactory.create(options);
  },
  getCellsWidth: function getCellsWidth() {
    return this.viewStateModel.getDesignerSpecificRuntimeProperty(PRESENTATION_DESIGNER, 'cellsWidth');
  },
  canSelectPresentationItem: function canSelectPresentationItem(item) {
    return !this._isPresentationItemSelected(item) || this._isMoreThanOneItemInPresentationSelection();
  },
  canTogglePresentationItemSelection: function canTogglePresentationItemSelection(item) {
    return this._canTogglePresentationItemSelection(item);
  },
  isPresentationItemSelected: function isPresentationItemSelected(item) {
    return this._isPresentationItemSelected(item);
  },
  isPresentationItemsSelectionEmpty: function isPresentationItemsSelectionEmpty() {
    var items = this._getPresentationCanvasSelectedItems();

    return _.isEmpty(items);
  },
  isPresentationItemSingleSelectShouldBePerformedOnDrag: function isPresentationItemSingleSelectShouldBePerformedOnDrag(item) {
    return !this._isPresentationItemSelected(item);
  },
  isPresentationItemMultiSelectShouldBePerformedOnDrag: function isPresentationItemMultiSelectShouldBePerformedOnDrag(item) {
    var isItemSelected = this._isPresentationItemSelected(item),
        canToggleItemSelection = this._canTogglePresentationItemSelection(item);

    return canToggleItemSelection && !isItemSelected;
  },
  isPresentationSidebarSingleSelectShouldBePerformedOnDrag: function isPresentationSidebarSingleSelectShouldBePerformedOnDrag(item) {
    return !this._isPresentationSidebarItemSelected(item);
  },
  isPresentationSidebarMultiSelectShouldBePerformedOnDrag: function isPresentationSidebarMultiSelectShouldBePerformedOnDrag(item) {
    var isItemSelected = this._isPresentationSidebarItemSelected(item),
        canToggleItemSelection = this._canTogglePresentationSidebarSelection(item);

    return canToggleItemSelection && !isItemSelected;
  },
  isDataIslandExpanded: function isDataIslandExpanded(dataIslandId) {
    var dataIsland = this._getDataIsland(dataIslandId),
        defaultValue = this._getDefaultPresentationItemsNodeExpandedState();

    var property = viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.NODE_EXPANSION.property;
    return defaultValueUtil.getPropertyValueOrDefault(dataIsland, property, defaultValue);
  },
  isPresentationSetExpanded: function isPresentationSetExpanded(presentationSetId) {
    var presentationSet = this._getPresentationSet(presentationSetId),
        defaultValue = this._getDefaultPresentationItemsNodeExpandedState();

    var property = viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.NODE_EXPANSION.property;
    return defaultValueUtil.getPropertyValueOrDefault(presentationSet, property, defaultValue);
  },
  isDataIslandPropertiesEditorExpanded: function isDataIslandPropertiesEditorExpanded(dataIslandId) {
    var dataIsland = this._getDataIsland(dataIslandId);

    var defaultValue = this._getDefaultPresentationItemsEditorExpandedState(),
        property = viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PROPERTY_EDITOR_EXPANSION.property;

    return defaultValueUtil.getPropertyValueOrDefault(dataIsland, property, defaultValue);
  },
  isPresentationSetPropertiesEditorExpanded: function isPresentationSetPropertiesEditorExpanded(presentationSetId) {
    var presentationSet = this._getPresentationSet(presentationSetId);

    var defaultValue = this._getDefaultPresentationItemsEditorExpandedState(),
        property = viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PROPERTY_EDITOR_EXPANSION.property;

    return defaultValueUtil.getPropertyValueOrDefault(presentationSet, property, defaultValue);
  },
  isPresentationFieldPropertiesEditorExpanded: function isPresentationFieldPropertiesEditorExpanded(presentationFieldId) {
    var presentationField = this._getPresentationField(presentationFieldId);

    var defaultValue = this._getDefaultPresentationItemsEditorExpandedState(),
        property = viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PROPERTY_EDITOR_EXPANSION.property;

    return defaultValueUtil.getPropertyValueOrDefault(presentationField, property, defaultValue);
  },
  getPresentationDesignerColumnSet: function getPresentationDesignerColumnSet() {
    return this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'columnSet');
  },
  // private methods
  _getPresentationSidebarSelectedItems: function _getPresentationSidebarSelectedItems() {
    var selection = this._getPresentationSidebarSelection();

    return this._sortSelectionByIndex(selection.items);
  },
  _getPresentationSidebarSelectionSize: function _getPresentationSidebarSelectionSize() {
    var items = this._getPresentationSidebarSelectedItems();

    return items.length;
  },
  _getPresentationSidebarSelection: function _getPresentationSidebarSelection() {
    return _.cloneDeep(this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'sidebarSelection'));
  },
  _getPresentationSidebarSelectionParentId: function _getPresentationSidebarSelectionParentId() {
    var selection = this._getPresentationSidebarSelection();

    return selection.parentId;
  },
  _isPresentationSidebarItemSelected: function _isPresentationSidebarItemSelected(item) {
    var selection = this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'sidebarSelection');
    return selection.items[item.id];
  },
  _isPresentationSidebarSelectionEmpty: function _isPresentationSidebarSelectionEmpty() {
    var items = this._getPresentationSidebarSelectedItems();

    return _.isEmpty(items);
  },
  _isMoreThanOneItemInPresentationSidebarSelection: function _isMoreThanOneItemInPresentationSidebarSelection() {
    return this._getPresentationSidebarSelectionSize() > 1;
  },
  _isPresentationSidebarItemOnSameLevelAsSelection: function _isPresentationSidebarItemOnSameLevelAsSelection(item) {
    var parentId = this._getPresentationSidebarSelectionParentId();

    return parentId === item.parentId;
  },
  _canTogglePresentationSidebarSelection: function _canTogglePresentationSidebarSelection(item) {
    return this._isPresentationSidebarSelectionEmpty() || this._isPresentationSidebarItemOnSameLevelAsSelection(item);
  },
  _getPresentationItemsSelection: function _getPresentationItemsSelection() {
    var selection = this.viewStateModel.getCurrentSelection(PRESENTATION_DESIGNER);
    return _.cloneDeep(selection);
  },
  _getPresentationCanvasSelectedItems: function _getPresentationCanvasSelectedItems() {
    var selection = this._getPresentationItemsSelection();

    return this._sortSelectionByIndex(selection.items);
  },
  _getPresentationCanvasSelectionParentId: function _getPresentationCanvasSelectionParentId() {
    var selection = this._getPresentationItemsSelection();

    return selection.parentId;
  },
  _getPresentationItemsSelectionSize: function _getPresentationItemsSelectionSize() {
    var items = this._getPresentationCanvasSelectedItems();

    return items.length;
  },
  _getItemsCountOnSelectedLevel: function _getItemsCountOnSelectedLevel() {
    var selection = this._getPresentationItemsSelection(),
        selectedItemsCount = this._getPresentationItemsSelectionSize(),
        parentId = selection.parentId;

    if (selectedItemsCount === 0) {
      return 0;
    } else if (!parentId) {
      return this.clientDomainSchemaService.getDataIslandsSize();
    } else {
      return this.clientDomainSchemaService.getPresentationItemChildrenSize(parentId);
    }
  },
  _isPresentationItemSelected: function _isPresentationItemSelected(item) {
    var selection = this.viewStateModel.getCurrentSelection(PRESENTATION_DESIGNER);
    return selection.items[item.id];
  },
  _isMoreThanOneItemInPresentationSelection: function _isMoreThanOneItemInPresentationSelection() {
    return this._getPresentationItemsSelectionSize() > 1;
  },
  _isPresentationItemOnSameLevelAsSelection: function _isPresentationItemOnSameLevelAsSelection(item) {
    var parentId = this._getPresentationCanvasSelectionParentId();

    return parentId === item.parentId;
  },
  _canTogglePresentationItemSelection: function _canTogglePresentationItemSelection(item) {
    return this.isPresentationItemsSelectionEmpty() || this._isPresentationItemOnSameLevelAsSelection(item);
  },
  _getDefaultPresentationItemsNodeExpandedState: function _getDefaultPresentationItemsNodeExpandedState() {
    return this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'defaultPresentationItemsNodeExpandedState');
  },
  _getDefaultPresentationItemsEditorExpandedState: function _getDefaultPresentationItemsEditorExpandedState() {
    return this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'defaultPresentationItemsEditorExpandedState');
  },
  _getDataIsland: function _getDataIsland(dataIslandId) {
    var dataIslands = this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'dataIslands');
    return defaultValueUtil.getPropertyValueOrDefault(dataIslands, dataIslandId, viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.DATA_ISLAND.value);
  },
  _getPresentationSet: function _getPresentationSet(presentationSetId) {
    var presentationSets = this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'presentationSets');
    return defaultValueUtil.getPropertyValueOrDefault(presentationSets, presentationSetId, viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PRESENTATION_SET.value);
  },
  _getPresentationField: function _getPresentationField(presentationFieldId) {
    var presentationFields = this.viewStateModel.getDesignerSpecificProperty(PRESENTATION_DESIGNER, 'presentationFields');
    return defaultValueUtil.getPropertyValueOrDefault(presentationFields, presentationFieldId, viewStateModelDefaultsEnum.PRESENTATION_DESIGNER.PRESENTATION_FIELD.value);
  },
  _sortSelectionByIndex: function _sortSelectionByIndex(items) {
    return _.sortBy(items, function (item) {
      return item.index;
    });
  }
});

module.exports = PresentationDesignerViewStateModelService;

});