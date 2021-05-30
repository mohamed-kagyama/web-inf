/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../component/dependenciesInspector/collector/EntityCollector"],function(e,t,n){function i(e,t){e.register("validationDependenciesTrackingEntityCollector",new o({dataStore:e.get("domainValidationDataStore"),dependenciesTrackingStore:e.get("dependenciesTrackingStore"),clientDomainSchemaService:e.get("clientDomainSchemaService"),applicationMutations:e.get("virtualApplicationMutations")}))}var o=e("../../component/dependenciesInspector/collector/EntityCollector");n.exports=function(e,t){i(e,t)}});