/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","../../enum/viewStateModelDefaultsEnum"],function(e,t,n){function r(){var e=u.JOINS_DESIGNER.NODE_EXPANSION.property,t=u.JOINS_DESIGNER.NODE_EXPANSION.value,n={};return n[e]=t,n}var u=e("../../enum/viewStateModelDefaultsEnum");n.exports={getJoinTreesViewState:function(e){return e.reduce(function(e,t){return e[t.id]=r(),e},{},this)},getJoinTreeViewState:function(){return r()}}});