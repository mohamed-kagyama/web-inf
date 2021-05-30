/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../../model/schema/util/entityUtil"],function(e,t,o){function n(e,t){var o,n,r=i.isJoinTree(t.calcFieldsContext.sourceType);return t.constantGroup?o=t.constantGroupId||t.resource.getSourceId():(n=t.tableReference||t.joinTree,r&&t.joinAlias&&(n=t.joinAlias),o=n.getId()),o+":"+e}var i=e("../../../../../../../model/schema/util/entityUtil");o.exports={getContextKey:n}});