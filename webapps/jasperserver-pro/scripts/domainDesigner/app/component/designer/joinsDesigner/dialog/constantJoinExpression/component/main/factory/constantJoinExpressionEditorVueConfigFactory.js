define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/constantJoinExpressionEditorVueTemplate.htm");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var i18nComputed = require("../../../../../../../../common/vue/computed/i18nComputed");

var messageTypesEnum = require("../../../../../../../../common/component/validation/enum/messageTypesEnum");

var constantJoinExpressionOperatorsEnum = require("../../../../../enum/constantJoinExpressionOperatorsEnum");

var fieldTypesToGenericTypesEnum = require("../../../../../../../../../model/schema/enum/fieldTypesToGenericTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
var CREATE_CONSTANT_JOIN_DIALOG_TITLE = i18nMessage('domain.designer.joinsDesigner.constantJoinExpression.dialog.title.create');
var UPDATE_CONSTANT_JOIN_DIALOG_TITLE = i18nMessage('domain.designer.joinsDesigner.constantJoinExpression.dialog.title.update');
var CREATE_CONSTANT_JOIN_BUTTON_LABEL = i18nMessage('domain.designer.joinsDesigner.constantJoinExpression.dialog.button.create');
var UPDATE_CONSTANT_JOIN_BUTTON_LABEL = i18nMessage('domain.designer.joinsDesigner.constantJoinExpression.dialog.button.update');
var CREATE_CONSTANT_JOIN_DIALOG_HEADER_MESSAGE = i18nMessage('domain.designer.joinsDesigner.constantJoinExpression.dialog.headerMessage.create');
var UPDATE_CONSTANT_JOIN_DIALOG_HEADER_MESSAGE = i18nMessage('domain.designer.joinsDesigner.constantJoinExpression.dialog.headerMessage.update');

function createVueConfig(options) {
  options = options || {};
  var store = options.store,
      eventBus = options.eventBus;
  return {
    template: template,
    components: {
      actionButton: options.ActionButton,
      validation: options.Validation
    },
    computed: _.extend({
      operatorOptions: function operatorOptions() {
        var fieldType = this.fieldType,
            genericFieldType = fieldTypesToGenericTypesEnum[fieldType];
        var operatorOptions = options.selectOptionsWithAdditionalPropsFactory.create({
          operators: constantJoinExpressionOperatorsEnum[genericFieldType]
        });
        return operatorOptions.length > 0 ? operatorOptions : this.availableOperators;
      },
      headerMessage: function headerMessage() {
        return this.id ? UPDATE_CONSTANT_JOIN_DIALOG_HEADER_MESSAGE : CREATE_CONSTANT_JOIN_DIALOG_HEADER_MESSAGE;
      },
      titleText: function titleText() {
        return this.id ? UPDATE_CONSTANT_JOIN_DIALOG_TITLE : CREATE_CONSTANT_JOIN_DIALOG_TITLE;
      },
      mainActionText: function mainActionText() {
        return this.id ? UPDATE_CONSTANT_JOIN_BUTTON_LABEL : CREATE_CONSTANT_JOIN_BUTTON_LABEL;
      },
      isUpdateDisabled: function isUpdateDisabled() {
        return this.expressionValidationInProgress || _.isEmpty(this.value);
      },
      isValidateButtonDisabled: function isValidateButtonDisabled() {
        return this.constantJoinValidationInProgress || _.isEmpty(this.value);
      },
      validationMessage: function validationMessage() {
        return this.successMessage || this.errorMessage || this.warningMessage;
      },
      validationMessageType: function validationMessageType() {
        if (this.warningMessage) {
          return messageTypesEnum.WARNING;
        } else if (this.errorMessage) {
          return messageTypesEnum.ERROR;
        } else if (this.successMessage) {
          return messageTypesEnum.SUCCESS;
        }
      },
      disableInput: function disableInput() {
        return this.constantJoinValidationInProgress || this.expressionValidationInProgress;
      },
      constantJoinValidationLabel: function constantJoinValidationLabel() {
        return this.id ? this.i18n['domain.designer.dialog.updating'] : this.i18n['domain.designer.dialog.creating'];
      },
      cancelConstantJoinValidationLabel: function cancelConstantJoinValidationLabel() {
        return this.id ? this.i18n['domain.designer.dialog.cancel.update'] : this.i18n['domain.designer.dialog.cancel.creation'];
      }
    }, i18nComputed),
    data: function data() {
      return store.attributes;
    },
    methods: {
      changeValue: function changeValue(value) {
        eventBus.trigger('constantJoinExpression:changeValue', value);
      },
      changeField: function changeField(value) {
        eventBus.trigger('constantJoinExpression:changeField', value, this.fieldOptions);
      },
      changeOperator: function changeOperator(value) {
        eventBus.trigger('constantJoinExpression:changeOperator', value);
      },
      onClickMainAction: function onClickMainAction() {
        if (!this.errorMessage) {
          eventBus.trigger('constantJoinExpression:changeExpression');
        }
      },
      onValidateButtonClicked: function onValidateButtonClicked() {
        var isAnyMessages = !this.errorMessage && !this.successMessage && !this.warningMessage;

        if (isAnyMessages) {
          eventBus.trigger('constantJoinExpression:validateExpression');
        }
      },
      onValidationCancelButtonClick: function onValidationCancelButtonClick() {
        eventBus.trigger('constantJoinExpression:cancelValidation');
      },
      isOperatorSelected: function isOperatorSelected(operator) {
        return this.operator === operator;
      },
      isFieldSelected: function isFieldSelected(field) {
        return this.field === field;
      }
    }
  };
}

module.exports = {
  create: createVueConfig
};

});