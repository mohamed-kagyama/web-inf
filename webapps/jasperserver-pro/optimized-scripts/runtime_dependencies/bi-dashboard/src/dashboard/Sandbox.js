/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","backbone"],function(e,o,n){var t=e("underscore"),i=e("backbone"),c=function(){this.model=new i.Model};t.extend(c.prototype,{get:function(e){return this.model.get(e)},set:function(e,o){this.model.set(e,o)},on:function(e,o){this.model.on("change:"+e,o)},off:function(e,o){this.model.off("change:"+e,o)}}),n.exports=c});