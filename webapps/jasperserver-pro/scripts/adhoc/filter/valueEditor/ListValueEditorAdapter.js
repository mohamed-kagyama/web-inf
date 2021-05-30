define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var AbstractValueEditor = require('./AbstractValueEditor');

var OlapFilterValueFormatter = require('../format/OlapFilterValueFormatter');

var filterValueFormatter = require('../format/filterValueFormatter');

var SingleSelect = require("runtime_dependencies/js-sdk/src/components/singleSelect/view/SingleSelectNew");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = AbstractValueEditor.extend({
  tagName: 'div',
  className: 'values',
  initialize: function initialize(options) {
    this.list = this.createList();
    AbstractValueEditor.prototype.initialize.apply(this, arguments);
  },
  createList: function createList() {
    return new SingleSelect({
      getData: _.bind(this.model.dataProvider.getData, this.model),
      formatValue: this.model.isOlap ? new OlapFilterValueFormatter(this.model.get('isFirstLevelInHierarchyAll')).format : filterValueFormatter
    });
  },
  registerEvents: function registerEvents() {
    this.listenTo(this.list, 'selection:change', _.bind(function (selection, options) {
      options && this.model.set('isAnyValue', options.isTrueAll, {
        silent: true
      });
      this.setValue(_.isArray(selection) ? _.reject(selection, function (item) {
        return item === undefined;
      }) : selection);
    }, this));
  },
  render: function render() {
    this.$el.empty(); // Widget in our case is rendered first with default label "Select one..."
    // we don't want to show this label first, so we will hide widget until real value is set
    // Widget in our case is rendered first with default label "Select one..."
    // we don't want to show this label first, so we will hide widget until real value is set
    // Widget in our case is rendered first with default label "Select one..."
    // we don't want to show this label first, so we will hide widget until real value is set
    // Widget in our case is rendered first with default label "Select one..."
    // we don't want to show this label first, so we will hide widget until real value is set

    this.list.$el.hide();
    this.$el.append(this.list.el);
    this.$el.append('<span class="message warning" data-validation-field="value"></span>');
    return this;
  },
  renderData: function renderData() {
    this.list.renderData();
  },
  _setValueToList: function _setValueToList(options) {
    this.list.setValue(this.getValue(), options);
  },
  _removeAvailableData: function _removeAvailableData() {
    //remove available data only for OLAP
    if (this.model.isOlap) {
      //clear al cached data
      this.model.removeAvailableData(); //tell list to reset to the initial state
      //tell list to reset to the initial state
      //tell list to reset to the initial state
      //tell list to reset to the initial state

      this.list.reset({
        silent: true
      });
    }
  },
  updateData: function updateData() {
    this._removeAvailableData();

    var options = {}; //This is necessary to silently load first n-elements
    //This is necessary to silently load first n-elements
    //This is necessary to silently load first n-elements
    //This is necessary to silently load first n-elements

    this.model.setShowLoading(false);
    this.list.once('selection:change', _.bind(this.model.setShowLoading, this.model, true));

    this._setValueToList(options);

    this.list.$el.show(); //why do we need direct access to list's el property?
    //why do we need direct access to list's el property?
    //why do we need direct access to list's el property?
    //why do we need direct access to list's el property?

    this.trigger('rendered', this);
  },
  remove: function remove() {
    this.list.remove();
    this.removeView();
    AbstractValueEditor.prototype.remove.call(this);
  }
});

});