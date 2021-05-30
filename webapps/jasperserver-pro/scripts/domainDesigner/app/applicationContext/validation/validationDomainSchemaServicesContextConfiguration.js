define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var ClientSchemaDataStoreDataAdapter = require("../../model/util/ClientSchemaDataStoreDataAdapter");

var DomainSchemaGranularSpecs = require("../../../model/schema/specification/DomainSchemaGranularSpecs");

var DomainSchemaSpecification = require("../../../model/schema/specification/DomainSchemaSpecification");

var domainSchemaCollectionsFactory = require("../../../model/schema/factory/domainSchemaCollectionsFactory");

var DataStore = require("../../../model/util/dataStore/DataStore");

var SequenceGenerator = require("../../../model/util/SequenceGenerator");

var ResourceIdentifierGenerator = require("../../common/util/ResourceIdentifierGenerator");

var DomainSchemaDAO = require("../../../model/schema/dao/DomainSchemaDAO");

var DomainSchemaService = require("../../../model/schema/service/DomainSchemaService");

var newCalcFieldNameTemplate = require("text!../../../model/schema/service/template/newCalcFieldNameTemplate.htm");

var ClientDomainSchemaService = require("../../model/service/ClientDomainSchemaService");

var ClientDomainSchemaPathGenerationService = require("../../model/service/ClientDomainSchemaPathGenerationService");

var DefaultSchemaAwareProfileAttributeResolver = require("../../model/resolver/DefaultSchemaAwareProfileAttributeResolver");

var SimpleCache = require("../../../util/cache/SimpleCache");

var MetadataServiceCache = require("../../util/cache/MetadataServiceCache");

var MetadataService = require("../../model/service/MetadataService");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDomainSchemaServicesForDomainValidation(context, options) {
  var dataStore = new DataStore({
    createCollectionsFactory: domainSchemaCollectionsFactory,
    dataAdapter: new ClientSchemaDataStoreDataAdapter({
      schemaModelConverter: context.get('schemaModelConverter')
    })
  });
  context.register('domainValidationDataStore', dataStore);
  var domainSchemaDAO = new DomainSchemaDAO({
    dataStore: context.get('domainValidationDataStore'),
    schemaModelConverter: context.get('schemaModelConverter')
  });
  var domainSchemaGranularSpecs = new DomainSchemaGranularSpecs({
    dataStore: context.get('domainValidationDataStore')
  });
  var domainSchemaSpecification = new DomainSchemaSpecification({
    domainSchemaGranularSpecs: domainSchemaGranularSpecs
  }); // domain schema service

  var domainSchemaService = new DomainSchemaService({
    calcFieldNameGenerator: new ResourceIdentifierGenerator({
      sequenceGenerator: new SequenceGenerator(),
      template: newCalcFieldNameTemplate
    }),
    domainSchemaDAO: domainSchemaDAO,
    dataStore: context.get('domainValidationDataStore'),
    domainSchemaSpecification: domainSchemaSpecification,
    domainSchemaGranularSpecs: domainSchemaGranularSpecs
  });
  context.register('domainValidationSchemaService', domainSchemaService);
  context.register('clientDomainValidationSchemaPathGenerationService', new ClientDomainSchemaPathGenerationService({
    dataStore: context.get('domainValidationDataStore')
  }));
  context.register('clientDomainValidationSchemaService', new ClientDomainSchemaService({
    domainSchemaService: domainSchemaService,
    constantDataIslandNameGenerator: context.get('constantDataIslandNameGenerator'),
    serverSchemaModelSerializer: context.get('serverSchemaModelSerializer'),
    dataStore: context.get('domainValidationDataStore')
  }));
  context.register('validationSchemaAwareProfileAttributeResolver', new DefaultSchemaAwareProfileAttributeResolver({
    dataStore: context.get('domainValidationDataStore'),
    profileAttributesServiceCache: context.get('profileAttributesServiceCache')
  }));
  context.register('validationMetadataServiceCache', new MetadataServiceCache({
    profileAttributeResolver: context.get('validationSchemaAwareProfileAttributeResolver'),
    cache: new SimpleCache()
  }));
  context.register('validationMetadataService', new MetadataService({
    restMetadataService: context.get('restMetadataService'),
    metadataServiceCache: context.get('validationMetadataServiceCache'),
    profileAttributeResolver: context.get('validationSchemaAwareProfileAttributeResolver')
  }));
}

module.exports = function (context, options) {
  createDomainSchemaServicesForDomainValidation(context, options);
};

});