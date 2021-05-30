define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

/* global  __jrsConfigs__*/
var jrsConfigs;

if (typeof __jrsConfigs__ !== 'undefined') {
  jrsConfigs = __jrsConfigs__;
} else {
  //Workaround for optimizer
  jrsConfigs = {
    contextPath: '',
    userLocale: 'en'
  };
}

module.exports = jrsConfigs;

});