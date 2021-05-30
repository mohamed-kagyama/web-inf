/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/enum/schemaEntitiesEnum","../schemaEntityToPresentationItemConverter"],function(e,n,t){var o=e("../../../../../../model/schema/enum/schemaEntitiesEnum"),r=e("../schemaEntityToPresentationItemConverter"),i={};i[o.TABLE_REFERENCE]=r.convertTableReference,i[o.TABLE_GROUP]=r.convertTableGroup,i[o.FIELD]=r.convertField,i[o.CALC_FIELD]=r.convertCalcField,i[o.JOIN_TREE]=r.convertJoinTree,i[o.JOIN_ALIAS]=r.convertJoinAlias,t.exports=i});