/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","request","requestSettings","underscore","runtime_dependencies/js-sdk/src/jrs.configs"],function(e){"use strict";var n=e("request"),t=e("requestSettings"),r=e("underscore"),s=e("runtime_dependencies/js-sdk/src/jrs.configs"),i=function(e,i){var u=s.contextPath+"/rest_v2/settings/",d=r.extend({},t,{type:"GET",dataType:"json",url:u+e});d.headers["Cache-Control"]="private",delete d.headers.Pragma,n(d).fail(function(){i(null)}).then(function(e){i(e)})};return i.load=function(e,n,t,r){if(r.isBuild)return void t();i(e,t)},i});