/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var c=e("underscore"),r=function(e){this.initialize(e)};c.extend(r.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService},convert:function(e,i){var n=i.fieldReferences,r=e.fieldReferenceId,t=c.find(n,function(e){return e.id===r}),o=t.fieldId,d=this.clientDomainSchemaService.getFieldById(o),a=t.sourceId,u=t.sourceType;return this.clientDomainSchemaService.getResourceByIdAndType(a,u).name+":"+d.name}}),n.exports=r});