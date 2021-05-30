define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require('./enum/validationStateNameEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadSchemaDataSourceUriSelectedState = function UploadSchemaDataSourceUriSelectedState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaDataSourceUriSelectedState.prototype, {
  initialize: function initialize(options) {},
  enter: function enter(context, stateFactory) {
    var dataSourceUri = context.dataSourceUri;
    context.domainResource = this._replaceDataSourceUri(context.domainResource, dataSourceUri);
    stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_VALIDATE_DOMAIN_STATE, context);
  },
  _replaceDataSourceUri: function _replaceDataSourceUri(domain, dataSourceUri) {
    domain.dataSource.dataSourceReference.uri = dataSourceUri;
    return domain;
  }
});

module.exports = UploadSchemaDataSourceUriSelectedState;

});