define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/genericNotificationDialogTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    return {
      props: {
        'title': {
          type: String,
          "default": ''
        },
        'headerClass': {
          type: String,
          "default": ''
        },
        'headerIconClass': {
          type: String,
          "default": ''
        },
        'header': {
          type: String,
          "default": ''
        },
        'confirmButtonLabel': {
          type: String,
          "default": ''
        },
        'confirmButtonDataNameAttribute': {
          type: String,
          "default": ''
        },
        'confirmButtonClass': {
          type: String,
          "default": ''
        },
        'rejectButtonLabel': {
          type: String,
          "default": ''
        },
        'rejectButtonDataNameAttribute': {
          type: String,
          "default": ''
        }
      },
      template: template,
      components: {
        actionButton: options.actionButton
      },
      methods: {
        onConfirm: function onConfirm() {
          this.$emit('confirm');
        },
        onReject: function onReject() {
          this.$emit('reject');
        }
      }
    };
  }
};

});