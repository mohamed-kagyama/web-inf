define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DashboardBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.extend({
  bundle: i18n
});
/*
 * Class to wrap Dashboard i18n messages.
 */

module.exports = i18nMessage;

});