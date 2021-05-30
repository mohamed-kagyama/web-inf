define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var Backbone = require('backbone');

var requestCanceledEnum = require("../../../../rest/enum/requestCanceledEnum");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var constantJoinNullExpressionEnum = require("../enum/constantJoinNullExpressionEnum");

var constantJoinExpressionOperatorsEnum = require("../enum/constantJoinExpressionOperatorsEnum");

var fieldTypesToGenericTypesEnum = require("../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

var applicationStateEventsEnum = require("../../../../dispatcher/enum/applicationStateEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var ConstantJoinExpressionsController = function ConstantJoinExpressionsController(options) {
  this.initialize(options);
};

_.extend(ConstantJoinExpressionsController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    _.bindAll(this, '_onUnsuccessfulValidation', '_saveOrUpdateConstantJoinExpression');

    this.saveConstantJoinConfirmationDialog = options.saveConstantJoinConfirmationDialog;
    this.constantJoinExpressionDialogStore = options.constantJoinExpressionDialogStore;
    this.constantJoinExpressionDialog = options.constantJoinExpressionDialog;
    this.constantJoinExpressionConverter = options.constantJoinExpressionConverter;
    this.applicationDispatcherEventBus = options.applicationDispatcherEventBus;
    this.joinsDesignerEventBus = options.joinsDesignerEventBus;
    this.constantJoinExpressionValidator = options.constantJoinExpressionValidator;
    this.constantJoinExpressionFactory = options.constantJoinExpressionFactory;
    this.selectOptionsWithAdditionalPropsFactory = options.selectOptionsWithAdditionalPropsFactory;
    this.clientDomainSchemaJoinsDesignerService = options.clientDomainSchemaJoinsDesignerService;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.joinsDesignerEventBus, 'update:constantJoinExpression', this._onBeforeUpdateConstantJoinExpression);
    this.listenTo(this.joinsDesignerEventBus, 'remove:constantJoinExpression', this._onBeforeRemoveConstantJoinExpression);
    this.listenTo(this.joinsDesignerEventBus, 'show:editConstantJoinExpressionDialog', this._onShowEditConstantJoinExpressionDialog);
    this.listenTo(this.joinsDesignerEventBus, 'show:createConstantJoinExpressionDialog', this._onShowCreateConstantJoinExpressionDialog);
    this.listenTo(this.joinsDesignerEventBus, 'hide:constantJoinExpressionDialog', this._onHideConstantJoinExpressionDialog);
    this.listenTo(this.joinsDesignerEventBus, 'constantJoinExpression:changeExpression', this._validateAndFireDispatcherAction);
    this.listenTo(this.joinsDesignerEventBus, 'constantJoinExpression:changeField', this._changeField);
    this.listenTo(this.joinsDesignerEventBus, 'constantJoinExpression:changeValue', this._changeValue);
    this.listenTo(this.joinsDesignerEventBus, 'constantJoinExpression:changeOperator', this._changeOperator);
    this.listenTo(this.joinsDesignerEventBus, 'constantJoinExpression:validateExpression', this._onClickValidateInDialog);
    this.listenTo(this.joinsDesignerEventBus, 'constantJoinExpression:cancelValidation', this._onValidationCancel);
    this.listenTo(this.saveConstantJoinConfirmationDialog, 'button:yes', this._saveOrUpdateConstantJoinExpression);
  },
  // Before action event handlers
  _onBeforeUpdateConstantJoinExpression: function _onBeforeUpdateConstantJoinExpression(constantJoinExpression, options) {
    var constantJoinExpressionId = constantJoinExpression.id,
        joinId = constantJoinExpression.joinId,
        joinTreeId = constantJoinExpression.joinTreeId;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_CONSTANT_JOIN_EXPRESSION, {
      id: constantJoinExpressionId,
      joinTreeId: joinTreeId,
      joinId: joinId,
      operator: options.operator
    });
  },
  _onBeforeRemoveConstantJoinExpression: function _onBeforeRemoveConstantJoinExpression(constantJoinExpression) {
    var constantJoinExpressionId = constantJoinExpression.id,
        joinTreeId = constantJoinExpression.joinTreeId;
    this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_REMOVE_CONSTANT_JOIN_EXPRESSION, {
      id: constantJoinExpressionId,
      joinTreeId: joinTreeId
    });
  },
  _onShowEditConstantJoinExpressionDialog: function _onShowEditConstantJoinExpressionDialog(options) {
    var constantJoinExpression = options.constantJoinExpression,
        joinId = constantJoinExpression.joinId,
        fields = this.clientDomainSchemaJoinsDesignerService.getFieldsForTablesInJoin(joinId);
    var constantJoinExpressionOptions = this.constantJoinExpressionConverter.getConstantJoinExpressionOptions(_.extend({
      fields: fields
    }, constantJoinExpression));

    this._showConstantJoinExpressionDialog(constantJoinExpressionOptions);
  },
  _onShowCreateConstantJoinExpressionDialog: function _onShowCreateConstantJoinExpressionDialog(options) {
    var joinId = options.join.id,
        fields = this.clientDomainSchemaJoinsDesignerService.getFieldsForTablesInJoin(joinId);
    var constantJoinExpressionOptions = this.constantJoinExpressionConverter.getConstantJoinExpressionOptions({
      joinId: options.join.id,
      fields: fields
    });

    this._showConstantJoinExpressionDialog(constantJoinExpressionOptions);
  },
  _showConstantJoinExpressionDialog: function _showConstantJoinExpressionDialog(constantJoinExpressionOptions) {
    var fieldTypeAndAvailableOperators = this._getFieldTypeAndAvailableOperators({
      field: constantJoinExpressionOptions.field,
      fieldOptions: constantJoinExpressionOptions.fieldOptions
    });

    constantJoinExpressionOptions = _.extend({}, constantJoinExpressionOptions, fieldTypeAndAvailableOperators);
    this.constantJoinExpressionDialogStore.reset();
    this.constantJoinExpressionDialogStore.set(constantJoinExpressionOptions);
    this.constantJoinExpressionDialog.open();
  },
  _getFieldTypeAndAvailableOperators: function _getFieldTypeAndAvailableOperators(options) {
    var field = options.field,
        fieldType = _.find(options.fieldOptions, function (fieldOption) {
      return fieldOption.value === field;
    }).fieldType;

    var availableOperators = this.selectOptionsWithAdditionalPropsFactory.create({
      operators: constantJoinExpressionOperatorsEnum[fieldTypesToGenericTypesEnum[fieldType]]
    });
    return {
      fieldType: fieldType,
      availableOperators: availableOperators
    };
  },
  _onHideConstantJoinExpressionDialog: function _onHideConstantJoinExpressionDialog() {
    this.constantJoinExpressionDialog.close();
  },
  _changeField: function _changeField(value, fieldOptions) {
    var fieldType = _.find(fieldOptions, function (fieldOption) {
      return fieldOption.value === value;
    }).fieldType;

    this._clearValidationErrors();

    this.constantJoinExpressionDialogStore.set({
      field: value,
      fieldType: fieldType
    });
  },
  _changeValue: function _changeValue(value) {
    this._clearValidationErrors();

    this.constantJoinExpressionDialogStore.set({
      value: value
    });
  },
  _changeOperator: function _changeOperator(value) {
    this._clearValidationErrors();

    this.constantJoinExpressionDialogStore.set({
      operator: value
    });
  },
  _validateValueExternally: function _validateValueExternally(modelDTO) {
    var expression = this.constantJoinExpressionFactory.create(modelDTO),
        isLiteral = !expression.variables;
    return this.constantJoinExpressionValidator.validate(expression).then(function (response) {
      return new $.Deferred().resolve(response, isLiteral);
    });
  },
  _onValidationCancel: function _onValidationCancel() {
    this.constantJoinExpressionValidator.cancelValidation();
  },
  _onClickValidateInDialog: function _onClickValidateInDialog() {
    var self = this,
        modelDTO = this.constantJoinExpressionDialogStore.toJSON();
    this.constantJoinExpressionDialogStore.set({
      'expressionValidationInProgress': true,
      'successMessage': '',
      'errorMessage': '',
      'warningMessage': ''
    });

    this._validateValueExternally(modelDTO).done(function (response, isLiteral) {
      self._onExpressionValidationSuccess({
        response: response,
        isLiteral: isLiteral,
        modelDTO: modelDTO
      });
    }).fail(this._onUnsuccessfulValidation).always(function () {
      self.constantJoinExpressionDialogStore.set('expressionValidationInProgress', false);
    });
  },
  _validateAndFireDispatcherAction: function _validateAndFireDispatcherAction() {
    var self = this,
        modelDTO = this.constantJoinExpressionDialogStore.toJSON();
    this.constantJoinExpressionDialogStore.set({
      'constantJoinValidationInProgress': true
    });

    this._validateValueExternally(modelDTO).done(function (response, isLiteral) {
      self._onValidationSuccess({
        response: response,
        isLiteral: isLiteral,
        modelDTO: modelDTO,
        callback: self._saveOrUpdateConstantJoinExpression
      });
    }).fail(this._onUnsuccessfulValidation).always(function () {
      self.constantJoinExpressionDialogStore.set('constantJoinValidationInProgress', false);
    });
  },
  _validateInternally: function _validateInternally(options) {
    var response = options.response,
        modelDTO = options.modelDTO,
        isLiteral = options.isLiteral,
        resultType = response.resultType,
        fieldType = modelDTO.fieldType,
        successCallback = options.success,
        failCallback = options.fail;
    var isWrongResultType = resultType !== fieldType;
    var isNullValue = JSON.stringify(response.expression.object) === constantJoinNullExpressionEnum.NULL_EXPRESSION;

    if (isLiteral && isWrongResultType && !isNullValue) {
      failCallback && failCallback();
    } else {
      successCallback && successCallback();
    }
  },
  _onValidationSuccess: function _onValidationSuccess(options) {
    var response = options.response,
        modelDTO = options.modelDTO,
        callback = options.callback,
        resultType = response.resultType,
        fieldType = modelDTO.fieldType;
    var self = this;

    this._validateInternally(_.extend(_.omit(options, 'callback'), {
      success: callback,
      fail: function fail() {
        if (self.constantJoinExpressionDialogStore.get('warningMessage')) {
          callback && callback();
        } else {
          var confirmationDialogMessage = i18nMessage('domel.confirmDialog.result.type.do.not.match', resultType, fieldType);
          self.saveConstantJoinConfirmationDialog.setContent(confirmationDialogMessage);
          self.saveConstantJoinConfirmationDialog.open();
        }
      }
    }));
  },
  _onExpressionValidationSuccess: function _onExpressionValidationSuccess(options) {
    var warningMessage,
        response = options.response,
        modelDTO = options.modelDTO,
        resultType = response.resultType,
        fieldType = modelDTO.fieldType;
    var self = this;
    this.constantJoinExpressionDialogStore.set('errorMessage', '');

    this._validateInternally(_.extend({}, options, {
      success: function success() {
        self.constantJoinExpressionDialogStore.set('successMessage', i18nMessage('domain.validation.constantJoinExpressionValue.successful'));
      },
      fail: function fail() {
        warningMessage = i18nMessage('domel.dialog.result.type.do.not.match', resultType, fieldType);
        self.constantJoinExpressionDialogStore.set('warningMessage', warningMessage);
      }
    }));
  },
  _saveOrUpdateConstantJoinExpression: function _saveOrUpdateConstantJoinExpression() {
    var modelDTO = this.constantJoinExpressionDialogStore.toJSON();
    this.joinsDesignerEventBus.trigger('hide:constantJoinExpressionDialog');

    if (modelDTO.id) {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_CONSTANT_JOIN_EXPRESSION, modelDTO);
    } else {
      this.applicationDispatcherEventBus.trigger(applicationStateEventsEnum.JOINS_DESIGNER_CREATE_CONSTANT_JOIN_EXPRESSION, modelDTO);
    }
  },
  _onUnsuccessfulValidation: function _onUnsuccessfulValidation(errorMessage) {
    if (errorMessage !== requestCanceledEnum.CANCELED) {
      this.constantJoinExpressionDialogStore.set('errorMessage', errorMessage);
    }
  },
  _clearValidationErrors: function _clearValidationErrors() {
    this.constantJoinExpressionDialogStore.set({
      'errorMessage': '',
      'successMessage': '',
      'warningMessage': ''
    });
  }
});

module.exports = ConstantJoinExpressionsController;

});