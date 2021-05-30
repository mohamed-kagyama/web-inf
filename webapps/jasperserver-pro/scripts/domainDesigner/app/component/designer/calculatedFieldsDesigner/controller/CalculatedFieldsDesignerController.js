define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var requestCanceledEnum = require("../../../../rest/enum/requestCanceledEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var schemaEntitiesEnum = require("../../../../../model/schema/enum/schemaEntitiesEnum");

var messageTypesEnum = require("../../../../common/component/validation/enum/messageTypesEnum");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var CalculatedFieldsDesignerController = function CalculatedFieldsDesignerController(options) {
  this.initialize(options);
};

_.extend(CalculatedFieldsDesignerController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    _.bindAll(this, '_createCalcFieldAfterSuccessfulValidation', '_updateCalcFieldAfterSuccessfulValidation');

    this.saveConfirmationDialog = options.saveConfirmationDialog;
    this.calculatedFieldsDesignerValidator = options.calculatedFieldsDesignerValidator;
    this.store = options.store;
    this.dialog = options.dialog;
    this.storeChangeEventBus = options.storeChangeEventBus;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.calculatedFieldsDesignerEventBus = options.calculatedFieldsDesignerEventBus;
    this.clientDomainSchemaCalcFieldsService = options.clientDomainSchemaCalcFieldsService;
    this.calculatedFieldsDesignerViewStateModelService = options.calculatedFieldsDesignerViewStateModelService;
    this.expressionBulkUpdateService = options.expressionBulkUpdateService;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    var validateCalcFieldOnCreate = _.bind(this._validateCalcField, this, this._createCalcFieldAfterSuccessfulValidation),
        validateCalcFieldOnUpdate = _.bind(this._validateCalcField, this, this._updateCalcFieldAfterSuccessfulValidation);

    this.listenTo(this.saveConfirmationDialog, 'button:yes', this._onConfirmationDialogYesButtonClick);
    this.listenTo(this.storeChangeEventBus, 'change', this._onExternalStoreChange);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:hide', this._hideDesigner);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:editExpression', this._onEditExpression);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:editName', this._onEditName);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:editType', this._onEditType);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:updateCalcField', validateCalcFieldOnUpdate);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:createCalcField', validateCalcFieldOnCreate);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:validateExpression', this._onValidateExpression);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:cancelValidation', this._onCancelValidation);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:selectOperator', this._onOperatorSelect);
    this.listenTo(this.calculatedFieldsDesignerEventBus, 'designer:addVariableNameToExpression', this._onAddVariableNameToExpression);
  },
  _getErrors: function _getErrors(errors) {
    var currentErrors = this.store.get('errors');
    errors = _.extend({}, currentErrors, errors);
    return errors;
  },
  _onEditType: function _onEditType(type) {
    this.store.set({
      type: type
    });
  },
  _onEditName: function _onEditName(name) {
    var errors = this._getErrors({
      name: ''
    });

    this.store.set({
      name: name,
      errors: errors
    });
  },
  _onEditExpression: function _onEditExpression(options) {
    var errors = this.store.get('errors');

    if (options.expression) {
      errors = this._getErrors({
        expression: {
          message: ''
        }
      });
    }

    options.expression = {
      string: options.expression,
      object: this.store.get('expression').object
    };
    options = _.extend({}, options, {
      errors: errors,
      expressionValidationSuccessMessage: ''
    });
    this.store.set(options);
  },
  _hideDesigner: function _hideDesigner() {
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_HIDE);
  },
  _validateCalcField: function _validateCalcField(onSuccess) {
    var self = this;
    this.store.set('calcFieldValidationInProgress', true);
    this.calculatedFieldsDesignerValidator.validate().done(function (response) {
      var errors = self._getErrors({
        expression: {}
      });

      self._onValidationSuccess(response, onSuccess);

      self.store.set('errors', errors);
    }).fail(function (errors) {
      if (requestCanceledEnum.CANCELED !== errors) {
        errors = self._getErrors(errors);
        self.store.set('errors', errors);
      }
    }).always(function () {
      self.store.set('calcFieldValidationInProgress', false);
    });
  },
  _onValidationSuccess: function _onValidationSuccess(response, onSuccess) {
    var errors = this.store.get('errors'),
        responseCalcFieldType = response.resultType,
        currentType = this.store.get('type');

    this._setFieldReferencesAndExpressionObjectAfterSuccessfulValidation(response);

    if (currentType !== responseCalcFieldType) {
      if (errors.expression.level === messageTypesEnum.WARNING) {
        onSuccess && onSuccess();
      } else {
        var confirmationDialogMessage = i18nMessage('domel.confirmDialog.result.type.do.not.match', currentType, responseCalcFieldType);
        this.saveConfirmationDialog.setContent(confirmationDialogMessage);
        this.saveConfirmationDialog.open();
      }
    } else {
      onSuccess && onSuccess();
    }
  },
  _createCalcFieldAfterSuccessfulValidation: function _createCalcFieldAfterSuccessfulValidation() {
    var context = this.calculatedFieldsDesignerViewStateModelService.getContext();

    var sourceInfo = _.pick(context, ['sourceId', 'sourceType', 'sourceName']);

    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_CREATE_CALCULATED_FIELD, _.extend({
      calcField: this.store.toDTO()
    }, sourceInfo));
  },
  _updateCalcFieldAfterSuccessfulValidation: function _updateCalcFieldAfterSuccessfulValidation() {
    var context = this.calculatedFieldsDesignerViewStateModelService.getContext(),
        originalCalcFieldName = this.store.get('originalName'),
        calcFieldName = this.store.get('name'),
        self = this;

    if (originalCalcFieldName === calcFieldName) {
      this._updateCalcFieldAfterDependentResourcesWithExpressionsUpdate([]);
    } else {
      this.expressionBulkUpdateService.getUpdatedExpressions({
        resourceId: context.calcFieldId,
        resourceType: schemaEntitiesEnum.CALC_FIELD,
        sourceId: context.sourceId,
        originalName: originalCalcFieldName,
        newName: calcFieldName
      }).then(function (resourcesToUpdate) {
        self._updateCalcFieldAfterDependentResourcesWithExpressionsUpdate(resourcesToUpdate);
      });
    }
  },
  _updateCalcFieldAfterDependentResourcesWithExpressionsUpdate: function _updateCalcFieldAfterDependentResourcesWithExpressionsUpdate(resourcesToUpdate) {
    var context = this.calculatedFieldsDesignerViewStateModelService.getContext();
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_UPDATE_CALCULATED_FIELD, {
      calcField: this.store.toDTO(),
      sourceId: context.sourceId,
      sourceType: context.sourceType,
      resources: resourcesToUpdate
    });
  },
  _onConfirmationDialogYesButtonClick: function _onConfirmationDialogYesButtonClick() {
    if (this.store.get('id')) {
      this._updateCalcFieldAfterSuccessfulValidation();
    } else {
      this._createCalcFieldAfterSuccessfulValidation();
    }
  },
  _onCancelValidation: function _onCancelValidation() {
    this.calculatedFieldsDesignerValidator.cancelValidation();
  },
  _onValidateExpression: function _onValidateExpression() {
    var self = this,
        defaultState = this.store.defaults();
    this.store.set({
      'expressionValidationInProgress': true,
      'errors': defaultState.errors,
      'expressionValidationSuccessMessage': defaultState.expressionValidationSuccessMessage
    });
    this.calculatedFieldsDesignerValidator.validateExpression().done(function (response) {
      self._onExpressionValidationSuccess(response);
    }).fail(function (expressionErrors) {
      if (requestCanceledEnum.CANCELED !== expressionErrors) {
        var errors = self._getErrors(expressionErrors);

        self.store.set('errors', errors);
      }
    }).always(function () {
      self.store.set('expressionValidationInProgress', false);
    });
  },
  _onExpressionValidationSuccess: function _onExpressionValidationSuccess(response) {
    var warningMessage,
        errors = this.store.get('errors'),
        responseCalcFieldType = response.resultType,
        currentType = this.store.get('type');

    this._setFieldReferencesAndExpressionObjectAfterSuccessfulValidation(response);

    if (currentType !== responseCalcFieldType) {
      warningMessage = i18nMessage('domel.dialog.result.type.do.not.match', currentType, responseCalcFieldType);
      errors = this._getErrors({
        expression: {
          level: messageTypesEnum.WARNING,
          message: warningMessage
        }
      });
      this.store.set('errors', errors);
    } else {
      errors = this._getErrors({
        expression: {}
      });
      this.store.set({
        errors: errors,
        expressionValidationSuccessMessage: i18nMessage('domain.designer.calcFields.formula.validationSuccess')
      });
    }
  },
  _setFieldReferencesAndExpressionObjectAfterSuccessfulValidation: function _setFieldReferencesAndExpressionObjectAfterSuccessfulValidation(validationResult) {
    var propsToUpdate = {
      fieldReferences: validationResult.fieldReferences,
      expression: validationResult.expression
    };
    this.store.set(propsToUpdate);
  },
  _onExternalStoreChange: function _onExternalStoreChange() {
    var state,
        isVisible = this.calculatedFieldsDesignerViewStateModelService.isDesignerVisible();

    if (isVisible) {
      state = this._getDesignerStateOnDesignerOpen();
      this.store.set(state);
      this.dialog.open();
    } else {
      this.store.set({
        isVisible: isVisible
      });
      this.dialog.close();
    }
  },
  _getDesignerStateOnDesignerOpen: function _getDesignerStateOnDesignerOpen() {
    var state,
        calcField,
        initialState = this.store.defaults(),
        context = this.calculatedFieldsDesignerViewStateModelService.getContext(),
        isVisible = this.calculatedFieldsDesignerViewStateModelService.isDesignerVisible();

    if (context.calcFieldId) {
      calcField = this.clientDomainSchemaCalcFieldsService.getCalculatedFieldJSON(context.calcFieldId);
      state = _.extend(initialState, calcField, {
        originalName: calcField.name,
        isVisible: isVisible,
        isUsedInJoinExpression: this.clientDomainSchemaCalcFieldsService.isCalcFieldUsedInJoinExpression(context.calcFieldId),
        isUsedInComplexJoin: this.clientDomainSchemaCalcFieldsService.isCalcFieldUsedInComplexJoin(context.calcFieldId),
        selectionRange: this._getSelectionRangeByString(calcField.expression.string)
      });
      state.formulaValue = state.expression.string;
      state.formulaSelectionRange = state.selectionRange;
    } else {
      state = _.extend(initialState, {
        name: this.clientDomainSchemaCalcFieldsService.generateCalcFieldName(context),
        isVisible: isVisible
      });
    }

    return state;
  },
  _onOperatorSelect: function _onOperatorSelect(operator) {
    var wrappedOperator, expressionAndRange;
    wrappedOperator = ' ' + operator + ' ';
    expressionAndRange = this._getExpressionWithRangeByString(wrappedOperator);
    this.store.set(expressionAndRange);
  },
  _getExpressionWithRangeByString: function _getExpressionWithRangeByString(string) {
    var expression = this.store.get('expression'),
        expressionString = expression.string,
        selectionRange = this.store.get('selectionRange'),
        start = selectionRange.start,
        end = selectionRange.end;
    expressionString = [expressionString.slice(0, start), string, expressionString.slice(end)].join('');

    var selectionRangeByString = this._getSelectionRangeByString(string, selectionRange);

    return {
      expression: {
        object: expression.object,
        string: expressionString
      },
      formulaValue: expressionString,
      selectionRange: selectionRangeByString,
      formulaSelectionRange: selectionRangeByString
    };
  },
  _getSelectionRangeByString: function _getSelectionRangeByString(string, currentSelectionRange) {
    currentSelectionRange = currentSelectionRange || {
      start: 0,
      end: 0
    };
    var position = currentSelectionRange.start + string.length;
    return {
      start: position,
      end: position
    };
  },
  _onAddVariableNameToExpression: function _onAddVariableNameToExpression(variableName) {
    var expressionAndRange = this._getExpressionWithRangeByString(variableName);

    this.store.set(expressionAndRange);
  }
});

module.exports = CalculatedFieldsDesignerController;

});