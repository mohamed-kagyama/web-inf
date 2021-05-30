define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var DomainSchemaGranularSpecs = require("../../../model/schema/specification/DomainSchemaGranularSpecs");

var DomainSchemaSpecification = require("../../../model/schema/specification/DomainSchemaSpecification");

var domainSchemaCollectionsFactory = require("../../../model/schema/factory/domainSchemaCollectionsFactory");

var DataStore = require("../../../model/util/dataStore/DataStore");

var ClientSchemaDataStoreDataAdapter = require("../../model/util/ClientSchemaDataStoreDataAdapter");

var newCalcFieldNameTemplate = require("text!../../../model/schema/service/template/newCalcFieldNameTemplate.htm");

var DomainSchemaDAO = require("../../../model/schema/dao/DomainSchemaDAO");

var DomainSchemaService = require("../../../model/schema/service/DomainSchemaService");

var SequenceGenerator = require("../../../model/util/SequenceGenerator");

var ResourceIdentifierGenerator = require("../../common/util/ResourceIdentifierGenerator");

var ClientDomainSchemaService = require("../../model/service/ClientDomainSchemaService");

var ClientDomainSchemaPathGenerationService = require("../../model/service/ClientDomainSchemaPathGenerationService");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDependenciesTrackingDomainSchemaService(context, options) {
  var dependenciesTrackingStoreClientDataAdapter = new ClientSchemaDataStoreDataAdapter({
    schemaModelConverter: context.get('schemaModelConverter')
  });
  var dependenciesTrackingStore = new DataStore({
    createCollectionsFactory: domainSchemaCollectionsFactory,
    dataAdapter: dependenciesTrackingStoreClientDataAdapter
  });
  var dependenciesTrackingDomainSchemaDAO = new DomainSchemaDAO({
    dataStore: dependenciesTrackingStore,
    schemaModelConverter: context.get('schemaModelConverter')
  });
  context.register('dependenciesTrackingStore', dependenciesTrackingStore);
  var domainSchemaGranularSpecs = new DomainSchemaGranularSpecs({
    dataStore: context.get('dependenciesTrackingStore')
  });
  var domainSchemaSpecification = new DomainSchemaSpecification({
    domainSchemaGranularSpecs: domainSchemaGranularSpecs
  });
  context.register('dependenciesTrackingDomainSchemaService', new DomainSchemaService({
    calcFieldNameGenerator: new ResourceIdentifierGenerator({
      sequenceGenerator: new SequenceGenerator(),
      template: newCalcFieldNameTemplate
    }),
    domainSchemaDAO: dependenciesTrackingDomainSchemaDAO,
    dataStore: dependenciesTrackingStore,
    domainSchemaSpecification: domainSchemaSpecification,
    domainSchemaGranularSpecs: domainSchemaGranularSpecs
  }));
  context.register('clientDependenciesTrackingSchemaPathGenerationService', new ClientDomainSchemaPathGenerationService({
    dataStore: context.get('dependenciesTrackingStore')
  }));
  context.register('dependenciesTrackingClientDomainSchemaService', new ClientDomainSchemaService({
    domainSchemaService: context.get('dependenciesTrackingDomainSchemaService'),
    constantDataIslandNameGenerator: context.get('constantDataIslandNameGenerator'),
    serverSchemaModelSerializer: context.get('serverSchemaModelSerializer'),
    dataStore: dependenciesTrackingStore
  }));
}

module.exports = function (context, options) {
  createDependenciesTrackingDomainSchemaService(context, options);
};

});