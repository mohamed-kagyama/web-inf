define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Backbone = require('backbone');

var dashboardMessageTemplate = require("text!../../template/dashboardMessageTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Backbone.View.extend({
  el: dashboardMessageTemplate,
  show: function show(message) {
    this.$el.removeClass('hidden').show().find('.message').html(message);
  },
  hide: function hide() {
    this.$el.addClass('hidden').hide();
  }
});

});