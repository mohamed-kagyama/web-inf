/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/js-sdk/src/jrs.configs","../util/redirectToUrlUtil","./utils.common"],function(e,n,r){var o=e("runtime_dependencies/js-sdk/src/jrs.configs"),t=e("../util/redirectToUrlUtil"),i=e("./utils.common"),c=i.JSCookie;r.exports={saveCurrent:function(e){new c(e,encodeURIComponent(document.location.href))},saveReferrer:function(e){-1===document.referrer.indexOf("login.html")&&new c(e,encodeURIComponent(document.referrer))},restore:function(e,n){var r=encodeURIComponent(document.location.href),i=new c(e).value;if(i&&i!==r){var d=decodeURIComponent(i);if(d)return void t.redirect(d)}n=n||"/",t.redirect(o.contextPath+n)}}});