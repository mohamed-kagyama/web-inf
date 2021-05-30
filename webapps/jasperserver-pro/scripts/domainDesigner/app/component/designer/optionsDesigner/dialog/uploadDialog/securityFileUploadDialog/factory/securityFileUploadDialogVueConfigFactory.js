define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var template = require("text!../template/securityFileUploadDialogVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);
module.exports = {
  create: function create(options) {
    var store = options.store,
        Tabs = options.Tabs,
        ActionButton = options.ActionButton,
        SingleFileUpload = options.SingleFileUpload,
        RepositoryResourceChooser = options.RepositoryResourceChooser;
    return {
      components: {
        tabs: Tabs,
        actionButton: ActionButton,
        singleFileUpload: SingleFileUpload,
        repositoryResourceChooser: RepositoryResourceChooser
      },
      mixins: options.mixins,
      computed: {
        fileInputLabel: function fileInputLabel() {
          return i18nMessage(this.singleFileUpload.fileInputLabelKey, this.singleFileUpload.accept);
        },
        isLocalFileAbsent: function isLocalFileAbsent() {
          return !Boolean(this.singleFileUpload.file);
        },
        isLocalFileInvalid: function isLocalFileInvalid() {
          return Boolean(this.singleFileUpload.errorMessage);
        },
        isPrimaryButtonDisabled: function isPrimaryButtonDisabled() {
          if (this.isLocalFileTab) {
            return this.isLocalFileAbsent || this.isLocalFileInvalid;
          }

          if (this.isRepositoryTab) {
            return this.isSelectionShouldBeIgnored || this.isRepositoryChooserSelectionEmptyInCurrentMode || this.isAnyInvalidRepositoryChooserResourcesInCurrentMode;
          }
        }
      },
      template: template,
      data: function data() {
        return store.attributes;
      },
      methods: {
        reset: function reset() {
          store.reset();
        }
      }
    };
  }
};

});