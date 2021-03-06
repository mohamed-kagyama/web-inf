/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","jquery"],function(e,t,r){var o=e("underscore"),a=e("jquery"),i=function(e){o.bindAll(this,"getData"),e=e||{},this.format=e.format,this.request=e.request};o.extend(i.prototype,{getData:function(e){var t=a.Deferred();return this.request(e).done(o.bind(this._requestDone,this,t)).fail(t.reject),t.promise()},_requestDone:function(e,t){if(this.format&&t&&t.data){var r=t.data;if(r.length>0&&!r[0].label)for(var o=0;o<r.length;o++)r[o].label=this.format(r[o].value)}e.resolve(t)}}),r.exports=i});