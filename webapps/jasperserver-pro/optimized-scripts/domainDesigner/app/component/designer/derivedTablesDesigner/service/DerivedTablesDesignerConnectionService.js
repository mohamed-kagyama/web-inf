/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,t,i){var r=e("underscore"),n=e("../../../../../model/schema/enum/schemaEntitiesEnum"),a=function(e){this.initialize(e)};r.extend(a.prototype,{initialize:function(e){this.derivedTableMetadataService=e.derivedTableMetadataService,this.clientDomainSchemaService=e.clientDomainSchemaService,this.clientResourcePropertiesService=e.clientResourcePropertiesService},executeQuery:function(e,t){var i=this.clientDomainSchemaService.getDataSourceById(e),a=this.clientResourcePropertiesService.getDataSourceUri(i.name);return this.derivedTableMetadataService.getDerivedTableMetadata(a,t).then(function(e){return r.map(e.elements,function(e){return r.extend({},e.element,{entityType:n.FIELD})})})}}),i.exports=a});