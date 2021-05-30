define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var mediaTypes;

(function (mediaTypes) {
  mediaTypes["APPLICATION_JSON"] = "application/json";
  mediaTypes["APPLICATION_HAL_JSON"] = "application/hal+json";
  mediaTypes["TEXT_HTML"] = "text/html";
})(mediaTypes || (mediaTypes = {}));

module.exports = mediaTypes;

});