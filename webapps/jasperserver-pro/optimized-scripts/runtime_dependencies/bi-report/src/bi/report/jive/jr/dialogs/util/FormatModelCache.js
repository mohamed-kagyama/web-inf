/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,n,t){var o=e("underscore"),r=function(){this.map={},this.keyInfo={}};r.prototype={get:function(e){return this.map[e]?this.map[e].current:null},set:function(e,n){this.map[e]?this.map[e].current=o.cloneDeep(n):this.map[e]={original:o.cloneDeep(n),current:o.cloneDeep(n)}},createKey:function(e,n,t){var o;return o=t?e+"-column-"+n.get("forColumns").join("_"):e+"-column-"+n.get("columnIndex"),this.keyInfo[o]||(this.keyInfo[o]={applyTo:e,model:n}),o},clear:function(){this.map={},this.keyInfo={}},remove:function(){}},t.exports=r});