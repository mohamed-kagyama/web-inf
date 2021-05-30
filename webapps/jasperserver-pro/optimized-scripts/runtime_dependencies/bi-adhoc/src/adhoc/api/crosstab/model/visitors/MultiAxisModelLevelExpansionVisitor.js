/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","./MultiAxisModelVisitor"],function(i,e,t){function s(i,e){this.value=i,this.levelNumber=e,this.value?(this.preVisit=o,this.postVisit=r):(this.preVisit=r,this.postVisit=o)}function o(i,e){i.isExpandable&&(e>this.levelNumber?i.isExpanded=!1:e===this.levelNumber?i.isExpanded=this.value:i.isExpanded=!0)}function r(){}var n=i("underscore"),u=i("./MultiAxisModelVisitor");n.extend(s.prototype,u),t.exports=s});