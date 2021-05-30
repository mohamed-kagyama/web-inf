define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var i18n = require("bundle!DomainDesignerBundle");

var i18nMessageUtil = require("runtime_dependencies/js-sdk/src/common/util/i18nMessage");

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var i18nMessage = i18nMessageUtil.create(i18n);

var UploadSchemaParseSchemaAndCreateDomainState = function UploadSchemaParseSchemaAndCreateDomainState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaParseSchemaAndCreateDomainState.prototype, {
  initialize: function initialize(options) {
    this.clientDomainService = options.clientDomainService;
  },
  enter: function enter(context, stateFactory) {
    var schemaAsJSONString = context.domainSchemaAsJSONString;

    try {
      var schemaJSON = JSON.parse(schemaAsJSONString);
      context.domainResource = this._getDomainInServerFormatWithUploadedSchema(schemaJSON);
      delete context.domainSchemaAsJSONString;
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_VALIDATE_DOMAIN_STATE, context);
    } catch (e) {
      this._showErrorDialogForJsonParseError(context, stateFactory, e);
    }
  },
  _showErrorDialogForJsonParseError: function _showErrorDialogForJsonParseError(context, stateFactory, error) {
    var jsonParseError = {
      category: i18nMessage('domain.designer.error.dialog.schema.parse.error.file.invalid'),
      errorParameters: [error.toString()]
    };
    context.errors = [jsonParseError];
    stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_SHOW_ERROR_DIALOG_STATE, context);
  },
  _getDomainInServerFormatWithUploadedSchema: function _getDomainInServerFormatWithUploadedSchema(schemaJSON) {
    var domain = _.omit(this.clientDomainService.serialize(), ['bundles', 'securityFile']);

    domain.schema = schemaJSON;
    domain.uri = '/';
    return domain;
  }
});

module.exports = UploadSchemaParseSchemaAndCreateDomainState;

});