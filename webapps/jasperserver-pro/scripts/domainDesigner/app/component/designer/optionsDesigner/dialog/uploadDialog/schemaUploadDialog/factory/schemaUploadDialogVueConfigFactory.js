define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18nComputed = require("../../../../../../../common/vue/computed/i18nComputed");

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var template = require("text!../template/schemaUploadDialogVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(options) {
    var store = options.store,
        ActionButton = options.ActionButton,
        SingleFileUpload = options.SingleFileUpload;
    return {
      template: template,
      mixins: options.mixins,
      components: {
        actionButton: ActionButton,
        singleFileUpload: SingleFileUpload
      },
      computed: _.extend({
        isPrimaryButtonDisabled: function isPrimaryButtonDisabled() {
          return !Boolean(this.singleFileUpload.file) || Boolean(this.singleFileUpload.errorMessage);
        }
      }, i18nComputed),
      data: function data() {
        return store.attributes;
      },
      methods: {
        onPrimaryButtonClick: function onPrimaryButtonClick() {
          this.$emit('uploadSchema', this.singleFileUpload.file.content, this.singleFileUpload.file.name);
        },
        onSecondaryButtonClick: function onSecondaryButtonClick() {
          this.$emit('close');
        },
        reset: function reset() {
          store.reset();
        }
      }
    };
  }
};

});