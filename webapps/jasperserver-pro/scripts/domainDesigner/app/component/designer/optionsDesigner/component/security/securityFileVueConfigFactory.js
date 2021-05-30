define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _i18n = require("bundle!DomainDesignerBundle");

var template = require("text!./template/securityFileTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
// TODO: @gtoffoli this file is no longer used, replaced by the new Security designer
module.exports = {
  create: function create(options) {
    return {
      template: template,
      props: ['securityFile'],
      computed: {
        i18n: function i18n() {
          return _i18n;
        }
      },
      methods: {
        onDeleteSecurityFile: function onDeleteSecurityFile() {
          options.optionsDesignerEventBus.trigger('remove:securityFile');
        },
        onDownloadSecurityFile: function onDownloadSecurityFile() {
          options.optionsDesignerEventBus.trigger('download:securityFile', this.securityFile);
        },
        onReplaceSecurityFile: function onReplaceSecurityFile() {
          options.optionsDesignerEventBus.trigger('show:securityFileUploadDialog');
        }
      }
    };
  }
};

});