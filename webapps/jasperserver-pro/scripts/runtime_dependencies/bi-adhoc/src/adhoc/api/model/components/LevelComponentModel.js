define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseComponentModel = require('./BaseComponentModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = BaseComponentModel.extend({
  defaults: {
    includeAll: true
  },
  initialize: function initialize(attributes, options) {
    // TODO fix on server
    this.unset('label', {
      silent: true
    });
  },
  isMeasure: function isMeasure() {
    return this.get('reference') === 'Measures';
  },
  hasSummary: function hasSummary() {
    return this.attributes.includeAll;
  },
  prevLevel: function prevLevel() {
    for (var i = 1; i < this.collection.length; i++) {
      if (this.collection.models[i] === this) {
        return this.collection.models[i - 1];
      }
    }
  },
  nextLevel: function nextLevel() {
    for (var i = 0; i < this.collection.length - 1; i++) {
      if (this.collection.models[i] === this) {
        return this.collection.models[i + 1];
      }
    }
  }
});

});