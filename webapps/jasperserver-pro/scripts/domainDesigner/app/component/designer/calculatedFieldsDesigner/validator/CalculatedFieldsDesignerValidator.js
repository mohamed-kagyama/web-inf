define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var requestCanceledEnum = require("../../../../rest/enum/requestCanceledEnum");

var messageTypesEnum = require("../../../../common/component/validation/enum/messageTypesEnum");

var collectFieldReferencesUsedInExpressionUtil = require("./util/collectFieldReferencesUsedInExpressionUtil");

var errorHandlingUtil = require("../../../../rest/errorHandling/errorHandlingUtil");

var errorMessageUtil = require("../../../../rest/errorHandling/errorMessageUtil");

var domElErrorEnum = require("./enum/domElErrorEnum");

var errorCodeToErrorLevelEnum = require("./enum/errorCodeToErrorLevelEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var CalculatedFieldsDesignerValidator = function CalculatedFieldsDesignerValidator(options) {
  this.initialize(options);
};

_.extend(CalculatedFieldsDesignerValidator.prototype, {
  initialize: function initialize(options) {
    this.store = options.store;
    this.validationService = options.validationService;
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
    this.calculatedFieldsDesignerViewStateModelService = options.calculatedFieldsDesignerViewStateModelService;
    this.domainSchemaGranularSpecs = options.domainSchemaGranularSpecs;
  },
  validate: function validate() {
    var self = this;
    this.validationDfd = new $.Deferred();

    var nameValidationResult = this._validateName();

    this._validateExpression().then(function (validationResult) {
      if (nameValidationResult.name) {
        self.validationDfd.reject(nameValidationResult);
      } else {
        self.validationDfd.resolve(validationResult);
      }
    }).then(null, function (expressionValidationResult) {
      self.validationDfd.reject(_.extend({}, expressionValidationResult, nameValidationResult));
    });

    return this.validationDfd.promise();
  },
  validateExpression: function validateExpression() {
    this.validationDfd = new $.Deferred();
    return this._validateExpression(this.validationDfd);
  },
  cancelValidation: function cancelValidation() {
    this.validationDfd && this.validationDfd.reject(requestCanceledEnum.CANCELED);
  },
  validateName: function validateName() {
    return this._validateName();
  },
  // private methods
  _validateName: function _validateName() {
    var name = this.store.get('name'),
        context = this.calculatedFieldsDesignerViewStateModelService.getContext(),
        errorMessage = '';

    if (!this.domainSchemaGranularSpecs.calcFieldNameCanNotBeEmpty(name)) {
      errorMessage = i18nMessage('domain.designer.calcFields.name.cannotBeEmpty');
    } else if (!this.domainSchemaGranularSpecs.resourceNameShouldNotContainForbiddenCharacters(name)) {
      errorMessage = i18nMessage('domain.designer.calcFields.name.cannotContainInvalidCharacters');
    } else if (!this.domainSchemaGranularSpecs.calcFieldNameShouldBeUniqueThroughOtherFieldNamesOnSameLevel(context, name)) {
      errorMessage = i18nMessage('domain.designer.calcFields.name.alreadyInUse');
    }

    return {
      name: errorMessage
    };
  },
  _validateExpression: function _validateExpression(dfd) {
    var self = this;
    dfd = dfd || new $.Deferred();

    if (this.store.get('expression').string) {
      this._validateIfCalcFieldHaveDependentFiltersWhenDataTypeHasChanged().then(function () {
        return self._validateExpressionExternally();
      }).then(function (validationResult) {
        return _.extend({}, validationResult, {
          fieldReferences: self._getFieldReferencesUsedInExpression(validationResult)
        });
      }).then(function (options) {
        return self._validateIfCalcFieldCanHaveConstantExpression(options);
      }).then(function (options) {
        dfd.resolve(options);
      }).then(null, function (errorResponse) {
        var errorMessage = self._getExpressionErrorMessageOnValidationFail(errorResponse);

        dfd.reject({
          expression: errorMessage
        });
      });
    } else {
      dfd.reject({
        expression: {
          message: i18nMessage('domain.designer.calcFields.formula.cannotBeEmpty'),
          level: messageTypesEnum.ERROR
        }
      });
    }

    return dfd.promise();
  },
  _validateIfCalcFieldHaveDependentFiltersWhenDataTypeHasChanged: function _validateIfCalcFieldHaveDependentFiltersWhenDataTypeHasChanged() {
    var dfd = new $.Deferred(),
        id = this.store.get('id'),
        type = this.store.get('type');

    if (id && this.domainSchemaGranularSpecs.calcFieldDataTypeCanNotBeChangedIfThereAreDependentFilters(id, type)) {
      dfd.reject({
        expression: {
          message: i18nMessage('domain.designer.calcFields.calcFieldUsedInFilterExpression'),
          level: messageTypesEnum.ERROR
        }
      });
    } else {
      dfd.resolve();
    }

    return dfd;
  },
  _validateIfCalcFieldCanHaveConstantExpression: function _validateIfCalcFieldCanHaveConstantExpression(validationResult) {
    var dfd = new $.Deferred(),
        isCalcFieldUsedInJoinExpression = this.store.get('isUsedInJoinExpression'),
        isCalcFieldUsedInComplexJoin = this.store.get('isUsedInComplexJoin'),
        usedFieldIds = validationResult.fieldReferences.map(function (fieldReference) {
      return fieldReference.fieldId;
    }),
        isFieldsUsedByCalcFieldAreConstants = this.clientDomainSchemaCalcFieldsService.isFieldsUsedByCalcFieldAreConstants(usedFieldIds);

    if ((isCalcFieldUsedInJoinExpression || isCalcFieldUsedInComplexJoin) && isFieldsUsedByCalcFieldAreConstants) {
      dfd.reject({
        expression: {
          message: i18nMessage('domain.designer.calcFields.formula.cannotBeAConstant'),
          level: messageTypesEnum.ERROR
        }
      });
    } else {
      dfd.resolve(validationResult);
    }

    return dfd.promise();
  },
  _validateExpressionExternally: function _validateExpressionExternally() {
    var context = this._getCalcFieldValidationContext(),
        expression = this.store.get('expression').string;

    var options = {
      expression: {
        string: expression
      },
      variables: context
    };
    return this.validationService.validateDOMEl(options);
  },
  _getCalcFieldValidationContext: function _getCalcFieldValidationContext() {
    var context = this.calculatedFieldsDesignerViewStateModelService.getContext(),
        variables = this.clientDomainSchemaCalcFieldsService.getCalcFieldValidationContext(context);
    return variables.allowed.map(this._calcFieldValidationContextVariableMapper);
  },
  _calcFieldValidationContextVariableMapper: function _calcFieldValidationContextVariableMapper(variable) {
    return _.pick(variable, ['name', 'type']);
  },
  _getExpressionErrorMessageOnValidationFail: function _getExpressionErrorMessageOnValidationFail(errorResponse) {
    var errorMessage;

    if (errorResponse.expression) {
      errorMessage = errorResponse.expression;
    } else if (errorResponse.responseJSON.errorCode === domElErrorEnum.UNDEF_VAR_OR_CIRCULAR_REF_ERROR_CODE) {
      errorMessage = this._getUndefVarOrCircularRefErrorMessage(errorResponse);
    } else {
      errorMessage = this._getExpressionErrorMessage(errorResponse);
    }

    return errorMessage;
  },
  _getUndefVarOrCircularRefErrorMessage: function _getUndefVarOrCircularRefErrorMessage(errorResponse) {
    var errors = errorHandlingUtil.getErrors(errorResponse),
        error = _.first(errors),
        undefinedVariables = error.parameters,
        forbiddenVars = this._groupForbiddenCalcFieldsByName();

    var circularReferences = undefinedVariables.filter(function (param) {
      return forbiddenVars[param.value];
    });

    if (circularReferences.length > 0) {
      return {
        message: i18nMessage('domain.designer.calcFields.formula.circularReference', circularReferences),
        level: messageTypesEnum.ERROR
      };
    } else {
      return this._getExpressionErrorMessage(errorResponse);
    }
  },
  _getExpressionErrorMessage: function _getExpressionErrorMessage(xhr) {
    var errors = errorHandlingUtil.getErrors(xhr),
        errorCode = _.first(errors).errorCode,
        message = errorMessageUtil.getFirstErrorMessage(xhr);

    return {
      message: message,
      level: errorCodeToErrorLevelEnum[errorCode] || messageTypesEnum.ERROR
    };
  },
  _getFieldReferencesUsedInExpression: function _getFieldReferencesUsedInExpression(validationResult) {
    var context = this.calculatedFieldsDesignerViewStateModelService.getContext(),
        validationContext = this.clientDomainSchemaCalcFieldsService.getCalcFieldValidationContext(context);
    return collectFieldReferencesUsedInExpressionUtil(validationResult.expression, validationContext);
  },
  _groupForbiddenCalcFieldsByName: function _groupForbiddenCalcFieldsByName() {
    var context = this.calculatedFieldsDesignerViewStateModelService.getContext(),
        variables = this.clientDomainSchemaCalcFieldsService.getCalcFieldValidationContext(context);
    return _.indexBy(variables.forbidden, 'name');
  }
});

module.exports = CalculatedFieldsDesignerValidator;

});