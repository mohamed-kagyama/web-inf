define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(errors) {
    return {
      errors: errors || [],
      header: i18n['domain.designer.error.dialog.validation.alert'],
      confirmEvent: 'errorDialog:toRepository',
      confirmLabel: i18n['domain.designer.error.dialog.button'],
      rejectLabel: '',
      rejectEvent: ''
    };
  }
};

});