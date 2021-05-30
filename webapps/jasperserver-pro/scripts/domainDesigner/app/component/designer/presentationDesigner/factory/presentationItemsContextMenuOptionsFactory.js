define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

function getContextMenuOptions() {
  return [{
    label: i18nMessage('domain.designer.presentationDesigner.item.contextMenu.addSet'),
    action: 'addSet',
    triggerEvent: 'addSet'
  }];
}

module.exports = {
  create: getContextMenuOptions
};

});