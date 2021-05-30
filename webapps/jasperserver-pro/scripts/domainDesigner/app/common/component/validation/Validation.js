define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var messageTypesEnum = require('./enum/messageTypesEnum');

var template = require("text!./template/validationTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend({
  template: template,
  props: ['message', 'type'],
  computed: {
    isError: function isError() {
      return this.type === messageTypesEnum.ERROR;
    },
    isSuccess: function isSuccess() {
      return this.type === messageTypesEnum.SUCCESS;
    },
    isWarning: function isWarning() {
      return this.type === messageTypesEnum.WARNING;
    }
  }
});

});