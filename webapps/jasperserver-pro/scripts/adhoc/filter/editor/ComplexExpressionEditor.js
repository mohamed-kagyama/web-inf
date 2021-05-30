define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var i18n = require("bundle!AdHocFiltersBundle");

var complexExpressionTemplate = require("text!./template/complexExpressionTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  events: {
    'change input': 'onExpressionChange',
    'click .header .button.disclosure': 'onToggleFilter'
  },
  template: _.template(complexExpressionTemplate),
  initialize: function initialize(options) {
    this.listenTo(this.model, 'change:complexExpression', this.updateComplexExpression);
    this.listenTo(this.model, 'change:filterPodMinimized', this.drawToggleFilter);
  },
  onToggleFilter: function onToggleFilter() {
    this.model.set('filterPodMinimized', !this.model.get('filterPodMinimized'));
    this.model.trigger('toggle', this.model);
  },
  drawToggleFilter: function drawToggleFilter() {
    this.$('.expression.panel')[this.model.get('filterPodMinimized') ? 'addClass' : 'removeClass']('minimized');
  },
  render: function render() {
    this.$el.empty();
    var viewData = this.model.toJSON();
    viewData.i18n = i18n;
    this.$el.html(this.template(viewData));
    return this;
  },
  onExpressionChange: function onExpressionChange() {
    this.model.set('complexExpression', this.$('input').val());
  },
  updateComplexExpression: function updateComplexExpression() {
    this.$('input').val(this.model.get('complexExpression'));
  }
});

});