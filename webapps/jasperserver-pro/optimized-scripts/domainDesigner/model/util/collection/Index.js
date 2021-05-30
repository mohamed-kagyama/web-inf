/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,t,n){var i=e("underscore"),s=function(e){e=i.defaults(e||{},{type:"number"}),this.indexName=e.name,this.type=e.type,this.clear()};i.extend(s.prototype,{addToIndex:function(e){this.values[e[this.indexName]]=e},removeFromIndex:function(e){"number"===this.type?this.values[e]=void 0:delete this.values[e]},getValue:function(e){return this.values[e]},clear:function(){this.values="number"===this.type?[]:{}}}),n.exports=s});