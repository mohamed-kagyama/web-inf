/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,o,r){var n=e("underscore");r.exports={changeLocation:function(e){window.location.assign(e)},getCurrentLocationParameters:function(e){e=e||window.location.search;var o=e.substring(1).split("&");return n.reduce(o,function(e,o){var r=o.split("="),t=decodeURIComponent(r[0]),c=decodeURIComponent(r[1]),i=e[t];return i?n.isArray(i)?i.push(c):e[t]=[i,c]:e[t]=c,e},{})},getPreviousLocation:function(e,o,r){var n=o;if(-1!==document.referrer.indexOf("login.html")){var t=window.localStorage?localStorage.getItem(e):"";t&&(t=decodeURIComponent(t))&&(n=t)}else-1===document.referrer.indexOf(r)&&document.referrer.length&&(n=document.referrer),window.localStorage&&localStorage.setItem(e,encodeURIComponent(n));return n}}});