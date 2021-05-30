define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18n2 = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(errors) {
    return {
      errors: errors || [],
      header: i18n['domain.designer.upload.schema.error.dialog.header'],
      confirmLabel: i18n2['button.close'],
      confirmEvent: 'errorDialog:close',
      rejectLabel: '',
      rejectEvent: ''
    };
  }
};

});