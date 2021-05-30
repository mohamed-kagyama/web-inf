/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../../model/schema/enum/fieldTypesToGenericTypesEnum"],function(e,i,n){var r=e("underscore"),t=e("../../../../../../../model/schema/enum/fieldTypesToGenericTypesEnum"),c=function(e){this.initialize(e)};r.extend(c.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService},isSatisfiedBy:function(e){var i=e.filter,n=i.dataType,r=e.sidebarCurrentResource,c=this.clientDomainSchemaService.getFieldById(r.resourceId);return t[c.type]===n}}),n.exports=c});