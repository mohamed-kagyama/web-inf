/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","runtime_dependencies/js-sdk/src/jrs.configs","requestSettings","runtime_dependencies/js-sdk/src/common/logging/logger"],function(e,r,n){var s=e("jquery"),o=e("underscore"),t=e("runtime_dependencies/js-sdk/src/jrs.configs"),i=e("requestSettings"),d=e("runtime_dependencies/js-sdk/src/common/logging/logger"),a=d.register("request");n.exports=function(){function e(e){var r=document.createElement("a");return r.href=e,r.origin||r.protocol+"//"+r.host}function r(e){return c===e}function n(){g.trigger.apply(g,arguments)}function d(e){(401==e.status||e.getResponseHeader("LoginRequested"))&&(s(window).trigger("sessionExpired"),a.warn("Session timed-out. Redirecting to login page."),window.location.reload())}if("undefined"==typeof document||"undefined"===window)return{};var u=window.location.href,c=e(window.location.href),g=s(document);o.partial(n,"request:before").apply(null,arguments);var p=o.extend({},i,arguments[0]),l=e(p.url);return i.headers&&arguments[0].headers&&(p.headers=o.extend({},i.headers,arguments[0].headers)),r(l)?function(e){return u.search(e+t.urlContext)<0}(l)&&(p.headers["X-Remote-Domain"]=c+"/"+u.split("/")[3]):(p.xhrFields={withCredentials:!0},p.crossDomain=!0,p.headers["X-Remote-Domain"]=c),s.ajax(p).fail(r(l)&&d).fail(function(e,r,n){e.getResponseHeader("adhocException")?a.error(e.getResponseHeader("adhocException")):(500==e.status||e.getResponseHeader("JasperServerError")&&!e.getResponseHeader("SuppressError"))&&a.error(e.responseText)}).fail(o.partial(n,"request:failure")).done(o.partial(n,"request:success")).done(arguments[1])}});