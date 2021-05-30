/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../../../../../model/schema/util/entityUtil","../../../../../../model/schema/enum/schemaEntitiesEnum"],function(e,c,i){function t(e,c){if(l.isCalcField(e.type)){var i=c.joinTree,t=c.tableReference;if(t)e.calcFieldSourceId=t.getId(),e.calcFieldSourceType=l.getEntityName(t);else if(i)e.calcFieldSourceId=c.joinTree.id,e.calcFieldSourceType=n.JOIN_TREE;else{if(!c.constantGroupId)throw new Error("Unknown type of calc field");e.calcFieldSourceId=c.constantGroupId,e.calcFieldSourceType=n.CONSTANT_GROUP}}return e}var l=e("../../../../../../model/schema/util/entityUtil"),n=e("../../../../../../model/schema/enum/schemaEntitiesEnum");i.exports=t});