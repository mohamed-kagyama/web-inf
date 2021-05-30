define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerController = function FiltersDesignerController(options) {
  this._init(options);
};

_.extend(FiltersDesignerController.prototype, Backbone.Events, {
  _init: function _init(options) {
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.filtersDesignerEventBus = options.filtersDesignerEventBus;
    this.filtersDesignerSchemaToViewModelConverter = options.filtersDesignerSchemaToViewModelConverter;
    this.filtersDesignerViewModelToStoreConverter = options.filtersDesignerViewModelToStoreConverter;
    this.cache = options.cache;
    this.store = options.store;
    this.filtersDesignerDraftFilterFactory = options.filtersDesignerDraftFilterFactory;
    this.filtersDesignerOnEditFilterConverter = options.filtersDesignerOnEditFilterConverter;
    this.clientDomainSchemaFiltersService = options.clientDomainSchemaFiltersService;
    this.availableValuesCacheCleaner = options.availableValuesCacheCleaner;
    this.notEmptyTablesSpecification = options.notEmptyTablesSpecification;
    this.isResourceDroppableIntoCanvasDroppableAreaSpecification = options.isResourceDroppableIntoCanvasDroppableAreaSpecification;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.storeChangeEventBus, 'change', this._onChangeState);
    this.listenTo(this.filtersDesignerEventBus, 'canvas:scroll', this._onCanvasScroll);
    this.listenTo(this.filtersDesignerEventBus, 'window:resize', this._onWindowResize);
    this.listenTo(this.filtersDesignerEventBus, 'filter:edit', this._onFilterEdit);
    this.listenTo(this.filtersDesignerEventBus, 'filter:remove', this._onFilterRemove);
    this.listenTo(this.filtersDesignerEventBus, 'filter:addEmpty', this._onAddFilter);
  },
  _onChangeState: function _onChangeState(state) {
    var viewState = state.viewState,
        currentDesigner = viewState.getCurrentDesigner(),
        currentResource = viewState.getCurrentResource(currentDesigner),
        isInitialDroppableZoneActive = currentResource && this.isResourceDroppableIntoCanvasDroppableAreaSpecification.isSatisfiedBy(currentResource),
        isEmptyDataStructure = this.notEmptyTablesSpecification.isSatisfied();
    this.store.set({
      'currentDesigner': currentDesigner,
      'isInitialDroppableZoneActive': isInitialDroppableZoneActive,
      'isEmptyDataStructure': isEmptyDataStructure
    });

    if (this._isDesignerVisible()) {
      this._updateModelFromState(state);

      this._updateStore();
    }
  },
  _onCanvasScroll: function _onCanvasScroll(scrollPos) {
    this._updateStore({
      scrollPos: scrollPos
    });
  },
  _onWindowResize: function _onWindowResize(canvasHeight) {
    this._updateStore({
      canvasHeight: canvasHeight
    });
  },
  _updateModelFromState: function _updateModelFromState(state) {
    this.cache.add('collection', this.filtersDesignerSchemaToViewModelConverter.convert(state));
  },
  _updateStore: function _updateStore(options) {
    var updatedStore = this.filtersDesignerViewModelToStoreConverter.convert(_.extend({
      store: this.store,
      collection: this.cache.get('collection')
    }, options));
    this.store.set(updatedStore);
  },
  _isDesignerVisible: function _isDesignerVisible() {
    var store = this.store;
    return store.get('currentDesigner') === store.get('ownDesigner');
  },
  _onFilterEdit: function _onFilterEdit(options) {
    var currentFilter = this.clientDomainSchemaFiltersService.getFilterById(options.id),
        self = this;
    this.availableValuesCacheCleaner.clean();
    this.filtersDesignerOnEditFilterConverter.convert(currentFilter).then(function (draftFilter) {
      self.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_EDIT_DRAFT_FILTER, draftFilter);
    });
  },
  _onFilterRemove: function _onFilterRemove(options) {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_REMOVE_FILTER, options);
  },
  _onAddFilter: function _onAddFilter() {
    var self = this;
    this.availableValuesCacheCleaner.clean();

    var draftFilterWithoutRightOperand = this._createDraftFilterStateWithoutRightOperand();

    return this.filtersDesignerDraftFilterFactory.create(draftFilterWithoutRightOperand).then(function (draftFilter) {
      self.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_SET_DRAFT_FILTER, draftFilter);
    });
  },
  _createDraftFilterStateWithoutRightOperand: function _createDraftFilterStateWithoutRightOperand() {
    return {
      expression: {
        left: {
          type: filterOperandTypesEnum.VARIABLE
        }
      }
    };
  }
});

module.exports = FiltersDesignerController;

});