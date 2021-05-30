/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(t,i,e){var r=t("underscore"),s=function(t){r.bindAll(this,"intercept"),this.blackList=t.blackList,this.whiteList=t.whiteList,this.draftStateAdvice=t.draftStateAdvice};r.extend(s.prototype,{intercept:function(t,i){var e=Array.prototype.slice.call(arguments,2),r=e[0];return this.draftStateAdvice.intercept({blackList:this.blackList,whiteList:this.whiteList,actionName:r,invocation:i,args:e})}}),e.exports=s});