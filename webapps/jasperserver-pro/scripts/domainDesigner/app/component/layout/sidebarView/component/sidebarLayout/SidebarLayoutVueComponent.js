define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend({
  created: function created() {
    this.$mount();
  },
  mounted: function mounted() {
    var selector = this.$options.treeContainerElement;

    if (selector) {
      this.$options.tree.setElement(this.$el.querySelector(selector));
    } else {
      this.$options.tree.setElement(this.$el);
    }
  }
});

});