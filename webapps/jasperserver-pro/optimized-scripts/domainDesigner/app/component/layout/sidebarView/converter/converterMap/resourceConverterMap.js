/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./dataSourceConverterMap","../baseSidebarTreeConverter","../../../../../../model/schema/util/schemaModelUtil","../../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,r,t){function n(e,r){var t=r.table,n=t.getChildren(),a=e.getCalcFields();return d.convertResourceWithChildren(e,c.extend({},r,{tableReference:e,children:n.concat(a)}))}function a(e,r){var t=l.getTableReferencesByTableId(e.getId(),r.schema);return d.convertResources(t,c.extend({},r,{table:e}))}var c=e("underscore"),o=e("./dataSourceConverterMap"),d=e("../baseSidebarTreeConverter"),l=e("../../../../../../model/schema/util/schemaModelUtil"),s=e("../../../../../../model/schema/enum/schemaEntitiesEnum"),i=c.clone(o);i[s.DERIVED_TABLE]=a,i[s.TABLE]=a,i[s.TABLE_REFERENCE]=n,t.exports=i});