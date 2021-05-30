/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","underscore","bundle!DashboardBundle","../enum/fontSizes","../enum/fonts","../dashboardSettings","../enum/dashboardComponentTypes","../factory/propertiesBasicTemplateFactory","../factory/propertiesFormattingTemplateFactory","../factory/propertiesHyperlinkTemplateFactory"],function(e,t,r){var o=e("underscore"),a=e("bundle!DashboardBundle"),n=e("../enum/fontSizes"),i=e("../enum/fonts"),s=e("../dashboardSettings"),p=e("../enum/dashboardComponentTypes"),d=e("../factory/propertiesBasicTemplateFactory"),c=e("../factory/propertiesFormattingTemplateFactory"),l=e("../factory/propertiesHyperlinkTemplateFactory"),u=function(e){return{action:"basic",content:o.template(d(e),{i18n:a,options:{autoRefreshTitle:m(e),filtersPerRow:s.DASHLET_FILTERS_PER_ROW_MAX,showVizSelector:b(e)}}),primary:!0,label:a["dashboard.dialog.properties.tabs.basic"],hidden:!1}},f=function(e){return{action:"formatting",content:o.template(c(e),{i18n:a,options:{autoRefreshTitle:m(e),fonts:i,fontSizes:n,filtersPerRow:s.DASHLET_FILTERS_PER_ROW_MAX}}),label:a["dashboard.dialog.properties.tabs.formatting"],hidden:!1}},h=function(e){return{action:"hyperlinks",content:o.template(l(e),{i18n:a,model:e.toJSON()}),label:a["dashboard.dialog.properties.tabs.hyperlinks"],hidden:!1}},m=function(e){return e.get("type")===p.DASHBOARD_PROPERTIES?a["dashboard.dialog.properties.auto.refresh"]:a["dashboard.dashlet.dialog.properties.auto.refresh"]},b=function(e){return void 0===e.get("showVizSelector")||e.get("showVizSelector")};r.exports=function(e){switch(e.get("type")){case p.FREE_TEXT:return[u(e),f(e),h(e)];case p.IMAGE:case p.CHART:return[u(e),h(e)];case p.ADHOC_VIEW:return e.get("isAdhocChart")?[u(e),h(e)]:[u(e)];default:return[u(e)]}}});