/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","backbone"],function(e,t,a){var i=e("backbone");a.exports=i.Model.extend({defaults:{timestamp:void 0,state:void 0},initialize:function(e,t){t||(t={}),this.set("timestamp",(new Date).getTime()),this.dashboardModel=t.dashboardModel},applyState:function(){this.dashboardModel.applyJsonState(this.get("state"))}})});