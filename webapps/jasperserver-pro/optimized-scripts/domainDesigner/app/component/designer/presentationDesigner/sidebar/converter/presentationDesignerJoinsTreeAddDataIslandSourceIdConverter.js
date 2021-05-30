/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/util/entityUtil"],function(e,t,i){var r=e("../../../../../../model/schema/util/entityUtil");i.exports=function(e,t){return r.isJoinTree(e.type)?e.dataIslandSourceId=e.resourceId:e.dataIslandSourceId=t.joinTree.id,e}});