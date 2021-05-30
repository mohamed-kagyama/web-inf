define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var _i18n = require("bundle!DomainDesignerBundle");

var template = require("text!./template/securityDesignerTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      components: {
        editor: options.editor
      },
      data: function data() {
        return options.data;
      },
      computed: {
        i18n: function i18n() {
          return _i18n;
        }
      }
    };
  }
};

});