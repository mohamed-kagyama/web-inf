define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseComponentModel = require('./BaseComponentModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  initialize: function initialize(attributes, options) {},
  hasMeasures: function hasMeasures() {
    return this.components.find(function (component) {
      return component.get('reference') === 'Measures';
    });
  }
});

});