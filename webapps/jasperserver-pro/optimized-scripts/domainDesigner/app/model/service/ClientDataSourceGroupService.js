/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../util/getResourceSourceNameOrNameUtil","../../../model/schema/enum/schemaEntitiesEnum"],function(e,t,i){var r=e("underscore"),n=e("../../util/getResourceSourceNameOrNameUtil"),c=e("../../../model/schema/enum/schemaEntitiesEnum"),a=function(e){this.initialize(e)};r.extend(a.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService,this.profileAttributesServiceCache=e.profileAttributesServiceCache},getNameById:function(e){var t=this.clientDomainSchemaService.getEntityByIdAndType(e,c.DATA_SOURCE_GROUP);return this.getName(t)},getName:function(e){var t=n(e),i=this.profileAttributesServiceCache.get(t);return i?i.value:t}}),i.exports=a});