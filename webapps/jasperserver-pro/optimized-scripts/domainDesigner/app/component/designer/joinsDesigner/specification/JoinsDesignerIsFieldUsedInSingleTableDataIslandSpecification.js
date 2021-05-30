/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var t=e("underscore"),r=function(e){this.initialize(e)};t.extend(r.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService},isSatisfiedBy:function(e){var i=this.clientDomainSchemaService.getDataIslands(),n=e.resource.parentTableReferenceId;return!this.clientDomainSchemaService.getJoinAliasIdByTableReferenceId(n)&&t.some(i,function(e){return e.sourceId===n})}}),n.exports=r});