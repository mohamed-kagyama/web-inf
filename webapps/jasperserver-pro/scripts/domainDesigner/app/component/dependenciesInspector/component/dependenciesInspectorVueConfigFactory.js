define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _i18n = require("bundle!DomainDesignerBundle");

var template = require("text!../template/dependenciesInspectorTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      template: template,
      components: {
        leftTreeVirtualData: options.leftTreeVirtualData,
        rightTreeVirtualData: options.rightTreeVirtualData
      },
      computed: {
        i18n: function i18n() {
          return _i18n;
        }
      },
      methods: {
        onConfirm: function onConfirm() {
          options.dependenciesInspectorEventBus.trigger('dependenciesInspectorComponent:confirm');
        },
        onReject: function onReject() {
          options.dependenciesInspectorEventBus.trigger('dependenciesInspectorComponent:reject');
        }
      }
    };
  }
};

});