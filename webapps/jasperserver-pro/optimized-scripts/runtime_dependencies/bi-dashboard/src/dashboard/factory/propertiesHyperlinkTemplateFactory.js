/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","text!../template/properties/controls/dashletHyperlinkTemplate.htm","../enum/dashboardComponentTypes"],function(n,e,o){function t(n){return"<div>"+n+"</div>"}var i=n("text!../template/properties/controls/dashletHyperlinkTemplate.htm"),r=n("../enum/dashboardComponentTypes"),p={};p[r.DASHBOARD_PROPERTIES]=[].join("\n"),p[r.WEB_PAGE_VIEW]=[].join("\n"),p[r.REPORT]=[].join("\n"),p[r.FREE_TEXT]=[i].join("\n"),p[r.IMAGE]=[i].join("\n"),p[r.FILTER_GROUP]=[].join("\n"),p[r.INPUT_CONTROL]=[].join("\n"),p[r.ADHOC_VIEW]=[i].join("\n"),p[r.CROSSTAB]=[].join("\n"),p[r.TABLE]=[].join("\n"),p[r.CHART]=[i].join("\n"),o.exports=function(n){var e;return t((e=n.get("type"))in p?p[e]:"")}});