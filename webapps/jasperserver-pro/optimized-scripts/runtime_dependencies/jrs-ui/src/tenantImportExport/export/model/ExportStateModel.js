/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","runtime_dependencies/js-sdk/src/common/model/BaseModel"],function(e,n,i){var t=e("underscore"),o=e("runtime_dependencies/js-sdk/src/common/model/BaseModel"),s={INPROGRESS:"inprogress",READY:"finished",FAILED:"failed",PENDING:"pending",CANCELLED:"cancelled"};i.exports=o.extend({url:function(){return"rest_v2/export/"+this.id+"/state"},initialize:function(e){o.prototype.initialize.call(this),this.on("change:phase",function(e,n){n==s.INPROGRESS&&t.isUndefined(e.interval)?e.interval=window.setInterval(function(){e.fetch({cache:!1}).fail(t.bind(e.stopPolling,e))},1e3):e.stopPolling()})},stopPolling:function(){t.isUndefined(this.interval)||(window.clearInterval(this.interval),this.interval=void 0)}},{STATE:s})});