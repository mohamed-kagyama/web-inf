/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../util/pathUtil","../../../../../../model/schema/util/entityUtil"],function(e,t,i){var l=e("../../../../../util/pathUtil"),o=e("../../../../../../model/schema/util/entityUtil");i.exports=function(e,t){var i,n,a=e.fields.byId(t.getFieldId()),d=a.getName(),s=t.getFieldType(),u=t.getSourceType();return o.isJoinAlias(u)&&(i=e.joinAliases.byId(t.getSourceId()),d=l.join([i.getName(),d],"\\",".")),o.isCalcField(s)&&o.isConstantGroup(u)&&(n=e.constantGroups.byId(t.getSourceId()),d=l.join([n.getName(),d],"\\",".")),{name:d,type:a.getType()}}});