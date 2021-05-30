define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getColumnsComponent: function getColumnsComponent(axis) {
    return _.find(this.components.findComponentDeep('axis'), function (component) {
      return component.get('name') === 'columns';
    });
  },
  getRowsComponent: function getRowsComponent() {
    return _.find(this.components.findComponentDeep('axis'), function (component) {
      return component.get('name') === 'rows';
    });
  },
  getMeasuresComponent: function getMeasuresComponent() {
    return this.components.findComponentDeep('measures')[0];
  }
};

});