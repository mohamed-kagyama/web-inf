define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18nComputed = require("../../vue/computed/i18nComputed");

var template = require("text!./template/loaderTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var Dialog = options.Dialog,
        loaderEventBus = options.loaderEventBus,
        zIndex = options.zIndex;
    return {
      template: template,
      computed: i18nComputed,
      data: function data() {
        return {
          isDialogVisible: false,
          hasCancel: options.hasCancel
        };
      },
      methods: {
        close: function close() {
          this.dialog.close();
          this.isDialogVisible = false;
        },
        open: function open() {
          this.dialog.open();
          this.isDialogVisible = true;
        },
        isVisible: function isVisible() {
          return this.isDialogVisible;
        },
        onCancelClick: function onCancelClick() {
          loaderEventBus.trigger('cancel');
        }
      },
      created: function created() {
        this.dialog = new Dialog({
          el: this.$mount().$el,
          zIndex: zIndex
        });
      },
      destroyed: function destroyed() {
        this.close();
        this.dialog.remove();
      }
    };
  }
};

});