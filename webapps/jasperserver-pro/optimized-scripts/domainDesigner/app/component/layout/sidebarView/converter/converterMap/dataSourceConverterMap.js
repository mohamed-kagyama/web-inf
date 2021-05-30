/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../../../model/schema/util/entityUtil","../../enum/artificialTreeResourceTypesEnum","../../../../../../util/predicate/CompositePredicate","../../predicate/acceptOnlyDerivedTables","../../predicate/doNotAcceptDerivedTables","../../predicate/atLeastOneDerivedTableExists","../baseSidebarTreeConverter","../../../../../../model/schema/enum/schemaEntitiesEnum","bundle!DomainDesignerBundle","runtime_dependencies/js-sdk/src/common/util/i18nMessage"],function(e,r,t){function n(e,r){var t=i(e,r),n=c(e,r),d=n.concat(t);return r.convertResourceNoChildren(e,h.extend({},r,{properties:{elements:d}}))}function i(e,r){var t,n=r.resourceMatch,i=h.omit(r,"resource");if(r.isSchemaLessDataSourceWithEmptyResolvedSchemaAttribute){t=e.getChildren().first().getChildren()}else t=e.getChildren();return C.convertResources(t,h.extend({},i,{dataSource:e,resourceMatch:new E([D,n]).match}))}function c(e,r){var t=r.resourceJsonMatch,n=l(e),i=[n],c=e.getChildren().find(function(e){return m.isDerivedTable(e)});return C.convertResources(i,h.extend({},r,{dataSource:e,isAtLeastOneDerivedTableExists:c,resourceJsonMatch:new E([t,T]).match}))}function d(e,r){var t=r.resourceMatch;return C.convertResourceWithChildren(e,h.extend({},r,{derivedTableGroup:r.resource,children:e.children,resourceMatch:new E([v,t]).match}))}function s(e,r){return C.convertResourceWithChildren(e,h.extend({},r,{dataSourceGroup:e,children:e.getChildren()}))}function o(e,r){return C.convertResourceWithChildren(e,h.extend({},r,{table:e,children:e.getChildren()}))}function a(e,r){return C.convertResourceWithChildren(e,h.extend({},r,{tableGroup:e,children:e.getChildren()}))}function u(e,r){return r.convertResourceNoChildren(e,r)}function l(e){return h.extend({},_,{children:e.getChildren()})}var h=e("underscore"),m=e("../../../../../../model/schema/util/entityUtil"),p=e("../../enum/artificialTreeResourceTypesEnum"),E=e("../../../../../../util/predicate/CompositePredicate"),v=e("../../predicate/acceptOnlyDerivedTables"),D=e("../../predicate/doNotAcceptDerivedTables"),T=e("../../predicate/atLeastOneDerivedTableExists"),C=e("../baseSidebarTreeConverter"),R=e("../../../../../../model/schema/enum/schemaEntitiesEnum"),b=e("bundle!DomainDesignerBundle"),f=e("runtime_dependencies/js-sdk/src/common/util/i18nMessage"),A=f.create(b),_={id:p.DERIVED_TABLE_GROUP,name:A("domain.designer.derivedTables.sidebar.derivedTablesGroup"),type:p.DERIVED_TABLE_GROUP},g={};g[R.DATA_SOURCE]=n,g[R.DATA_SOURCE_GROUP]=s,g[p.DERIVED_TABLE_GROUP]=d,g[R.DERIVED_TABLE]=o,g[R.TABLE]=o,g[R.TABLE_GROUP]=a,g[R.FIELD]=u,g[R.CALC_FIELD]=u,t.exports=g});