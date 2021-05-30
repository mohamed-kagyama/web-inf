define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var entityUtil = require("../../../../../../../model/schema/util/entityUtil");

var menuOptionsEventsEnum = require("../enum/menuOptionsEventsEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(options) {
    var isItemJoinAliasOrTableReference = options.isItemJoinAliasOrTableReference;
    return function (item) {
      return {
        label: i18nMessage('domain.designer.derivedTables.editDerivedTables'),
        action: menuOptionsEventsEnum.EDIT_DERIVED_TABLE.event,
        value: false,
        triggerEvent: 'sidebarTreeMenu:editDerivedTable',
        test: function test() {
          return entityUtil.isDerivedTable(item.resource.type) || isItemJoinAliasOrTableReference(item) && item.resource.isDerivedTable;
        }
      };
    };
  }
};

});