/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","runtime_dependencies/js-sdk/src/jrs.configs","request"],function(e){"use strict";var n=e("runtime_dependencies/js-sdk/src/jrs.configs"),r=e("request"),i=n.userLocale.toLowerCase().replace("_","-");return{create:function(e){return{load:function(n,s,t,u){if(u.isBuild)return void t();if("en"===i||"en-us"===i)return void t();var c=e+i,o=s.toUrl(c);r({url:o+".js",type:"HEAD"}).done(function(){s([c],function(e){t(e)})}).fail(function(){t()})}}}}});