define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var template = require("text!../template/multipleFileUploadTemplate.htm");

var popoverDirective = require("../../../../../../../common/component/popover/directive/popoverDirective");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create() {
    return {
      template: template,
      computed: {
        isFilesEmpty: function isFilesEmpty() {
          return !Boolean(this.files.length);
        }
      },
      directives: {
        popover: popoverDirective
      },
      props: {
        'files': Array,
        'infoLabel': String,
        'infoButtonLabel': String,
        'actionButtonLabel': String,
        'isActionButtonDisabled': {
          type: Boolean,
          "default": false
        },
        'accept': {
          type: String,
          "default": ''
        },
        'multiple': {
          type: Boolean,
          "default": false
        },
        'popover': {
          type: Object,
          "default": {
            errorMessage: '',
            errorTitle: '',
            placement: '',
            type: ''
          }
        }
      },
      methods: {
        addFiles: function addFiles(event) {
          var uploadFileInput = this.$el.querySelector('.jr-jFileUploadInput');

          var files = _.map(event.target.files, function (file) {
            return file;
          });

          this.$emit('addFiles', files);

          if (uploadFileInput) {
            uploadFileInput.value = '';
          }
        },
        removeFile: function removeFile(index, event) {
          event.stopPropagation();
          this.$emit('removeFile', index);
        },
        closeErrorPopover: function closeErrorPopover() {
          this.$emit('closeErrorPopover');
        }
      }
    };
  }
};

});