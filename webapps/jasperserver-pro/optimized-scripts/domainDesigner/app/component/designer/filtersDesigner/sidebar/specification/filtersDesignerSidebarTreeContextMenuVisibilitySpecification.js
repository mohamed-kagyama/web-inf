/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../layout/sidebarView/util/artificialTreeResourceEntityUtil","../../../../../../model/schema/util/entityUtil"],function(e,i,t){var r=e("../../../../layout/sidebarView/util/artificialTreeResourceEntityUtil"),l=e("../../../../../../model/schema/util/entityUtil");t.exports={isSatisfiedBy:function(e){var i=e.resource,t=i.type;return l.isCalcField(t)||l.isTableReference(t)||l.isJoinAlias(t)||r.isConstantGroup(i)||l.isJoinTree(t)}}});