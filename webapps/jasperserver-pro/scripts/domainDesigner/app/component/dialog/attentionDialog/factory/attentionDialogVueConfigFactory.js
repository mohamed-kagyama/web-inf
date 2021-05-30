define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/attentionDialogTemplate.htm");

var _i18n = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var event = options.event,
        eventBus = options.eventBus;
    return {
      template: template,
      components: {
        genericNotificationDialog: options.genericNotificationDialog
      },
      computed: {
        i18n: function i18n() {
          return _i18n;
        }
      },
      data: function data() {
        return options.store;
      },
      methods: {
        close: function close() {
          eventBus.trigger(event);
        }
      }
    };
  }
};

});