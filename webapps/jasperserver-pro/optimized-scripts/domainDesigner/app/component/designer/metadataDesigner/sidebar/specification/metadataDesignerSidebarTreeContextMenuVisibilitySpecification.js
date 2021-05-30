/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/util/entityUtil"],function(e,i,t){var r=e("../../../../../../model/schema/util/entityUtil");t.exports={isSatisfiedBy:function(e){var i=e.resource.type;return r.isDataSource(i)||r.isDerivedTable(i)||r.isConstantGroup(i)||r.isCalcField(i)}}});