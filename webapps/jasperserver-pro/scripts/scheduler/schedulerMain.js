define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var SchedulerAppPro = require('./view/SchedulerAppPro');

var domReady = require('requirejs-domready');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
domReady(function () {
  var schedulerAppPro = new SchedulerAppPro();
  $('#display').append(schedulerAppPro.$el); //workraround to make jquery-ui work properly with 'jr' prefix
  //workraround to make jquery-ui work properly with 'jr' prefix

  $('body').addClass('jr');
});

});