define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var schemaEntitiesEnum = require("../../../../../../model/schema/enum/schemaEntitiesEnum");

var entityUtil = require("../../../../../../model/schema/util/entityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (resource, options) {
  if (entityUtil.isField(resource.type)) {
    var source = options.joinAlias || options.tableReference || options.joinTree;

    if (source) {
      resource.sourceId = source.id;
      resource.sourceType = entityUtil.getEntityName(source);
    } else {
      resource.sourceId = options.constantGroupId;
      resource.sourceType = schemaEntitiesEnum.CONSTANT_GROUP;
    }
  }

  return resource;
};

});