define(function(require, exports, module) {
var __disableStrictMode__ = "use strict";

var applicationStateActionsEnum = require("../../dispatcher/enum/applicationStateActionsEnum");

var ApplicationMutations = require("../../dispatcher/ApplicationMutations");

var DependenciesTrackingAdvice = require("../../dispatcher/aspect/DependenciesTrackingAdvice");

var EntityCollector = require("../../component/dependenciesInspector/collector/EntityCollector");

var dependenciesTrackingApplicationMutationsWhiteList = require("../../component/dependenciesInspector/list/dependenciesTrackingApplicationMutationsWhiteList");

var dependenciesTrackingAOPConfigFactory = require("../../component/dependenciesInspector/factory/dependenciesTrackingAOPConfigFactory");

var fakeAllMethods = require("../../../util/fakeAllMethods");

var ViewStateModelService = require("../../model/service/ViewStateModelService");

var ResourcePropertiesService = require("../../../model/resource/service/ResourcePropertiesService");

/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */
module.exports = function (context, options) {
  var fakeViewStateModelService = fakeAllMethods(new ViewStateModelService({}));
  var fakeResourcePropertiesService = fakeAllMethods(new ResourcePropertiesService({}));
  var virtualApplicationMutations = new ApplicationMutations({
    domainSchemaService: context.get('dependenciesTrackingDomainSchemaService'),
    resourcePropertiesService: fakeResourcePropertiesService,
    viewStateModelService: fakeViewStateModelService
  });
  context.register('dependenciesTrackingEntityCollector', new EntityCollector({
    dataStore: context.get('dataStoreReadWrite'),
    dependenciesTrackingStore: context.get('dependenciesTrackingStore'),
    clientDomainSchemaService: context.get('clientDomainSchemaService'),
    applicationMutations: virtualApplicationMutations
  }));
  context.register('virtualApplicationMutations', virtualApplicationMutations);
  var dependenciesTrackingAdvice = new DependenciesTrackingAdvice({
    applicationStateActionsEnum: applicationStateActionsEnum,
    entityCollector: context.get('dependenciesTrackingEntityCollector'),
    dependenciesInspectorApplication: context.get('dependenciesInspectorApplication'),
    dependenciesConverter: context.get('dependenciesTrackingConverter')
  });
  context.register('dependenciesTrackingApplicationMutationsAOPConfig', dependenciesTrackingAOPConfigFactory.create({
    methods: dependenciesTrackingApplicationMutationsWhiteList,
    actions: [dependenciesTrackingAdvice.interceptDispatcherAction]
  }));
};

});