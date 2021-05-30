/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DashboardBundle","../enum/dashboardComponentTypes"],function(e,o,a){var t=e("bundle!DashboardBundle"),d=e("../enum/dashboardComponentTypes"),n={},r=t["dashboard.base.dialog.properties.title"];n[d.WEB_PAGE_VIEW]=t["dashboard.component.web.page.view.add.component.dialog.title"],n[d.FREE_TEXT]=t["dashboard.component.text.add.component.dialog.title"],n[d.IMAGE]=t["dashboard.component.image.add.component.dialog.title"],n[d.CROSSTAB]=t["dashboard.component.crosstab.save.title"],n[d.TABLE]=t["dashboard.component.table.save.title"],n[d.CHART]=t["dashboard.component.chart.save.title"],n[d.ICHART]=t["dashboard.component.ichart.save.title"],a.exports=function(e){var o;return(o=e.get("type"))in n?n[o]:r}});