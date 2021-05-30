/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../../model/schema/util/entityUtil"],function(e,i,t){var n=e("underscore"),o=e("../../../../../../../model/schema/util/entityUtil"),r=function(e){this.initialize(e)};n.extend(r.prototype,{initialize:function(e){this.clientDomainSchemaService=e.clientDomainSchemaService},isSatisfiedBy:function(e){var i=e.filter,t=i.expression.left,n=i.expression.right,r=t.sourceId||n.sourceId,s=t.sourceType||n.sourceType,c=e.sidebarCurrentResource,a=c.sourceId,u=c.sourceType;o.isJoinAlias(s)&&(r=this.clientDomainSchemaService.getJoinTreeIdByJoinAliasId(r)),o.isJoinAlias(u)&&(a=this.clientDomainSchemaService.getJoinTreeIdByJoinAliasId(a));var l=o.isConstantGroup(u),d=o.isConstantGroup(s);return a===r||l||d}}),t.exports=r});