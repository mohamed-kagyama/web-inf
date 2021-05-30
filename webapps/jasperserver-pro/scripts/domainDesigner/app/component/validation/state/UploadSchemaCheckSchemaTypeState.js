define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var fileExtensionEnum = require("../../../model/enum/fileExtensionEnum");

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadSchemaCheckSchemaTypeState = function UploadSchemaCheckSchemaTypeState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaCheckSchemaTypeState.prototype, {
  initialize: function initialize(options) {},
  enter: function enter(context, stateFactory) {
    var type = context.domainSchemaType;

    if (type === fileExtensionEnum.JSON) {
      context.domainSchemaAsJSONString = context.domainSchemaString;
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_PARSE_SCHEMA_AND_CREATE_DOMAIN_STATE, context);
    } else if (type === fileExtensionEnum.XML) {
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_CONVERT_XML_TO_JSON_SCHEMA_STATE, context);
    }
  }
});

module.exports = UploadSchemaCheckSchemaTypeState;

});