/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/util/entityUtil"],function(e,t,r){var n=e("../../../../../../model/schema/util/entityUtil");r.exports=function(e,t){var r=e.type;return(n.isField(r)||n.isTableGroup(r))&&t.tableReference&&(e.parentTableReferenceId=t.tableReference.getId(),e.parentTableReferenceName=t.tableReference.getName()),e}});