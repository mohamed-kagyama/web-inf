/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(e,n,t){var i=e("jquery"),r=function(e){this.hyperlinks=e,this.reportInstance=null,this.reportContainer=null};r.prototype={register:function(){var e=this;i(e.hyperlinks[0].selector).on("click",function(n){var t=e._getHyperlinkData(i(this).attr("data-id"));t&&e._handleHyperlinkClick(t)}).css("cursor","pointer")},handleInteraction:function(e){if("hyperlinkClicked"==e.type){var n=this._getHyperlinkData(e.data.hyperlink.id);n&&this._handleHyperlinkClick(n)}},_getHyperlinkData:function(e){var n=null;return i.each(this.hyperlinks,function(t,i){if(e===i.id)return n=i,!1}),n},_handleHyperlinkClick:function(e){e.targetValue?window.open(e.href,e.targetValue):window.location=e.href}},t.exports=r});