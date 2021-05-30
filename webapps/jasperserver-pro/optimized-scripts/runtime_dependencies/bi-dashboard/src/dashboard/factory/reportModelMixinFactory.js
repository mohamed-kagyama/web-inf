/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module"],function(e,t,n){var r=function(e,t){return{execute:function(){var n=this;return e.apply(this,arguments).then(function(e){t.addDashboardReport(n.execution.urlRun()+"/"+e.requestId)})}}};n.exports=r});