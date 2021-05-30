define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var _ = require('underscore');

var template = require("text!./template/genericNotificationCategoryTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend({
  props: ['category'],
  template: template,
  computed: {
    label: function label() {
      if (_.isString(this.category)) {
        return this.category;
      } else {
        return this.category.label;
      }
    },
    isBold: function isBold() {
      if (_.isString(this.category)) {
        return true;
      } else {
        var isBold = this.category.isBold;
        return _.isUndefined(isBold) ? true : isBold;
      }
    }
  }
});

});