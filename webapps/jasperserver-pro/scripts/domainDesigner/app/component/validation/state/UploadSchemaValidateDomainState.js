define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var _ = require('underscore');

var $ = require('jquery');

var canvasViewDesignersEnum = require("../../../model/enum/canvasViewDesignersEnum");

var expandedDomainSchemaUrlParamsEnum = require("./enum/expandedDomainSchemaUrlParamsEnum");

var validationStateNameEnum = require('./enum/validationStateNameEnum');

var resourceTypeEnum = require('../../../model/enum/resourceTypeEnum');

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var UploadSchemaValidateDomainState = function UploadSchemaValidateDomainState(options) {
  this.initialize(options);
};

_.extend(UploadSchemaValidateDomainState.prototype, {
  initialize: function initialize(options) {
    this.validationService = options.validationService;
    this.dataSourceInfoService = options.dataSourceInfoService;
    this.asyncServerSchemaModelParserService = options.asyncServerSchemaModelParserService;
    this.schemaModelConverter = options.schemaModelConverter;
    this.entitiesWithExpressionUpdateService = options.entitiesWithExpressionUpdateService;
    this.parametrizedSchemaResolvingService = options.parametrizedSchemaResolvingService;
    this.designerViewStateByDomainProvider = options.designerViewStateByDomainProvider;
  },
  enter: function enter(context, stateFactory) {
    var domainResource = context.domainResource;
    this.validationService.validateDomain(domainResource, {
      uriParams: expandedDomainSchemaUrlParamsEnum
    }).then(_.bind(this._onSuccessSchemaValidation, this, context, stateFactory)).then(null, _.bind(this._onFailedSchemaValidation, this, context, stateFactory));
  },
  _onSuccessSchemaValidation: function _onSuccessSchemaValidation(context, stateFactory, domain) {
    var self = this;
    return this.dataSourceInfoService.getDataSourceInfo(domain.dataSource.dataSourceReference.uri).then(function (dataSourceInfo) {
      return self._getDesignerState(domain, dataSourceInfo);
    }).then(function (designerState) {
      context.designerState = designerState;
      stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_FINAL_STATE, context);
    });
  },
  _getDesignerState: function _getDesignerState(domain, dataSourceInfo) {
    var self = this;

    var schema = this._addDataSourceToSchemaIfNecessary(domain.schema, dataSourceInfo);

    return this.asyncServerSchemaModelParserService.parse(schema).then(function (collections) {
      return self._updateExpressionsAndResolveProfileAttributes(collections);
    }).then(function (collections) {
      var schema, viewState;
      viewState = self.designerViewStateByDomainProvider.getViewState(collections, {
        dataSourceType: dataSourceInfo.type,
        currentDesigner: canvasViewDesignersEnum.PRESENTATION_DESIGNER
      });
      schema = self.schemaModelConverter.toJSON(collections);
      return {
        schema: schema,
        viewState: viewState,
        dataSource: {
          name: self._getNameOfTheDataSource(collections),
          type: dataSourceInfo.type,
          uri: dataSourceInfo.uri
        }
      };
    });
  },
  _addDataSourceToSchemaIfNecessary: function _addDataSourceToSchemaIfNecessary(schema, dataSourceMetadata) {
    var containsDataSource = this._isSchemaContainsDataSource(schema);

    if (!containsDataSource) {
      schema.resources.push({
        group: {
          name: dataSourceMetadata.name,
          elements: []
        }
      });
    }

    return schema;
  },
  _isSchemaContainsDataSource: function _isSchemaContainsDataSource(schema) {
    return schema.resources.find(function (element) {
      if (element[resourceTypeEnum.resources.groups.GROUP]) {
        return true;
      }
    });
  },
  _updateExpressionsAndResolveProfileAttributes: function _updateExpressionsAndResolveProfileAttributes(collections) {
    var expressionsUpdatingDeferred = this.entitiesWithExpressionUpdateService.update(collections);
    var parametersResolvingDeferred = this.parametrizedSchemaResolvingService.resolve(collections);
    return $.when(expressionsUpdatingDeferred, parametersResolvingDeferred).then(function (collections) {
      return collections;
    });
  },
  _getNameOfTheDataSource: function _getNameOfTheDataSource(collections) {
    var dataSource = collections.dataSources.first();
    return dataSource.name;
  },
  _onFailedSchemaValidation: function _onFailedSchemaValidation(context, stateFactory, xhr) {
    context.error = xhr;
    stateFactory.enter(validationStateNameEnum.UPLOAD_SCHEMA_VALIDATION_ERROR_STATE, context);
  }
});

module.exports = UploadSchemaValidateDomainState;

});