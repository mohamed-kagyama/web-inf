define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var _ = require('underscore');

var WiringConsumerViewModel = require('../../model/filterManager/WiringConsumerViewModel');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.Collection.extend({
  model: WiringConsumerViewModel,
  comparator: 'parameterLabel',
  initialize: function initialize() {
    this.on('change:parameterLabel', this.sort);
  },
  isValid: function isValid(validate) {
    return _.every(this.invoke('isValid', validate), _.identity);
  }
});

});