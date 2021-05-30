define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var Vue = require('vue');

var Dialog = require("runtime_dependencies/js-sdk/src/components/dialog/Dialog");

var newCalcFieldNameTemplate = require("text!../../../model/schema/service/template/newCalcFieldNameTemplate.htm");

var ClientDomainSchemaService = require("../../model/service/ClientDomainSchemaService");

var SequenceGenerator = require("../../../model/util/SequenceGenerator");

var ResourceIdentifierGenerator = require("../../common/util/ResourceIdentifierGenerator");

var DomainSchemaService = require("../../../model/schema/service/DomainSchemaService");

var DomainSchemaDAO = require("../../../model/schema/dao/DomainSchemaDAO");

var DomainSchemaGranularSpecs = require("../../../model/schema/specification/DomainSchemaGranularSpecs");

var DomainSchemaSpecification = require("../../../model/schema/specification/DomainSchemaSpecification");

var domainSchemaCollectionsFactory = require("../../../model/schema/factory/domainSchemaCollectionsFactory");

var DataStore = require("../../../model/util/dataStore/DataStore");

var ClientSchemaDataStoreDataAdapter = require("../../model/util/ClientSchemaDataStoreDataAdapter");

var ClientDomainValidationService = require("../../component/validation/service/ClientDomainValidationService");

var SchemaMappingModel = require("../../component/validation/schemaMapping/model/SchemaMappingModel");

var schemaMappingComponent = require("../../component/validation/schemaMapping/component/SchemaMappingComponent");

var DomainSchemaMappingService = require("../../component/validation/schemaMapping/service/DomainSchemaMappingService");

var addAutomationDataNameAttributeMixinFactory = require("../../common/factory/addAutomationDataNameAttributeMixinFactory");

var automationDataNameAttributesEnum = require("../../common/enum/automationDataNameAttributesEnum");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
function createDomainSchemaMappingComponent(context, options) {
  context.register('schemaMappingModel', new SchemaMappingModel({}));
  var validationSchemaMappingComponentConfigWithDataNameAttribute = addAutomationDataNameAttributeMixinFactory.create({
    config: schemaMappingComponent,
    dataNames: automationDataNameAttributesEnum.validation.schemaMapping
  });
  var SchemaMappingComponent = Vue.extend(validationSchemaMappingComponentConfigWithDataNameAttribute);
  context.register('schemaMappingComponent', new SchemaMappingComponent({
    domainValidationEventBus: context.get('domainValidationEventBus'),
    data: context.get('schemaMappingModel').attributes
  }));
  context.register('schemaMappingDialog', new Dialog({
    el: context.get('schemaMappingComponent').$mount().$el
  }));
}

function createDomainSchemaMappingServiceForDomainValidation(context, options) {
  var dataStore = new DataStore({
    createCollectionsFactory: domainSchemaCollectionsFactory,
    dataAdapter: new ClientSchemaDataStoreDataAdapter({
      schemaModelConverter: context.get('schemaModelConverter')
    })
  });
  var domainSchemaDAO = new DomainSchemaDAO({
    dataStore: dataStore,
    schemaModelConverter: context.get('schemaModelConverter')
  });
  var domainSchemaGranularSpecs = new DomainSchemaGranularSpecs({
    dataStore: dataStore
  });
  var domainSchemaSpecification = new DomainSchemaSpecification({
    domainSchemaGranularSpecs: domainSchemaGranularSpecs
  });
  var domainSchemaService = new DomainSchemaService({
    calcFieldNameGenerator: new ResourceIdentifierGenerator({
      sequenceGenerator: new SequenceGenerator(),
      template: newCalcFieldNameTemplate
    }),
    domainSchemaDAO: domainSchemaDAO,
    dataStore: dataStore,
    domainSchemaSpecification: domainSchemaSpecification,
    domainSchemaGranularSpecs: domainSchemaGranularSpecs
  });
  var clientDomainSchemaService = new ClientDomainSchemaService({
    domainSchemaService: domainSchemaService,
    constantDataIslandNameGenerator: context.get('constantDataIslandNameGenerator'),
    serverSchemaModelSerializer: context.get('serverSchemaModelSerializer'),
    dataStore: dataStore
  });
  var clientDomainValidationService = new ClientDomainValidationService({
    dataStore: dataStore,
    clientDomainSchemaService: clientDomainSchemaService,
    clientResourcePropertiesService: context.get('clientResourcePropertiesServiceForDomainSchemaValidationService'),
    viewStateModel: context.get('viewStateModelServiceForDomainSchemaValidationService'),
    schemaResourcesNamesAreEqualSpecification: context.get('schemaResourcesNamesAreEqualSpecification'),
    designerViewStateByDomainProvider: context.get('designerViewStateByDomainProvider')
  });
  context.register('domainSchemaMappingService', new DomainSchemaMappingService({
    domainSchemaService: domainSchemaService,
    clientDomainValidationService: clientDomainValidationService
  }));
}

module.exports = function (context, options) {
  createDomainSchemaMappingComponent(context, options);
  createDomainSchemaMappingServiceForDomainValidation(context, options);
};

});