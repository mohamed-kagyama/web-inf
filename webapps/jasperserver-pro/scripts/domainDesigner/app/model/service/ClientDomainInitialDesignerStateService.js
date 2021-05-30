define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var $ = require('jquery');

var _ = require('underscore');

var mimeTypes = require("../../../rest/enum/mimeTypesEnum");

var base64 = require("runtime_dependencies/js-sdk/src/common/util/base64");

var canvasViewDesignersEnum = require("../enum/canvasViewDesignersEnum");

var resourcePropertiesUtil = require("../util/resourcePropertiesUtil");

var resourceNameSpecialCharactersUtil = require("../util/resourceNameSpecialCharactersUtil");

var uriUtil = require("../../util/uriUtil");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
var ClientDomainInitialDesignerStateService = function ClientDomainInitialDesignerStateService(options) {
  this.dataSourceInfoService = options.dataSourceInfoService;
  this.asyncServerSchemaModelParserService = options.asyncServerSchemaModelParserService;
  this.schemaModelConverter = options.schemaModelConverter;
  this.serverResourcePropertiesModelParser = options.serverResourcePropertiesModelParser;
  this.entitiesWithExpressionUpdateService = options.entitiesWithExpressionUpdateService;
  this.parametrizedSchemaResolvingService = options.parametrizedSchemaResolvingService;
  this.resourcesService = options.resourcesService;
  this.designerViewStateByDomainProvider = options.designerViewStateByDomainProvider;
  this.encryptedProfileAttributeErrorSpecification = options.encryptedProfileAttributeErrorSpecification;
};

_.extend(ClientDomainInitialDesignerStateService.prototype, {
  getInitialDesignerStateByDataSourceUri: function getInitialDesignerStateByDataSourceUri(dataSourceUri) {
    var self = this;
    return this.dataSourceInfoService.getDataSourceInfo(dataSourceUri).then(function (dataSourceInfo) {
      var domainState = self._createInitialDomainResource(dataSourceUri);

      return self.asyncServerSchemaModelParserService.parse(domainState.schema).then(function (collections) {
        var domain = self.schemaModelConverter.toJSON(collections);
        var resourceProperties = self.serverResourcePropertiesModelParser.parse(domainState);
        var viewState = self.designerViewStateByDomainProvider.getViewState(collections, {
          dataSourceType: dataSourceInfo.type
        });
        return {
          schema: domain,
          resourceProperties: resourceProperties,
          viewState: viewState
        };
      });
    });
  },
  getInitialDesignerStateByDomainResource: function getInitialDesignerStateByDomainResource(domain) {
    var self = this;
    var dataSourceUri = resourcePropertiesUtil.getEmbeddedResourceUri(domain.dataSource); //Domain may miss "group" in resources part if
    //it consists of constants only
    //but this group is necessary for creation of data source entity
    //Domain may miss "group" in resources part if
    //it consists of constants only
    //but this group is necessary for creation of data source entity

    domain = this._updateDomainWithGroupIfItIsAbsent(domain);
    var dataSourceInfoDeferred = this.dataSourceInfoService.getDataSourceInfo(dataSourceUri);
    return this.asyncServerSchemaModelParserService.parse(domain.schema).then(function (collections) {
      var domainSchemaDeferred = self._getUpdatedClientDomainSchema(collections);

      var subResourcesDeferred = self._loadAllSubResources(domain);

      var parametrizedSchemaResolvingDeferred = self._cacheParametrizedSchemas(collections);

      return $.when(dataSourceInfoDeferred, domainSchemaDeferred, subResourcesDeferred, parametrizedSchemaResolvingDeferred).then(function (dataSourceInfo, domainSchema, subResources) {
        var viewState = self.designerViewStateByDomainProvider.getViewState(collections, {
          dataSourceType: dataSourceInfo.type,
          currentDesigner: canvasViewDesignersEnum.PRESENTATION_DESIGNER
        });
        return {
          schema: domainSchema,
          resourceProperties: self.serverResourcePropertiesModelParser.parse(domain, {
            securityFileContent: subResources[0],
            bundlesContent: subResources[1]
          }),
          viewState: viewState
        };
      });
    });
  },
  _cacheParametrizedSchemas: function _cacheParametrizedSchemas(collections) {
    var self = this,
        parametrizedSchemaResolvingDeferred = $.Deferred();
    this.parametrizedSchemaResolvingService.resolve(collections).then(function () {
      parametrizedSchemaResolvingDeferred.resolve();
    }, function (xhr) {
      if (self.encryptedProfileAttributeErrorSpecification.isSatisfiedBy(xhr)) {
        parametrizedSchemaResolvingDeferred.reject(xhr);
      } else {
        parametrizedSchemaResolvingDeferred.resolve();
      }
    });
    return parametrizedSchemaResolvingDeferred;
  },
  _updateDomainWithGroupIfItIsAbsent: function _updateDomainWithGroupIfItIsAbsent(domain) {
    var firstResourcesGroup = this._getFirstResourcesGroup(domain);

    if (!firstResourcesGroup) {
      var resources = domain.schema.resources;
      var dataSourceUri = resourcePropertiesUtil.getEmbeddedResourceUri(domain.dataSource);
      resources.push.apply(resources, this._getInitialResourcesPartOfTheSchema(dataSourceUri));
    }

    return domain;
  },
  createInitialDomainResource: function createInitialDomainResource(dataSourceUri) {
    return this._createInitialDomainResource(dataSourceUri);
  },
  _createInitialDomainResource: function _createInitialDomainResource(dataSourceUri) {
    return {
      dataSource: this._getInitialDataSourcePartOfTheSchema(dataSourceUri),
      schema: {
        resources: this._getInitialResourcesPartOfTheSchema(dataSourceUri)
      }
    };
  },
  _getInitialDataSourcePartOfTheSchema: function _getInitialDataSourcePartOfTheSchema(dataSourceUri) {
    return {
      dataSourceReference: {
        uri: dataSourceUri
      }
    };
  },
  _getInitialResourcesPartOfTheSchema: function _getInitialResourcesPartOfTheSchema(dataSourceUri) {
    return [{
      group: {
        name: this._getDataSourceNameFromUri(dataSourceUri),
        elements: []
      }
    }];
  },
  _getDataSourceNameFromUri: function _getDataSourceNameFromUri(dataSourceUri) {
    var dataSourceName = uriUtil.getLastSegment(dataSourceUri);
    return resourceNameSpecialCharactersUtil.replaceResourceNameSpecialCharacters(dataSourceName);
  },
  _getFirstResourcesGroup: function _getFirstResourcesGroup(domain) {
    return _.chain(domain.schema.resources).pluck('group').compact().first().value();
  },
  _getUpdatedClientDomainSchema: function _getUpdatedClientDomainSchema(collections) {
    var self = this;
    return this.entitiesWithExpressionUpdateService.update(collections).then(function (collections) {
      return self.schemaModelConverter.toJSON(collections);
    });
  },
  _loadAllSubResources: function _loadAllSubResources(domain) {
    return $.when(this._loadSecurityFileContent(domain), this._loadBundlesContent(domain));
  },
  _loadSecurityFileContent: function _loadSecurityFileContent(domain) {
    var securityFile = domain.securityFile,
        domainUri = domain.uri,
        self = this;

    if (securityFile) {
      var uri = resourcePropertiesUtil.getEmbeddedResourceUri(securityFile);

      if (resourcePropertiesUtil.isResourceDomainSubResource(uri, domainUri)) {
        return self._loadBase64EncodedResource(uri, mimeTypes.GENERIC_XML);
      }
    }

    return new $.Deferred().resolve(null);
  },
  _loadBundlesContent: function _loadBundlesContent(domain) {
    var bundles = domain.bundles,
        domainUri = domain.uri,
        self = this;

    if (bundles && bundles.length > 0) {
      var promises = bundles.map(function (bundle) {
        var file = bundle.file,
            value = resourcePropertiesUtil.getFirstKeyValue(file),
            uri = value.uri;

        if (resourcePropertiesUtil.isResourceDomainSubResource(uri, domainUri)) {
          return self._loadBase64EncodedResource(uri, mimeTypes.BUNDLE_PROPERTIES);
        } else {
          return new $.Deferred().resolve(null);
        }
      });
      return $.when.apply($, promises).then(function () {
        //force '$.when' to always return an array of results
        return Array.prototype.slice.call(arguments, 0);
      });
    } else {
      return new $.Deferred().resolve([]);
    }
  },
  _loadBase64EncodedResource: function _loadBase64EncodedResource(uri, type) {
    return this.resourcesService.getResource(uri, {
      type: type,
      dataType: 'text'
    }).then(function (content) {
      return {
        raw: content,
        base64: base64.encode(content)
      };
    });
  }
});

module.exports = ClientDomainInitialDesignerStateService;

});