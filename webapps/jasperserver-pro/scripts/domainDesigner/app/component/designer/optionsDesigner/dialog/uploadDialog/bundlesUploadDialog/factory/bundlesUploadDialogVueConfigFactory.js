define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/bundlesUploadDialogVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var store = options.store,
        Tabs = options.Tabs,
        MultipleFileUpload = options.MultipleFileUpload,
        ActionButton = options.ActionButton,
        RepositoryResourceChooser = options.RepositoryResourceChooser;
    return {
      components: {
        tabs: Tabs,
        multipleFileUpload: MultipleFileUpload,
        actionButton: ActionButton,
        repositoryResourceChooser: RepositoryResourceChooser
      },
      mixins: options.mixins,
      computed: {
        isLocalFilesListEmpty: function isLocalFilesListEmpty() {
          return _.isEmpty(this.multipleFileUpload.files);
        },
        isAnyInvalidLocalFiles: function isAnyInvalidLocalFiles() {
          return _.some(this.multipleFileUpload.files, function (file) {
            return file.isInvalid;
          });
        },
        isPrimaryButtonDisabled: function isPrimaryButtonDisabled() {
          if (this.isLocalFileTab) {
            return this.isLocalFileActionButtonDisabled;
          }

          if (this.isRepositoryTab) {
            return this.isSelectionShouldBeIgnored || this.isRepositoryChooserSelectionEmptyInCurrentMode || this.isAnyInvalidRepositoryChooserResourcesInCurrentMode;
          }
        },
        isLocalFileActionButtonDisabled: function isLocalFileActionButtonDisabled() {
          return this.isLocalFilesListEmpty || this.isAnyInvalidLocalFiles;
        }
      },
      template: template,
      data: function data() {
        return store.attributes;
      }
    };
  }
};

});