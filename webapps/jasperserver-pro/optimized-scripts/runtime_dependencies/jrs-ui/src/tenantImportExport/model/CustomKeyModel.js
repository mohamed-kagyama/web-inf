/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","request","backbone","jquery"],function(e,t,n){var r=e("request"),o=e("backbone"),u=e("jquery"),s=o.Model.extend({getCustomKeys:function(){var e=new u.Deferred;return r({url:"rest_v2/keys",type:"GET",dataType:"json",contentType:"application/json"}).done(function(t,n,r){return 200===r.status?e.resolve(t):e.resolve([])}).fail(function(t){e.reject(t)}),e}});n.exports=s});