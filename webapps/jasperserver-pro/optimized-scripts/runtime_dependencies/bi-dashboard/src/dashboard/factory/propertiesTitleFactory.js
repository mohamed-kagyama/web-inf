/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DashboardBundle","../enum/dashboardComponentTypes"],function(e,o,r){var d=e("bundle!DashboardBundle"),t=e("../enum/dashboardComponentTypes"),a={},n=d["dashboard.dashlet.dialog.properties.title"];a[t.DASHBOARD_PROPERTIES]=d["dashboard.dialog.properties.title"],a[t.INPUT_CONTROL]=d["dashboard.component.filter.properties.title"],r.exports=function(e){var o;return(o=e.get("type"))in a?a[o]:n}});