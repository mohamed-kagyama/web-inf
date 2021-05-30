/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,c){var n=e("underscore"),r=function(){this.cache={}};n.extend(r.prototype,{add:function(e,t){this.cache[e]=t},get:function(e){return this.cache[e]},reset:function(e){e?delete this.cache[e]:this.cache={}}}),c.exports=r});