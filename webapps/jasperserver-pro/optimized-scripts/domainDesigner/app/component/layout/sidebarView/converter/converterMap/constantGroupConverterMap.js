/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../baseSidebarTreeConverter","../../enum/artificialTreeResourceTypesEnum","../../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,r,n){function o(e,r){return u.convertResourceWithChildren(e,c.extend({},r,{constantGroup:e,children:e.children,convertResourceNoChildren:r.convertResourceNoChildren}))}function t(e,r){return r.convertResourceNoChildren(e,c.extend(r,{constantGroupId:e.getSourceId()}))}var c=e("underscore"),u=e("../baseSidebarTreeConverter"),i=e("../../enum/artificialTreeResourceTypesEnum"),s=e("../../../../../../model/schema/enum/schemaEntitiesEnum"),d={};d[i.CONSTANT_GROUP]=o,d[s.CALC_FIELD]=t,n.exports=d});