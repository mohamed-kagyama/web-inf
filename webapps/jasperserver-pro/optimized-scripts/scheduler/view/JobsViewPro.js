/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/jrs-ui/src/scheduler/view/JobsView","../collection/JobsCollectionPro"],function(e,o,n){var i=e("runtime_dependencies/jrs-ui/src/scheduler/view/JobsView"),r=e("../collection/JobsCollectionPro");n.exports=i.extend({_getJobsCollection:function(e){return new r(null,e)}})});