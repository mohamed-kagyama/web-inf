/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil"],function(e,i,t){var n=e("underscore"),c=e("../../../../../../model/schema/util/entityUtil"),l=function(e){this.initialize(e)};n.extend(l.prototype,{initialize:function(e){this.clientDomainSchemaCalcFieldsService=e.clientDomainSchemaCalcFieldsService},isSatisfiedBy:function(e){var i=e.type,t=e.resourceId,n=e.calcFieldSourceType,l=c.isField(i);return c.isCalcField(i)&&(l=!c.isConstantGroup(n)&&!c.isJoinTree(n)&&!this.clientDomainSchemaCalcFieldsService.isConstantCalcField(t)),l}}),t.exports=l});