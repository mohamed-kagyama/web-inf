/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/enum/schemaEntitiesEnum","../../../../layout/sidebarView/enum/artificialTreeResourceTypesEnum","../constantGroupEntityToPresentationItemConverter"],function(e,t,n){var o=e("../../../../../../model/schema/enum/schemaEntitiesEnum"),r=e("../../../../layout/sidebarView/enum/artificialTreeResourceTypesEnum"),i=e("../constantGroupEntityToPresentationItemConverter"),a={};a[o.CALC_FIELD]=i.convertCalcField,a[r.CONSTANT_GROUP]=i.convertConstantGroup,n.exports=a});