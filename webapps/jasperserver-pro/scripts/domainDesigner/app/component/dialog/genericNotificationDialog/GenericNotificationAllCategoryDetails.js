define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var GenericNotificationCategoryDetail = require("./GenericNotificationCategoryDetail");

var template = require("text!./template/genericNotificationAllCategoryDetailsTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend({
  props: ['categoryDetails'],
  template: template,
  components: {
    detail: GenericNotificationCategoryDetail
  }
});

});