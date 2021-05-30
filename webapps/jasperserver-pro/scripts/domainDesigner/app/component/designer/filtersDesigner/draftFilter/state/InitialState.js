define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var clientExpressionsEnum = require("../../../../../model/enum/clientExpressionsEnum");

var filterOperandTypeUtil = require("../../util/filterOperandTypeUtil");

var defaultNewFilterOptions = require("../enum/defaultNewFilterOptions");

var draftFilterStateEnum = require("../enum/draftFilterStateEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var InitialState = function InitialState(options) {
  this.defaultDraftFilterFactory = options.defaultDraftFilterFactory;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.shouldCheckAvailableValuesLoadingForDraftFilterSpecification = options.shouldCheckAvailableValuesLoadingForDraftFilterSpecification;
  this.shouldUseRawValueEditorForDraftFilterSpecification = options.shouldUseRawValueEditorForDraftFilterSpecification;
};

_.extend(InitialState.prototype, {
  enter: function enter(context, stateFactory) {
    var currentFilter = this._getDraftFilter(context.currentFilter);

    var newFilterOptions = this._getNewFilterOptions(currentFilter, context.newFilterOptions);

    context.currentFilter = currentFilter;
    context.newFilterOptions = newFilterOptions;

    if (this.shouldCheckAvailableValuesLoadingForDraftFilterSpecification.isSatisfiedBy(context)) {
      stateFactory.enter(draftFilterStateEnum.CHECK_AVAILABLE_VALUES_STATE, context);
    } else {
      stateFactory.enter(draftFilterStateEnum.GET_RIGHT_OPERAND_STATE, context);
    }
  },
  _getDraftFilter: function _getDraftFilter(currentFilter) {
    currentFilter = this.defaultDraftFilterFactory.create(currentFilter);

    var dataType = this._getDraftFilterDataType(currentFilter);

    return _.extend({}, currentFilter, {
      dataType: dataType
    });
  },
  _getDraftFilterDataType: function _getDraftFilterDataType(currentFilter) {
    var fieldId = currentFilter.expression.left.fieldId || currentFilter.expression.right && currentFilter.expression.right.fieldId;
    return fieldId && this.clientDomainSchemaService.getGenericFiledTypeById(fieldId);
  },
  _getNewFilterOptions: function _getNewFilterOptions(currentFilter, newFilterOptions) {
    var dataType = currentFilter.dataType,
        isRightOperandTypeVariable = newFilterOptions && filterOperandTypeUtil.isVariable(newFilterOptions.rightOperandType);
    var draftFilterOptions = {
      operator: currentFilter.expression.operator,
      rightOperandType: currentFilter.expression.right && currentFilter.expression.right.type
    };

    if (dataType || isRightOperandTypeVariable) {
      newFilterOptions = _.defaults(newFilterOptions || draftFilterOptions, defaultNewFilterOptions);
    } else {
      newFilterOptions = defaultNewFilterOptions;
    }

    newFilterOptions = _.extend({}, newFilterOptions, {
      isRawValueEditor: this.shouldUseRawValueEditorForDraftFilterSpecification.isSatisfiedBy(currentFilter, newFilterOptions),
      operator: this._getAvailableOperator(currentFilter, newFilterOptions)
    });
    return newFilterOptions;
  },
  _getAvailableOperator: function _getAvailableOperator(currentFilter, newFilterOptions) {
    var expression = currentFilter.expression,
        newOperator = newFilterOptions.operator;
    return this._isAtLeastOneFieldSetToOperand(expression) ? newOperator : clientExpressionsEnum.operators.equals.name;
  },
  _isAtLeastOneFieldSetToOperand: function _isAtLeastOneFieldSetToOperand(expression) {
    return expression.left && expression.left.fieldId || expression.right && expression.right.fieldId;
  }
});

module.exports = InitialState;

});