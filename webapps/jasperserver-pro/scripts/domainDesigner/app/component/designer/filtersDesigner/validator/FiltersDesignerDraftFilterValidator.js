define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var genericTypes = require("../../../../../model/schema/enum/genericTypesEnum");

var filterOperandTypesEnum = require("../../../../../model/schema/enum/filterOperandTypesEnum");

var fieldTypesToGenericTypesEnum = require("../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

var filterOperandTypeUtil = require("../util/filterOperandTypeUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var FiltersDesignerDraftFilterValidator = function FiltersDesignerDraftFilterValidator(options) {
  this.initialize(options);
};

_.extend(FiltersDesignerDraftFilterValidator.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.validationRulesRunner = options.validationRulesRunner;
    this.validatorConfig = options.validatorConfig;
  },
  validate: function validate(filterDraftState) {
    var leftOperandType = filterDraftState.expression.left.type,
        rightOperandType = filterDraftState.expression.right.type;

    if (!filterOperandTypeUtil.isVariable(leftOperandType)) {
      throw new Error('Expression\'s left operand should be variable.');
    }

    if (_.isUndefined(filterDraftState.expression.left.fieldId)) {
      throw new Error('Expression\'s left operand isn\'t specified.');
    }

    if (filterOperandTypeUtil.isLiteral(rightOperandType)) {
      return this._validateFieldToLiteralFilter(filterDraftState);
    } else if (filterOperandTypeUtil.isRange(rightOperandType)) {
      return this._validateFieldToRangeFilter(filterDraftState);
    } else {
      return false;
    }
  },
  _validateFieldToRangeFilter: function _validateFieldToRangeFilter(filterDraftState) {
    var errorMessage = {},
        rightOperand = filterDraftState.expression.right,
        operator = filterDraftState.expression.operator,
        leftFieldId = filterDraftState.expression.left.fieldId,
        leftField = this.clientDomainSchemaService.getFieldById(leftFieldId),
        leftFieldType = leftField.type,
        genericFieldType = fieldTypesToGenericTypesEnum[leftFieldType];
    var rangeStartValue = rightOperand.start.value,
        rangeEndValue = rightOperand.end.value;

    var rangeStartErrorMessage = this._validateRightOperandValue({
      rightOperandValue: rangeStartValue,
      operator: operator,
      leftFieldType: leftFieldType,
      genericFieldType: genericFieldType
    }),
        rangeEndErrorMessage = this._validateRightOperandValue({
      rightOperandValue: rangeEndValue,
      leftFieldType: leftFieldType,
      operator: operator,
      genericFieldType: genericFieldType
    });

    if (rangeStartErrorMessage || rangeEndErrorMessage) {
      errorMessage = {
        start: rangeStartErrorMessage,
        end: rangeEndErrorMessage
      };
    }

    var rangeErrorMessage = this._validateRangeByFilterType({
      rightOperand: rightOperand,
      leftFieldType: leftFieldType,
      genericFieldType: genericFieldType
    }) || {};
    rangeErrorMessage = _.extend({}, errorMessage, rangeErrorMessage);

    if (rangeErrorMessage.start || rangeErrorMessage.end) {
      return this._getFilterErrorMessage({
        startErrorMessage: rangeErrorMessage.start,
        endErrorMessage: rangeErrorMessage.end
      });
    }
  },
  _validateRangeByFilterType: function _validateRangeByFilterType(options) {
    var rightOperand = options.rightOperand,
        leftFieldType = options.leftFieldType,
        genericFieldType = options.genericFieldType;

    if (genericFieldType === genericTypes.INTEGER) {
      return this._isIntegerRangeValid(rightOperand, leftFieldType);
    } else if (genericFieldType === genericTypes.DECIMAL) {
      return this._isDecimalRangeValid(rightOperand, leftFieldType);
    } else if (genericFieldType === genericTypes.DATE) {
      return this._isDateRangeValid(rightOperand, leftFieldType);
    } else if (genericFieldType === genericTypes.TIME) {
      return this._isTimeRangeValid(rightOperand, leftFieldType);
    } else if (genericFieldType === genericTypes.TIMESTAMP) {
      return this._isTimestampRangeValid(rightOperand, leftFieldType);
    }

    return false;
  },
  _isIntegerRangeValid: function _isIntegerRangeValid(rightOperand) {
    return this._validateRangeRightOperandByType(rightOperand, genericTypes.INTEGER);
  },
  _isDecimalRangeValid: function _isDecimalRangeValid(rightOperand) {
    return this._validateRangeRightOperandByType(rightOperand, genericTypes.DECIMAL);
  },
  _isDateRangeValid: function _isDateRangeValid(rightOperand) {
    return this._validateRangeRightOperandByType(rightOperand, genericTypes.DATE);
  },
  _isTimeRangeValid: function _isTimeRangeValid(rightOperand) {
    return this._validateRangeRightOperandByType(rightOperand, genericTypes.TIME);
  },
  _isTimestampRangeValid: function _isTimestampRangeValid(rightOperand) {
    return this._validateRangeRightOperandByType(rightOperand, genericTypes.TIMESTAMP);
  },
  _validateRangeRightOperandByType: function _validateRangeRightOperandByType(rightOperand, type) {
    var validator = this._getValidatorForRangeByType(type);

    return validator.validate(rightOperand);
  },
  // FIELD TO LITERAL VALIDATION
  _validateFieldToLiteralFilter: function _validateFieldToLiteralFilter(filterDraftState) {
    var rightOperand = filterDraftState.expression.right,
        operator = filterDraftState.expression.operator,
        leftFieldId = filterDraftState.expression.left.fieldId,
        leftField = this.clientDomainSchemaService.getFieldById(leftFieldId),
        leftFieldType = leftField.type,
        genericFieldType = fieldTypesToGenericTypesEnum[leftFieldType],
        rightOperandValue = rightOperand.value;

    var errorMessage = this._validateRightOperandValue({
      rightOperandValue: rightOperandValue,
      leftFieldType: leftFieldType,
      operator: operator,
      genericFieldType: genericFieldType
    });

    if (errorMessage) {
      return this._getFilterErrorMessage({
        errorMessage: errorMessage
      });
    }
  },
  _validateRightOperandValue: function _validateRightOperandValue(options) {
    var genericFieldType = options.genericFieldType;

    if (genericFieldType === genericTypes.INTEGER) {
      return this._isRightOperandInteger(options);
    } else if (genericFieldType === genericTypes.DECIMAL) {
      return this._isRightOperandDecimal(options);
    } else if (genericFieldType === genericTypes.DATE) {
      return this._isRightOperandDate(options);
    } else if (genericFieldType === genericTypes.TIME) {
      return this._isRightOperandTime(options);
    } else if (genericFieldType === genericTypes.TIMESTAMP) {
      return this._isRightOperandTimestamp(options);
    } else if (genericFieldType === genericTypes.BOOLEAN) {
      return this._isRightOperandBoolean(options);
    }

    return false;
  },
  _isRightOperandInteger: function _isRightOperandInteger(options) {
    return this._validateLiteralRightOperandValue({
      rightOperandValue: options.rightOperandValue,
      operator: options.operator,
      type: genericTypes.INTEGER,
      filterType: options.leftFieldType
    });
  },
  _isRightOperandDecimal: function _isRightOperandDecimal(options) {
    return this._validateLiteralRightOperandValue({
      rightOperandValue: options.rightOperandValue,
      operator: options.operator,
      type: genericTypes.DECIMAL,
      filterType: options.leftFieldType
    });
  },
  _isRightOperandDate: function _isRightOperandDate(options) {
    return this._validateLiteralRightOperandValue({
      rightOperandValue: options.rightOperandValue,
      operator: options.operator,
      type: genericTypes.DATE,
      filterType: options.leftFieldType
    });
  },
  _isRightOperandTime: function _isRightOperandTime(options) {
    return this._validateLiteralRightOperandValue({
      rightOperandValue: options.rightOperandValue,
      operator: options.operator,
      type: genericTypes.TIME,
      filterType: options.leftFieldType
    });
  },
  _isRightOperandTimestamp: function _isRightOperandTimestamp(options) {
    return this._validateLiteralRightOperandValue({
      rightOperandValue: options.rightOperandValue,
      operator: options.operator,
      type: genericTypes.TIMESTAMP,
      filterType: options.leftFieldType
    });
  },
  _isRightOperandBoolean: function _isRightOperandBoolean(options) {
    return this._validateLiteralRightOperandValue({
      rightOperandValue: options.rightOperandValue,
      operator: options.operator,
      type: genericTypes.BOOLEAN,
      filterType: options.leftFieldType
    });
  },
  _validateLiteralRightOperandValue: function _validateLiteralRightOperandValue(options) {
    var validator = this._getValidatorForLiteralByType(options.type);

    return validator.validate(options.rightOperandValue, {
      filterType: options.filterType,
      operator: options.operator
    });
  },
  _getValidatorForLiteralByType: function _getValidatorForLiteralByType(type) {
    return this.validatorConfig[filterOperandTypesEnum.LITERAL][type];
  },
  _getValidatorForRangeByType: function _getValidatorForRangeByType(type) {
    return this.validatorConfig[filterOperandTypesEnum.RANGE][type];
  },
  _getFilterErrorMessage: function _getFilterErrorMessage(errorObject) {
    if (errorObject) {
      return {
        right: errorObject
      };
    }
  }
});

module.exports = FiltersDesignerDraftFilterValidator;

});