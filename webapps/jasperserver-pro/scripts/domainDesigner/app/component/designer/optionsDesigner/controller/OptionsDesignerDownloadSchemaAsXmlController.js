define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var fileDownloader = require("../util/fileDownloader");

var uuidGenerator = require("../../../../../util/uuidGenerator");

var mimeTypesEnum = require("../../../../../rest/enum/mimeTypesEnum");

var tempSchemaResourceFileInfoEnum = require("../enum/tempSchemaResourceFileInfoEnum");

var validationStateNameEnum = require("../../../validation/state/enum/validationStateNameEnum");

var Backbone = require('backbone');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var TEMP_SCHEMA_NAME_TEMPLATE = _.template(tempSchemaResourceFileInfoEnum.TEMP_SCHEMA_RESOURCE_NAME_TEMPLATE);

var OptionsDesignerDownloadSchemaAsXmlController = function OptionsDesignerDownloadSchemaAsXmlController(options) {
  this.clientDomainSchemaService = options.clientDomainSchemaService;
  this.applicationCrossComponentEventBus = options.applicationCrossComponentEventBus;
  this.resourcesService = options.resourcesService;
  this.serverSchemaModelSerializer = options.serverSchemaModelSerializer;
  this.validationStateFactory = options.validationStateFactory;

  this._initEvents();
};

_.extend(OptionsDesignerDownloadSchemaAsXmlController.prototype, Backbone.Events, {
  _initEvents: function _initEvents() {
    this.listenTo(this.applicationCrossComponentEventBus, 'schema:xml:download', this._onDownloadSchemaAsXml);
  },
  _onDownloadSchemaAsXml: function _onDownloadSchemaAsXml() {
    var self = this;
    var dataStore = this.clientDomainSchemaService.getDataStore();
    var schema = this.serverSchemaModelSerializer.domainToJson(dataStore).schema;

    var temporarySchemaResourceName = this._generateTemporarySchemaResourceName();

    schema.label = temporarySchemaResourceName;

    this._saveTemporarySchemaAsJson(schema).then(function () {
      return self._getTemporarySchemaAsXml(temporarySchemaResourceName);
    }).then(function (schemaAsString) {
      self._downLoadSchema(schemaAsString);

      self._removeTemporarySchema(temporarySchemaResourceName);
    }).fail(function (response) {
      self.validationStateFactory.enter(validationStateNameEnum.DOWNLOAD_SCHEMA_VALIDATION_ERROR_STATE, {
        error: response
      });
    });
  },
  _generateTemporarySchemaResourceName: function _generateTemporarySchemaResourceName() {
    return TEMP_SCHEMA_NAME_TEMPLATE({
      suffix: uuidGenerator.generate()
    });
  },
  _saveTemporarySchemaAsJson: function _saveTemporarySchemaAsJson(domainSchemaJson) {
    return this.resourcesService.saveDomainSchemaAsJson(domainSchemaJson, {
      uri: tempSchemaResourceFileInfoEnum.TEMP_FOLDER
    });
  },
  _getTemporarySchemaUrl: function _getTemporarySchemaUrl(temporarySchemaName) {
    return tempSchemaResourceFileInfoEnum.TEMP_FOLDER + '/' + temporarySchemaName;
  },
  _getTemporarySchemaAsXml: function _getTemporarySchemaAsXml(temporarySchemaName) {
    var url = this._getTemporarySchemaUrl(temporarySchemaName);

    return this.resourcesService.getResource(url, {
      dataType: 'text',
      type: mimeTypesEnum.GENERIC_XML
    });
  },
  _downLoadSchema: function _downLoadSchema(schemaAsString) {
    fileDownloader.download(schemaAsString, 'schema.xml');
  },
  _removeTemporarySchema: function _removeTemporarySchema(temporarySchemaName) {
    var url = this._getTemporarySchemaUrl(temporarySchemaName);

    this.resourcesService.deleteResource(url);
  }
});

module.exports = OptionsDesignerDownloadSchemaAsXmlController;

});