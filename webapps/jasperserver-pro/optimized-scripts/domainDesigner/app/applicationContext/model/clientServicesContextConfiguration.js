/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../model/service/ClientDomainService","../../model/service/ClientDomainSchemaService","../../model/service/ClientDomainSchemaCalcFieldsService","../../model/service/ClientResourcePropertiesService","../../model/service/ClientDomainSchemaFiltersService","../../model/service/ClientDomainSchemaJoinsDesignerService","../../model/service/ClientDomainSchemaMetadataService","../../model/service/ClientDomainSchemaPathGenerationService","../../model/service/ClientDomainSchemaAdvancedOptionsService","../../model/service/ClientCurrentDesignerStateService","../../model/service/ClientDataSourceGroupService","../../model/service/ViewStateModelQueryService","../../../model/util/SequenceGenerator"],function(e,r,i){function t(e,r){e.register("clientDomainSchemaService",new c({domainSchemaService:e.get("domainSchemaService"),constantDataIslandNameGenerator:e.get("constantDataIslandNameGenerator"),serverSchemaModelSerializer:e.get("serverSchemaModelSerializer"),dataStore:e.get("schemaDataStore")})),e.register("clientDataSourceGroupService",new D({clientDomainSchemaService:e.get("clientDomainSchemaService"),profileAttributesServiceCache:e.get("profileAttributesServiceCache")})),e.register("clientDomainSchemaMetadataService",new m({dataStore:e.get("schemaDataStore"),clientDataSourceGroupService:e.get("clientDataSourceGroupService")})),e.register("clientDomainSchemaFiltersService",new S({dataStore:e.get("schemaDataStore")})),e.register("clientDomainSchemaJoinsDesignerService",new l({dataStore:e.get("schemaDataStore"),joinTreeNameSuffixGenerator:new g})),e.register("clientDomainSchemaCalcFieldsService",new o({domainSchemaService:e.get("domainSchemaService"),dataStore:e.get("schemaDataStore")})),e.register("clientDomainSchemaAdvancedOptionsService",new v({dataStore:e.get("schemaDataStore")}));var i=new s({dataStore:e.get("schemaDataStore")}),t=new n({resourcePropertiesService:e.get("resourcePropertiesService"),serverResourcePropertiesModelSerializer:e.get("serverResourcePropertiesModelSerializer"),resourceProperties:e.get("resourcePropertiesReadOnlyFacade")});e.register("clientResourcePropertiesService",t),e.register("clientDomainSchemaPathGenerationService",i),e.register("clientDomainService",new a({clientDomainSchemaService:e.get("clientDomainSchemaService"),clientResourcePropertiesService:e.get("clientResourcePropertiesService")})),e.register("clientCurrentDesignerStateService",new d({dataStore:e.get("schemaDataStore"),resourceProperties:e.get("resourcePropertiesReadOnlyFacade"),viewStateModel:e.get("viewStateModelReadOnlyFacade")})),e.register("viewStateModelQueryService",new h({viewStateModel:e.get("viewStateModelReadOnlyFacade")}))}var a=e("../../model/service/ClientDomainService"),c=e("../../model/service/ClientDomainSchemaService"),o=e("../../model/service/ClientDomainSchemaCalcFieldsService"),n=e("../../model/service/ClientResourcePropertiesService"),S=e("../../model/service/ClientDomainSchemaFiltersService"),l=e("../../model/service/ClientDomainSchemaJoinsDesignerService"),m=e("../../model/service/ClientDomainSchemaMetadataService"),s=e("../../model/service/ClientDomainSchemaPathGenerationService"),v=e("../../model/service/ClientDomainSchemaAdvancedOptionsService"),d=e("../../model/service/ClientCurrentDesignerStateService"),D=e("../../model/service/ClientDataSourceGroupService"),h=e("../../model/service/ViewStateModelQueryService"),g=e("../../../model/util/SequenceGenerator");i.exports=t});