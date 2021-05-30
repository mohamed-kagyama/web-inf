/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,r,d){function c(e,r){var d=r.parent||{},c=d.id||null;return e.resource=o.pick(e,["id","name","type","resourceId","sourceId","sourceType","dataIslandSourceId","isJoinTreeItem","calcFieldSourceId","calcFieldSourceType"]),e.resource.parentId=c,delete e.sourceId,delete e.sourceType,delete e.calcFieldSourceId,delete e.calcFieldSourceType,delete e.dataIslandSourceId,delete e.isJoinTreeItem,e}var o=e("underscore");d.exports=c});