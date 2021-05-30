define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var BaseComponentModel = require('./BaseComponentModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  defaults: {
    fixedGrandTotal: false,
    fixedGroupTotal: false,
    fixedHeader: false,
    showDetails: true,
    showTotals: false,
    showDistinct: false
  },
  initialize: function initialize(attributes, options) {
    _.bindAll(this, 'ensureArtificialColumn');

    this.on('change:showDetails', this.ensureArtificialColumn);
    this.on('change:showTotals', this.ensureArtificialColumn);
  },
  getColumns: function getColumns() {
    return this.components.filter(function (component) {
      return component.componentType === 'column';
    });
  },
  getGroups: function getGroups() {
    return this.components.filter(function (component) {
      return component.componentType === 'group';
    });
  },
  ensureArtificialColumn: function ensureArtificialColumn() {
    if (this.components) {
      if (!this._artificialColumn) {
        this._artificialColumn = this.adHocModel.componentsFactory.create({
          componentType: 'column'
        });
      }

      if (this.get('showDetails') && this.get('showTotals')) {
        if (this.components.models[0] && this.components.models[0].get('reference') !== this._artificialColumn.get('reference')) {
          this.components.unshift(this._artificialColumn);
        }
      } else {
        if (this.components.models[0] && this.components.models[0].get('reference') === this._artificialColumn.get('reference')) {
          this.components.shift();
        }
      }
    }
  }
});

});