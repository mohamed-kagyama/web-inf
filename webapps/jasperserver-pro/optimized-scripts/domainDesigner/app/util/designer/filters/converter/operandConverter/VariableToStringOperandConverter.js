/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var t=e("underscore"),r=function(e){this.initialize(e)};t.extend(r.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService},convert:function(e,i){var n=i.fieldReferences,r=e.fieldReferenceId,c=t.find(n,function(e){return e.id===r}),o=c.fieldId;return this.clientDomainSchemaService.getFieldById(o).name}}),n.exports=r});