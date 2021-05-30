define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Epoxy = require('backbone.epoxy');

var _ = require('underscore');

var tableFilterTemplate = require("text!../template/tableFilterTemplate.htm");

var TableFilterModel = require('../model/TableFilterModel');

var datePickerBindingHandler = require('./dateTimePickerEpoxyBindingHandler');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function toEpoxyOptions(jiveOptions) {
  var epoxyOptions = [];

  _.each(jiveOptions, function (o) {
    epoxyOptions.push({
      label: o.val,
      value: o.key
    });
  });

  return epoxyOptions;
}

var TableFilterViewModel = Epoxy.Model.extend({
  defaults: {
    columnLabel: '',
    clearFilter: 'true',
    filterOptions: [],
    dataType: 'text',
    emptyFilterOption: '...'
  },
  computeds: {
    isNotClearFilter: function isNotClearFilter() {
      return this.get('clearFilter') !== 'true';
    },
    isNotBooleanType: function isNotBooleanType() {
      return this.get('dataType') !== 'boolean';
    },
    transformedFilterOptions: {
      deps: ['clearFilter', 'filterOptions'],
      get: function get(clearFilter, filterOptions) {
        if (clearFilter === 'true') {
          return [];
        } else {
          return toEpoxyOptions(filterOptions);
        }
      }
    }
  },
  remove: function remove() {}
});
module.exports = Epoxy.View.extend({
  constructor: function constructor(options) {
    this.i18n = options.i18n;
    Epoxy.View.prototype.constructor.call(this, options);
  },
  initialize: function initialize() {
    this.model = new TableFilterModel();
    this.viewModel = new TableFilterViewModel();
    this.listenTo(this.viewModel, 'change:clearFilter', this._onClearFilterChanged);
    Epoxy.View.prototype.initialize.apply(this, arguments);
  },
  el: function el() {
    return _.template(tableFilterTemplate, {
      i18n: this.i18n
    });
  },
  computeds: {
    filterValueStart: {
      deps: ['value'],
      get: function get(value) {
        if (_.isArray(value)) {
          return value[0];
        } else {
          return value;
        }
      },
      set: function set(val) {
        var modelValue = this.getBinding('value');

        if (_.isArray(modelValue)) {
          modelValue[0] = val;
        } else {
          this.setBinding('value', val);
        }
      }
    },
    filterValueEnd: {
      deps: ['value'],
      get: function get(value) {
        if (_.isArray(value)) {
          return value[1];
        }
      },
      set: function set(val) {
        var modelValue = this.getBinding('value');

        if (_.isArray(modelValue)) {
          modelValue[1] = val;
        }
      }
    }
  },
  bindingHandlers: {
    dateTimePicker: datePickerBindingHandler
  },
  _onClearFilterChanged: function _onClearFilterChanged() {
    // reset filter on show all rows
    if (this.viewModel.get('clearFilter') === 'true') {
      this.model.reset();
    } // set the operator to the first value from filterOptions
    else {
        this.model.set('operator', this.viewModel.get('filterOptions')[0].key);
      }
  },
  remove: function remove() {
    Epoxy.View.prototype.remove.apply(this, arguments);
    this.model && this.model.remove();
    this.viewModel && this.viewModel.remove();
  }
});

});