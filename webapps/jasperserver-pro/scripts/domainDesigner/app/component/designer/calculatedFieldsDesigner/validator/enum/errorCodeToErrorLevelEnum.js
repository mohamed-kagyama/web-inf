define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var domElErorEnum = require("./domElErrorEnum");

var messageTypesEnum = require("../../../../../common/component/validation/enum/messageTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var errorCodeToErrorLevelEnum = {};
errorCodeToErrorLevelEnum[domElErorEnum.TYPE_DO_NOT_MATCH] = messageTypesEnum.WARNING;
module.exports = errorCodeToErrorLevelEnum;

});