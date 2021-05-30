define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/renameDialogVueTemplate.htm");

var i18nComputed = require("../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var store = options.store;
    return {
      template: template,
      components: options.components,
      watch: {
        show: function show(shouldBeShown) {
          this.$emit("show", shouldBeShown);

          if (shouldBeShown) {
            this.$nextTick(function () {
              if (this.focusInputOnShow) {
                this.$refs.input.focus();
              }

              if (this.selectValueOnShow) {
                this.$refs.input.select();
              }
            });
          }
        }
      },
      computed: _.extend({}, {
        isInputLabelExists: function isInputLabelExists() {
          return typeof this.inputLabel !== 'undefined';
        },
        isHidden: function isHidden() {
          return !this.show;
        },
        isDisabled: function isDisabled() {
          return Boolean(this.value === this.originalValue || this.validationMessage);
        }
      }, i18nComputed),
      data: function data() {
        return store;
      },
      methods: {
        onInput: function onInput() {
          this.$emit("input", this.$refs.input.value);
        },
        onSecondaryButtonClick: function onSecondaryButtonClick() {
          this.$emit("cancel");
        },
        onEnterConfirm: function onEnterConfirm() {
          if (!this.isDisabled) {
            this.triggerOkAction();
          }
        },
        triggerOkAction: function triggerOkAction() {
          var value = this.$refs.input.value;
          this.$emit("ok", value);
        }
      }
    };
  }
};

});