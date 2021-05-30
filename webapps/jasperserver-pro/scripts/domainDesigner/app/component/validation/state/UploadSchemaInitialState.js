define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadSchemaInitialState = function UploadSchemaInitialState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaInitialState.prototype, {
  initialize: function initialize(options) {
    this.clientResourcePropertiesService = options.clientResourcePropertiesService;
  },
  enter: function enter(context, stateFactory) {
    var isDomainSaved = this.clientResourcePropertiesService.isDomainSaved();

    if (isDomainSaved) {
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_SHOW_UPDATE_DOMAIN_WARNING_DIALOG_STATE, context);
    } else {
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_CHECK_SCHEMA_TYPE_STATE, context);
    }
  }
});

module.exports = UploadSchemaInitialState;

});