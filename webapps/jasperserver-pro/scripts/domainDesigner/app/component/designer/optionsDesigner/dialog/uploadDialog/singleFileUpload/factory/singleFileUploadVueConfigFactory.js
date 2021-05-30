define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var template = require("text!../template/singleFileUploadVueTemplate.htm");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create() {
    return {
      template: template,
      props: {
        file: {
          type: Object,
          "default": null
        },
        fileInputLabel: {
          type: String,
          "default": ''
        },
        fileInputPlaceholder: {
          type: String,
          "default": ''
        },
        accept: {
          type: String,
          "default": '*.*'
        },
        actionButtonLabel: {
          type: String,
          "default": ''
        },
        errorMessage: {
          type: String,
          "default": ''
        }
      },
      computed: {
        isFileAbsent: function isFileAbsent() {
          return !Boolean(this.file);
        },
        fileName: function fileName() {
          if (this.isFileAbsent) {
            return '';
          }

          return this.file.name;
        }
      },
      methods: {
        selectFile: function selectFile(event) {
          var file = event.target.files[0],
              uploadFileInput = this.$el.querySelector('.jr-jFileUploadInput');

          if (file) {
            this.$emit('selectFile', file);
          }

          if (uploadFileInput) {
            uploadFileInput.value = '';
          }
        }
      }
    };
  }
};

});