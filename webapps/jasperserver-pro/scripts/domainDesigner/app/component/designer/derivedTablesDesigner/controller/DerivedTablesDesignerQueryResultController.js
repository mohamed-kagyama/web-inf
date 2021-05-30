define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var DerivedTablesDesignerQueryResultController = function DerivedTablesDesignerQueryResultController(options) {
  this.initialize(options);
};

_.extend(DerivedTablesDesignerQueryResultController.prototype, Backbone.Events, {
  initialize: function initialize(options) {
    this.dialog = options.dialog;
    this.derivedTablesDesignerStore = options.derivedTablesDesignerStore;
    this.derivedTablesDesignerEventBus = options.derivedTablesDesignerEventBus;
    this.derivedTablesDesignerQueryResultConverter = options.derivedTablesDesignerQueryResultConverter;

    this._initEvents();
  },
  _initEvents: function _initEvents() {
    this.listenTo(this.derivedTablesDesignerEventBus, 'canvas:scroll', this._onCanvasScroll);
    this.listenTo(this.derivedTablesDesignerEventBus, 'derivedTablesDesignerView:selectField', this._selectField);
    this.listenTo(this.derivedTablesDesignerEventBus, 'derivedTablesDesignerView:toggleFieldSelection', this._toggleFieldSelection);
    this.listenTo(this.derivedTablesDesignerEventBus, 'derivedTablesDesignerView:addToRangeSelection', this._addToRangeSelection);
    this.listenTo(this.dialog, 'dialog:resize:started', this._onDialogResizeStart);
    this.listenTo(this.dialog, 'dialog:resize', this._onDialogResize);
  },
  _onCanvasScroll: function _onCanvasScroll(scrollPos) {
    this._updateStore({
      scrollPos: scrollPos
    });
  },
  _selectField: function _selectField(field) {
    var fields = {};
    fields[field.name] = field.index;
    this.derivedTablesDesignerStore.set('selection', {
      rangeStart: field.index,
      fields: fields
    });
  },
  _toggleFieldSelection: function _toggleFieldSelection(field) {
    var selection = this.derivedTablesDesignerStore.get('selection'),
        rangeStart = selection.rangeStart,
        fields = _.clone(selection.fields);

    if (_.isEmpty(selection.fields)) {
      this._selectField(field);
    } else if (_.isUndefined(selection.fields[field.name])) {
      fields[field.name] = field.index;
      selection = _.extend({}, selection, {
        fields: fields
      });
      this.derivedTablesDesignerStore.set('selection', selection);
    } else {
      delete fields[field.name];

      if (rangeStart === field.index) {
        rangeStart = undefined;
      }

      this.derivedTablesDesignerStore.set('selection', {
        rangeStart: rangeStart,
        fields: fields
      });
    }
  },
  _addToRangeSelection: function _addToRangeSelection(field) {
    var selection = this.derivedTablesDesignerStore.get('selection'),
        data = this.derivedTablesDesignerStore.get('fields'),
        rangeStart = selection.rangeStart;

    if (_.isEmpty(selection.fields)) {
      this._selectField(field);
    } else {
      if (_.isUndefined(rangeStart)) {
        rangeStart = Math.min.apply(Math, _.values(selection.fields));
      }

      selection = _.extend({}, selection, {
        rangeStart: rangeStart,
        fields: this._getFieldsRangeByRangeStartAndEnd(data, rangeStart, field.index)
      });
      this.derivedTablesDesignerStore.set('selection', selection);
    }
  },
  _getFieldsRangeByRangeStartAndEnd: function _getFieldsRangeByRangeStartAndEnd(data, rangeStart, rangeEnd) {
    var range = _.sortBy([rangeStart, rangeEnd]);

    return data.reduce(function (memo, field, index) {
      if (index >= range[0] && index <= range[1]) {
        memo[field.name] = index;
      }

      return memo;
    }, {});
  },
  _onDialogResizeStart: function _onDialogResizeStart() {
    var dialogInitialHeight = this.derivedTablesDesignerStore.get('dialogInitialHeight'),
        initialQueryResultSetHeight = this.derivedTablesDesignerStore.get('initialQueryResultSetHeight');

    if (!dialogInitialHeight && !initialQueryResultSetHeight) {
      dialogInitialHeight = this.dialog.$el.outerHeight();
      initialQueryResultSetHeight = this.dialog.$el.find('.jr-jQueryResultSet').height();
      this.derivedTablesDesignerStore.set({
        'dialogInitialHeight': dialogInitialHeight,
        'initialQueryResultSetHeight': initialQueryResultSetHeight
      });
    }
  },
  _onDialogResize: function _onDialogResize(options) {
    var currentSize = options.size,
        dialogInitialHeight = this.derivedTablesDesignerStore.get('dialogInitialHeight'),
        initialQueryResultSetHeight = this.derivedTablesDesignerStore.get('initialQueryResultSetHeight');
    var deltaHeight = currentSize.height - dialogInitialHeight,
        newQueryResultSetHeight = initialQueryResultSetHeight + deltaHeight;

    this._updateStore({
      queryResultSetHeight: currentSize.height > dialogInitialHeight ? newQueryResultSetHeight : initialQueryResultSetHeight
    });
  },
  _updateStore: function _updateStore(options) {
    options = _.defaults({}, options, {
      fields: this.derivedTablesDesignerStore.get('fields'),
      scrollPos: this.derivedTablesDesignerStore.get('scrollPos'),
      queryResultSetHeight: this.derivedTablesDesignerStore.get('queryResultSetHeight')
    });
    var queryResultStoreData = this.derivedTablesDesignerQueryResultConverter.convert(options);
    this.derivedTablesDesignerStore.set(queryResultStoreData);
  }
});

module.exports = DerivedTablesDesignerQueryResultController;

});