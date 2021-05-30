define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../../common/vue/computed/i18nComputed");

var template = require("text!../template/schemaAttributeInputTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var metadataDesignerEventBus = options.metadataDesignerEventBus;
    return {
      template: template,
      computed: _.extend({
        isEditMode: function isEditMode() {
          return Boolean(this.schemaAttributeInput.dataSourceGroupId);
        }
      }, i18nComputed),
      props: ["schemaAttributeInput"],
      methods: {
        onInput: function onInput(event) {
          var value = event.target.value;
          metadataDesignerEventBus.trigger("input:attribute", value);
        },
        add: function add() {
          metadataDesignerEventBus.trigger("add:attribute");
        },
        update: function update() {
          metadataDesignerEventBus.trigger("update:attribute");
        },
        cancel: function cancel() {
          metadataDesignerEventBus.trigger("cancel:attribute");
        },
        onEnter: function onEnter() {
          if (this.isEditMode) {
            this.update();
          } else {
            this.add();
          }
        }
      }
    };
  }
};

});