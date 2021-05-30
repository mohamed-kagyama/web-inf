define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var Backbone = require('backbone');

var aggregateFieldLabelFactory = require('../../designer/aggregateFieldLabelFactory');

var i18n = require("bundle!adhoc_messages");

var dataTypeIconFactory = require('../../designer/dataTypeIconFactory');

var ExpressionEditorView = require('../view/ExpressionEditorView');

var SimpleSelectListView = require('../view/SimpleSelectListView');

var templateContent = require("text!../template/SummaryTabTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  template: _.template(templateContent),
  events: {
    'change .availableSummaries': 'summaryFunctionsChange'
  },
  initialize: function initialize() {
    // create Custom Summary editor
    this.customSummaryEditor = new ExpressionEditorView({
      assignedAttribute: 'summaryExpression',
      model: this.model
    });
    this.listenTo(this.model, 'change:availableFields', this.renderWeightedOnFields);
    this.listenTo(this.model, 'change:availableSummaryFunctions', this.renderAvailableSummaries);
    this.listenTo(this.model, 'change:summaryFunction', this.updateSummaryFunction);
    this.listenTo(this.model, 'change:summaryParameter', this.updateSummaryParameter);
    this.listenTo(this.model, 'change:availableFields', this.updateSummaryParameter);
    this.listenTo(this.model, 'invalid:summaryParameter', this.showSummaryParameterError);
  },
  summaryFunctionsChange: function summaryFunctionsChange(event) {
    this.model.set('summaryFunction', $(event.target).val());
    this.updateLayout();
  },
  render: function render() {
    this.$el.empty();
    this.$el.html(this.template({
      i18n: i18n
    }));
    this.customSummaryEditor.setElement('.customSummaryEditor').render();
    return this;
  },
  // Populate the Weighted On Fields list
  renderWeightedOnFields: function renderWeightedOnFields() {
    var fieldsList = new SimpleSelectListView({
      el: this.$el.find('.weightedOnFieldsList ul')
    });
    var self = this;
    this.listenTo(fieldsList, 'item:click', function (fieldName) {
      self.model.set('summaryParameter', fieldName);
    });
    var fields = this.model.get('availableFields');

    if (fields.length > 0) {
      var numericsList = _.filter(fields, function (f) {
        return _.contains(['java.lang.Double', 'java.math.BigDecimal', 'java.lang.Long', 'java.lang.Integer', 'java.lang.Short', 'java.lang.Byte'], f.type);
      });

      fieldsList.render(_.map(numericsList, function (f) {
        return {
          name: f.id,
          label: f.label,
          tooltip: f.tooltip,
          nodeClass: f.expression ? 'calculated' : '',
          kind: f.kind === 'DIMENSION' ? 'field' : 'measure',
          type: dataTypeIconFactory.getIconClassByType(f.type)
        };
      }).sortBy(function (el) {
        return el.label;
      }));
    }
  },
  renderAvailableSummaries: function renderAvailableSummaries() {
    var summaryList = _.sortBy(this.model.get('availableSummaryFunctions'), function (fun) {
      // set None to the top of list
      return fun === 'None' ? 'AAA' : fun;
    });

    var selectControl = this.$('.availableSummaries').empty();

    _.each(summaryList, function (sfun) {
      selectControl.append("<option value='" + sfun + "'>" + aggregateFieldLabelFactory.localizeAggregation(sfun) + "</option>");
    });

    selectControl.val(this.model.get('summaryFunction'));
    this.updateLayout();
  },
  updateSummaryFunction: function updateSummaryFunction() {
    this.renderAvailableSummaries(); //            this.$(".availableSummaries").val(this.model.get('summaryFunction'));
    //            this.updateLayout();
  },
  updateSummaryParameter: function updateSummaryParameter() {
    this.$('label.weightedOnInput.control').removeClass('error');
    var id = this.model.get('summaryParameter');

    var field = _.find(this.model.get('availableFields'), function (f) {
      return f.id === id;
    });

    field && this.$('.weightedOnInput input').val(field.label);
  },
  showSummaryParameterError: function showSummaryParameterError(data) {
    var messageEl = this.$('.weightedOnInput .message.warning');
    var text = data.errorCode ? i18n[data.errorCode] : data.errorMessage;
    messageEl.text(text ? text : '');
    messageEl.parent().addClass('error');
  },
  updateLayout: function updateLayout() {
    var summaryFunction = this.model.get('summaryFunction');

    if (summaryFunction === 'WeightedAverage') {
      this.$('.weightedOnFieldsList').removeClass('hidden');
      this.$('.customSummaryEditor').addClass('hidden');
    } else if (summaryFunction === 'Custom') {
      this.$('.weightedOnFieldsList').addClass('hidden');
      this.$('.customSummaryEditor').removeClass('hidden');
    } else {
      this.$('.weightedOnFieldsList').addClass('hidden');
      this.$('.customSummaryEditor').addClass('hidden');
    }
  }
});

});