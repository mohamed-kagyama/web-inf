define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

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
        label: i18nMessage('domain.designer.joinsDesigner.tree.contextMenu.renameTable'),
        action: menuOptionsEventsEnum.RENAME_TABLE_REFERENCE.event,
        value: false,
        triggerEvent: 'rename:tableReference',
        test: function test() {
          return isItemJoinAliasOrTableReference(item) && !item.resource.isDerivedTable;
        }
      };
    };
  }
};

});