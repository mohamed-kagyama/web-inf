define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var genericTypesEnum = require('../../../../../model/schema/enum/genericTypesEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var treeIconClassEnum = {};
treeIconClassEnum[genericTypesEnum.STRING] = "jr-mTree-iconString";
treeIconClassEnum[genericTypesEnum.INTEGER] = "jr-mTree-iconNumber";
treeIconClassEnum[genericTypesEnum.DECIMAL] = "jr-mTree-iconNumber";
treeIconClassEnum[genericTypesEnum.TIME] = "jr-mTree-iconTime";
treeIconClassEnum[genericTypesEnum.TIMESTAMP] = "jr-mTree-iconDate";
treeIconClassEnum[genericTypesEnum.DATE] = "jr-mTree-iconDate";
treeIconClassEnum[genericTypesEnum.BOOLEAN] = "jr-mTree-iconBoolean";
module.exports = treeIconClassEnum;

});