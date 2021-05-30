/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../baseSidebarTreeConverter","../../../../../../model/schema/util/schemaModelUtil","../../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,n,r){function t(e,n){var r=e.joinAliases,t=e.calcFields,c=r.concat(t);return d.convertResourceWithChildren(e,a.extend({},n,{joinTree:e,children:c}))}function c(e,n){var r=n.schema,t=s.getTableReferenceByJoinAlias(e,r),c=s.getTableByTableReference(t,r),i=c.getChildren(),l=t.getCalcFields();return d.convertResourceWithChildren(e,a.extend({},n,{joinAlias:e,tableReference:t,table:c,children:i.concat(l)}))}function i(e,n){var r=s.getTableByTableReference(e,n.schema),t=r.getChildren(),c=e.getCalcFields();return d.convertResourceWithChildren(e,a.extend({},n,{tableReference:e,table:r,children:t.concat(c)}))}function l(e,n){return d.convertResourceWithChildren(e,a.extend({},n,{tableGroup:e,children:e.getChildren()}))}function o(e,n){return n.convertResourceNoChildren(e,n)}var a=e("underscore"),d=e("../baseSidebarTreeConverter"),s=e("../../../../../../model/schema/util/schemaModelUtil"),u=e("../../../../../../model/schema/enum/schemaEntitiesEnum"),h={};h[u.JOIN_TREE]=t,h[u.JOIN_ALIAS]=c,h[u.TABLE_REFERENCE]=i,h[u.TABLE_GROUP]=l,h[u.FIELD]=o,h[u.CALC_FIELD]=o,r.exports=h});