/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define([],function(){return{load:function(e,t,n,r){if(r.isBuild)return void n();var d=document.createElement("link");d.type="text/css",d.rel="stylesheet",d.href=t.toUrl(e),0!==d.href.indexOf("font")&&(d.className="jrWebFont"),document.getElementsByTagName("head")[0].appendChild(d),n()}}});