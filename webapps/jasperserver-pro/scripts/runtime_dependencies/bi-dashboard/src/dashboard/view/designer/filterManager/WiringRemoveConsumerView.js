define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var wiringRemoveConsumerTemplate = require("text!../../../template/filterManager/wiringRemoveConsumerTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  events: {
    'click .removeConsumerColumn > .delete': 'removeConsumer'
  },
  el: wiringRemoveConsumerTemplate,
  removeConsumer: function removeConsumer(e) {
    e && e.preventDefault();
    this.model.collection.remove(this.model);
  }
});

});