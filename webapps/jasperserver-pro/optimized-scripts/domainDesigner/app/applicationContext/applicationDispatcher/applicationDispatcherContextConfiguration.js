/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../util/aspect/aspectjs","../../dispatcher/enum/applicationStateActionsEnum","../../dispatcher/aspect/HistoryPointAdvice","../../dispatcher/StoreChangeEventEmitter","../../dispatcher/adapter/DataStoreProviderAdapter","../../dispatcher/ApplicationMutations","../../dispatcher/applicationMutationsAOPConfigFactory","../../dispatcher/ApplicationDispatcherEventConfigInitializer","../../dispatcher/SyncApplicationDispatcher","../../dispatcher/AsyncApplicationDispatcher"],function(t,e,i){function a(t,e){t.register("dataStoreProvider",new h({dataStore:t.get("schemaDataStore")}));var i=new d({storeChangeEventBus:t.get("storeChangeEventBus"),viewState:t.get("viewStateModelReadOnlyFacade"),resourceProperties:t.get("resourcePropertiesReadOnlyFacade"),dataStoreProvider:t.get("dataStoreProvider"),applicationStateActionsEnum:c});t.register("storeChangeEventEmitter",i)}function r(t,e){a(t,e);var i=new s({historyModel:t.get("historyModel"),dataStore:t.get("schemaDataStore"),viewStateModel:t.get("viewStateModelReadOnlyFacade"),resourceProperties:t.get("resourcePropertiesReadOnlyFacade")});return u.create({pushHistoryFullState:i.pushState,pushHistoryViewState:i.pushViewState,clearHistory:i.pushStateAndClearHistory,storeChangeEventEmitter:t.get("storeChangeEventEmitter")})}function n(t,e){var i=new S({applicationMutations:t.get("applicationMutations"),startExecutionTimeout:e.dispatcher.startExecutionTimeout}),a=new v({applicationMutations:t.get("applicationMutations")});t.register("asyncApplicationDispatcher",i),t.register("syncApplicationDispatcher",a),t.register("applicationDispatcher",i)}function o(t,e){var i=r(t,e),a=new l({domainSchemaService:t.get("domainSchemaService"),resourcePropertiesService:t.get("resourcePropertiesService"),viewStateModelService:t.get("viewStateModelService")}),o=p(a,i);o=p(o,t.get("dependenciesTrackingApplicationMutationsAOPConfig")),t.register("applicationMutations",o),n(t,e),t.register("applicationDispatcherEventConfigInitializer",new g({applicationDispatcherEventBus:t.get("applicationDispatcherEventBus"),applicationDispatcher:t.get("applicationDispatcher"),applicationStateActionsEnum:c}))}var p=t("../../../util/aspect/aspectjs"),c=t("../../dispatcher/enum/applicationStateActionsEnum"),s=t("../../dispatcher/aspect/HistoryPointAdvice"),d=t("../../dispatcher/StoreChangeEventEmitter"),h=t("../../dispatcher/adapter/DataStoreProviderAdapter"),l=t("../../dispatcher/ApplicationMutations"),u=t("../../dispatcher/applicationMutationsAOPConfigFactory"),g=t("../../dispatcher/ApplicationDispatcherEventConfigInitializer"),v=t("../../dispatcher/SyncApplicationDispatcher"),S=t("../../dispatcher/AsyncApplicationDispatcher");i.exports=o});