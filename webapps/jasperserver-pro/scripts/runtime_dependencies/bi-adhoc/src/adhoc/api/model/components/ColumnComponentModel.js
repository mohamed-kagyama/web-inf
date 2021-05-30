define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var BaseComponentModel = require('./BaseComponentModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ARTIFICIAL = '_artificial';
var SPACER_REG = /^_spacer/;
module.exports = BaseComponentModel.extend({
  defaults: {
    'reference': ARTIFICIAL,
    'detailFieldReference': ARTIFICIAL,
    'aggregatedFieldReferences': ['_artificial'],
    'width': 125,
    'horizontalAlign': 'Left',
    'showSummary': false
  },
  initialize: function initialize(attributes, options) {
    if (this.get('label') === null) {
      this.set({
        label: this.get('detailFieldReference')
      }, {
        silent: true
      });
    }

    if (!this.has('label') && (this.get('reference') === ARTIFICIAL || SPACER_REG.test(this.get('reference')))) {
      this.set({
        label: ''
      }, {
        silent: true
      });
    }
  },
  hasSummary: function hasSummary() {
    return this.attributes.showSummary;
  }
});

});