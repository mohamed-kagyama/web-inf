/*
 * Copyright (C) 2005 - 2020 TIBCO Software Inc. All rights reserved. Confidentiality & Proprietary.
 * Licensed pursuant to commercial TIBCO End User License Agreement.
 */

define(["require","exports","module","bundle!DashboardBundle","text!../template/properties/controls/scaleToFitControlTemplate.htm","text!../template/properties/controls/bordersControlTemplate.htm","text!../template/properties/controls/text/textFormattingControlTemplate.htm","../enum/dashboardComponentTypes"],function(t,e,o){function r(t){return"<div>"+t+"</div>"}function n(t,e){return['<div class="section">','   <span class="title">'+t+"</span>",'   <div class="group">',"       "+e.join("\n"),"   </div>","</div>"].join("")}var a=t("bundle!DashboardBundle"),l=t("text!../template/properties/controls/scaleToFitControlTemplate.htm"),p=t("text!../template/properties/controls/bordersControlTemplate.htm"),s=t("text!../template/properties/controls/text/textFormattingControlTemplate.htm"),i=t("../enum/dashboardComponentTypes"),d={};d[i.FREE_TEXT]=[n(a["dashboard.dialog.properties.title.formatting.text"],[l,s]),n(a["dashboard.dialog.properties.title.formatting.dashlet"],[p])].join("\n"),o.exports=function(t){var e;return r((e=t.get("type"))in d?d[e]:"")}});