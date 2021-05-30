/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","./factory/dependenciesConverterContextConfigurationFactory"],function(e,n,i){var r=e("./factory/dependenciesConverterContextConfigurationFactory");i.exports=function(e,n){e.register("dependenciesTrackingConverter",r.create({dependencyItemHeight:n.dependenciesInspector.itemHeight,clientDomainSchemaService:e.get("clientDomainSchemaService"),filterExpressionSerializer:e.get("filterExpressionSerializer"),schemaPathGenerationService:e.get("clientDomainSchemaPathGenerationService")}))}});