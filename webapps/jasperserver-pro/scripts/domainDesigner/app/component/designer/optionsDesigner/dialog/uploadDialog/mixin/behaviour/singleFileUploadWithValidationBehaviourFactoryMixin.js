define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = {
  create: function create(options) {
    var singleFileUploadActions = options.singleFileUploadActions,
        singleFileUploadStateMutations = options.singleFileUploadStateMutations,
        validator = options.validator;
    return {
      methods: {
        selectFile: function selectFile(file) {
          var self = this;
          singleFileUploadActions.loadFileWithContent(file).then(function (file) {
            var result = self._validateFile(file);

            if (result) {
              file = result.file;
              singleFileUploadStateMutations.setErrorMessage(result.errorMessage);
            } else {
              singleFileUploadStateMutations.clearErrorMessage();
            }

            singleFileUploadStateMutations.selectFile(file);
          });
        },
        // private
        _validateFile: function _validateFile(file) {
          var result = validator.validate([file], []);

          if (result) {
            return {
              file: _.first(result.invalidFiles),
              errorMessage: _.first(result.errorMessage)
            };
          }
        }
      }
    };
  }
};

});