define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var filtersDesignerSidebarTreeItemResourceFactory = require("../factory/filtersDesignerSidebarTreeItemResourceFactory");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var filtersDesignerSidebarTreeItemResourceProcessor = function filtersDesignerSidebarTreeItemResourceProcessor(item, options) {
  item.resource = filtersDesignerSidebarTreeItemResourceFactory.create(item, options);
  return item;
};

module.exports = filtersDesignerSidebarTreeItemResourceProcessor;

});