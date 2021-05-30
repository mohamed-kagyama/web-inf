define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var template = require("text!./template/actionButtonVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend({
  props: {
    'label': {
      type: String,
      "default": ''
    }
  },
  template: template,
  methods: {
    onClick: function onClick(event) {
      this.$emit('click', event);
    }
  }
});

});