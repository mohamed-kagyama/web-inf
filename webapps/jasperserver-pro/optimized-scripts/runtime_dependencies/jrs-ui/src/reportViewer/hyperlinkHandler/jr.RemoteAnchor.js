/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery"],function(n,e,i){var t=n("jquery"),r=function(n){this.hyperlinks=n,this.reportInstance=null,this.reportContainer=null};r.prototype={register:function(){var n=this;t(n.hyperlinks[0].selector).on("click",function(e){var i=n._getHyperlinkData(t(this).attr("data-id"));n._handleHyperlinkClick(i)}).css("cursor","pointer")},handleInteraction:function(n){if("hyperlinkClicked"==n.type){var e=this._getHyperlinkData(n.data.hyperlink.id);e&&this._handleHyperlinkClick(e)}},_getHyperlinkData:function(n){var e=null;return t.each(this.hyperlinks,function(i,t){if(n===t.id)return e=t,!1}),e},_handleHyperlinkClick:function(n){n&&n.href&&(window.location=n.href)}},i.exports=r});