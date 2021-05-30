define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var Backbone = require('backbone');

var codeExampleFactory = require('../factory/codeExampleFactory');

var dataTypeIconFactory = require('../../designer/dataTypeIconFactory');

var SimpleSelectListView = require('../view/SimpleSelectListView');

var featureDetection = require("runtime_dependencies/js-sdk/src/common/util/featureDetection");

var templateContent = require("text!../template/ExpressionEditorTemplate.htm");

var jasperserver_messages = require("bundle!jasperserver_messages");

var adhoc_messages = require("bundle!adhoc_messages");

var _runtime_dependenciesJrsUiSrcUtilUtilsCommon = require("runtime_dependencies/jrs-ui/src/util/utils.common");

var enableSelection = _runtime_dependenciesJrsUiSrcUtilUtilsCommon.enableSelection;

require('underscore.string');

require('jquery.selection');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18n = _.extend({}, jasperserver_messages, adhoc_messages);

module.exports = Backbone.View.extend({
  template: _.template(templateContent),
  events: {
    'keyup .control.textArea textarea': 'onExpressionEdit',
    'click .expressionEditorOperators li.button.math': 'operatorClick',
    'click .expressionEditorValidate .button': 'validateButton'
  },
  initialize: function initialize(options) {
    this.assignedAttribute = options.assignedAttribute;
    this.title = options.title ? options.title : '';
    this.lastSelectionPos = {
      start: 0,
      end: 0
    }; // setup listeners
    // setup listeners

    this.listenTo(this.model, 'change:' + this.assignedAttribute, this.setExpression);
    this.listenTo(this.model, 'change:availableFields', this.renderFields);
    this.listenTo(this.model, 'change:availableFunctions', this.renderFunctions);
    this.listenTo(this.model, 'invalid:' + this.assignedAttribute, this.setError);
  },
  render: function render() {
    var viewData = {
      i18n: i18n,
      title: this.title,
      operators: this.model.get('operators')
    };
    this.$el.empty();
    this.$el.html(this.template(viewData));
    this.expressionInput = this.$('.control.textArea textarea');
    enableSelection(this.expressionInput.parent()[0]);
    enableSelection(this.$('.inputRow .description p.text')[0]);
    return this;
  },
  // Populate the Fields list
  renderFields: function renderFields() {
    var self = this;
    var fieldsList = new SimpleSelectListView({
      el: this.$el.find('.expressionEditorFieldsList ul')
    });
    this.listenTo(fieldsList, 'item:dblClick', this.fieldDblClick);
    !featureDetection.supportsModernSelection && this.listenTo(fieldsList, 'item:click', this.resetSelectionPos);
    var fields = this.model.get('availableFields');

    if (fields.length > 0) {
      fieldsList.render(_.chain(fields).map(function (f) {
        return {
          name: f.id,
          label: f.label,
          tooltip: f.tooltip || f.description,
          nodeClass: f.expression ? 'calculated' : '',
          kind: f.kind === 'DIMENSION' ? 'field' : 'measure',
          type: dataTypeIconFactory.getIconClassByType(f.type)
        };
      }).sortBy('label').value());
    }
  },
  // Populate the available Functions list
  renderFunctions: function renderFunctions() {
    var functionsList = new SimpleSelectListView({
      el: this.$el.find('.expressionEditorFunctionsList ul')
    });
    this.listenTo(functionsList, 'item:click', this.functionClick);
    this.listenTo(functionsList, 'item:dblClick', this.functionDblClick);
    var functions = this.model.get('availableFunctions');

    if (functions.length > 0) {
      functionsList.render(_.chain(functions).map(function (f) {
        return {
          name: f.name,
          label: f.name,
          type: 'function'
        };
      }).sortBy(function (el) {
        return el.name.toUpperCase();
      }).value());
    }
  },
  successMessage: function successMessage() {
    this.clearMessages();
    this.$('.expressionEditorValidate.group span.message.warning').text(i18n['adh.calculated.fields.validation.successful']);
    this.$('.expressionEditorValidate.group span.message.warning').addClass('success');
    this.$('.expressionEditorValidate.group').addClass('error');
  },
  errorMessage: function errorMessage(text) {
    var message = text ? text : '';
    this.clearMessages();
    this.$('.expressionEditorValidate.group span.message.warning').text(message);
    this.$('.control.textArea').addClass('error');
    this.$('.expressionEditorValidate.group').addClass('error');
  },
  clearMessages: function clearMessages() {
    this.$('.control.textArea').removeClass('error');
    this.$('.expressionEditorValidate.group').removeClass('error');
    this.$('.expressionEditorValidate.group span.message.warning').removeClass('success');
  },
  operatorClick: function operatorClick(evt) {
    var node = $(evt.target).hasClass('math') ? evt.target : $(evt.target).parent('li.math')[0];

    if (node) {
      var opId = $(node).attr('value');

      var operator = _.find(this.model.get('operators'), function (i) {
        return i.id === opId;
      });

      this.insertText(operator.value);
    }
  },
  fieldDblClick: function fieldDblClick(fieldName) {
    var field = _.find(this.model.get('availableFields'), function (f) {
      return f.id === fieldName;
    });

    this.updateSelectionPos();
    this.insertText(field.alias);
  },
  updateSelectionPos: function updateSelectionPos() {
    var self = this;
    !featureDetection.supportsModernSelection && this.expressionInput.selection('setPos', {
      start: self.lastSelectionPos.start,
      end: self.lastSelectionPos.end
    });
  },
  resetSelectionPos: function resetSelectionPos() {
    if (!featureDetection.supportsModernSelection) {
      this.lastSelectionPos = this.expressionInput.selection('getPos');
    }
  },
  functionClick: function functionClick(functionName) {
    var desc = i18n['adh.calculated.fields.function.description.' + functionName];
    this.resetSelectionPos();
    this.$('.inputRow .description p.title').text(functionName);
    this.$('.inputRow .description p.text').text(desc ? desc : '');
    this.$('.inputRow .description p.code').text(codeExampleFactory(functionName, true));
  },
  functionDblClick: function functionDblClick(functionName) {
    var includeArgs = this.$('.control.checkBox input')[0].checked;
    var value = codeExampleFactory(functionName, includeArgs);
    this.updateSelectionPos();
    this.insertText(value);
  },
  insertText: function insertText(text) {
    var insertText = text; // Smart value preparation
    // Smart value preparation

    var priorChar = this.expressionInput.val()[this.expressionInput.selection('getPos').start - 1];
    var nextChar = this.expressionInput.val()[this.expressionInput.selection('getPos').end];

    if (priorChar === '"' && nextChar === '"') {
      // 1. Trim the quotes if selected text is already covered with them.
      // (for sample arguments replacement: Rank("NumberFieldName") -> Rank("Shipping charge"))
      insertText = _.trim(insertText, '"');
    } else {
      // 2. Cover the inserting text with spaces in some cases
      if (priorChar && !_.contains([' ', '('], priorChar) && insertText !== ')') {
        insertText = ' ' + insertText;
      }

      if (nextChar && !_.contains([' ', ')', ','], nextChar) && insertText !== '(') {
        insertText = insertText + ' ';
      } // 3. Implement others here...

    }

    this.clearMessages(); // replace the selection or insert to cursor position
    // replace the selection or insert to cursor position

    this.expressionInput.selection('replace', {
      text: insertText
    }); // clear selection (jquery.selection plugin creates the selection for inserted text which we want to avoid)
    // clear selection (jquery.selection plugin creates the selection for inserted text which we want to avoid)

    var pos = this.expressionInput.selection('getPos').end;
    this.expressionInput.selection('setPos', {
      start: pos,
      end: pos
    }); // set value to model
    // set value to model

    this.model.set(this.assignedAttribute, this.expressionInput.val(), {
      silent: true
    });
  },
  setExpression: function setExpression() {
    var value = this.model.get(this.assignedAttribute);
    this.clearMessages();
    this.expressionInput.val(value);
  },
  setError: function setError(data) {
    this.errorMessage(data.errorCode ? i18n[data.errorCode] : data.errorMessage);
  },
  onExpressionEdit: function onExpressionEdit(event) {
    this.clearMessages();
    this.model.set(this.assignedAttribute, $(event.target).val(), {
      silent: true
    });
    this.model.isExpressionValid(this.assignedAttribute);
  },
  validateButton: function validateButton() {
    this.model.trigger('validate:' + this.assignedAttribute, _.bind(this.successMessage, this));
  }
});

});