/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","request","requestSettings","underscore","runtime_dependencies/js-sdk/src/jrs.configs"],function(e){"use strict";var n=e("request"),t=e("requestSettings"),r=e("underscore"),s=e("runtime_dependencies/js-sdk/src/jrs.configs"),i=s.contextPath+"/rest_v2/",u=function(e,s){var u=r.extend({},t,{type:"GET",dataType:"json",url:i+e});n(u).fail(function(){s(null)}).then(function(e){s(e)})};return u.load=function(e,n,t,r){if(r.isBuild)return void t();u(e,t)},u});