/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","jquery","underscore"],function(t,e,a){var n=t("jquery"),r=t("underscore"),i=function(t){r.bindAll(this,"getData","getAllCachedData"),this.data=t||[]};r.extend(i.prototype,{setData:function(t){this.data=t||[]},getAllCachedData:function(){return this.data},getData:function(t){var e=new n.Deferred,a=t&&t.offset?t.offset:0,r=t&&t.limit?a+t.limit:this.data.length,i=this._getDataSegment(this.data,a,r);return e.resolve({data:i,total:this.data.length}),e.promise()},_getDataSegment:function(t,e,a){a=Math.min(a,t.length);for(var n=[],r=e;r<a;r++)n.push({label:t[r].label,value:t[r].value});return n}}),a.exports=i});