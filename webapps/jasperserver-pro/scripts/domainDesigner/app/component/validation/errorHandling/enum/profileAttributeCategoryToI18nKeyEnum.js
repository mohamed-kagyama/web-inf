define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var profileAttributeCategoryEnum = require("./profileAttributeCategoryEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var profileAttributeCategoryToI18nKeyEnum = {};
profileAttributeCategoryToI18nKeyEnum[profileAttributeCategoryEnum.HIERARCHICAL] = 'domain.designer.profile.attribute.category.hierarchical';
profileAttributeCategoryToI18nKeyEnum[profileAttributeCategoryEnum.SERVER] = 'domain.designer.profile.attribute.category.server';
profileAttributeCategoryToI18nKeyEnum[profileAttributeCategoryEnum.TENANT] = 'domain.designer.profile.attribute.category.tenant';
profileAttributeCategoryToI18nKeyEnum[profileAttributeCategoryEnum.USER] = 'domain.designer.profile.attribute.category.user';
module.exports = profileAttributeCategoryToI18nKeyEnum;

});