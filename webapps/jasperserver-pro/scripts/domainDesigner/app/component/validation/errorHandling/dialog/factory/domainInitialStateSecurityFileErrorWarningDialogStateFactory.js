define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var i18n2 = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create() {
    return {
      header: i18n['domain.designer.warning.dialog.securityError.header'],
      warnings: [{
        category: {
          label: i18n['domain.designer.warning.dialog.securityError.category'],
          isBold: false
        }
      }],
      confirmLabel: i18n['domain.designer.warning.dialog.securityError.confirm'],
      confirmEvent: 'securityFileErrorWarningDialog:continue',
      rejectLabel: i18n2['button.cancel'],
      rejectEvent: 'securityFileErrorWarningDialog:cancel'
    };
  }
};

});