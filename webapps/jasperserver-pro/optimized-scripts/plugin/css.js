/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","require-css","underscore"],function(e){var n=e("require-css"),r=e("underscore"),o=r.clone(n);return o.load=function(e,o,c,i){var u=!!i.config&&i.config.theme;if(!u||!u.href)return void c();e=[u.href,e].join("/");var t=r.extend(r.clone(o),{toUrl:function(){return e+".css"}});n.load.call(this,e,t,c,i)},o.manualLoad=function(n,r){var c=function(){};o.load(n,e,c,{config:{theme:r}},!0)},o});