/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","request","requestSettings","underscore"],function(e){var r=e("request"),i=e("requestSettings"),t=e("underscore");return{load:function(e,n,u,o){if(o.isBuild)return void u();var s=t.extend({},i,{type:"GET",dataType:"script",cache:!0,url:n.toUrl(e+".js")});r(s).then(function(e){if(window.__visualize__){var r=e.indexOf("define(");if(r>-1)return void u.fromText(t.str.splice(e,r,0,"__visualize__."))}u.fromText(e)},function(){console.log(arguments),u.error()})}}});