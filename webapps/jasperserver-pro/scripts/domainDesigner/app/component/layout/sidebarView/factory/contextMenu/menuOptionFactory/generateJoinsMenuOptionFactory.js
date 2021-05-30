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
  create: function create() {
    return function (item) {
      return {
        label: i18nMessage('domain.designer.joinsDesigner.tree.contextMenu.generateJoins'),
        action: menuOptionsEventsEnum.GENERATE_JOINS.event,
        value: false,
        triggerEvent: 'generate:joins',
        test: function test() {
          return entityUtil.isDataSource(item.resource.type);
        }
      };
    };
  }
};

});