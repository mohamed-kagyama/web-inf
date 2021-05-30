define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  constructor: function constructor(options) {
    _.bindAll(this, '_onItemDblClick');

    options = options || {};
    this.tree = options.tree;
    this.debounceTime = options.debounceTime;
    Backbone.View.apply(this, arguments);
  },
  initialize: function initialize() {
    this._initEvents();
  },
  setElement: function setElement($el) {
    Backbone.View.prototype.setElement.apply(this, arguments);
    this.tree.setElement($el || this.$el);
    return this;
  },
  getValue: function getValue() {
    return this._getValue();
  },
  remove: function remove() {
    this.tree.remove();
    Backbone.View.prototype.remove.call(this);
  },
  fetch: function fetch(options) {
    this.tree.setValue([], {
      renderSelection: false
    });
    this.tree.fetch(undefined, options);
  },
  // private methods
  _destroyDroppable: function _destroyDroppable() {
    if (this.$el && this.$el.data('ui-droppable')) {
      this.$el.droppable('destroy');
    }
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.tree, 'item:dblclick', _.debounce(this._onItemDblClick, this.debounceTime, true));
    this.listenTo(this.tree, 'list:item:click', this._onItemClick);
    this.listenTo(this.tree, 'render:items', this._onRenderData);
    this.listenTo(this.tree, 'selection:change', this._onSelection);
  },
  _onRenderData: function _onRenderData() {
    this.trigger('render:items');
  },
  _onSelection: function _onSelection() {
    this.trigger('selection:change', this._getValue());
  },
  _getValue: function _getValue() {
    return _.compact(this.tree.getValue());
  },
  _onItemDblClick: function _onItemDblClick() {
    this.trigger('item:dblclick');
  },
  _onItemClick: function _onItemClick() {
    this.trigger('item:click');
  }
});

});