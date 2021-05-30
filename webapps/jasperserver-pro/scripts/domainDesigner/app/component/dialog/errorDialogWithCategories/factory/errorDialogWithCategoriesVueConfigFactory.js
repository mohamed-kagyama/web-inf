define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../common/vue/computed/i18nComputed");

var template = require("text!../template/errorDialogWithCategoriesTemplate.htm");

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
      computed: _.extend({}, {
        isHidden: function isHidden() {
          return !this.show;
        }
      }, i18nComputed),
      watch: {
        show: function show(shouldBeShown) {
          var self = this;
          this.$nextTick(function () {
            self.$emit("show", shouldBeShown);
          });
        }
      },
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