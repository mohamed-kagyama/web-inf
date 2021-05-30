/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../model/schema/util/entityUtil","../../../layout/sidebarView/enum/artificialTreeResourceTypesEnum","../../../../../model/schema/util/schemaModelUtil"],function(e,o,r){function i(e){var o,r=e.sourceId,i=e.expandedNodes,t=e.collections;return o=d.getJoinAliasByTableReferenceId(r,t),o?i[o.joinTreeId]=!0:i=n({sourceId:r,collections:t,expandedNodes:i}),i}function n(e){var o,r=e.sourceId,i=e.collections,n=e.expandedNodes,c=i.tableReferences.byId(r),a=d.getTableByTableReference(c,i);return t.isDerivedTable(a)?(n[a.dataSourceId]=!0,n[s.DERIVED_TABLE_GROUP]=!0):(o=d.getResourceParents(a,i),n=o.reduce(function(e,o){return e[o.id]=!0,e},n)),n}var t=e("../../../../../model/schema/util/entityUtil"),s=e("../../../layout/sidebarView/enum/artificialTreeResourceTypesEnum"),d=e("../../../../../model/schema/util/schemaModelUtil");r.exports={getExpandedNodes:function(e,o){var r=o.sourceId,n=o.sourceType,d={};return e.constantGroups.size()&&(d[s.CONSTANT_GROUP]=!0),t.isJoinTree(n)?d[r]=!0:t.isTableReference(n)&&(d=i({expandedNodes:d,collections:e,sourceId:r})),d}}});