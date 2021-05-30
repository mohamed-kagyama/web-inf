define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var entityUtil = require("../../../../../model/schema/util/entityUtil");

var operandSideEnum = require("../enum/operandSideEnum");

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var filterOperandTypeUtil = require("../util/filterOperandTypeUtil");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerDraftFilterController = function FiltersDesignerDraftFilterController(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerDraftFilterController.prototype, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.filtersDesignerEventBus = options.filtersDesignerEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.filtersDesignerViewStateModelService = options.filtersDesignerViewStateModelService;
    this.filtersDesignerDraftFilterValidator = options.filtersDesignerDraftFilterValidator;
    this.filtersDesignerOnSaveDraftFilterConverter = options.filtersDesignerOnSaveDraftFilterConverter;
    this.filtersDesignerDraftFilterFactory = options.filtersDesignerDraftFilterFactory;
    this.filterExpressionOperatorByRightOperandTypeFactory = options.filterExpressionOperatorByRightOperandTypeFactory;
    this.availableValuesCacheCleaner = options.availableValuesCacheCleaner;
    this.errorsCache = options.errorsCache;
    this.availableValuesRequestSuccessCache = options.availableValuesRequestSuccessCache;
    this.clientDomainSchemaService = options.clientDomainSchemaService;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:left:over', this._onLeftSideOver);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:left:out', this._onLeftSideOut);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:right:over', this._onRightSideOver);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:right:out', this._onRightSideOut);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:left:removeField', this._onLeftFieldRemove);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:right:removeField', this._onRightFieldRemove);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:left:drop', this._onLeftSideDrop);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:right:drop', this._onRightSideDrop);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:cancel', this._onCancelFilter);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:edit', this._onEditFilter);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:changeValue', this._onChangeValue);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:operator:change', this._onOperatorChange);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:valueEditor:singleSelect', this._switchValueEditorToSingleSelect);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:valueEditor:input', this._switchValueEditorToInput);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:valueEditor:fieldToField', this._switchValueEditorToFieldToField);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:valueEditor:fieldToValue', this._switchValueEditorToFieldToValue);
    this.listenTo(this.filtersDesignerEventBus, 'draftFilter:variables:swap', this._swapVariables);
  },
  _switchValueEditorToSingleSelect: function _switchValueEditorToSingleSelect() {
    this._switchRawAndSingleSelectValueEditor(false);
  },
  _switchValueEditorToInput: function _switchValueEditorToInput() {
    this._switchRawAndSingleSelectValueEditor(true);
  },
  _switchRawAndSingleSelectValueEditor: function _switchRawAndSingleSelectValueEditor(isRawValueEditor) {
    var newFilterOptions = this._getSwitchValueEditorOptions(filterOperandTypesEnum.LITERAL),
        draftFilter = this.filtersDesignerViewStateModelService.getDraftFilterState();

    newFilterOptions = _.extend({}, newFilterOptions, {
      isRawValueEditor: isRawValueEditor
    });
    draftFilter = this._clearValidationErrors(draftFilter);

    this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
  },
  _swapVariables: function _swapVariables() {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState(),
        draftFilter = this._getDraftFilterWithSwappedVariables(currentFilterDraftState),
        newFilterOptions = this._getNewFilterOptionsFromExistingFilter(draftFilter);

    this.availableValuesCacheCleaner.clean();

    this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
  },
  _getDraftFilterWithSwappedVariables: function _getDraftFilterWithSwappedVariables(draftFilter) {
    var leftOperand = draftFilter.expression.left,
        rightOperand = draftFilter.expression.right;
    return _.extend({}, draftFilter, {
      expression: _.extend({}, draftFilter.expression, {
        left: rightOperand,
        right: leftOperand
      })
    });
  },
  _switchValueEditorToFieldToField: function _switchValueEditorToFieldToField() {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState();
    var rightOperandIsNotYetAField = !filterOperandTypeUtil.isVariable(currentFilterDraftState.expression.right.type);

    if (rightOperandIsNotYetAField) {
      var newFilterOptions = this._getSwitchValueEditorOptions(filterOperandTypesEnum.VARIABLE),
          draftFilter = this.filtersDesignerViewStateModelService.getDraftFilterState();

      draftFilter = this._clearValidationErrors(draftFilter);

      this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
    }
  },
  _switchValueEditorToFieldToValue: function _switchValueEditorToFieldToValue() {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState();
    var rightOperandIsAField = filterOperandTypeUtil.isVariable(currentFilterDraftState.expression.right.type);

    if (rightOperandIsAField) {
      var newFilterOptions = this._getSwitchValueEditorOptions(filterOperandTypesEnum.LITERAL),
          draftFilter = this.filtersDesignerViewStateModelService.getDraftFilterState();

      draftFilter = this._clearValidationErrors(draftFilter);

      this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
    }
  },
  _getSwitchValueEditorOptions: function _getSwitchValueEditorOptions(rightOperandType) {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState();
    var operator = this.filterExpressionOperatorByRightOperandTypeFactory.create({
      operator: currentFilterDraftState.expression.operator,
      operandType: rightOperandType,
      dataType: currentFilterDraftState.dataType
    });
    return {
      operator: operator,
      rightOperandType: rightOperandType
    };
  },
  _onCancelFilter: function _onCancelFilter() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_CANCEL_DRAFT_FILTER);
  },
  _onEditFilter: function _onEditFilter() {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState(),
        validationErrors = currentFilterDraftState && this.filtersDesignerDraftFilterValidator.validate(currentFilterDraftState);

    if (!validationErrors) {
      currentFilterDraftState = this.filtersDesignerOnSaveDraftFilterConverter.convert(currentFilterDraftState);

      if (currentFilterDraftState.id) {
        this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_UPDATE_FILTER, currentFilterDraftState);
      } else {
        this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_ADD_FILTER, currentFilterDraftState);
      }
    } else {
      currentFilterDraftState = this._setValidationErrors(currentFilterDraftState, validationErrors);
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_SET_DRAFT_FILTER, currentFilterDraftState);
    }
  },
  _onOperatorChange: function _onOperatorChange(newFilterOptions) {
    // clean available values errors and first success request to initiate available values load
    this.availableValuesCacheCleaner.cleanAvailableValuesErrorsCache();
    this.availableValuesCacheCleaner.cleanAvailableValuesFirstRequestSuccessCache();
    var draftFilter = this.filtersDesignerViewStateModelService.getDraftFilterState();
    draftFilter = this._clearValidationErrors(draftFilter);

    this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
  },
  _onChangeValue: function _onChangeValue(value) {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState();
    currentFilterDraftState.expression.right = _.extend({}, currentFilterDraftState.expression.right, value);
    currentFilterDraftState = this._clearValidationErrors(currentFilterDraftState);
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_SET_DRAFT_FILTER, currentFilterDraftState);
  },
  _onLeftSideOver: function _onLeftSideOver() {
    this.store.get('runtime').left.over = true;
  },
  _onLeftSideOut: function _onLeftSideOut() {
    this.store.get('runtime').left.over = false;
  },
  _onRightSideOver: function _onRightSideOver() {
    this.store.get('runtime').right.over = true;
  },
  _onRightSideOut: function _onRightSideOut() {
    this.store.get('runtime').right.over = false;
  },
  _onLeftFieldRemove: function _onLeftFieldRemove() {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState(),
        expression = currentFilterDraftState.expression;

    var draftFilter = _.extend({}, currentFilterDraftState, {
      expression: _.extend({}, expression, {
        left: {
          type: filterOperandTypesEnum.VARIABLE
        }
      })
    });

    var newFilterOptions = this._getNewFilterOptionsFromExistingFilter(draftFilter);

    draftFilter = this._clearValidationErrors(draftFilter);
    return this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
  },
  _onRightFieldRemove: function _onRightFieldRemove() {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState(),
        newFilterOptions = {
      operator: currentFilterDraftState.expression.operator,
      rightOperandType: filterOperandTypesEnum.VARIABLE
    };

    var draftFilter = _.extend({}, currentFilterDraftState, {
      expression: _.omit(currentFilterDraftState.expression, 'right')
    });

    return this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
  },
  _getNewFilterOptionsFromExistingFilter: function _getNewFilterOptionsFromExistingFilter(draftFilter) {
    var expression = draftFilter.expression;
    return {
      rightOperandType: expression.right.type,
      operator: expression.operator
    };
  },
  _onLeftSideDrop: function _onLeftSideDrop(resource) {
    this.availableValuesCacheCleaner.clean();

    this._onLeftSideOut();

    var draftFilter = this._getDraftFilterOnDrop(resource, operandSideEnum.LEFT);

    var newFilterOptions = this._getNewFilterOptionsFromExistingFilter(draftFilter);

    if (filterOperandTypeUtil.isLiteral(draftFilter.expression.right.type)) {
      draftFilter.expression.right = _.omit(draftFilter.expression.right, 'value');
    }

    this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
  },
  _onRightSideDrop: function _onRightSideDrop(resource) {
    this._onRightSideOut();

    var draftFilter = this._getDraftFilterOnDrop(resource, operandSideEnum.RIGHT);

    var newFilterOptions = this._getNewFilterOptionsFromExistingFilter(draftFilter);

    this._createAndSetNewDraftFilter(draftFilter, newFilterOptions);
  },
  _getDraftFilterOnDrop: function _getDraftFilterOnDrop(resource, operandSide) {
    var currentFilterDraftState = this.filtersDesignerViewStateModelService.getDraftFilterState(),
        isOperandSideLeft = operandSide === operandSideEnum.LEFT,
        rightOperand = currentFilterDraftState.expression[operandSideEnum.RIGHT],
        isRightOperandVariable = rightOperand.type === filterOperandTypesEnum.VARIABLE,
        shouldUseFieldToFieldValueEditor = this._shouldUseFiledToFieldValueEditor(resource);

    currentFilterDraftState.isRawValueEditor = false;

    _.extend(currentFilterDraftState.expression[operandSide], {
      type: filterOperandTypesEnum.VARIABLE,
      fieldId: resource.resourceId,
      fieldType: resource.type,
      sourceId: resource.sourceId,
      sourceType: resource.sourceType
    });

    if (isOperandSideLeft && !isRightOperandVariable && shouldUseFieldToFieldValueEditor) {
      currentFilterDraftState.expression[operandSideEnum.RIGHT] = {
        type: filterOperandTypesEnum.VARIABLE
      };
    }

    return currentFilterDraftState;
  },
  _shouldUseFiledToFieldValueEditor: function _shouldUseFiledToFieldValueEditor(resource) {
    return entityUtil.isConstantGroup(resource.sourceType);
  },
  _clearValidationErrors: function _clearValidationErrors(currentFilterDraftState) {
    return _.extend({}, currentFilterDraftState, {
      errors: {}
    });
  },
  _setValidationErrors: function _setValidationErrors(currentFilterDraftState, validationErrors) {
    currentFilterDraftState.errors.left = validationErrors.left || {};
    currentFilterDraftState.errors.right = validationErrors.right || {};
    return currentFilterDraftState;
  },
  _createAndSetNewDraftFilter: function _createAndSetNewDraftFilter(draftFilter, newFilterOptions) {
    var self = this;
    this.filtersDesignerDraftFilterFactory.create(draftFilter, newFilterOptions).then(function (currentFilterDraftState) {
      self.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.FILTERS_DESIGNER_SET_DRAFT_FILTER, currentFilterDraftState);
    });
  }
}, Backbone.Events);

module.exports = FiltersDesignerDraftFilterController;

});