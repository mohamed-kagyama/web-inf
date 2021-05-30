/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","../../../../model/enum/joinsEnum","../enum/joinWeightsEnum"],function(n,e,i){var o=n("underscore"),s=n("../../../../model/enum/joinsEnum"),d=n("../enum/joinWeightsEnum");i.exports={create:function(n){return n=n||{join:{},joinConstructor:{}},{name:n.name||"",index:n.index||0,isExpanded:!!o.isUndefined(n.isExpanded)||n.isExpanded,includeAllDataIslandJoins:n.includeAllDataIslandJoins||!1,suppressCircularJoins:n.suppressCircularJoins||!1,join:{leftSide:n.join.leftSide||"",isExpanded:!!o.isUndefined(n.join.isExpanded)||n.join.isExpanded,type:n.join.type||s.joinTypes.inner.name,weight:n.join.weight||d.defaultOption.value},joinConstructor:n.joinConstructor}}}});