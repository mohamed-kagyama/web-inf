/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore"],function(e,i,n){var t=e("underscore"),r=function(e){this.initialIndex=t.isNumber(e)?e:1,this.reset()};t.extend(r.prototype,{next:function(){return this.index++},get:function(){return this.index},reset:function(e){this.index=t.isNumber(e)?e:this.initialIndex}}),n.exports=r});