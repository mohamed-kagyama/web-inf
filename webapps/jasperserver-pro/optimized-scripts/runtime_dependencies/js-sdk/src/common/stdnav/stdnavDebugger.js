/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(e,t,n){var u=e("jquery");n.exports={updateDebugInfo:function(){if(this.debugElementID){var e=u("#"+this.debugElementID),t=u(".superfocus"),n=u(document.activeElement),o=u(".subfocus"),i="[sup:";e.length<1||(i+=t.length,t.length>0?i+=":"+t[0].nodeName+"#"+t[0].id:i+="?",i+=", foc:",i+=n.length,n.length>0?i+=":"+n[0].nodeName+"#"+n[0].id:i+="?",i+=", sub:",i+=o.length,o.length>0?i+=":"+o[0].nodeName+"#"+o[0].id:i+="?",t=u(this._priorSuperfocus),n=u(this._priorFocus),o=u(this._priorSubfocus),i+=" :: psup:",e.length<1||(i+=t.length,t.length>0?i+=":"+t[0].nodeName+"#"+t[0].id:i+="?",i+=", pfoc:",i+=n.length,n.length>0?i+=":"+n[0].nodeName+"#"+n[0].id:i+="?",i+=", psub:",i+=o.length,o.length>0?i+=":"+o[0].nodeName+"#"+o[0].id:i+="?",i+="]",e.text(i)))}}}});