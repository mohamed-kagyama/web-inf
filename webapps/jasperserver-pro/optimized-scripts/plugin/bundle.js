/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","request","requestSettings","underscore","runtime_dependencies/js-sdk/src/jrs.configs"],function(e){"use strict";var n=e("request"),r=e("requestSettings"),t=e("underscore"),s=e("runtime_dependencies/js-sdk/src/jrs.configs"),u=function(e,u){var d,i=s.contextPath+"/rest_v2/bundles";"all"===e?d="?expanded=true":(e=e.split("/"),d="/"+e[e.length-1]);var c=t.extend({},r,{type:"GET",dataType:"json",url:i+d});c.headers["Cache-Control"]="private",delete c.headers.Pragma,n(c).then(function(n){u("all"!==e?n:t(n).reduce(function(e,n){return t.extend(e,n)},{}))})};return u.load=function(e,n,r,t){if(t.isBuild)return void r();u(e,r)},u});