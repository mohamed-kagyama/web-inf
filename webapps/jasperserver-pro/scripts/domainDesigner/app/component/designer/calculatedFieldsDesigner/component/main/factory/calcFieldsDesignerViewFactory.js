define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var messageTypesEnum = require("../../../../../../common/component/validation/enum/messageTypesEnum");

var _i18n = require("bundle!DomainDesignerBundle");

var template = require("text!../template/calculatedFieldsDesignerTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    options = options || {};
    return {
      template: template,
      components: {
        'validation': options.Validation,
        'inputErrorMessage': options.InputErrorMessage,
        'operators': options.operatorsViewConfig,
        'expressionEditor': options.textAreaExpressionEditorViewConfig,
        'search': options.searchViewConfig,
        'itemsTree': options.AvailableItemsTree,
        'actionButton': options.actionButton
      },
      computed: {
        i18n: function i18n() {
          return _i18n;
        },
        editMode: function editMode() {
          return this.id !== null;
        },
        validationMessageType: function validationMessageType() {
          if (this.errors.expression.level === messageTypesEnum.WARNING) {
            return messageTypesEnum.WARNING;
          } else if (this.errors.expression.level === messageTypesEnum.ERROR) {
            return messageTypesEnum.ERROR;
          } else if (this.expressionValidationSuccessMessage) {
            return messageTypesEnum.SUCCESS;
          }
        },
        validationMessageTypes: function validationMessageTypes() {
          return messageTypesEnum;
        },
        calcFieldValidationLabel: function calcFieldValidationLabel() {
          return this.editMode ? this.i18n['domain.designer.dialog.updating'] : this.i18n['domain.designer.dialog.creating'];
        },
        cancelCalcFieldValidationLabel: function cancelCalcFieldValidationLabel() {
          return this.editMode ? this.i18n['domain.designer.dialog.cancel.update'] : this.i18n['domain.designer.dialog.cancel.creation'];
        },
        disableInput: function disableInput() {
          return this.calcFieldValidationInProgress || this.expressionValidationInProgress;
        },
        isCreateOrUpdateDisabled: function isCreateOrUpdateDisabled() {
          return this.expressionValidationInProgress || _.isEmpty(this.expression.string);
        },
        isValidationButtonDisabled: function isValidationButtonDisabled() {
          return this.calcFieldValidationInProgress || _.isEmpty(this.expression.string);
        }
      },
      methods: {
        onTypeEdit: function onTypeEdit(type) {
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:editType', type);
        },
        onNameEdit: function onNameEdit(name) {
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:editName', name);
        },
        onExpressionEdit: function onExpressionEdit(options) {
          options = {
            expression: options.value,
            selectionRange: options.selectionRange
          };
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:editExpression', options);
        },
        onValidationButtonClick: function onValidationButtonClick() {
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:validateExpression');
        },
        onValidationCancelButtonClick: function onValidationCancelButtonClick() {
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:cancelValidation');
        },
        selectOperator: function selectOperator(operator) {
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:selectOperator', operator);
        },
        onCancelButtonClick: function onCancelButtonClick() {
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:hide');
        },
        onCreateButtonClick: function onCreateButtonClick() {
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:createCalcField');
        },
        onUpdateButtonClick: function onUpdateButtonClick() {
          this.$options.calculatedFieldsDesignerEventBus.trigger('designer:updateCalcField');
        }
      }
    };
  }
};

});