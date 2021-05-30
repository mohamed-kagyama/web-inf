/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!AdHocFiltersBundle"],function(t,e,i){var s=t("bundle!AdHocFiltersBundle"),n=function t(e,i,s,n){this.value=e,this.messageCode=s,this.validator=n;var r=i.split(t.ATTRIBUTE_INDEX_SEPARATOR);2==r.length?(this.attribute=r[0],this.index=1*r[1]):(this.attribute=i,this.index=0)};n.ATTRIBUTE_INDEX_SEPARATOR="__",n.prototype.getMessage=function(){return s[this.messageCode]},n.prototype.getAttr=function(){return 0===this.index?this.attribute:this.attribute+n.ATTRIBUTE_INDEX_SEPARATOR+this.index},i.exports=n});