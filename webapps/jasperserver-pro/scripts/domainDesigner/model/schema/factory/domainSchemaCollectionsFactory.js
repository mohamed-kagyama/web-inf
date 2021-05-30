define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var EntityCollection = require("../../util/collection/EntityCollection");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create() {
    return {
      constantGroups: new EntityCollection(),
      dataIslands: new EntityCollection(),
      dataSources: new EntityCollection(),
      dataSourceGroups: new EntityCollection(),
      tables: new EntityCollection(),
      tableGroups: new EntityCollection(),
      fields: new EntityCollection(),
      tableReferences: new EntityCollection(),
      filters: new EntityCollection(),
      joinTrees: new EntityCollection(),
      joins: new EntityCollection(),
      joinAliases: new EntityCollection(),
      joinExpressions: new EntityCollection(),
      presentationSets: new EntityCollection(),
      presentationFields: new EntityCollection()
    };
  }
};

});