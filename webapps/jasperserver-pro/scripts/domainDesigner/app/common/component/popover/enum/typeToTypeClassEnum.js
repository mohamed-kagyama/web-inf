define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var messageTypesEnum = require("../../enum/messageTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var typeToTypeClassEnum = {};
typeToTypeClassEnum[messageTypesEnum.INFO] = 'jr-mMessageInfo';
typeToTypeClassEnum[messageTypesEnum.SUCCESS] = 'jr-mMessageSuccess';
typeToTypeClassEnum[messageTypesEnum.WARNING] = 'jr-mMessageWarning';
typeToTypeClassEnum[messageTypesEnum.ATTENTION] = 'jr-mMessageAttention';
typeToTypeClassEnum[messageTypesEnum.ERROR] = 'jr-mMessageError';
typeToTypeClassEnum[messageTypesEnum.PLAIN] = 'jr-mMessagePlain';
module.exports = typeToTypeClassEnum;

});