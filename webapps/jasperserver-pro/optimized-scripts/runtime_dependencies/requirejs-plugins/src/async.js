/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define([],function(){function e(e){var n,t;n=document.createElement("script"),n.type="text/javascript",n.async=!0,n.src=e,t=document.getElementsByTagName("script")[0],t.parentNode.insertBefore(n,t)}function n(e,n){var t=/!(.+)/,c=e.replace(t,""),a=t.test(e)?e.replace(/.+!/,""):r;return(c+=c.indexOf("?")<0?"?":"&")+a+"="+n}function t(){return"__async_req_"+(c+=1)+"__"}var r="callback",c=0;return{load:function(r,c,a,i){if(i.isBuild)a(null);else{var l=t();window[l]=a,e(n(c.toUrl(r),l))}}}});