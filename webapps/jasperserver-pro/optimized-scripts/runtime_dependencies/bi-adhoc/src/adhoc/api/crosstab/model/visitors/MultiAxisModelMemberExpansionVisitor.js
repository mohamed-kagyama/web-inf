/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./MultiAxisModelVisitor"],function(e,i,l){function t(e,i,l,t){this.value=e,this.levelsState=t.slice(i),this.levelNumber=0;for(var s=i+1,r=!0;r&&l[s+1];s++)l[s+1].level&&(l[s+1].level.includeAll?r=!1:this.levelNumber=s-i)}var s=e("underscore"),r=e("./MultiAxisModelVisitor");s.extend(t.prototype,r),t.prototype.preVisit=function(e,i){e.isExpandable&&(i>this.levelNumber?e.isExpanded=!!this.value&&this.levelsState[i]:e.isExpanded=this.value)},l.exports=t});