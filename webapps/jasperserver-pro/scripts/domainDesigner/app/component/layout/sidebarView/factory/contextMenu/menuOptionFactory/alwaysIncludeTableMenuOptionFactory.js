define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var applicationStateEventsEnum = require("../../../../../../dispatcher/enum/applicationStateEventsEnum");

var menuOptionsEventsEnum = require("../enum/menuOptionsEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(options) {
    var clientDomainSchemaService = options.clientDomainSchemaService,
        advancedJoinsMappingSpecification = options.advancedJoinsMappingSpecification;
    return function (item) {
      var optionsForSpec = clientDomainSchemaService.getOptionsForAlwaysIncludedTableEnabledSpec({
        joinTreeId: item.resource.parentJoinTreeId,
        type: item.type
      });
      return {
        label: i18nMessage('domain.designer.joinsDesigner.tree.contextMenu.alwaysIncludeTable'),
        action: menuOptionsEventsEnum.ALWAYS_INCLUDE_TABLE.event,
        value: clientDomainSchemaService.getAlwaysIncludeTableByJoinAliasId(item.resourceId),
        triggerEvent: applicationStateEventsEnum.JOINS_DESIGNER_UPDATE_JOIN_ALIAS,
        test: function test() {
          return optionsForSpec && advancedJoinsMappingSpecification.isAlwaysIncludeTableEnabled(optionsForSpec.suppressCircularJoin, optionsForSpec.includeAllDataIslandJoins);
        }
      };
    };
  }
};

});