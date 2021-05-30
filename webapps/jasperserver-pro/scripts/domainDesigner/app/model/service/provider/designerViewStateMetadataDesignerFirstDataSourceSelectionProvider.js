define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var uriUtil = require("../../../util/uriUtil");

var schemaEntitiesEnum = require("../../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  getSidebarSelectedResource: function getSidebarSelectedResource(dataSources) {
    var firstDataSource = dataSources.first();
    return {
      resourceId: firstDataSource.id,
      type: schemaEntitiesEnum.DATA_SOURCE,
      id: uriUtil.getAbsoluteUri(firstDataSource.id)
    };
  }
};

});