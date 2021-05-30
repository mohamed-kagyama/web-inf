define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var validationStateNameEnum = require("../../../validation/state/enum/validationStateNameEnum");

var fileDownloader = require("../util/fileDownloader");

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var OptionsDesignerDownloadSchemaAsJsonController = function OptionsDesignerDownloadSchemaAsJsonController(options) {
  this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.objectDOMElExpressionsToStringConversionService = options.objectDOMElExpressionsToStringConversionService;
  this.serverSchemaModelSerializerWithStringDOMElExpressions = options.serverSchemaModelSerializerWithStringDOMElExpressions;
  this.validationStateFactory = options.validationStateFactory;

  this._initEvents();
};

_.extend(OptionsDesignerDownloadSchemaAsJsonController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.applicationCrossComponentEventBus, 'schema:json:download', this._onDownloadSchema);
  },
  _onDownloadSchema: function _onDownloadSchema() {
    var self = this,
        dataStore = this.clientDomainSchemaService.getDataStore();
    this.objectDOMElExpressionsToStringConversionService.convertObjectDOMElExpressionsToString(dataStore).then(function (dataStore) {
      var schema = self.serverSchemaModelSerializerWithStringDOMElExpressions.domainToJson(dataStore);
      var schemaAsString = JSON.stringify(schema.schema, null, 2);
      fileDownloader.download(schemaAsString, 'schema.json');
    }).fail(function (response) {
      self.validationStateFactory.enter(validationStateNameEnum.DOWNLOAD_SCHEMA_VALIDATION_ERROR_STATE, {
        error: response
      });
    });
  }
});

module.exports = OptionsDesignerDownloadSchemaAsJsonController;

});