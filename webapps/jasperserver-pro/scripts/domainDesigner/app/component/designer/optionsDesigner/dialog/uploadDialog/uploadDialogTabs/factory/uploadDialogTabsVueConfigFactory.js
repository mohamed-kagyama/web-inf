define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/uploadDialogTabsVueTemplate.htm");

var uploadDialogTabsComputedMixin = require("../mixin/computed/uploadDialogTabsComputedMixin");

var uploadDialogTabEnum = require("../../enum/uploadDialogTabEnum");

var i18nComputed = require("../../../../../../../common/vue/computed/i18nComputed");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create() {
    return {
      template: template,
      mixins: [uploadDialogTabsComputedMixin],
      props: {
        'currentTab': {
          type: String,
          "default": uploadDialogTabEnum.REPOSITORY
        }
      },
      computed: _.extend({}, i18nComputed),
      methods: {
        onRepositoryTabClick: function onRepositoryTabClick() {
          this.$emit('repositoryTabClick');
        },
        onLocalFileTabClick: function onLocalFileTabClick() {
          this.$emit('localFileTabClick');
        }
      }
    };
  }
};

});