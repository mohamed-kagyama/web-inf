define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var i18nComputed = require("../../../../common/vue/computed/i18nComputed");

var template = require("text!../template/warningDialogWithCategoriesTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var store = options.store,
        eventBus = options.eventBus;
    return {
      template: template,
      computed: i18nComputed,
      components: {
        genericNotificationDialog: options.genericNotificationDialog,
        category: options.category,
        categoryDetails: options.categoryDetails
      },
      data: function data() {
        return store.attributes;
      },
      methods: {
        onConfirm: function onConfirm() {
          eventBus.trigger(this.confirmEvent);
        },
        onReject: function onReject() {
          eventBus.trigger(this.rejectEvent);
        },
        shouldRenderParametersList: function shouldRenderParametersList(parameters) {
          return Boolean(parameters && parameters.length);
        }
      }
    };
  }
};

});