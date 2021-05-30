define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var SimpleModel = require("../../../../../../../../model/util/SimpleModel");

var i18n = require("bundle!DomainDesignerBundle");

var i18n2 = require("bundle!CommonBundle");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = SimpleModel.extend({
  defaults: function defaults(options) {
    return {
      title: i18n['domain.designer.advanced.options.uploadSchemaDialog.title'],
      singleFileUpload: {
        file: null,
        fileInputLabel: options.fileInputLabel,
        fileInputPlaceholder: i18n2['input.file.not.selected'],
        actionButtonLabel: i18n2['button.browse'],
        accept: options.accept,
        errorMessage: ''
      },
      primaryButtonLabel: i18n2['button.upload'],
      secondaryButtonLabel: i18n2['button.cancel']
    };
  },
  reset: function reset() {
    var defaultState = this.defaults(),
        singleFileUpload = this.get('singleFileUpload');

    _.extend(singleFileUpload, {
      file: defaultState.singleFileUpload.file,
      errorMessage: defaultState.singleFileUpload.errorMessage
    });
  }
});

});