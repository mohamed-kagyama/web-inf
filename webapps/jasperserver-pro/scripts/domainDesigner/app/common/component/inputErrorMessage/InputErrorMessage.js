define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var inputErrorMessageVueConfigFactory = require("./inputErrorMessageVueConfigFactory");

var template = require("text!./template/inputErrorMessageTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = Vue.extend(inputErrorMessageVueConfigFactory.create({
  template: template
}));

});