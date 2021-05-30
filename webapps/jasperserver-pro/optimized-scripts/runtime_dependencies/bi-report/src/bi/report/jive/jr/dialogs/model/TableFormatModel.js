/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone.epoxy","underscore"],function(e,n,t){var o=e("backbone.epoxy"),r=e("underscore");t.exports=o.Model.extend({defaults:function(){return{columnLabel:void 0,backgroundColor:void 0,align:void 0,pattern:void 0,font:{bold:!1,italic:!1,underline:!1,size:9,name:void 0,color:"000000"}}},computeds:function(){var e={};return r.each(this.defaults().font,function(n,t){e["font"+t.charAt(0).toUpperCase()+t.substring(1,t.length)]={deps:["font"],get:function(e){return e[t]},set:function(e){var n=r.extend({},this.get("font")),o=e;return"name"!==t||null==o||o.trim().length||(o=null),n[t]=o,{font:n}}}}),e},reset:function(){return this.clear({silent:!0}).set(this.defaults()),this},remove:function(){}})});