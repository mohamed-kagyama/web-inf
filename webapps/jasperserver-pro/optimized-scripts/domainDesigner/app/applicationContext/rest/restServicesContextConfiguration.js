/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../rest/enum/endpointsEnum","../../../rest/service/ResourcesService","../../util/cache/MetadataServiceCache","../../../rest/ProfileAttributesService","../../util/cache/ProfileAttributesCache","../../../rest/service/RestMetadataService","../../../rest/service/DerivedTableMetadataService","../../../rest/service/ValidationService","../../../rest/service/ConnectionService","../../../rest/executor/ContextFactory","../../../rest/executor/ContextExecutor","../../../rest/executor/contextUUIDUrlProvider","../../../util/cache/SimpleCache","../../util/cache/CompositeCacheCleaner","../../model/resolver/DefaultSchemaAwareProfileAttributeResolver"],function(e,t,r){function c(e,t){e.register("profileAttributesServiceCache",new n),e.register("defaultSchemaAwareProfileAttributeResolver",new m({dataStore:e.get("schemaDataStore"),profileAttributesServiceCache:e.get("profileAttributesServiceCache")})),e.register("contextExecutorCache",new g),e.register("metadataServiceCache",new s({profileAttributeResolver:e.get("defaultSchemaAwareProfileAttributeResolver"),cache:new g})),e.register("metadataServiceCacheForForeignKeyDiscoveryService",new s({profileAttributeResolver:e.get("defaultSchemaAwareProfileAttributeResolver"),cache:new g})),e.register("restServicesCompositeCacheCleaner",new f({caches:[e.get("metadataServiceCache"),e.get("metadataServiceCacheForForeignKeyDiscoveryService"),e.get("contextExecutorCache")]}))}function i(e,t){e.register("contextExecutor",new C({contextFactory:new x({url:a.CONTEXTS_SERVICE,request:e.get("request")}),contextUUIDUrlProvider:d,cache:e.get("contextExecutorCache"),request:e.get("request")})),e.register("resourcesService",new o({request:e.get("request")})),e.register("validationService",new S({request:e.get("request")})),e.register("restMetadataService",new v({contextExecutor:e.get("contextExecutor")})),e.register("derivedTableMetadataService",new l({contextExecutor:e.get("contextExecutor")})),e.register("profileAttributesService",new u({cache:e.get("profileAttributesServiceCache"),request:e.get("request")})),e.register("connectionService",new h({request:e.get("request")}))}var a=e("../../../rest/enum/endpointsEnum"),o=e("../../../rest/service/ResourcesService"),s=e("../../util/cache/MetadataServiceCache"),u=e("../../../rest/ProfileAttributesService"),n=e("../../util/cache/ProfileAttributesCache"),v=e("../../../rest/service/RestMetadataService"),l=e("../../../rest/service/DerivedTableMetadataService"),S=e("../../../rest/service/ValidationService"),h=e("../../../rest/service/ConnectionService"),x=e("../../../rest/executor/ContextFactory"),C=e("../../../rest/executor/ContextExecutor"),d=e("../../../rest/executor/contextUUIDUrlProvider"),g=e("../../../util/cache/SimpleCache"),f=e("../../util/cache/CompositeCacheCleaner"),m=e("../../model/resolver/DefaultSchemaAwareProfileAttributeResolver");r.exports=function(e,t){c(e,t),i(e,t)}});