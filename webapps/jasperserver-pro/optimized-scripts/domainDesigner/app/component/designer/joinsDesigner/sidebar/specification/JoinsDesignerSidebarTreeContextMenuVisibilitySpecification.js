/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../layout/sidebarView/util/artificialTreeResourceEntityUtil","../../../../../../model/schema/util/entityUtil"],function(i,e,t){var r=i("underscore"),n=i("../../../../layout/sidebarView/util/artificialTreeResourceEntityUtil"),s=i("../../../../../../model/schema/util/entityUtil"),l=function(i){this.initialize(i)};r.extend(l.prototype,{initialize:function(i){r.bindAll(this,"isSatisfiedBy")},isSatisfiedBy:function(i){var e=i.resource,t=e.type;return s.isCalcField(t)||s.isTableReference(t)||s.isDataSource(t)||s.isJoinAlias(t)||n.isConstantGroup(e)||s.isJoinTree(t)}}),t.exports=l});