define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var jQuery = require('jquery');

var Backbone = require('backbone');

var Tooltip = require("runtime_dependencies/js-sdk/src/common/component/tooltip/Tooltip");

var i18n = require("bundle!DashboardBundle");

var templateHyperlinkParameterTooltip = require("text!../template/HyperlinkParameterTooltipTemplate.htm");

var templateHyperlinkParameter = require("text!../template/HyperlinkParameterTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  template: _.template(templateHyperlinkParameter),
  tagName: 'tr',
  initialize: function initialize() {
    this.listenTo(this.model, 'destroy', this.remove);
    this.listenTo(this.model, 'change', this.render);
    this.render();
  },
  events: {
    'click .edit.button': '_edit',
    'click .delete.button': '_delete',
    'mouseover [data-tooltip]': 'showTooltip'
  },
  render: function render() {
    this.$el.html(this.template(this.model.toJSON()));
    this.tooltip = new Tooltip({
      attachTo: this.$el,
      i18n: i18n,
      contentTemplate: templateHyperlinkParameterTooltip
    });
    return this;
  },
  showTooltip: function showTooltip(event) {
    var options = {};
    options[jQuery(event.target).data('bind')] = true;
    this.tooltip.show(this.model, options);
  },
  _edit: function _edit() {
    this.trigger('edit', this);
  },
  _delete: function _delete() {
    this.trigger('delete', this, this.model);
  },
  remove: function remove() {
    this.tooltip && this.tooltip.remove();
    Backbone.View.prototype.remove.apply(this, arguments);
  }
});

});