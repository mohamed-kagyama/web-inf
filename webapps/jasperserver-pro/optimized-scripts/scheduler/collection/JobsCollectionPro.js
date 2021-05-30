/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/jrs-ui/src/scheduler/collection/JobsCollection"],function(e,o,t){var s=e("runtime_dependencies/jrs-ui/src/scheduler/collection/JobsCollection");t.exports=s.extend({_secondFetchPart:function(){if(this.options.isDashboard)return void this.getJobsOfAllReportsWeHave();s.prototype._secondFetchPart.apply(this,arguments)}})});