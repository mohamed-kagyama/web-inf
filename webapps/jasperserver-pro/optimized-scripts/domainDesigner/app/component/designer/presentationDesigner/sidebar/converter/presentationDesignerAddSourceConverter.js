/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/enum/schemaEntitiesEnum","../../../../../../model/schema/util/entityUtil"],function(e,t,i){var n=e("../../../../../../model/schema/enum/schemaEntitiesEnum"),o=e("../../../../../../model/schema/util/entityUtil");i.exports=function(e,t){if(o.isField(e.type)){var i=t.joinAlias||t.tableReference||t.joinTree;i?(e.sourceId=i.id,e.sourceType=o.getEntityName(i)):(e.sourceId=t.constantGroupId,e.sourceType=n.CONSTANT_GROUP)}return e}});