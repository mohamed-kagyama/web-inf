define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18n = require("bundle!DomainDesignerBundle");

var template = require("text!./template/presentationDesignerTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var bundles = options.bundles || i18n;
    return {
      template: template,
      components: {
        controls: options.controls,
        presentationDesignerTable: options.presentationDesignerTable
      },
      data: function data() {
        return options.data;
      },
      computed: {
        i18n: function i18n() {
          return bundles;
        }
      }
    };
  }
};

});