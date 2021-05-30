define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var view = options.view;
    return Vue.extend({
      template: '<div></div>',
      mounted: function mounted() {
        view.setElement(this.$el);
        view.render();
      }
    });
  }
};

});