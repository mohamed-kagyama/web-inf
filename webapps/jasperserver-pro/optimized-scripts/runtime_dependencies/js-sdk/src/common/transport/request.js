/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore","requestSettings"],function(e,r,t){var s=e("jquery"),a=e("underscore"),n=e("requestSettings");t.exports=function(){var e=Array.prototype.slice.call(arguments),r=a.extend({},n,e[0]);return n.headers&&arguments[0].headers&&(r.headers=a.extend({},n.headers,e[0].headers)),e[0]=r,s.ajax.apply(s,e)}});