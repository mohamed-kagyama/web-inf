/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation","runtime_dependencies/bi-dashboard/src/dashboard/DashboardReportNavigation","underscore"],function(e,d,r){var a=e("runtime_dependencies/jrs-ui/src/actionModel/actionModel.primaryNavigation"),i=e("runtime_dependencies/bi-dashboard/src/dashboard/DashboardReportNavigation"),o=e("underscore");r.exports=a,o.extend(a,{bodyIds:o.extend({},a.bodyIds,{dashboard:i.confirmAndLeave})})});