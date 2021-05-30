define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var messageTypesEnum = require("../../enum/messageTypesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var typeToIconClassEnum = {};
typeToIconClassEnum[messageTypesEnum.INFO] = 'jr-infoRound';
typeToIconClassEnum[messageTypesEnum.SUCCESS] = 'jr-checkmarkRound';
typeToIconClassEnum[messageTypesEnum.WARNING] = 'jr-warningRound';
typeToIconClassEnum[messageTypesEnum.ATTENTION] = 'jr-warningRound';
typeToIconClassEnum[messageTypesEnum.ERROR] = 'jr-cancelRound';
typeToIconClassEnum[messageTypesEnum.PLAIN] = '';
module.exports = typeToIconClassEnum;

});