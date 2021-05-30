define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var mimeTypes = require("../../../../rest/enum/mimeTypesEnum");

var uuidGenerator = require("../../../../util/uuidGenerator");

var requestParamsEnum = require("../../../../rest/enum/requestParamsEnum");

var tempSchemaResourceFileInfoEnum = require("../../designer/optionsDesigner/enum/tempSchemaResourceFileInfoEnum");

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TEMP_SCHEMA_NAME_TEMPLATE = _.template(tempSchemaResourceFileInfoEnum.TEMP_SCHEMA_RESOURCE_NAME_TEMPLATE);

var UploadSchemaConvertXmlToJsonSchemaState = function UploadSchemaConvertXmlToJsonSchemaState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaConvertXmlToJsonSchemaState.prototype, {
  initialize: function initialize(options) {
    this.resourcesService = options.resourcesService;
  },
  enter: function enter(context, stateFactory) {
    this._convertXmlSchemaToJson(context.domainSchemaString).then(function (schemaJson) {
      context.domainSchemaAsJSONString = schemaJson;
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_PARSE_SCHEMA_AND_CREATE_DOMAIN_STATE, context);
    }, function (xhr) {
      context.error = xhr;
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_XML_CONVERSION_ERROR_STATE, context);
    });
  },
  _convertXmlSchemaToJson: function _convertXmlSchemaToJson(schemaXml) {
    var temporarySchemaResourceName = this._generateTemporarySchemaResourceName();

    return this.resourcesService.saveFileResourceViaDirectStreaming(schemaXml, {
      urlParams: [{
        name: requestParamsEnum.DRY_RUN.NAME,
        value: requestParamsEnum.DRY_RUN.VALUES.TRUE
      }],
      uri: tempSchemaResourceFileInfoEnum.TEMP_FOLDER,
      fileType: mimeTypes.GENERIC_XML,
      name: temporarySchemaResourceName,
      description: '',
      accept: mimeTypes.DOMAIN_SCHEMA_RESOURCE_JSON,
      dataType: 'text'
    });
  },
  _generateTemporarySchemaResourceName: function _generateTemporarySchemaResourceName() {
    return TEMP_SCHEMA_NAME_TEMPLATE({
      suffix: uuidGenerator.generate()
    });
  }
});

module.exports = UploadSchemaConvertXmlToJsonSchemaState;

});