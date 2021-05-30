define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var applicationStateEventsEnum = require("../../../../../../dispatcher/enum/applicationStateEventsEnum");

var menuOptionsEventsEnum = require("../enum/menuOptionsEventsEnum");

var artificialTreeResourceEntityUtil = require("../../../util/artificialTreeResourceEntityUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create() {
    return function (item) {
      return {
        label: i18nMessage('domain.designer.calcFields.contextMenu.createConstantField'),
        action: menuOptionsEventsEnum.CREATE_CALC_FIELD.event,
        value: false,
        triggerEvent: applicationStateEventsEnum.CALCULATED_FIELDS_DESIGNER_SHOW,
        test: function test() {
          return artificialTreeResourceEntityUtil.isConstantGroup(item.resource);
        }
      };
    };
  }
};

});