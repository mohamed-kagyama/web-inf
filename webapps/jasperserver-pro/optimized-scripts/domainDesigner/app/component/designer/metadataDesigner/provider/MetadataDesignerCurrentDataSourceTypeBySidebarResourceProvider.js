/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,i){var a=e("underscore"),n=function(e){this.initialize(e)};a.extend(n.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService,this.metadataDesignerViewStateModelService=e.metadataDesignerViewStateModelService},getDataSourceType:function(e){var t=this.clientDomainSchemaService.getDataSourceByEntityIdAndType(e.resourceId,e.type);return this.metadataDesignerViewStateModelService.getDataSourceByName(t.name).type}}),i.exports=n});