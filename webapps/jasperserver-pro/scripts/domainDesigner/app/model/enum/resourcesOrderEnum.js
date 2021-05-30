define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var resourceTypeEnum = require("./resourceTypeEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var resourcesOrderEnum = {};
resourcesOrderEnum[resourceTypeEnum.resources.constantsGroups.GROUP] = 0;
resourcesOrderEnum[resourceTypeEnum.resources.groups.GROUP] = 1;
resourcesOrderEnum[resourceTypeEnum.resources.joinGroups.GROUP] = 2;
module.exports = resourcesOrderEnum;

});