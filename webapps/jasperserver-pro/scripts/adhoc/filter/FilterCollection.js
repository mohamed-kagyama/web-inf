define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var FilterModel = require('./FilterModel');

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  model: FilterModel,
  addFromField: function addFromField(field) {
    return this.add(this.createFilter(field));
  },
  createFilter: function createFilter(field) {
    return new this.model({
      filterDataType: field.type,
      id: field.name,
      label: field.defaultDisplayName,
      operatorName: 'equals',
      filterLetter: this.nextLetter(),
      value: '',
      state: {
        value: ''
      }
    });
  },
  initialize: function initialize(models, options) {
    this.service = options.service;
    this.isOlap = options.isOlap;
  },
  set: function set(models, options) {
    options = options || {};

    _.extend(options, {
      service: this.service,
      isOlap: this.isOlap
    });

    return Backbone.Collection.prototype.set.call(this, models, options);
  },
  nextLetter: function nextLetter() {
    return this.length > 0 ? this.incLetter(this.at(this.length - 1).get('filterLetter')) : 'A';
  },
  incLetter: function incLetter(letter) {
    if (_.isEmpty(letter)) {
      return letter;
    }

    return String.fromCharCode(letter.charCodeAt(0) + 1);
  },
  editableFilters: function editableFilters() {
    return this.filter(function (model) {
      return model.get('editable');
    });
  },
  toExpression: function toExpression() {
    return _(this.editableFilters()).map(function (filterModel) {
      return {
        filterId: filterModel.get('id'),
        filterExpression: filterModel.toExpression()
      };
    });
  }
});

});