/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,i){var o=e("underscore"),a=function(e){this.domainSchemaToInMemoryDomainForAvailableValuesReducer=e.domainSchemaToInMemoryDomainForAvailableValuesReducer,this.clientDomainSchemaService=e.clientDomainSchemaService,this.clientResourcePropertiesService=e.clientResourcePropertiesService,this.serverSchemaModelSerializer=e.serverSchemaModelSerializer};o.extend(a.prototype,{convert:function(e){var r=this.clientDomainSchemaService.getDataStore(),i=this.clientResourcePropertiesService.serialize(),a=this.domainSchemaToInMemoryDomainForAvailableValuesReducer.reduce(e,r),c=this.serverSchemaModelSerializer.domainToJson(a);return o.extend(o.omit(i,"securityFile","bundles"),c)}}),i.exports=a});