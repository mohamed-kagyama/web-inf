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
      header: i18n['domain.designer.advanced.options.updateSchemaDialog.subTitle'],
      warnings: [{
        category: {
          label: i18n['domain.designer.advanced.options.updateSchemaDialog.dependencies.message'],
          isBold: false
        }
      }, {
        category: {
          label: i18n['domain.designer.advanced.options.updateSchemaDialog.actions.message'],
          isBold: false
        }
      }],
      confirmLabel: i18n['domain.designer.advanced.options.updateSchemaDialog.actions.updateSchema'],
      confirmEvent: 'updateSavedSchemaWarningDialog:update',
      rejectLabel: i18n2['button.cancel'],
      rejectEvent: 'updateSavedSchemaWarningDialog:cancel'
    };
  }
};

});