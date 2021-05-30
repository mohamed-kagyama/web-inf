/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone","request"],function(e,t,r){var n=e("backbone"),o=e("request");r.exports=n.Model.extend({url:"rest_v2/settings/exportResourceOptions",fetch:function(){return o({url:this.url,type:"GET"})}})});