define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var Vue = require('vue');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (options) {
  return Vue.extend({
    template: '<div></div>',
    mounted: function mounted() {
      var $el = $(options.el);
      $(this.$el).replaceWith($el);
      this.$el = $el[0];
    }
  });
};

});