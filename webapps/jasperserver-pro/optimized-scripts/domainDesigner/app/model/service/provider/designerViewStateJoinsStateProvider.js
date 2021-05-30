/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../enum/viewStateModelDefaultsEnum"],function(e,t,n){var r=e("../../enum/viewStateModelDefaultsEnum");n.exports={getJoinsViewStateByJoinTrees:function(e){return e.reduce(function(e,t){return t.joins.reduce(function(e,t){var n=t.id,u=r.JOINS_DESIGNER.NODE_EXPANSION.property,i=r.JOINS_DESIGNER.NODE_EXPANSION.value;return e[n]={originalWeight:t.weight},e[n][u]=i,e},e)},{})}}});