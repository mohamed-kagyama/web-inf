define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var Backbone = require('backbone');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var requestCanceledEnum = require("../../../rest/enum/requestCanceledEnum");

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var UploadSchemaXmlConversionErrorState = function UploadSchemaXmlConversionErrorState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaXmlConversionErrorState.prototype, Backbone.Events, {
  initialize: function initialize(options) {},
  enter: function enter(context, stateFactory) {
    var error = context.error;

    if (error !== requestCanceledEnum.CANCELED) {
      context.errors = [{
        category: {
          label: i18nMessage('domain.designer.error.dialog.schema.xml.import.generic.error.category'),
          isBold: false
        },
        errorParameters: []
      }];
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_SHOW_ERROR_DIALOG_STATE, context);
    }
  }
});

module.exports = UploadSchemaXmlConversionErrorState;

});