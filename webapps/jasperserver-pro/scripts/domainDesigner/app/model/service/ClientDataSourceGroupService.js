define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var getResourceSourceNameOrNameUtil = require("../../util/getResourceSourceNameOrNameUtil");

var schemaEntitiesEnum = require("../../../model/schema/enum/schemaEntitiesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientDataSourceGroupService = function ClientDataSourceGroupService(options) {
  this.initialize(options);
};

_.extend(ClientDataSourceGroupService.prototype, {
  initialize: function initialize(options) {
    this.clientDomainSchemaService = options.clientDomainSchemaService;
    this.profileAttributesServiceCache = options.profileAttributesServiceCache;
  },
  getNameById: function getNameById(id) {
    var dataSourceGroup = this.clientDomainSchemaService.getEntityByIdAndType(id, schemaEntitiesEnum.DATA_SOURCE_GROUP);
    return this.getName(dataSourceGroup);
  },
  getName: function getName(dataSourceGroupJSON) {
    var name = getResourceSourceNameOrNameUtil(dataSourceGroupJSON),
        profileAttribute = this.profileAttributesServiceCache.get(name);
    return profileAttribute ? profileAttribute.value : name;
  }
});

module.exports = ClientDataSourceGroupService;

});