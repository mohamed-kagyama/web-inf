/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var r=e("underscore"),c=function(e){this.initialize(e)};r.extend(c.prototype,{initialize:function(e){this.domainSchemaSpecification=e.domainSchemaSpecification,this.canResourceParticipateInJoinSpecification=e.canResourceParticipateInJoinSpecification},isSatisfiedBy:function(e){var i=e.joinConstructor,n=e.currentSidebarResource;return!!this.canResourceParticipateInJoinSpecification.isSatisfiedBy({resource:{id:n.resourceId,type:n.type,calcFieldSourceType:n.calcFieldSourceType,parentJoinTreeId:n.parentJoinTreeId},joinTreeId:i.joinTreeId})&&this.domainSchemaSpecification.canCreateJoinExpression({leftTableReferenceId:i.leftSide.tableReferenceId,rightTableReferenceId:n.parentTableReferenceId,leftTableFieldId:i.leftSide.fieldId,rightTableFieldId:n.resourceId})}}),n.exports=c});