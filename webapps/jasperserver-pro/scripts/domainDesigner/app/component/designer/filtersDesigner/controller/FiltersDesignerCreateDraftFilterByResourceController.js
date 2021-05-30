define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var Backbone = require('backbone');

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerCreateDraftFilterByResourceController = function FiltersDesignerCreateDraftFilterByResourceController(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerCreateDraftFilterByResourceController.prototype, {
  initialize: function initialize(options) {
    this.isResourceDroppableIntoCanvasDroppableAreaSpecification = options.isResourceDroppableIntoCanvasDroppableAreaSpecification;
    this.filtersDesignerViewStateModelService = options.filtersDesignerViewStateModelService;
    this.filtersDesignerStore = options.filtersDesignerStore;
    this.filtersDesignerEventBus = options.filtersDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.filtersDesignerDraftFilterFactory = options.filtersDesignerDraftFilterFactory;
    this.availableValuesCacheCleaner = options.availableValuesCacheCleaner;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.filtersDesignerEventBus, 'canvasDroppableArea:drop sidebar:doubleClickItem sidebar:onVirtualData:drop', this._onAddDraftFilter);
  },
  _shouldUseFiledToFieldValueEditor: function _shouldUseFiledToFieldValueEditor(resource) {
    return entityUtil.isConstantGroup(resource.sourceType);
  },
  _onAddDraftFilter: function _onAddDraftFilter(resource) {
    var draftFilterState = this.filtersDesignerViewStateModelService.getDraftFilterState();

    if (!_.isEmpty(draftFilterState)) {
      return;
    }

    if (resource) {
      var isResourceDroppable = this.isResourceDroppableIntoCanvasDroppableAreaSpecification.isSatisfiedBy(resource),
          self = this;

      if (isResourceDroppable) {
        this.availableValuesCacheCleaner.clean();

        var draftFilterWithoutRightOperand = this._createDraftFilterStateWithoutRightOperand(resource),
            newFilterOptions = this._createNewFilterOptions(resource);

        return this.filtersDesignerDraftFilterFactory.create(draftFilterWithoutRightOperand, newFilterOptions).then(function (draftFilter) {
          self.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_SET_DRAFT_FILTER, draftFilter);
        });
      }
    }
  },
  _createNewFilterOptions: function _createNewFilterOptions(resource) {
    return {
      rightOperandType: this._shouldUseFiledToFieldValueEditor(resource) ? filterOperandTypesEnum.VARIABLE : filterOperandTypesEnum.LITERAL
    };
  },
  _createDraftFilterStateWithoutRightOperand: function _createDraftFilterStateWithoutRightOperand(resource) {
    return {
      expression: {
        left: {
          type: filterOperandTypesEnum.VARIABLE,
          fieldId: resource.resourceId,
          fieldType: resource.type,
          sourceId: resource.sourceId,
          sourceType: resource.sourceType
        }
      }
    };
  }
}, Backbone.Events);

module.exports = FiltersDesignerCreateDraftFilterByResourceController;

});